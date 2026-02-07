import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

/**
 * Test endpoint to verify Claude API key and find working models
 * Visit: /api/test-claude
 */
export async function GET() {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({
      error: "ANTHROPIC_API_KEY is not set",
      status: "missing_key",
    }, { status: 500 });
  }

  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const modelsToTest = [
    "claude-3-5-sonnet-20241022",
    "claude-3-5-sonnet-20240620",
    "claude-3-5-sonnet",
    "claude-3-sonnet-20240229",
    "claude-3-opus-20240229",
    "claude-3-haiku-20240307",
  ];

  const results: Array<{
    model: string;
    status: "success" | "error";
    error?: string;
    response?: string;
  }> = [];

  for (const model of modelsToTest) {
    try {
      const response = await client.messages.create({
        model: model,
        max_tokens: 10,
        messages: [
          {
            role: "user",
            content: "Say 'test'",
          },
        ],
      });

      results.push({
        model,
        status: "success",
        response: response.content[0].type === "text" ? response.content[0].text : "non-text response",
      });
    } catch (error: any) {
      results.push({
        model,
        status: "error",
        error: error?.message || error?.error?.message || String(error),
      });
    }
  }

  const workingModels = results.filter(r => r.status === "success");
  const failedModels = results.filter(r => r.status === "error");

  return NextResponse.json({
    apiKeySet: true,
    apiKeyPrefix: process.env.ANTHROPIC_API_KEY.substring(0, 10) + "...",
    totalModelsTested: modelsToTest.length,
    workingModels: workingModels.length,
    failedModels: failedModels.length,
    results,
    recommendation: workingModels.length > 0
      ? `Use model: ${workingModels[0].model}`
      : "No working models found. Check your API key and account access.",
  });
}

