# Quick Start Guide

Get up and running in 5 minutes!

## Option 1: Simple Mode (Fastest - Recommended for MVP)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Environment
Create `.env.local`:
```env
ANTHROPIC_API_KEY=your_key_here
SEARCH_MODE=simple
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Step 3: Add Your Document
Place your document in `data/source-document.txt` (or .docx, .pdf, .md)

### Step 4: Run!
```bash
npm run dev
```

Open http://localhost:3000 and start asking questions!

**That's it!** No vector database, no embeddings, no complex setup.

---

## Option 2: RAG Mode (For Production)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Environment
Create `.env.local`:
```env
ANTHROPIC_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
SEARCH_MODE=rag
VECTOR_DB=pinecone
PINECONE_API_KEY=your_key_here
PINECONE_INDEX=fountain-qa
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Step 3: Add Your Document
Place your document in `data/source-document.txt`

### Step 4: Process Document
```bash
npm run process-doc
```

### Step 5: Generate Embeddings
```bash
npm run generate-embeddings
```

### Step 6: Run!
```bash
npm run dev
```

---

## Getting API Keys

### Anthropic Claude
1. Go to https://console.anthropic.com
2. Sign up / Log in
3. Navigate to API Keys
4. Create new key

### OpenAI (for embeddings)
1. Go to https://platform.openai.com
2. Sign up / Log in
3. Navigate to API Keys
4. Create new key

### Pinecone (for RAG mode)
1. Go to https://app.pinecone.io
2. Sign up for free account
3. Create index:
   - Name: `fountain-qa`
   - Dimensions: `1536`
   - Metric: `cosine`
4. Copy API key

---

## Testing

Test your setup:
```bash
npm run test-queries
```

This will run sample questions and show you:
- Success rate
- Response times
- Any errors

---

## Troubleshooting

### "API_KEY is not set"
- Check `.env.local` exists
- Verify key names match exactly
- Restart dev server after adding keys

### "Document not found"
- Check file is in `data/` directory
- Verify file name matches `source-document.*`
- Supported: `.txt`, `.docx`, `.pdf`, `.md`

### Vector search not working
- Make sure `SEARCH_MODE=rag`
- Verify embeddings were generated
- Check vector DB credentials

---

## Next Steps

- Read `SETUP.md` for detailed configuration
- Read `DEPLOYMENT.md` for production deployment
- Read `IMPLEMENTATION_SUMMARY.md` for feature overview

---

## Need Help?

- Check the main `README.md`
- Review error messages in console
- Verify all environment variables are set
- Make sure Node.js version is 18+

