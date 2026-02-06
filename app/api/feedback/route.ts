import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const feedbackSchema = z.object({
  messageId: z.string().optional(),
  feedback: z.enum(["positive", "negative"]),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messageId, feedback } = feedbackSchema.parse(body);

    // TODO: Log feedback to analytics database
    console.log("Feedback received:", { messageId, feedback });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing feedback:", error);
    return NextResponse.json(
      { error: "Failed to process feedback" },
      { status: 500 }
    );
  }
}


