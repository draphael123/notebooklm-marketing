# Quick Guide: Add Your Source Document

## ⚡ Fastest Method (Recommended)

### Step 1: Prepare Your Document
1. **Open your document** (Word, PDF, text file, etc.)
2. **Copy all the text**:
   - Select All (Ctrl+A)
   - Copy (Ctrl+C)
   - Or save as `.txt` and copy the contents

### Step 2: Add to Vercel
1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com
   - Sign in
   - Select your **notebooklm-marketing** project

2. **Add Environment Variable**
   - Click **Settings** tab
   - Click **Environment Variables** (left sidebar)
   - Click **Add New** button

3. **Enter the Details**
   - **Key:** `DOCUMENT_CONTENT`
   - **Value:** Paste your entire document text here
   - **Environments:** 
     - ✅ Production
     - ✅ Preview
     - ✅ Development
   - Click **Save**

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Click **⋯** (three dots) on latest deployment
3. Click **Redeploy**
4. Wait ~1-2 minutes

**Done!** ✅ Your document is now available to the Q&A system.

---

## 📋 Alternative: Use a Public URL

If your document is too large for an environment variable:

### Step 1: Upload Document Online
**Option A: GitHub Gist (Easiest)**
1. Go to https://gist.github.com
2. Paste your document content
3. Click **Create public gist**
4. Click **Raw** button
5. Copy the URL (looks like: `https://gist.githubusercontent.com/.../raw/...`)

**Option B: GitHub Repository**
1. Create a file in your repo
2. Go to the file on GitHub
3. Click **Raw** button
4. Copy the URL

### Step 2: Add to Vercel
1. Vercel → Settings → Environment Variables
2. Click **Add New**
3. **Key:** `DOCUMENT_URL`
4. **Value:** Your public URL
5. **Environments:** All
6. Click **Save**

### Step 3: Redeploy
- Deployments → Redeploy

---

## ✅ Verify It Works

1. Visit: https://notebooklm-marketing.vercel.app/chat
2. Ask: "What are the main points in this document?"
3. You should get an answer! 🎉

---

## 🐛 Troubleshooting

### "Document not found" Error
- ✅ Check `DOCUMENT_CONTENT` or `DOCUMENT_URL` is set
- ✅ Verify you selected all environments
- ✅ Make sure you redeployed after adding
- ✅ Check URL is publicly accessible (if using `DOCUMENT_URL`)

### Document Too Large
- ✅ Vercel has limits on environment variable size (~4KB-64KB depending on plan)
- ✅ Use `DOCUMENT_URL` instead for large documents
- ✅ Or use GitHub Gist (supports large files)

### Document Not Loading
- ✅ Check the variable name is exactly `DOCUMENT_CONTENT` or `DOCUMENT_URL`
- ✅ Verify no extra spaces in the value
- ✅ Try the checker: `/api/check-env` to see what's set

---

## 📝 Quick Checklist

- [ ] Document text copied
- [ ] Added `DOCUMENT_CONTENT` to Vercel (or `DOCUMENT_URL`)
- [ ] Selected all environments
- [ ] Redeployed
- [ ] Tested with a question

---

## 💡 Pro Tips

1. **For large documents**: Use `DOCUMENT_URL` with GitHub Gist
2. **For small documents**: Use `DOCUMENT_CONTENT` (easiest)
3. **Keep it updated**: When document changes, update the variable and redeploy
4. **Check status**: Visit `/api/check-env` to verify it's loaded

---

**That's it!** Your document will be available to answer questions. 🚀

