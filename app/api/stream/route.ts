/**
 * Streaming Response API
 * Returns responses as they're generated (SSE)
 */

import { NextRequest } from "next/server";
import { classifyIntent } from "@/lib/processing/intent-classifier";
import { retrieveRelevantChunks } from "@/lib/vector/search";
import {
  LEAD_RESPONSE_SYSTEM_PROMPT,
  buildPromptWithContext,
  getCTAText,
} from "@/lib/ai/prompts";
import { generateStreamingResponse as claudeStream } from "@/lib/ai/claude-client";
import { generateStreamingResponse as openaiStream } from "@/lib/ai/openai-client";
import { config } from "@/lib/config";
import { checkRateLimit, getClientIdentifier } from "@/lib/utils/rate-limiter";
import { z } from "zod";

const requestSchema = z.object({
  question: z.string().min(1).max(500),
});

export async function POST(request: NextRequest) {
  // Rate limiting
  const clientId = getClientIdentifier(request);
  const rateLimit = checkRateLimit(clientId);

  if (!rateLimit.allowed) {
    return new Response(
      JSON.stringify({ error: "Rate limit exceeded" }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": Math.ceil((rateLimit.resetAt - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  try {
    const body = await request.json();
    const { question } = requestSchema.parse(body);

    // Create a ReadableStream for SSE
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        try {
          // Classify intent and retrieve context
          const intent = await classifyIntent(question);
          const relevantChunks = await retrieveRelevantChunks(question, intent);
          const contextTexts = relevantChunks.map((chunk) => chunk.content);
          const prompt = buildPromptWithContext(question, contextTexts);

          // Stream response
          let fullResponse = "";
          const onChunk = (chunk: string) => {
            fullResponse += chunk;
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ chunk })}\n\n`)
            );
          };

          if (config.aiProvider === "openai") {
            await openaiStream(
              [{ role: "user", content: prompt }],
              LEAD_RESPONSE_SYSTEM_PROMPT,
              onChunk,
              config.maxResponseTokens
            );
          } else {
            await claudeStream(
              [{ role: "user", content: prompt }],
              LEAD_RESPONSE_SYSTEM_PROMPT,
              onChunk,
              config.maxResponseTokens
            );
          }

          // Add CTA
          const cta = getCTAText(intent);
          if (cta) {
            const ctaChunk = `\n\n${cta}`;
            fullResponse += ctaChunk;
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ chunk: ctaChunk })}\n\n`)
            );
          }

          // Send done signal
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`)
          );
          controller.close();
        } catch (error) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: "Failed to generate response" })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Invalid request" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}

