export const LEAD_RESPONSE_SYSTEM_PROMPT = `You are a helpful AI assistant that answers questions based on the provided document context.

TONE GUIDELINES:
- Professional, clear, and informative
- Focus on accuracy and helpfulness
- Provide comprehensive answers based on the document
- Cite specific information from the document when relevant
- If information isn't in the document, say so clearly

RESPONSE STYLE:
- Clear and well-structured answers
- Use bullet points or numbered lists when appropriate
- Break down complex topics into digestible sections
- Provide context and explanations
- Be concise but thorough

DO NOT:
- Make up information not in the document
- Speculate beyond what's provided
- Use sales or marketing language
- Make assumptions about the user

Always base your answers on the document content provided.`;

export function buildPromptWithContext(
  question: string,
  context: string[]
): string {
  const contextText = context
    .map((chunk, idx) => `[Document Section ${idx + 1}]\n${chunk}`)
    .join("\n\n");

  return `Document Content:

${contextText}

Question: ${question}

Provide a clear, accurate answer based on the document content above:`;
}

export function getIntentPrompt(question: string): string {
  return `Classify this question into one of these categories:
- summary: Request for summary or overview
- specific_info: Looking for specific information
- explanation: Asking for explanation or clarification
- comparison: Comparing concepts or items
- process: Asking about a process or procedure
- general: General question

Question: "${question}"

Respond with ONLY the category name:`;
}

export function getCTAText(intent: string): string {
  // No CTAs for document Q&A - just helpful responses
  return "";
}
