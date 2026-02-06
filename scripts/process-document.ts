/**
 * Document Processing Script
 * 
 * Processes the Fountain Workflows document to extract
 * lead-relevant sections and prepare them for embedding.
 * 
 * Usage: npm run process-doc
 */

import { processDocument, loadDocument } from "@/lib/utils/document-processor";
import fs from "fs";
import path from "path";

async function main() {
  console.log("🚀 Starting document processing...\n");

  const docPath = process.env.DOCUMENT_PATH || "./data/source-document.txt";
  
  // Check if document exists
  if (!fs.existsSync(docPath)) {
    console.error(`❌ Document not found: ${docPath}`);
    console.log("\n📝 Please:");
    console.log("   1. Place your document in data/source-document.txt (or .docx, .pdf, .md)");
    console.log("   2. Or set DOCUMENT_PATH environment variable");
    console.log("\n   Supported formats: .txt, .docx, .pdf, .md");
    process.exit(1);
  }

  try {
    // Process document into chunks
    console.log(`📄 Processing: ${docPath}`);
    const chunks = await processDocument(docPath);

    console.log(`✅ Processed ${chunks.length} chunks\n`);

    // Save chunks to JSON
    const outputDir = path.join(process.cwd(), "data", "chunks");
    fs.mkdirSync(outputDir, { recursive: true });
    
    const outputPath = path.join(outputDir, "chunks.json");
    fs.writeFileSync(outputPath, JSON.stringify(chunks, null, 2));
    console.log(`💾 Saved chunks to: ${outputPath}`);

    // Print statistics
    console.log("\n📊 Statistics:");
    console.log(`   Total chunks: ${chunks.length}`);
    console.log(`   Lead-relevant: ${chunks.filter(c => c.metadata.isLeadRelevant).length}`);
    console.log(`   Total tokens: ${chunks.reduce((sum, c) => sum + c.tokenCount, 0)}`);
    
    const categories = chunks.reduce((acc, c) => {
      acc[c.metadata.category] = (acc[c.metadata.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log("\n📁 Categories:");
    Object.entries(categories).forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count}`);
    });

    console.log("\n✨ Done! Next step: npm run generate-embeddings");
  } catch (error) {
    console.error("\n❌ Error processing document:", error);
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
