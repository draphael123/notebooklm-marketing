# How to Check Your Environment Variables

## Quick Check via API

I've created an endpoint that checks your environment variables. Here's how to use it:

### Step 1: Visit the Check Endpoint

After deploying, visit:
```
https://notebooklm-marketing.vercel.app/api/check-env
```

This will show you:
- ✅ Which variables are set
- ⚠️ What's missing
- 📋 Current configuration

### Step 2: Check in Vercel Dashboard

1. Go to https://vercel.com
2. Select your **notebooklm-marketing** project
3. Go to **Settings** → **Environment Variables**
4. You should see all your variables listed

## Required Variables Checklist

### ✅ Required (Minimum Setup)
- [ ] `ANTHROPIC_API_KEY` - Your Anthropic API key
- [ ] `DOCUMENT_CONTENT` OR `DOCUMENT_URL` - Your document content or URL

### ✅ Recommended
- [ ] `SEARCH_MODE` = `simple`
- [ ] `AI_PROVIDER` = `anthropic`
- [ ] `NEXT_PUBLIC_SITE_URL` = `https://notebooklm-marketing.vercel.app`

### Optional (For RAG Mode)
- [ ] `OPENAI_API_KEY` - For embeddings (if using RAG)
- [ ] `VECTOR_DB` = `pinecone` or `supabase`
- [ ] `PINECONE_API_KEY` - If using Pinecone
- [ ] `PINECONE_INDEX` - If using Pinecone
- [ ] `SUPABASE_URL` - If using Supabase
- [ ] `SUPABASE_KEY` - If using Supabase

## How to Verify Each Variable

### 1. Check via API Endpoint
Visit: `https://notebooklm-marketing.vercel.app/api/check-env`

### 2. Check in Vercel Dashboard
- Settings → Environment Variables
- Look for each variable name
- Verify it's added to all environments (Production, Preview, Development)

### 3. Test the App
- Visit `/chat`
- Ask a question
- If it works, your variables are set correctly!

## Common Issues

### Variable Not Showing Up
- ✅ Make sure you selected all environments when adding
- ✅ Redeploy after adding variables
- ✅ Check for typos in variable names (case-sensitive!)

### API Key Not Working
- ✅ Verify key starts with `sk-ant-` (for Anthropic)
- ✅ Check no extra spaces in the key
- ✅ Verify key is active in Anthropic console

### Document Not Loading
- ✅ Check `DOCUMENT_CONTENT` or `DOCUMENT_URL` is set
- ✅ If using URL, verify it's publicly accessible
- ✅ Redeploy after adding document

## Quick Test

Run this in your browser console on your Vercel site:
```javascript
fetch('/api/check-env')
  .then(r => r.json())
  .then(console.log)
```

This will show you the current status!

