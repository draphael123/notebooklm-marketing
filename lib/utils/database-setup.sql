-- Supabase Database Setup Script
-- Run this in your Supabase SQL editor to set up the required tables

-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Document chunks table
CREATE TABLE IF NOT EXISTS document_chunks (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  embedding vector(1536), -- Adjust dimension based on your embedding model
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for vector similarity search
CREATE INDEX IF NOT EXISTS document_chunks_embedding_idx 
ON document_chunks 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Query logs table for analytics
CREATE TABLE IF NOT EXISTS query_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  intent TEXT,
  sources_used TEXT[],
  response_time INTEGER,
  cta_clicked BOOLEAN DEFAULT FALSE,
  user_feedback TEXT,
  client_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on created_at for analytics queries
CREATE INDEX IF NOT EXISTS query_logs_created_at_idx 
ON query_logs (created_at);

-- Create index on intent for filtering
CREATE INDEX IF NOT EXISTS query_logs_intent_idx 
ON query_logs (intent);

-- Optional: Create a view for analytics
CREATE OR REPLACE VIEW query_analytics AS
SELECT 
  DATE_TRUNC('day', created_at) as date,
  intent,
  COUNT(*) as total_queries,
  AVG(response_time) as avg_response_time,
  COUNT(*) FILTER (WHERE cta_clicked = true) as cta_clicks,
  COUNT(*) FILTER (WHERE user_feedback = 'positive') as positive_feedback,
  COUNT(*) FILTER (WHERE user_feedback = 'negative') as negative_feedback
FROM query_logs
GROUP BY DATE_TRUNC('day', created_at), intent
ORDER BY date DESC, intent;


