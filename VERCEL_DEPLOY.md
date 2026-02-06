# Vercel Deployment Guide

## ✅ Code is now on GitHub!

Repository: https://github.com/draphael123/notebooklm-marketing.git

## Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit https://vercel.com
   - Sign in with your GitHub account

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Find and select `draphael123/notebooklm-marketing`
   - Click "Import"

3. **Configure Project**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
   - Install Command: `npm install` (auto-detected)

4. **Add Environment Variables**
   Click "Environment Variables" and add:

   **Required:**
   ```
   ANTHROPIC_API_KEY=your_anthropic_key_here
   ```

   **For Simple Mode (Recommended for first deploy):**
   ```
   SEARCH_MODE=simple
   AI_PROVIDER=anthropic
   NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
   ```

   **For RAG Mode (if you have vector DB set up):**
   ```
   SEARCH_MODE=rag
   AI_PROVIDER=anthropic
   OPENAI_API_KEY=your_openai_key_here
   VECTOR_DB=pinecone
   PINECONE_API_KEY=your_pinecone_key
   PINECONE_INDEX=fountain-qa
   NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
   ```

   **Optional:**
   ```
   ENABLE_CACHING=true
   RATE_LIMIT_ENABLED=true
   RATE_LIMIT_MAX=100
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Your app will be live at `https://your-app.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project? **No** (first time)
   - Project name: `notebooklm-marketing` (or your choice)
   - Directory: `./`
   - Override settings? **No**

4. **Add Environment Variables**
   ```bash
   vercel env add ANTHROPIC_API_KEY
   vercel env add SEARCH_MODE
   vercel env add NEXT_PUBLIC_SITE_URL
   # ... add all other variables
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Post-Deployment Checklist

- [ ] Test the landing page loads
- [ ] Test asking a question
- [ ] Verify API responses work
- [ ] Check Vercel logs for errors
- [ ] Set up custom domain (optional)
- [ ] Configure analytics (optional)

## Troubleshooting

### Build Fails
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify Node.js version (should be 18+)

### API Errors
- Check environment variables are set correctly
- Verify API keys are valid
- Check Vercel function logs

### Document Not Found
- For Simple Mode: Upload document to `data/source-document.txt` in your repo
- Or set `DOCUMENT_PATH` environment variable

## Next Steps After Deployment

1. **Add Your Document**
   - For Simple Mode: Add `data/source-document.txt` to your repo
   - Commit and push: `git add data/source-document.txt && git commit -m "Add source document" && git push`

2. **Test the System**
   - Visit your Vercel URL
   - Try asking questions
   - Check response quality

3. **Set Up RAG Mode (Optional)**
   - Process document locally: `npm run process-doc`
   - Generate embeddings: `npm run generate-embeddings`
   - Update environment variables in Vercel
   - Redeploy

## Monitoring

- **Vercel Dashboard**: View deployments, logs, analytics
- **Function Logs**: Check API route performance
- **Analytics**: Set up Vercel Analytics for usage tracking

## Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_SITE_URL` environment variable

---

**Your app is ready to deploy!** 🚀

Visit https://vercel.com/new to get started.

