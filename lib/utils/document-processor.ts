/**
 * Document Processing Utilities
 * Handles text extraction from various formats and chunking
 */

import fs from "fs";
import path from "path";
import { config } from "@/lib/config";

// Dynamic imports for optional dependencies
let mammoth: any;
let pdfParse: any;
let tiktoken: any;

try {
  mammoth = require("mammoth");
} catch {
  // mammoth not available
}

try {
  pdfParse = require("pdf-parse");
} catch {
  // pdf-parse not available
}

try {
  tiktoken = require("tiktoken");
} catch {
  // tiktoken not available
}

export interface DocumentChunk {
  id: string;
  content: string;
  metadata: {
    category: "pricing" | "states" | "process" | "programs" | "faqs" | "general";
    program?: "TRT" | "HRT" | "GLP";
    topic: string;
    isLeadRelevant: boolean;
    chunkIndex: number;
    startChar: number;
    endChar: number;
  };
  tokenCount: number;
}

/**
 * Extract text from various document formats
 */
export async function extractTextFromFile(filePath: string): Promise<string> {
  const ext = path.extname(filePath).toLowerCase();
  const buffer = fs.readFileSync(filePath);

  switch (ext) {
    case ".txt":
      return buffer.toString("utf-8");

    case ".docx":
      if (!mammoth) {
        throw new Error("mammoth package is required for .docx files. Install with: npm install mammoth");
      }
      const docxResult = await mammoth.extractRawText({ buffer });
      return docxResult.value;

    case ".pdf":
      if (!pdfParse) {
        throw new Error("pdf-parse package is required for .pdf files. Install with: npm install pdf-parse");
      }
      const pdfData = await pdfParse(buffer);
      return pdfData.text;

    case ".md":
    case ".markdown":
      return buffer.toString("utf-8");

    default:
      throw new Error(`Unsupported file format: ${ext}`);
  }
}

/**
 * Count tokens in text (using tiktoken)
 */
export function countTokens(text: string, model: string = "gpt-4"): number {
  try {
    if (!tiktoken) {
      // Fallback: rough estimate (1 token ≈ 4 characters)
      return Math.ceil(text.length / 4);
    }
    const encoding = tiktoken.encoding_for_model(model);
    const tokens = encoding.encode(text);
    encoding.free();
    return tokens.length;
  } catch (error) {
    // Fallback: rough estimate (1 token ≈ 4 characters)
    return Math.ceil(text.length / 4);
  }
}

/**
 * Split text into semantic chunks
 */
export function chunkText(
  text: string,
  chunkSize: number = config.chunkSize,
  overlap: number = config.chunkOverlap
): DocumentChunk[] {
  const chunks: DocumentChunk[] = [];
  const model = "gpt-4";
  
  // Split by paragraphs first for better semantic boundaries
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  
  let currentChunk = "";
  let currentTokens = 0;
  let chunkIndex = 0;
  let startChar = 0;
  let charIndex = 0;

  for (const paragraph of paragraphs) {
    const paraTokens = countTokens(paragraph, model);
    
    if (currentTokens + paraTokens > chunkSize && currentChunk.length > 0) {
      // Save current chunk
      chunks.push({
        id: `chunk-${chunkIndex}`,
        content: currentChunk.trim(),
        metadata: {
          category: classifyChunkCategory(currentChunk),
          program: extractProgram(currentChunk),
          topic: extractTopic(currentChunk),
          isLeadRelevant: isLeadRelevant(currentChunk),
          chunkIndex,
          startChar,
          endChar: charIndex,
        },
        tokenCount: currentTokens,
      });

      // Start new chunk with overlap
      const overlapText = getOverlapText(currentChunk, overlap);
      currentChunk = overlapText + "\n\n" + paragraph;
      currentTokens = countTokens(currentChunk, model);
      startChar = charIndex - overlapText.length;
      chunkIndex++;
    } else {
      currentChunk += (currentChunk ? "\n\n" : "") + paragraph;
      currentTokens += paraTokens;
    }
    
    charIndex += paragraph.length + 2; // +2 for \n\n
  }

  // Add final chunk
  if (currentChunk.trim().length > 0) {
    chunks.push({
      id: `chunk-${chunkIndex}`,
      content: currentChunk.trim(),
      metadata: {
        category: classifyChunkCategory(currentChunk),
        program: extractProgram(currentChunk),
        topic: extractTopic(currentChunk),
        isLeadRelevant: isLeadRelevant(currentChunk),
        chunkIndex,
        startChar,
        endChar: charIndex,
      },
      tokenCount: currentTokens,
    });
  }

  return chunks;
}

/**
 * Get overlap text from end of chunk
 */
function getOverlapText(text: string, overlapChars: number): string {
  if (text.length <= overlapChars) return text;
  
  // Try to break at sentence boundary
  const end = text.slice(-overlapChars);
  const lastPeriod = end.lastIndexOf(".");
  const lastNewline = end.lastIndexOf("\n");
  const breakPoint = Math.max(lastPeriod, lastNewline);
  
  if (breakPoint > overlapChars * 0.5) {
    return end.slice(breakPoint + 1).trim();
  }
  
  return end.trim();
}

/**
 * Classify chunk category based on content
 */
function classifyChunkCategory(content: string): DocumentChunk["metadata"]["category"] {
  const lower = content.toLowerCase();
  
  if (/\$\d+|price|cost|pricing|plan|subscription|fee/.test(lower)) {
    return "pricing";
  }
  if (/state|location|available|operate|coverage|lab|labcorp|quest/.test(lower)) {
    return "states";
  }
  if (/start|begin|process|assessment|sign up|register|timeline|step/.test(lower)) {
    return "process";
  }
  if (/program|medication|treatment|therapy|visit|included|include/.test(lower)) {
    return "programs";
  }
  if (/question|faq|common|ask|wonder/.test(lower)) {
    return "faqs";
  }
  
  return "general";
}

/**
 * Extract program type from content
 */
function extractProgram(content: string): DocumentChunk["metadata"]["program"] | undefined {
  const lower = content.toLowerCase();
  
  if (/\btrt\b|testosterone replacement/.test(lower)) {
    return "TRT";
  }
  if (/\bhrt\b|hormone replacement/.test(lower)) {
    return "HRT";
  }
  if (/\bglp|glp-1|semaglutide|ozempic|wegovy/.test(lower)) {
    return "GLP";
  }
  
  return undefined;
}

/**
 * Extract topic from content (first sentence or key phrase)
 */
function extractTopic(content: string): string {
  const sentences = content.split(/[.!?]\s+/);
  if (sentences.length > 0) {
    const firstSentence = sentences[0].trim();
    if (firstSentence.length < 100) {
      return firstSentence;
    }
  }
  
  // Fallback: first 50 characters
  return content.slice(0, 50).trim() + "...";
}

/**
 * Determine if chunk is relevant for leads
 */
function isLeadRelevant(content: string): boolean {
  const lower = content.toLowerCase();
  
  // Exclude internal workflows
  const excludeKeywords = [
    "internal",
    "pharmacy workflow",
    "prescription management",
    "provider assignment",
    "compliance procedure",
    "team routing",
    "internal process",
  ];
  
  if (excludeKeywords.some(keyword => lower.includes(keyword))) {
    return false;
  }
  
  // Include lead-relevant topics
  const includeKeywords = [
    "price",
    "cost",
    "pricing",
    "state",
    "available",
    "start",
    "begin",
    "assessment",
    "program",
    "included",
    "subscription",
    "insurance",
    "hsa",
    "fsa",
  ];
  
  return includeKeywords.some(keyword => lower.includes(keyword));
}

/**
 * Load and process document
 * In serverless environments, tries to load from environment variable first
 */
export async function loadDocument(filePath?: string): Promise<string> {
  // Try environment variable first (for serverless/Vercel)
  if (process.env.DOCUMENT_CONTENT) {
    return process.env.DOCUMENT_CONTENT;
  }

  // Try fetching from URL if DOCUMENT_URL is set
  if (process.env.DOCUMENT_URL) {
    try {
      const response = await fetch(process.env.DOCUMENT_URL);
      if (response.ok) {
        return await response.text();
      }
    } catch (error) {
      console.warn("Failed to fetch document from URL:", error);
    }
  }

  // Fallback to file system (only works in Node.js, not serverless)
  const docPath = filePath || config.documentPath;
  
  // Check if we're in a serverless environment
  if (typeof window === "undefined" && fs && fs.existsSync) {
    if (fs.existsSync(docPath)) {
      return await extractTextFromFile(docPath);
    }
  }
  
  throw new Error(
    `Document not found: ${docPath}. ` +
    `For serverless deployment, set DOCUMENT_CONTENT or DOCUMENT_URL environment variable.`
  );
}

/**
 * Process document into chunks
 */
export async function processDocument(
  filePath?: string
): Promise<DocumentChunk[]> {
  const text = await loadDocument(filePath);
  return chunkText(text, config.chunkSize, config.chunkOverlap);
}

