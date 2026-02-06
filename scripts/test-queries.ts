/**
 * Test Queries Script
 * 
 * Tests the Q&A system with a set of sample questions
 * to validate response quality.
 * 
 * Usage: npm run test-queries
 */

import { processQuery } from "@/lib/processing/query-processor";
import testQuestions from "../data/test-questions.json";

interface TestQuestion {
  category: string;
  question: string;
  expectedElements?: string[];
}

async function runTestQueries() {
  console.log("🧪 Running test queries...\n");

  // Check for API key
  if (!process.env.ANTHROPIC_API_KEY && !process.env.OPENAI_API_KEY) {
    console.error("❌ No AI API key found. Please set ANTHROPIC_API_KEY or OPENAI_API_KEY");
    process.exit(1);
  }

  // Flatten test questions
  const allQuestions: TestQuestion[] = [];
  Object.entries(testQuestions.categories).forEach(([category, questions]) => {
    questions.forEach((q: string) => {
      allQuestions.push({ category, question: q });
    });
  });

  const results: Array<{
    question: string;
    category: string;
    success: boolean;
    responseTime: number;
    error?: string;
  }> = [];

  for (let i = 0; i < allQuestions.length; i++) {
    const test = allQuestions[i];
    console.log(`[${i + 1}/${allQuestions.length}] [${test.category}] ${test.question}`);

    const startTime = Date.now();
    try {
      const response = await processQuery(test.question);
      const responseTime = Date.now() - startTime;

      console.log(`   ✅ Response (${responseTime}ms):`);
      console.log(`   ${response.answer.slice(0, 150)}...`);
      console.log(`   Intent: ${response.intent}`);
      console.log(`   Sources: ${response.sources.length}`);
      console.log("");

      results.push({
        question: test.question,
        category: test.category,
        success: true,
        responseTime,
      });

      // Small delay between requests
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      const responseTime = Date.now() - startTime;
      const errorMsg = error instanceof Error ? error.message : "Unknown error";

      console.log(`   ❌ Error (${responseTime}ms): ${errorMsg}\n`);

      results.push({
        question: test.question,
        category: test.category,
        success: false,
        responseTime,
        error: errorMsg,
      });
    }
  }

  // Print summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 Test Summary");
  console.log("=".repeat(60));
  
  const successful = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;
  const avgTime = results.reduce((sum, r) => sum + r.responseTime, 0) / results.length;

  console.log(`✅ Successful: ${successful}/${results.length}`);
  console.log(`❌ Failed: ${failed}/${results.length}`);
  console.log(`⏱️  Average response time: ${Math.round(avgTime)}ms`);

  // Group by category
  const byCategory = results.reduce((acc, r) => {
    if (!acc[r.category]) acc[r.category] = { success: 0, total: 0 };
    acc[r.category].total++;
    if (r.success) acc[r.category].success++;
    return acc;
  }, {} as Record<string, { success: number; total: number }>);

  console.log("\n📁 By Category:");
  Object.entries(byCategory).forEach(([cat, stats]) => {
    const percentage = Math.round((stats.success / stats.total) * 100);
    console.log(`   ${cat}: ${stats.success}/${stats.total} (${percentage}%)`);
  });

  if (failed > 0) {
    console.log("\n❌ Failed Questions:");
    results
      .filter((r) => !r.success)
      .forEach((r) => {
        console.log(`   - [${r.category}] ${r.question}`);
        console.log(`     Error: ${r.error}`);
      });
  }

  console.log("\n✨ Done!");
}

// Run if called directly
if (require.main === module) {
  runTestQueries().catch(console.error);
}
