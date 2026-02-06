# Quick Setup Guide

## 🚀 Add Anthropic Key to Vercel

### Step 1: Get Your API Key
1. Go to https://console.anthropic.com
2. Sign in → **API Keys** → **Create Key**
3. **Copy the key** (you'll only see it once!)

### Step 2: Add to Vercel
1. Go to https://vercel.com
2. Click your **notebooklm-marketing** project
3. Click **Settings** → **Environment Variables**
4. Click **Add New**
5. Enter:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-...` (paste your key)
   - **Environments:** ✅ Production ✅ Preview ✅ Development
6. Click **Save**
7. Repeat for:
   - `SEARCH_MODE` = `simple`
   - `AI_PROVIDER` = `anthropic`
   - `NEXT_PUBLIC_SITE_URL` = `https://your-app.vercel.app`

### Step 3: Redeploy
- Go to **Deployments** tab
- Click **⋯** (three dots) → **Redeploy**

---

## 📄 Add Your Document

### Option 1: Add to GitHub (Recommended)

1. **Place document in project:**
   ```
   Copy your document to:
   C:\Users\danie\OneDrive\Desktop\Cursor Projects\NotebookLM - Marketing\data\
   
   Name it: source-document.txt
   (or .docx, .pdf, .md)
   ```

2. **Commit and push:**
   ```bash
   cd "C:\Users\danie\OneDrive\Desktop\Cursor Projects\NotebookLM - Marketing"
   git add data/source-document.txt
   git commit -m "Add source document"
   git push
   ```

3. **Vercel auto-deploys!** ✅

### Option 2: Quick PowerShell Commands

```powershell
# Navigate to project
cd "C:\Users\danie\OneDrive\Desktop\Cursor Projects\NotebookLM - Marketing"

# Copy your document to data folder first, then:
git add data/source-document.txt
git commit -m "Add source document"
git push
```

---

## ✅ Verify Setup

1. **Check Vercel:**
   - Settings → Environment Variables
   - Should see: `ANTHROPIC_API_KEY`, `SEARCH_MODE`, etc.

2. **Check GitHub:**
   - Go to https://github.com/draphael123/notebooklm-marketing
   - Check `data/` folder has your document

3. **Test:**
   - Visit your Vercel URL
   - Ask a question
   - Should get a response!

---

## 🆘 Troubleshooting

**"API_KEY is not set"**
- ✅ Check variable name is exactly `ANTHROPIC_API_KEY`
- ✅ Check you selected all environments
- ✅ Redeploy after adding

**"Document not found"**
- ✅ Check file is in `data/` folder
- ✅ Check file name is `source-document.*`
- ✅ Verify it's committed to GitHub

---

**That's it!** Your app should be working now! 🎉

