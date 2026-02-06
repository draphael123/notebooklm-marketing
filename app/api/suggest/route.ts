import { NextResponse } from "next/server";

const suggestedQuestions = [
  "What are your pricing plans?",
  "Do you operate in my state?",
  "What's included in the subscription?",
  "How do I get started?",
  "Do you accept insurance?",
  "What's the difference between TRT, HRT, and GLP-1?",
  "How long does it take to get started?",
  "What labs do you work with?",
  "Can I use HSA or FSA?",
  "What makes Fountain different from competitors?",
];

export async function GET() {
  return NextResponse.json({ questions: suggestedQuestions });
}

