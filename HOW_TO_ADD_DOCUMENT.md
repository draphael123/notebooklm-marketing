# How to Add Your Source Document

Since Vercel runs in a serverless environment, you **cannot** upload files directly. Here are the best ways to add your document:

## Option 1: Environment Variable (Easiest - Recommended)

**Best for:** Small to medium documents (under ~100KB)

### Steps:

1. **Convert your document to plain text**
   - If it's a `.txt` file, you're good!
   - If it's `.docx`, `.pdf`, or `.md`, convert it to `.txt` first
   - You can use online converters or copy-paste the content

2. **Copy the entire text content**
   - Open your document
   - Select all (Ctrl+A) and copy (Ctrl+C)

3. **Add to Vercel Environment Variables**
   - Go to https://vercel.com
   - Select your **notebooklm-marketing** project
   - Go to **Settings** → **Environment Variables**
   - Click **Add New**
   - **Key:** `DOCUMENT_CONTENT`
   - **Value:** Paste your entire document text here
   - **Environments:** ✅ Production ✅ Preview ✅ Development
   - Click **Save**

4. **Redeploy**
   - Go to **Deployments** tab
   - Click **⋯** (three dots) on latest deployment
   - Click **Redeploy**

**Done!** Your document is now available to the Q&A system.

---

## Option 2: Public URL (For Large Documents)

**Best for:** Large documents or when you don't want to store in Vercel

### Steps:

1. **Upload your document to a public URL**
   - **Option A: GitHub Gist**
     - Go to https://gist.github.com
     - Create a new gist
     - Paste your document content
     - Click "Create public gist"
     - Click "Raw" to get the direct URL
     - Copy the URL (looks like: `https://gist.githubusercontent.com/.../raw/...`)
   
   - **Option B: GitHub Repository**
     - Create a file in your repo (or use the existing one)
     - Go to the file on GitHub
     - Click "Raw" button
     - Copy the URL
   
   - **Option C: Google Drive**
     - Upload document to Google Drive
     - Right-click → Share → Make it public
     - Get the direct download link
   
   - **Option D: Any public file hosting**
     - Dropbox, Pastebin, etc. (must be publicly accessible)

2. **Add to Vercel**
   - Go to Vercel → Your Project → Settings → Environment Variables
   - Click **Add New**
   - **Key:** `DOCUMENT_URL`
   - **Value:** Your public URL (e.g., `https://gist.githubusercontent.com/...`)
   - **Environments:** ✅ All
   - Click **Save**

3. **Redeploy**
   - Deployments → Redeploy

---

## Option 3: Add to GitHub Repository (Alternative)

**Note:** This works, but the file must be committed to your repo.

### Steps:

1. **Place document in project**
   ```
   Copy your document to:
   C:\Users\danie\OneDrive\Desktop\Cursor Projects\NotebookLM - Marketing\data\
   
   Name it: source-document.txt
   ```

2. **Commit and push**
   ```bash
   cd "C:\Users\danie\OneDrive\Desktop\Cursor Projects\NotebookLM - Marketing"
   git add data/source-document.txt
   git commit -m "Add source document"
   git push
   ```

3. **Vercel will auto-deploy**
   - Vercel watches your GitHub repo
   - It will automatically detect the new file
   - A new deployment will start

**Note:** This method works, but the system will try `DOCUMENT_CONTENT` and `DOCUMENT_URL` first before falling back to the file system.

---

## Quick Start (Recommended)

**For fastest setup:**

1. Open your document
2. Copy all text (Ctrl+A, Ctrl+C)
3. In Vercel:
   - Settings → Environment Variables
   - Add `DOCUMENT_CONTENT` = (paste your text)
4. Redeploy

**That's it!** ✅

---

## Verify It's Working

1. Visit your Vercel URL
2. Go to `/chat`
3. Ask a question like: "What are the main points in this document?"
4. You should get an answer based on your document!

---

## Troubleshooting

### "Document not found" Error
- ✅ Check `DOCUMENT_CONTENT` or `DOCUMENT_URL` is set in Vercel
- ✅ Verify you selected all environments (Production, Preview, Development)
- ✅ Redeploy after adding variables
- ✅ Check the URL is publicly accessible (if using `DOCUMENT_URL`)

### Document Too Large
- ✅ Vercel has limits on environment variable size
- ✅ Use `DOCUMENT_URL` instead for large documents
- ✅ Or use RAG mode with vector database for very large docs

### Document Not Loading from URL
- ✅ Verify URL is publicly accessible (try opening in browser)
- ✅ Check URL returns plain text (not HTML)
- ✅ Make sure there's no authentication required

---

## Current Priority Order

The system tries to load your document in this order:
1. `DOCUMENT_CONTENT` environment variable (if set)
2. `DOCUMENT_URL` environment variable (if set)
3. File system: `data/source-document.txt` (only works locally, not in Vercel serverless)

**For Vercel, you MUST use option 1 or 2!**

---

## Example: Using GitHub Gist

1. Go to https://gist.github.com
2. Paste your document content
3. Click "Create public gist"
4. Click "Raw" button
5. Copy the URL
6. In Vercel: Add `DOCUMENT_URL` = (that URL)
7. Redeploy

This is great for large documents!

