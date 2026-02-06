/**
 * Configuration for the Q&A system
 * Controls which approach to use and various settings
 */

export type SearchMode = "simple" | "rag" | "hybrid";

export interface AppConfig {
  // Search configuration
  searchMode: SearchMode;
  
  // AI Provider
  aiProvider: "anthropic" | "openai";
  
  // Vector Database
  vectorDb: "pinecone" | "supabase" | "none";
  
  // Document settings
  documentPath: string;
  maxContextTokens: number;
  
  // Chunking settings (for RAG)
  chunkSize: number;
  chunkOverlap: number;
  
  // Response settings
  maxResponseTokens: number;
  enableCaching: boolean;
  cacheTTL: number; // seconds
  
  // Rate limiting
  rateLimitEnabled: boolean;
  rateLimitMax: number; // requests per window
  rateLimitWindow: number; // seconds
}

export const defaultConfig: AppConfig = {
  searchMode: (process.env.SEARCH_MODE as SearchMode) || "simple",
  aiProvider: (process.env.AI_PROVIDER as "anthropic" | "openai") || "anthropic",
  vectorDb: (process.env.VECTOR_DB as "pinecone" | "supabase" | "none") || "none",
  documentPath: process.env.DOCUMENT_PATH || "./data/source-document.txt",
  maxContextTokens: parseInt(process.env.MAX_CONTEXT_TOKENS || "180000"), // Leave room for prompts
  chunkSize: parseInt(process.env.CHUNK_SIZE || "1000"),
  chunkOverlap: parseInt(process.env.CHUNK_OVERLAP || "200"),
  maxResponseTokens: parseInt(process.env.MAX_RESPONSE_TOKENS || "1024"),
  enableCaching: process.env.ENABLE_CACHING !== "false",
  cacheTTL: parseInt(process.env.CACHE_TTL || "3600"), // 1 hour
  rateLimitEnabled: process.env.RATE_LIMIT_ENABLED !== "false",
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || "100"),
  rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW || "3600"), // 1 hour
};

export const config = defaultConfig;

