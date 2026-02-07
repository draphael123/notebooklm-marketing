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

    // Check for specific error types and provide helpful messages
    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase();
      
      // Model errors - check first as they're most common
      if (errorMessage.includes("all claude models failed") || errorMessage.includes("model") && errorMessage.includes("not found")) {
        return NextResponse.json(
          { 
            error: "AI model error. All Claude models failed. Please check your Anthropic API key and account access. Visit /api/test-claude to see which models work.",
            details: error.message
          },
          { status: 500 }
        );
      }
      
      // API key errors
      if (errorMessage.includes("api_key") || errorMessage.includes("api key") || errorMessage.includes("anthropic_api_key") || errorMessage.includes("not set")) {
        return NextResponse.json(
          { error: "AI service configuration error. Please check your API keys in Vercel environment variables." },
          { status: 500 }
        );
      }
      
      // Document not found errors
      if (errorMessage.includes("document not found") || errorMessage.includes("document not available")) {
        return NextResponse.json(
          { error: "Document not found. Please add DOCUMENT_CONTENT or DOCUMENT_URL to Vercel environment variables." },
          { status: 500 }
        );
      }
      
      // Document loading errors (Google Drive, URL fetch failures)
      if (errorMessage.includes("failed to fetch") || errorMessage.includes("failed to load document")) {
        return NextResponse.json(
          { error: "Failed to load document from URL. Please check that your Google Drive document is set to 'Anyone with the link can view'." },
          { status: 500 }
        );
      }
      
      // Network/timeout errors
      if (errorMessage.includes("timeout") || errorMessage.includes("network") || errorMessage.includes("fetch")) {
        return NextResponse.json(
          { error: "Network error. Please check your document URL is accessible and try again." },
          { status: 500 }
        );
      }
      
      // Return a simplified version of the error message
      // Extract the key part if it's too long
      let displayError = error.message;
      if (displayError.length > 300) {
        // Try to extract the most important part
        if (displayError.includes("All Claude models failed")) {
          displayError = "All Claude models failed. Please check your Anthropic API key. Visit /api/test-claude to see which models work.";
        } else {
          displayError = displayError.substring(0, 250) + "...";
        }
      }
      
      return NextResponse.json(
        { error: displayError },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to process question. Please check Vercel logs for details." },
      { status: 500 }
    );
  }
}
