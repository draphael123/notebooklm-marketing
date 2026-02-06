import { classifyIntent, Intent } from "./intent-classifier";
import { generateResponse as claudeGenerate } from "@/lib/ai/claude-client";
import { generateResponse as openaiGenerate } from "@/lib/ai/openai-client";
import {
  LEAD_RESPONSE_SYSTEM_PROMPT,
  buildPromptWithContext,
  getCTAText,
} from "@/lib/ai/prompts";
import { retrieveRelevantChunks } from "@/lib/vector/search";
import { config } from "@/lib/config";
import { getCachedResponse, setCachedResponse } from "@/lib/utils/cache";
import { logQuery } from "@/lib/analytics/logger";

export interface QueryResponse {
  answer: string;
  sources: string[];
  relatedQuestions: string[];
  intent: Intent;
  cta?: string;
  cached?: boolean;
}

export async function processQuery(
  question: string,
  clientId?: string
): Promise<QueryResponse> {
  const startTime = Date.now();

  // Check cache first
  const cached = getCachedResponse(question);
  if (cached) {
    return { ...cached, cached: true };
  }

  try {
    // 1. Classify intent
    const intent = await classifyIntent(question);

    // 2. Retrieve relevant context
    const relevantChunks = await retrieveRelevantChunks(question, intent);

    // 3. Generate response using configured AI provider
    const contextTexts = relevantChunks.map((chunk) => chunk.content);
    const prompt = buildPromptWithContext(question, contextTexts);

    let answer: string;
    if (config.aiProvider === "openai") {
      answer = await openaiGenerate(
        [{ role: "user", content: prompt }],
        LEAD_RESPONSE_SYSTEM_PROMPT,
        config.maxResponseTokens
      );
    } else {
      answer = await claudeGenerate(
        [{ role: "user", content: prompt }],
        LEAD_RESPONSE_SYSTEM_PROMPT,
        config.maxResponseTokens
      );
    }

    // 4. Add CTA if appropriate
    const cta = getCTAText(intent);
    const finalAnswer = answer + (cta ? `\n\n${cta}` : "");

    // 5. Generate related questions
    const relatedQuestions = generateRelatedQuestions(intent, question);

    const response: QueryResponse = {
      answer: finalAnswer,
      sources: relevantChunks.map(
        (chunk) => chunk.metadata.topic || "Documentation"
      ),
      relatedQuestions,
      intent,
      cta,
      cached: false,
    };

    // Cache the response
    setCachedResponse(question, response);

    // Log analytics
    const responseTime = Date.now() - startTime;
    logQuery({
      question,
      intent,
      sourcesUsed: response.sources,
      responseTime,
      clientId,
    }).catch(console.error); // Don't block on logging

    return response;
  } catch (error) {
    console.error("Error processing query:", error);
    throw error;
  }
}

function generateRelatedQuestions(intent: Intent, question: string): string[] {
  const relatedMap: Record<Intent, string[]> = {
    summary: [
      "What are the key takeaways?",
      "What are the main conclusions?",
      "What are the important points?",
    ],
    specific_info: [
      "Can you provide more details?",
      "What else does the document say about this?",
      "Are there any related sections?",
    ],
    explanation: [
      "Can you explain this in more detail?",
      "What does this mean?",
      "How does this work?",
    ],
    comparison: [
      "What are the similarities?",
      "What are the differences?",
      "How do they compare?",
    ],
    process: [
      "What are the steps involved?",
      "What comes next?",
      "What is the complete process?",
    ],
    general: [
      "What else should I know?",
      "What are related topics?",
      "What are the key concepts?",
    ],
  };

  return relatedMap[intent] || [];
}
