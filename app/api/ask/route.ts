import { NextRequest, NextResponse } from "next/server";
import { processQuery } from "@/lib/processing/query-processor";
import { checkRateLimit, getClientIdentifier } from "@/lib/utils/rate-limiter";
import { z } from "zod";

const requestSchema = z.object({
  question: z.string().min(1).max(500),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimit = checkRateLimit(clientId);
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          resetAt: rateLimit.resetAt,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "100",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimit.resetAt.toString(),
            "Retry-After": Math.ceil((rateLimit.resetAt - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // Validate request
    const body = await request.json();
    const { question } = requestSchema.parse(body);

    // Process query
    const response = await processQuery(question, clientId);

    return NextResponse.json(response, {
      headers: {
        "X-RateLimit-Limit": "100",
        "X-RateLimit-Remaining": rateLimit.remaining.toString(),
        "X-RateLimit-Reset": rateLimit.resetAt.toString(),
      },
    });
  } catch (error) {
    console.error("Error processing query:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request", details: error.errors },
        { status: 400 }
      );
    }

    // Check if it's an API key error
    if (error instanceof Error) {
      if (error.message.includes("API_KEY") || error.message.includes("api key")) {
        return NextResponse.json(
          { error: "AI service configuration error. Please check your API keys." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to process question. Please try again." },
      { status: 500 }
    );
  }
}
