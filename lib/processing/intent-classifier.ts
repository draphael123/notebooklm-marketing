import { generateResponse } from "@/lib/ai/claude-client";
import { getIntentPrompt } from "@/lib/ai/prompts";

export type Intent =
  | "summary"
  | "specific_info"
  | "explanation"
  | "comparison"
  | "process"
  | "general";

const INTENT_KEYWORDS: Record<Intent, string[]> = {
  summary: [
    "summarize",
    "summary",
    "overview",
    "main points",
    "key points",
    "highlights",
    "brief",
  ],
  specific_info: [
    "what",
    "when",
    "where",
    "who",
    "which",
    "details",
    "specific",
    "information",
  ],
  explanation: [
    "explain",
    "how",
    "why",
    "describe",
    "clarify",
    "understand",
    "meaning",
  ],
  comparison: [
    "vs",
    "versus",
    "compare",
    "difference",
    "similar",
    "different",
    "versus",
  ],
  process: [
    "process",
    "steps",
    "procedure",
    "how to",
    "method",
    "workflow",
    "flow",
  ],
  general: [
    "tell me",
    "about",
    "information",
    "know",
    "learn",
  ],
};

export async function classifyIntent(question: string): Promise<Intent> {
  const lowerQuestion = question.toLowerCase();

  // Quick keyword-based classification
  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
    if (keywords.some((keyword) => lowerQuestion.includes(keyword))) {
      return intent as Intent;
    }
  }

  // Fallback to AI classification if no keywords match
  try {
    const prompt = getIntentPrompt(question);
    const response = await generateResponse(
      [{ role: "user", content: prompt }],
      "You are a question classifier. Respond with only the category name.",
      50
    );

    const classified = response.trim().toLowerCase() as Intent;
    if (Object.keys(INTENT_KEYWORDS).includes(classified)) {
      return classified;
    }
  } catch (error) {
    console.error("Error classifying intent:", error);
  }

  // Default to general
  return "general";
}


