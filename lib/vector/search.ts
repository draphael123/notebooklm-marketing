/**
 * Vector Search Implementation
 * Supports both simple (full document) and RAG (vector search) approaches
 */

import { config } from "@/lib/config";
import { loadDocument } from "@/lib/utils/document-processor";
import { generateEmbedding } from "@/lib/ai/embeddings";
import { searchSimilar as pineconeSearch } from "./pinecone-client";
import { searchSimilar as supabaseSearch } from "./supabase-client";
import { DocumentChunk } from "@/lib/utils/document-processor";
import { countTokens } from "@/lib/utils/document-processor";

export interface SearchResult {
  content: string;
  metadata: any;
  score?: number;
}

/**
 * Retrieve relevant chunks using the configured search mode
 */
export async function retrieveRelevantChunks(
  question: string,
  intent: string,
  limit: number = 5
): Promise<DocumentChunk[]> {
  switch (config.searchMode) {
    case "simple":
      return await retrieveSimple(question, intent);
    
    case "rag":
      return await retrieveRAG(question, intent, limit);
    
    case "hybrid":
      return await retrieveHybrid(question, intent, limit);
    
    default:
      return await retrieveSimple(question, intent);
  }
}

/**
 * Simple approach: Return full document (or large chunks)
 * Best for smaller documents or when you want Claude to see everything
 */
async function retrieveSimple(
  question: string,
  intent: string
): Promise<DocumentChunk[]> {
  try {
    let fullText: string;
    try {
      fullText = await loadDocument();
    } catch (error) {
      // If document loading fails, return mock data
      console.warn("Failed to load document, using fallback:", error);
      return getMockChunks(intent);
    }
    
    // If document is small enough, return it all
    const tokens = countTokens(fullText);
    if (tokens <= config.maxContextTokens) {
      return [
        {
          id: "full-document",
          content: fullText,
          metadata: {
            category: "general" as const,
            topic: "Full Document",
            isLeadRelevant: true,
            chunkIndex: 0,
            startChar: 0,
            endChar: fullText.length,
          },
          tokenCount: tokens,
        },
      ];
    }
    
    // Otherwise, return large chunks that fit in context
    const chunkSize = config.maxContextTokens - 1000; // Leave room for prompts
    const chunks: DocumentChunk[] = [];
    const paragraphs = fullText.split(/\n\s*\n/);
    
    let currentChunk = "";
    let currentTokens = 0;
    let chunkIndex = 0;
    
    for (const para of paragraphs) {
      const paraTokens = countTokens(para);
      
      if (currentTokens + paraTokens > chunkSize && currentChunk.length > 0) {
        chunks.push({
          id: `simple-chunk-${chunkIndex}`,
          content: currentChunk.trim(),
          metadata: {
            category: "general" as const,
            topic: `Document Section ${chunkIndex + 1}`,
            isLeadRelevant: true,
            chunkIndex,
            startChar: 0,
            endChar: currentChunk.length,
          },
          tokenCount: currentTokens,
        });
        
        currentChunk = para;
        currentTokens = paraTokens;
        chunkIndex++;
      } else {
        currentChunk += (currentChunk ? "\n\n" : "") + para;
        currentTokens += paraTokens;
      }
    }
    
    if (currentChunk.trim().length > 0) {
      chunks.push({
        id: `simple-chunk-${chunkIndex}`,
        content: currentChunk.trim(),
        metadata: {
          category: "general" as const,
          topic: `Document Section ${chunkIndex + 1}`,
          isLeadRelevant: true,
          chunkIndex,
          startChar: 0,
          endChar: currentChunk.length,
        },
        tokenCount: currentTokens,
      });
    }
    
    return chunks;
  } catch (error) {
    console.error("Error in simple retrieval:", error);
    // Fallback to mock data
    return getMockChunks(intent);
  }
}

/**
 * RAG approach: Use vector search to find most relevant chunks
 */
async function retrieveRAG(
  question: string,
  intent: string,
  limit: number
): Promise<DocumentChunk[]> {
  try {
    // Generate embedding for question
    const queryEmbedding = await generateEmbedding(question);
    
    // Build filter based on intent
    const filter: any = { isLeadRelevant: true };
    if (intent === "pricing_inquiry") filter.category = "pricing";
    if (intent === "availability_check") filter.category = "states";
    if (intent === "process_question") filter.category = "process";
    
    // Search vector database
    let results: SearchResult[] = [];
    
    if (config.vectorDb === "pinecone") {
      results = await pineconeSearch(queryEmbedding, limit, filter);
    } else if (config.vectorDb === "supabase") {
      results = await supabaseSearch(queryEmbedding, limit, filter);
    } else {
      console.warn("No vector database configured. Falling back to simple mode.");
      return await retrieveSimple(question, intent);
    }
    
    // Convert results to DocumentChunk format
    return results.map((result, idx) => ({
      id: `rag-chunk-${idx}`,
      content: result.content,
      metadata: {
        category: result.metadata?.category || "general",
        program: result.metadata?.program,
        topic: result.metadata?.topic || "Relevant Section",
        isLeadRelevant: result.metadata?.isLeadRelevant !== false,
        chunkIndex: result.metadata?.chunkIndex || idx,
        startChar: 0,
        endChar: result.content.length,
      },
      tokenCount: countTokens(result.content),
    }));
  } catch (error) {
    console.error("Error in RAG retrieval:", error);
    // Fallback to simple mode
    return await retrieveSimple(question, intent);
  }
}

/**
 * Hybrid approach: Combine vector search with keyword matching
 */
async function retrieveHybrid(
  question: string,
  intent: string,
  limit: number
): Promise<DocumentChunk[]> {
  // Get results from both approaches
  const [ragResults, simpleResults] = await Promise.all([
    retrieveRAG(question, intent, limit).catch(() => []),
    retrieveSimple(question, intent).catch(() => []),
  ]);
  
  // Combine and deduplicate
  const combined = [...ragResults, ...simpleResults];
  const unique = new Map<string, DocumentChunk>();
  
  for (const chunk of combined) {
    const key = chunk.content.slice(0, 100); // Use first 100 chars as key
    if (!unique.has(key) || (chunk.metadata.isLeadRelevant && !unique.get(key)?.metadata.isLeadRelevant)) {
      unique.set(key, chunk);
    }
  }
  
  return Array.from(unique.values()).slice(0, limit);
}

/**
 * Fallback mock chunks
 */
function getMockChunks(intent: string): DocumentChunk[] {
  const mockChunks: Record<string, DocumentChunk[]> = {
    pricing_inquiry: [
      {
        id: "pricing-1",
        content: "Fountain's TRT program offers flexible pricing: 4-week plan at $199, 12-week plan at $499 (saves money), and 48-week plan at $1,799 (best value). All plans are all-inclusive covering medication, labs, visits, shipping, and support.",
        metadata: {
          category: "pricing",
          program: "TRT",
          topic: "TRT Pricing",
          isLeadRelevant: true,
          chunkIndex: 0,
          startChar: 0,
          endChar: 200,
        },
        tokenCount: 50,
      },
    ],
    availability_check: [
      {
        id: "availability-1",
        content: "Fountain operates in most states through partnerships with LabCorp and Quest Diagnostics. Patients can complete labs at local locations and meet with licensed providers via video visit.",
        metadata: {
          category: "states",
          topic: "State Availability",
          isLeadRelevant: true,
          chunkIndex: 0,
          startChar: 0,
          endChar: 200,
        },
        tokenCount: 40,
      },
    ],
    process_question: [
      {
        id: "process-1",
        content: "Getting started with Fountain is simple: 1) Complete the online assessment, 2) Schedule lab work at a nearby location, 3) Meet with a provider to discuss results, 4) Receive your personalized treatment plan. Most patients schedule their first provider visit within 5-14 days.",
        metadata: {
          category: "process",
          topic: "Getting Started",
          isLeadRelevant: true,
          chunkIndex: 0,
          startChar: 0,
          endChar: 300,
        },
        tokenCount: 60,
      },
    ],
  };

  return mockChunks[intent] || [
    {
      id: "general-1",
      content: "Fountain Vitality offers comprehensive hormone therapy programs including TRT (Testosterone Replacement Therapy), HRT (Hormone Replacement Therapy), and GLP-1 programs. All programs include medication, lab work, provider visits, and ongoing support.",
      metadata: {
        category: "general",
        topic: "Program Overview",
        isLeadRelevant: true,
        chunkIndex: 0,
        startChar: 0,
        endChar: 250,
      },
      tokenCount: 45,
    },
  ];
}
