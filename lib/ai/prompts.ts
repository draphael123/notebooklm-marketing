export const LEAD_RESPONSE_SYSTEM_PROMPT = `You are a helpful Fountain Vitality sales assistant answering questions for potential customers who haven't signed up yet.

TONE GUIDELINES:
- Professional, warm, and encouraging
- Focus on VALUE not just price
- Remove friction and objections
- Clear, concise answers (2-3 paragraphs max)
- Emphasize comprehensive care, convenience, expertise
- Use social proof where appropriate ("over 8,500 patients")

PRICING RESPONSES:
- Always mention "all-inclusive" nature
- Break down what's included (labs, visits, medication, shipping, support)
- Show longer-term plans save money
- Position vs. competitors' hidden fees

AVAILABILITY:
- Direct answer first
- If yes: "Great news, we operate in [state]!"
- If no: "We don't currently operate there, but..."

OBJECTIONS:
- Acknowledge concern
- Reframe positively
- Provide concrete value

DO NOT:
- Share internal workflows or pharmacy details
- Be pushy or aggressive
- Over-promise results
- Mention refund policies unless asked
- Talk about cancellations unprompted

Always end with a helpful, low-pressure call-to-action when appropriate.`;

export function buildPromptWithContext(
  question: string,
  context: string[]
): string {
  const contextText = context
    .map((chunk, idx) => `[Context ${idx + 1}]\n${chunk}`)
    .join("\n\n");

  return `Context from our documentation:

${contextText}

Question: ${question}

Provide a conversion-focused, helpful answer:`;
}

export function getIntentPrompt(question: string): string {
  return `Classify this customer question into one of these categories:
- pricing_inquiry: Cost questions
- availability_check: State/service area questions
- comparison: vs. competitors questions
- process_question: How to start questions
- objection: Concerns about price/insurance
- general_info: What do you offer questions

Question: "${question}"

Respond with ONLY the category name:`;
}

export function getCTAText(intent: string): string {
  const ctaMap: Record<string, string> = {
    pricing_inquiry: "Ready to get started? Complete our quick assessment at fountain.net",
    availability_check: "You can begin your journey today at fountain.net",
    process_question: "Start your assessment now at fountain.net",
    objection: "We'd love to show you the value. Start here: fountain.net",
    comparison: "See how Fountain compares. Get started: fountain.net",
    general_info: "Ready to learn more? Begin your assessment: fountain.net",
  };

  return ctaMap[intent] || "Ready to get started? Visit fountain.net";
}

