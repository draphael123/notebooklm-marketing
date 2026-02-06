/**
 * Embedding Generation Script
 * 
 * Generates embeddings for document chunks and stores them
 * in the vector database.
 * 
 * Usage: npm run generate-embeddings
 */

import fs from "fs";
import path from "path";
import { DocumentChunk } from "@/lib/utils/document-processor";
import { generateEmbeddings } from "@/lib/ai/embeddings";
import { upsertChunks as pineconeUpsert } from "@/lib/vector/pinecone-client";
import { upsertChunks as supabaseUpsert } from "@/lib/vector/supabase-client";
import { config } from "@/lib/config";

async function main() {
  console.log("🚀 Starting embedding generation...\n");

  // Check if chunks file exists
  const chunksPath = path.join(process.cwd(), "data", "chunks", "chunks.json");
  
  if (!fs.existsSync(chunksPath)) {
    console.error("❌ Chunks file not found.");
    console.log("\n📝 Please run 'npm run process-doc' first to process your document.");
    process.exit(1);
  }

  // Check for OpenAI API key
  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY is not set.");
    console.log("\n📝 Please set OPENAI_API_KEY in your .env.local file.");
    process.exit(1);
  }

  // Check vector database configuration
  if (config.vectorDb === "none") {
    console.warn("⚠️  No vector database configured.");
    console.log("\n📝 To use RAG mode, set up Pinecone or Supabase:");
    console.log("   - For Pinecone: Set PINECONE_API_KEY and PINECONE_INDEX");
    console.log("   - For Supabase: Set SUPABASE_URL and SUPABASE_KEY");
    console.log("\n💡 You can still use 'simple' mode without a vector database.");
    process.exit(0);
  }

  try {
    // Load chunks
    console.log("📂 Loading chunks...");
    const chunks: DocumentChunk[] = JSON.parse(
      fs.readFileSync(chunksPath, "utf-8")
    );

    console.log(`✅ Loaded ${chunks.length} chunks\n`);

    // Filter to lead-relevant chunks only
    const leadRelevantChunks = chunks.filter(
      (chunk) => chunk.metadata.isLeadRelevant
    );
    console.log(`🎯 Processing ${leadRelevantChunks.length} lead-relevant chunks\n`);

    // Generate embeddings in batches
    const batchSize = 100;
    const allEmbeddings: number[][] = [];

    console.log("🔄 Generating embeddings...");
    for (let i = 0; i < leadRelevantChunks.length; i += batchSize) {
      const batch = leadRelevantChunks.slice(i, i + batchSize);
      const texts = batch.map((chunk) => chunk.content);
      
      console.log(`   Batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(leadRelevantChunks.length / batchSize)}`);
      
      const embeddings = await generateEmbeddings(texts);
      allEmbeddings.push(...embeddings);
      
      // Small delay to avoid rate limits
      if (i + batchSize < leadRelevantChunks.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    console.log(`✅ Generated ${allEmbeddings.length} embeddings\n`);

    // Upsert to vector database
    console.log(`💾 Uploading to ${config.vectorDb}...`);
    
    if (config.vectorDb === "pinecone") {
      await pineconeUpsert(leadRelevantChunks, allEmbeddings);
    } else if (config.vectorDb === "supabase") {
      await supabaseUpsert(leadRelevantChunks, allEmbeddings);
    }

    console.log("\n✨ Done! Your embeddings are ready to use.");
    console.log("\n💡 You can now:");
    console.log("   - Set SEARCH_MODE=rag in .env.local to use vector search");
    console.log("   - Test queries with: npm run test-queries");
  } catch (error) {
    console.error("\n❌ Error generating embeddings:", error);
    if (error instanceof Error) {
      console.error("   Message:", error.message);
    }
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}
