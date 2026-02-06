# Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Required: Choose one AI provider
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   # OR
   OPENAI_API_KEY=your_openai_api_key_here

   # Required: Choose one vector database
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_INDEX=your_index_name
   PINECONE_ENVIRONMENT=your_environment
   
   # OR Supabase
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key

   # Optional: Analytics
   SUPABASE_DB_URL=your_database_url

   # App Config
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Getting API Keys

### Anthropic Claude API
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Navigate to API Keys
4. Create a new API key
5. Copy and paste into `.env.local`

### Pinecone (Vector Database)
1. Go to [app.pinecone.io](https://app.pinecone.io)
2. Sign up for a free account
3. Create a new index:
   - Name: `fountain-qa` (or your choice)
   - Dimensions: `1536` (for OpenAI embeddings) or `1024` (for Claude)
   - Metric: `cosine`
4. Copy API key and index name to `.env.local`

### Alternative: Supabase Vector
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Enable pgvector extension in SQL editor:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```
4. Copy project URL and anon key to `.env.local`

## Document Processing (Next Steps)

Once you have your source document:

1. **Place Document**
   - Put your Fountain Workflows document in `data/source-document.docx`

2. **Process Document** (when implemented)
   ```bash
   npm run process-doc
   ```

3. **Generate Embeddings** (when implemented)
   ```bash
   npm run generate-embeddings
   ```

## Testing

Test the system with sample questions:
```bash
npm run test-queries
```

## Troubleshooting

### "ANTHROPIC_API_KEY is not set"
- Make sure `.env.local` exists in the root directory
- Verify the API key is correct
- Restart the dev server after adding environment variables

### Vector Search Not Working
- The current implementation uses mock data
- You'll need to implement the actual vector search in `lib/vector/search.ts`
- Or use the simpler approach: put the entire document in Claude's context (200K tokens)

### Build Errors
- Run `npm install` again
- Delete `.next` folder and rebuild
- Check Node.js version (requires 18+)

## Current Status

✅ **Completed:**
- Project structure
- UI components
- API routes
- AI integration (Claude)
- Intent classification
- Basic query processing

⏳ **To Do:**
- Document processing pipeline
- Vector database integration
- Embedding generation
- Analytics/logging
- Response caching

## Next Steps

1. **For MVP (Simpler Approach):**
   - Skip vector database initially
   - Put entire lead-relevant document in Claude's context
   - Use Claude 3.5 Sonnet with 200K token context
   - Faster to implement and iterate

2. **For Production (Full RAG):**
   - Implement document chunking
   - Set up vector database
   - Generate embeddings
   - Implement similarity search
   - Add caching layer

## Support

If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure API keys have proper permissions
4. Review the README.md for more details

