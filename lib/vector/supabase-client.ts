/**
 * Supabase Vector Database Client (pgvector)
 */

import { createClient } from "@supabase/supabase-js";
import { DocumentChunk } from "@/lib/utils/document-processor";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.warn("Supabase credentials not set. Supabase features will be disabled.");
}

let supabaseClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    throw new Error("Supabase credentials not set");
  }

  if (!supabaseClient) {
    supabaseClient = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );
  }

  return supabaseClient;
}

export async function upsertChunks(
  chunks: DocumentChunk[],
  embeddings: number[][],
  tableName: string = "document_chunks"
): Promise<void> {
  const supabase = getSupabaseClient();

  const records = chunks.map((chunk, idx) => ({
    id: chunk.id,
    content: chunk.content,
    embedding: embeddings[idx],
    metadata: {
      category: chunk.metadata.category,
      program: chunk.metadata.program || null,
      topic: chunk.metadata.topic,
      isLeadRelevant: chunk.metadata.isLeadRelevant,
      chunkIndex: chunk.metadata.chunkIndex,
    },
  }));

  // Upsert in batches
  for (let i = 0; i < records.length; i += 100) {
    const batch = records.slice(i, i + 100);
    const { error } = await supabase.from(tableName).upsert(batch, {
      onConflict: "id",
    });

    if (error) {
      console.error("Error upserting to Supabase:", error);
      throw error;
    }
  }

  console.log(`Upserted ${records.length} vectors to Supabase`);
}

export async function searchSimilar(
  queryEmbedding: number[],
  topK: number = 5,
  filter?: { category?: string; program?: string; isLeadRelevant?: boolean },
  tableName: string = "document_chunks"
): Promise<Array<{ content: string; metadata: any; score: number }>> {
  const supabase = getSupabaseClient();

  // Build filter query
  let query = supabase
    .from(tableName)
    .select("content, metadata, embedding")
    .limit(topK);

  if (filter) {
    if (filter.category) {
      query = query.eq("metadata->>category", filter.category);
    }
    if (filter.program) {
      query = query.eq("metadata->>program", filter.program);
    }
    if (filter.isLeadRelevant !== undefined) {
      query = query.eq("metadata->>isLeadRelevant", filter.isLeadRelevant);
    }
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error searching Supabase:", error);
    throw error;
  }

  if (!data) return [];

  // Calculate cosine similarity
  const results = data
    .map((row: any) => {
      const similarity = cosineSimilarity(queryEmbedding, row.embedding);
      return {
        content: row.content,
        metadata: row.metadata,
        score: similarity,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return results;
}

function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

