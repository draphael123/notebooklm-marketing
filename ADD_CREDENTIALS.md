# How to Add Anthropic Key and Document

## Part 1: Adding Anthropic API Key to Vercel

### Method 1: Via Vercel Dashboard (Easiest)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com
   - Sign in with your GitHub account
   - Find your `notebooklm-marketing` project (or create it if not deployed yet)

2. **Navigate to Settings**
   - Click on your project
   - Go to **Settings** tab (top navigation)
   - Click **Environment Variables** in the left sidebar

3. **Add Environment Variables**
   Click "Add New" and add these one by one:

   **Required:**
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** `your_actual_anthropic_key_here`
   - **Environment:** Select all (Production, Preview, Development)
   - Click **Save**

   **Recommended for Simple Mode:**
   - **Key:** `SEARCH_MODE`
   - **Value:** `simple`
   - **Environment:** Select all
   - Click **Save**

   - **Key:** `AI_PROVIDER`
   - **Value:** `anthropic`
   - **Environment:** Select all
   - Click **Save**

   - **Key:** `NEXT_PUBLIC_SITE_URL`
   - **Value:** `https://your-app-name.vercel.app` (replace with your actual Vercel URL)
   - **Environment:** Select all
   - Click **Save**

4. **Redeploy (if already deployed)**
   - After adding variables, go to **Deployments** tab
   - Click the three dots (⋯) on the latest deployment
   - Click **Redeploy**
   - Or push a new commit to trigger automatic redeploy

### Method 2: Via Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Link to your project (if not already linked)
cd "C:\Users\danie\OneDrive\Desktop\Cursor Projects\NotebookLM - Marketing"
vercel link

# Add environment variables
vercel env add ANTHROPIC_API_KEY
# When prompted, paste your key and press Enter
# Select all environments (Production, Preview, Development)

vercel env add SEARCH_MODE
# Enter: simple

vercel env add AI_PROVIDER
# Enter: anthropic

vercel env add NEXT_PUBLIC_SITE_URL
# Enter your Vercel URL (e.g., https://notebooklm-marketing.vercel.app)

# Pull environment variables to verify
vercel env pull .env.local
```

---

## Part 2: Adding Your Document

### Option A: Add Document to GitHub Repository (Recommended)

1. **Place your document in the project**
   - Copy your Fountain Workflows document
   - Place it in the `data` folder
   - Name it `source-document.txt` (or `.docx`, `.pdf`, `.md`)

2. **Add to Git and Push**
   ```bash
   # Navigate to project directory
   cd "C:\Users\danie\OneDrive\Desktop\Cursor Projects\NotebookLM - Marketing"
   
   # Add the document
   git add data/source-document.txt
   
   # Commit
   git commit -m "Add source document"
   
   # Push to GitHub
   git push
   ```

3. **Vercel will auto-deploy**
   - Vercel watches your GitHub repo
   - It will automatically detect the new file
   - A new deployment will start automatically

### Option B: Upload via Vercel (Alternative)

If you don't want to commit the document to GitHub:

1. **Use Vercel's File System**
   - Note: Vercel's file system is read-only in production
   - Better to use environment variables or external storage

2. **Better Alternative: Use Environment Variable**
   - Convert document to base64 or use a URL
   - Store in environment variable (not recommended for large files)

### Option C: Use External Storage (For Large Documents)

1. **Upload to Cloud Storage**
   - Upload document to Google Drive, Dropbox, or S3
   - Get a public URL
   - Set `DOCUMENT_PATH` environment variable to the URL
   - Modify code to fetch from URL (requires code changes)

---

## Step-by-Step: Complete Setup

### 1. Get Your Anthropic API Key
- Go to https://console.anthropic.com
- Sign in or create account
- Navigate to **API Keys**
- Click **Create Key**
- Copy the key (you'll only see it once!)

### 2. Add Document to Project

**If your document is a .txt file:**
```bash
# Copy your document to the data folder
# Then:
cd "C:\Users\danie\OneDrive\Desktop\Cursor Projects\NotebookLM - Marketing"
git add data/source-document.txt
git commit -m "Add source document"
git push
```

**If your document is .docx, .pdf, or .md:**
- Same process, just use the correct extension
- The system supports: `.txt`, `.docx`, `.pdf`, `.md`

### 3. Add Environment Variables in Vercel

1. Go to https://vercel.com
2. Select your project
3. Settings → Environment Variables
4. Add:
   - `ANTHROPIC_API_KEY` = `sk-ant-...` (your actual key)
   - `SEARCH_MODE` = `simple`
   - `AI_PROVIDER` = `anthropic`
   - `NEXT_PUBLIC_SITE_URL` = `https://your-app.vercel.app`

### 4. Deploy/Redeploy

- If new project: Click "Deploy"
- If existing: Push a commit or click "Redeploy"

---

## Verify Everything Works

1. **Check Vercel Logs**
   - Go to Deployments → Latest deployment → Functions
   - Check for any errors

2. **Test the App**
   - Visit your Vercel URL
   - Try asking a question
   - Should get a response from Claude

3. **Check Environment Variables**
   - Settings → Environment Variables
   - Verify all variables are set correctly

---

## Troubleshooting

### "ANTHROPIC_API_KEY is not set" Error
- ✅ Check environment variables are added in Vercel
- ✅ Make sure you selected all environments (Production, Preview, Development)
- ✅ Redeploy after adding variables

### "Document not found" Error
- ✅ Check document is in `data/` folder
- ✅ Verify file name matches `source-document.*`
- ✅ Check file was committed and pushed to GitHub
- ✅ Verify file exists in GitHub repository

### Document Not Loading
- ✅ Check file format is supported (.txt, .docx, .pdf, .md)
- ✅ Verify file size isn't too large (Simple mode works best for < 200K tokens)
- ✅ Check Vercel build logs for processing errors

---

## Quick Reference

**Environment Variables Needed:**
```
ANTHROPIC_API_KEY=sk-ant-...
SEARCH_MODE=simple
AI_PROVIDER=anthropic
NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
```

**Document Location:**
```
data/source-document.txt
```

**Git Commands:**
```bash
git add data/source-document.txt
git commit -m "Add source document"
git push
```

---

Need help? Check the main README.md or VERCEL_DEPLOY.md for more details!

