# Deployment Guide

## Quick Start Deployment

### 1. Vercel Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables (see below)
   - Deploy!

3. **Environment Variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.example`
   - Make sure to set:
     - `ANTHROPIC_API_KEY` or `OPENAI_API_KEY`
     - `SEARCH_MODE` (start with `simple` for easiest setup)
     - `NEXT_PUBLIC_SITE_URL` (your Vercel domain)

### 2. Document Processing

**Option A: Simple Mode (Recommended for MVP)**
- No vector database needed
- Just place your document in `data/source-document.txt`
- Set `SEARCH_MODE=simple` in environment variables
- Works immediately!

**Option B: RAG Mode (For Production)**
1. Process document locally:
   ```bash
   npm run process-doc
   ```

2. Generate embeddings:
   ```bash
   npm run generate-embeddings
   ```

3. Set environment variables:
   - `SEARCH_MODE=rag`
   - `VECTOR_DB=pinecone` or `supabase`
   - Add vector DB credentials

### 3. Database Setup (Optional - for Analytics)

If using Supabase for analytics:

1. Create Supabase project
2. Run SQL from `lib/utils/database-setup.sql`
3. Set `SUPABASE_DB_URL` and `SUPABASE_KEY` in environment variables

## Configuration Modes

### Simple Mode (Fastest Setup)
```env
SEARCH_MODE=simple
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=your_key
VECTOR_DB=none
```

**Pros:**
- No vector database needed
- Fastest to set up
- Works great for documents < 200K tokens
- Claude can see entire document

**Cons:**
- Limited by context window
- May be slower for very large documents

### RAG Mode (Best for Large Docs)
```env
SEARCH_MODE=rag
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=your_key
VECTOR_DB=pinecone
PINECONE_API_KEY=your_key
PINECONE_INDEX=fountain-qa
OPENAI_API_KEY=your_key  # For embeddings
```

**Pros:**
- Handles very large documents
- More precise retrieval
- Better for frequently updated docs
- Scales better

**Cons:**
- Requires vector database setup
- Requires embedding generation
- More complex configuration

### Hybrid Mode (Best of Both)
```env
SEARCH_MODE=hybrid
# ... same as RAG mode
```

**Pros:**
- Combines vector search + full context
- Most comprehensive results

**Cons:**
- Highest cost (more API calls)
- Slower response times

## Environment Variables Reference

### Required
- `ANTHROPIC_API_KEY` OR `OPENAI_API_KEY` - At least one AI provider

### Recommended
- `SEARCH_MODE` - `simple` (default), `rag`, or `hybrid`
- `AI_PROVIDER` - `anthropic` (default) or `openai`
- `NEXT_PUBLIC_SITE_URL` - Your deployment URL

### For RAG Mode
- `OPENAI_API_KEY` - Required for embeddings
- `VECTOR_DB` - `pinecone` or `supabase`
- `PINECONE_API_KEY` + `PINECONE_INDEX` (if using Pinecone)
- `SUPABASE_URL` + `SUPABASE_KEY` (if using Supabase)

### Optional
- `DOCUMENT_PATH` - Path to source document
- `ENABLE_CACHING` - Enable response caching (default: true)
- `RATE_LIMIT_ENABLED` - Enable rate limiting (default: true)
- `SUPABASE_DB_URL` - For analytics logging

## Post-Deployment Checklist

- [ ] Test a few sample questions
- [ ] Verify responses are accurate
- [ ] Check rate limiting is working
- [ ] Monitor API usage/costs
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure custom domain (optional)
- [ ] Set up analytics dashboard (optional)

## Monitoring

### Vercel Analytics
- Built-in analytics in Vercel dashboard
- Monitor API route performance
- Track error rates

### Custom Analytics
- Query logs stored in Supabase (if configured)
- Use `query_analytics` view for insights
- Track popular questions, response times, feedback

## Cost Optimization

1. **Use Simple Mode** for MVP (no embedding costs)
2. **Enable Caching** to reduce API calls
3. **Set Rate Limits** to prevent abuse
4. **Monitor Usage** in AI provider dashboards
5. **Use GPT-3.5** instead of GPT-4 if using OpenAI (cheaper)

## Troubleshooting

### "API_KEY is not set" Error
- Check environment variables in Vercel
- Ensure variable names match exactly
- Redeploy after adding variables

### Vector Search Not Working
- Verify `SEARCH_MODE=rag` is set
- Check vector database credentials
- Ensure embeddings were generated
- Check Pinecone/Supabase index exists

### Slow Response Times
- Enable caching
- Use Simple mode if document is small
- Check API rate limits
- Consider upgrading AI provider tier

### Document Not Found
- Verify `DOCUMENT_PATH` is correct
- Check file exists in repository
- For Vercel, files must be in repo (not .gitignored)

## Scaling Considerations

1. **High Traffic**: Enable caching, use CDN
2. **Large Documents**: Use RAG mode
3. **Multiple Documents**: Extend chunking logic
4. **Real-time Updates**: Set up webhook to re-process docs
5. **Cost Management**: Monitor usage, set budgets

