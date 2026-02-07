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

/**
 * List of Claude models to try in order of preference
 * Falls back to next model if one fails
 */
const MODEL_FALLBACKS = [
  "claude-3-5-sonnet-20241022", // Latest
  "claude-3-5-sonnet-20240620", // Previous version
  "claude-3-5-sonnet", // Without date
  "claude-3-sonnet-20240229", // Older stable
  "claude-3-haiku-20240307", // Fastest/cheapest (usually always available)
];

/**
 * Get the model to use, with fallback support
 */
function getModel(): string {
  // If explicitly set, use it
  if (process.env.CLAUDE_MODEL) {
    return process.env.CLAUDE_MODEL;
  }
  
  // Otherwise use first fallback
  return MODEL_FALLBACKS[0];
}

/**
 * Generate response with automatic model fallback
 */
export async function generateResponse(
  messages: ChatMessage[],
  systemPrompt: string,
  maxTokens: number = 1024
): Promise<string> {
  const modelsToTry = process.env.CLAUDE_MODEL 
    ? [process.env.CLAUDE_MODEL, ...MODEL_FALLBACKS]
    : MODEL_FALLBACKS;
  
  // Remove duplicates while preserving order
  const uniqueModels = Array.from(new Set(modelsToTry));
  
  let lastError: any = null;
  
  for (const model of uniqueModels) {
    try {
      const client = getAnthropicClient();
      console.log(`[Claude] Trying model: ${model}`);
      
      const response = await client.messages.create({
        model: model,
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      });

      const content = response.content[0];
      if (content.type === "text") {
        console.log(`[Claude] Success with model: ${model}`);
        return content.text;
      }

      throw new Error("Unexpected response type from Claude");
    } catch (error: any) {
      console.error(`[Claude] Model ${model} failed:`, error?.message || error);
      lastError = error;
      
      // If it's a model not found error, try next model
      if (
        error?.status === 404 || 
        error?.message?.includes("not_found") || 
        error?.error?.type === "not_found_error" ||
        error?.statusCode === 404
      ) {
        console.log(`[Claude] Model ${model} not found, trying next fallback...`);
        continue; // Try next model
      }
      
      // For other errors, throw immediately
      throw error;
    }
  }
  
  // If all models failed, provide a clear, concise error
  const lastErrorMessage = lastError?.message || lastError?.error?.message || "Unknown error";
  throw new Error(
    `All Claude models failed. Please check your Anthropic API key and account access. ` +
    `Last error: ${lastErrorMessage.substring(0, 100)}. ` +
    `Visit /api/test-claude to see which models work with your account.`
  );
}

/**
 * Generate streaming response with automatic model fallback
 */
export async function generateStreamingResponse(
  messages: ChatMessage[],
  systemPrompt: string,
  onChunk: (chunk: string) => void,
  maxTokens: number = 1024
): Promise<void> {
  const modelsToTry = process.env.CLAUDE_MODEL 
    ? [process.env.CLAUDE_MODEL, ...MODEL_FALLBACKS]
    : MODEL_FALLBACKS;
  
  // Remove duplicates while preserving order
  const uniqueModels = Array.from(new Set(modelsToTry));
  
  let lastError: any = null;
  
  for (const model of uniqueModels) {
    try {
      const client = getAnthropicClient();
      console.log(`[Claude] Trying model (streaming): ${model}`);
      
      const stream = await client.messages.stream({
        model: model,
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      });

      let hasContent = false;
      for await (const event of stream) {
        hasContent = true;
        if (event.type === "content_block_delta") {
          if (event.delta.type === "text_delta") {
            onChunk(event.delta.text);
          }
        }
      }
      
      if (hasContent) {
        console.log(`[Claude] Success with model (streaming): ${model}`);
        return; // Success
      }
      
      throw new Error("No content received from stream");
    } catch (error: any) {
      console.error(`[Claude] Model ${model} failed (streaming):`, error?.message || error);
      lastError = error;
      
      // If it's a model not found error, try next model
      if (
        error?.status === 404 || 
        error?.message?.includes("not_found") || 
        error?.error?.type === "not_found_error" ||
        error?.statusCode === 404
      ) {
        console.log(`[Claude] Model ${model} not found, trying next fallback...`);
        continue; // Try next model
      }
      
      // For other errors, throw immediately
      throw error;
    }
  }
  
  // If all models failed
  throw new Error(
    `All Claude models failed (streaming). Last error: ${lastError?.message || "Unknown error"}. ` +
    `Tried models: ${uniqueModels.join(", ")}. ` +
    `Please check your Anthropic API key and account access.`
  );
}
