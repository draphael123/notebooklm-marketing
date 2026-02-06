import { NextResponse } from "next/server";

/**
 * API endpoint to check which environment variables are set
 * This helps verify configuration without exposing sensitive values
 */
export async function GET() {
  const envCheck = {
    // Required
    ANTHROPIC_API_KEY: !!process.env.ANTHROPIC_API_KEY,
    OPENAI_API_KEY: !!process.env.OPENAI_API_KEY,
    
    // Configuration
    SEARCH_MODE: process.env.SEARCH_MODE || "simple (default)",
    AI_PROVIDER: process.env.AI_PROVIDER || "anthropic (default)",
    VECTOR_DB: process.env.VECTOR_DB || "none (default)",
    
    // Document
    DOCUMENT_CONTENT: !!process.env.DOCUMENT_CONTENT,
    DOCUMENT_URL: !!process.env.DOCUMENT_URL,
    DOCUMENT_PATH: process.env.DOCUMENT_PATH || "./data/source-document.txt (default)",
    
    // Site
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "not set",
    
    // Vector DB (if using RAG)
    PINECONE_API_KEY: !!process.env.PINECONE_API_KEY,
    PINECONE_INDEX: process.env.PINECONE_INDEX || "not set",
    SUPABASE_URL: !!process.env.SUPABASE_URL,
    SUPABASE_KEY: !!process.env.SUPABASE_KEY,
    
    // Optional
    ENABLE_CACHING: process.env.ENABLE_CACHING || "true (default)",
    RATE_LIMIT_ENABLED: process.env.RATE_LIMIT_ENABLED || "true (default)",
  };

  // Determine status
  const hasAIKey = envCheck.ANTHROPIC_API_KEY || envCheck.OPENAI_API_KEY;
  const hasDocument = envCheck.DOCUMENT_CONTENT || envCheck.DOCUMENT_URL;
  
  const status = {
    ready: hasAIKey && hasDocument,
    missing: [] as string[],
  };

  if (!hasAIKey) {
    status.missing.push("ANTHROPIC_API_KEY or OPENAI_API_KEY");
  }
  if (!hasDocument) {
    status.missing.push("DOCUMENT_CONTENT or DOCUMENT_URL");
  }

  return NextResponse.json({
    status: status.ready ? "✅ Ready" : "⚠️ Missing Configuration",
    missing: status.missing,
    environment: envCheck,
    recommendations: [
      !hasAIKey && "Add ANTHROPIC_API_KEY to Vercel environment variables",
      !hasDocument && "Add DOCUMENT_CONTENT or DOCUMENT_URL to Vercel environment variables",
      !envCheck.SEARCH_MODE.includes("simple") && !envCheck.SEARCH_MODE.includes("rag") && "Set SEARCH_MODE=simple for basic setup",
      !envCheck.AI_PROVIDER.includes("anthropic") && !envCheck.AI_PROVIDER.includes("openai") && "Set AI_PROVIDER=anthropic",
    ].filter(Boolean),
  });
}

