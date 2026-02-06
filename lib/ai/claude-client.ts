import Anthropic from "@anthropic-ai/sdk";

let anthropic: Anthropic | null = null;

function getAnthropicClient(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is not set");
  }

  if (!anthropic) {
    anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  return anthropic;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function generateResponse(
  messages: ChatMessage[],
  systemPrompt: string,
  maxTokens: number = 1024
): Promise<string> {
  try {
    const client = getAnthropicClient();
    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    });

    const content = response.content[0];
    if (content.type === "text") {
      return content.text;
    }

    throw new Error("Unexpected response type from Claude");
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
}

export async function generateStreamingResponse(
  messages: ChatMessage[],
  systemPrompt: string,
  onChunk: (chunk: string) => void,
  maxTokens: number = 1024
): Promise<void> {
  try {
    const client = getAnthropicClient();
    const stream = await client.messages.stream({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    });

    for await (const event of stream) {
      if (event.type === "content_block_delta") {
        if (event.delta.type === "text_delta") {
          onChunk(event.delta.text);
        }
      }
    }
  } catch (error) {
    console.error("Error streaming response:", error);
    throw error;
  }
}

