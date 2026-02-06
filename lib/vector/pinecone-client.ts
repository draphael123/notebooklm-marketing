/**
 * Pinecone Vector Database Client
 */

import { Pinecone } from "@pinecone-database/pinecone";
import { DocumentChunk } from "@/lib/utils/document-processor";

if (!process.env.PINECONE_API_KEY) {
  console.warn("PINECONE_API_KEY not set. Pinecone features will be disabled.");
}

let pineconeClient: Pinecone | null = null;

export function getPineconeClient(): Pinecone {
  if (!process.env.PINECONE_API_KEY) {
    throw new Error("PINECONE_API_KEY is not set");
  }

  if (!pineconeClient) {
    pineconeClient = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
      ...(process.env.PINECONE_ENVIRONMENT && {
        environment: process.env.PINECONE_ENVIRONMENT,
      }),
    } as any);
  }

  return pineconeClient;
}

export async function upsertChunks(
  chunks: DocumentChunk[],
  embeddings: number[][],
  indexName?: string
): Promise<void> {
  const client = getPineconeClient();
  const index = client.index(indexName || process.env.PINECONE_INDEX || "fountain-qa");

  const vectors = chunks.map((chunk, idx) => ({
    id: chunk.id,
    values: embeddings[idx],
    metadata: {
      content: chunk.content,
      category: chunk.metadata.category,
      program: chunk.metadata.program || "",
      topic: chunk.metadata.topic,
      isLeadRelevant: chunk.metadata.isLeadRelevant,
      chunkIndex: chunk.metadata.chunkIndex,
    },
  }));

  // Upsert in batches of 100
  for (let i = 0; i < vectors.length; i += 100) {
    const batch = vectors.slice(i, i + 100);
    await index.upsert(batch);
  }

  console.log(`Upserted ${vectors.length} vectors to Pinecone`);
}

export async function searchSimilar(
  queryEmbedding: number[],
  topK: number = 5,
  filter?: { category?: string; program?: string; isLeadRelevant?: boolean },
  indexName?: string
): Promise<Array<{ content: string; metadata: any; score: number }>> {
  const client = getPineconeClient();
  const index = client.index(indexName || process.env.PINECONE_INDEX || "fountain-qa");

  const queryRequest: any = {
    vector: queryEmbedding,
    topK,
    includeMetadata: true,
  };

  // Add filter if provided
  if (filter) {
    queryRequest.filter = {};
    if (filter.category) queryRequest.filter.category = { $eq: filter.category };
    if (filter.program) queryRequest.filter.program = { $eq: filter.program };
    if (filter.isLeadRelevant !== undefined) {
      queryRequest.filter.isLeadRelevant = { $eq: filter.isLeadRelevant };
    }
  }

  const results = await index.query(queryRequest);

  return results.matches.map((match: any) => ({
    content: match.metadata?.content || "",
    metadata: match.metadata || {},
    score: match.score || 0,
  }));
}

