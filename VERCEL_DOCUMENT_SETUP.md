# Adding Document to Vercel (Serverless)

Since Vercel runs in a serverless environment, you **cannot** read files from the filesystem at runtime. Here are the best ways to add your document:

## Option 1: Environment Variable (Recommended for Small Documents)

For documents under ~100KB, you can store the entire content in an environment variable.

### Steps:

1. **Convert your document to text:**
   - If it's a .txt file, just copy the content
   - If it's .docx/.pdf, convert to .txt first

2. **Add to Vercel:**
   - Go to Vercel → Your Project → Settings → Environment Variables
   - Click **Add New**
   - **Key:** `DOCUMENT_CONTENT`
   - **Value:** Paste your entire document text here
   - **Environments:** Select all
   - Click **Save**

3. **Redeploy:**
   - Go to Deployments → Redeploy

**Note:** Vercel has a limit on environment variable size. If your document is too large, use Option 2.

---

## Option 2: Store Document Online (Recommended for Large Documents)

Upload your document to a publicly accessible URL and reference it.

### Steps:

1. **Upload your document:**
   - Upload to Google Drive, Dropbox, GitHub Gist, or any public URL
   - Make sure it's publicly accessible (no authentication required)
   - Copy the direct download URL

2. **Add to Vercel:**
   - Go to Vercel → Your Project → Settings → Environment Variables
   - Click **Add New**
   - **Key:** `DOCUMENT_URL`
   - **Value:** `https://your-document-url.com/document.txt`
   - **Environments:** Select all
   - Click **Save**

3. **Redeploy:**
   - Go to Deployments → Redeploy

### Example URLs:
- **GitHub Gist:** `https://gist.githubusercontent.com/user/gist-id/raw/document.txt`
- **GitHub Raw:** `https://raw.githubusercontent.com/user/repo/branch/path/document.txt`
- **Google Drive:** Use a direct download link (requires making file public)

---

## Option 3: Use RAG Mode (For Very Large Documents)

If your document is very large, use RAG mode with a vector database:

1. **Process document locally:**
   ```bash
   npm run process-doc
   npm run generate-embeddings
   ```

2. **Set up vector database** (Pinecone or Supabase)

3. **Set environment variables:**
   - `SEARCH_MODE=rag`
   - `VECTOR_DB=pinecone` (or `supabase`)
   - Add vector DB credentials

4. **Deploy**

---

## Quick Setup (Recommended)

For the fastest setup with a small-to-medium document:

1. **Convert document to .txt** (if needed)
2. **Copy entire text content**
3. **In Vercel:**
   - Settings → Environment Variables
   - Add `DOCUMENT_CONTENT` = (paste your text)
4. **Redeploy**

That's it! ✅

---

## Troubleshooting

### "Document not found" Error
- ✅ Check `DOCUMENT_CONTENT` or `DOCUMENT_URL` is set in Vercel
- ✅ Verify environment variable is added to all environments
- ✅ Check URL is publicly accessible (if using `DOCUMENT_URL`)
- ✅ Redeploy after adding variables

### Document Too Large for Environment Variable
- ✅ Use `DOCUMENT_URL` instead
- ✅ Or use RAG mode with vector database

### Document Not Loading from URL
- ✅ Verify URL is publicly accessible
- ✅ Check URL returns plain text (not HTML)
- ✅ Try opening URL in browser to verify

---

## Current Setup

The system will try to load the document in this order:
1. `DOCUMENT_CONTENT` environment variable (if set)
2. `DOCUMENT_URL` environment variable (if set)
3. File system (only works locally, not in Vercel)

For Vercel deployment, you **must** use option 1 or 2!

