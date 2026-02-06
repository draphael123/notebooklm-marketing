import { generateResponse } from "@/lib/ai/claude-client";
import { getIntentPrompt } from "@/lib/ai/prompts";

export type Intent =
  | "pricing_inquiry"
  | "availability_check"
  | "comparison"
  | "process_question"
  | "objection"
  | "general_info";

const INTENT_KEYWORDS: Record<Intent, string[]> = {
  pricing_inquiry: [
    "cost",
    "price",
    "pricing",
    "how much",
    "expensive",
    "afford",
    "payment",
    "plan",
    "$",
  ],
  availability_check: [
    "state",
    "available",
    "operate",
    "location",
    "where",
    "coverage",
    "service area",
    "lab",
  ],
  comparison: [
    "vs",
    "versus",
    "compare",
    "difference",
    "better",
    "competitor",
    "alternative",
  ],
  process_question: [
    "start",
    "begin",
    "get started",
    "how to",
    "process",
    "timeline",
    "assessment",
    "sign up",
  ],
  objection: [
    "why",
    "but",
    "concern",
    "worry",
    "insurance",
    "refund",
    "cancel",
    "too expensive",
  ],
  general_info: [
    "what",
    "offer",
    "include",
    "program",
    "service",
    "do you",
    "tell me",
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

  // Default to general_info
  return "general_info";
}

