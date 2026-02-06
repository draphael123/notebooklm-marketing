# How to Add Your Anthropic API Key to Vercel

## Step-by-Step Guide

### Step 1: Get Your API Key

1. Go to https://console.anthropic.com
2. Sign in (or create an account if you don't have one)
3. Navigate to **API Keys** in the left sidebar
4. Click **Create Key**
5. Give it a name (e.g., "NotebookLM Marketing")
6. **Copy the key immediately** - you'll only see it once!
   - It will look like: `sk-ant-api03-...`

### Step 2: Add to Vercel

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com
   - Sign in with your GitHub account

2. **Select Your Project**
   - Find and click on **notebooklm-marketing** project

3. **Navigate to Settings**
   - Click the **Settings** tab (top navigation bar)
   - Click **Environment Variables** in the left sidebar

4. **Add the API Key**
   - Click **Add New** button
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** Paste your API key (the one you copied from Anthropic)
   - **Environments:** 
     - ✅ Production
     - ✅ Preview  
     - ✅ Development
   - Click **Save**

### Step 3: Add Other Required Variables

While you're there, also add these:

**Required:**
- **Key:** `SEARCH_MODE`
- **Value:** `simple`
- **Environments:** All

- **Key:** `AI_PROVIDER`
- **Value:** `anthropic`
- **Environments:** All

- **Key:** `NEXT_PUBLIC_SITE_URL`
- **Value:** `https://notebooklm-marketing.vercel.app` (or your custom domain)
- **Environments:** All

### Step 4: Redeploy

1. Go to **Deployments** tab
2. Find the latest deployment
3. Click **⋯** (three dots) on the right
4. Click **Redeploy**
5. Wait for deployment to complete (~1-2 minutes)

**Done!** Your API key is now active.

---

## Quick Checklist

- [ ] Got API key from https://console.anthropic.com
- [ ] Added `ANTHROPIC_API_KEY` to Vercel
- [ ] Added `SEARCH_MODE=simple` to Vercel
- [ ] Added `AI_PROVIDER=anthropic` to Vercel
- [ ] Added `NEXT_PUBLIC_SITE_URL` to Vercel
- [ ] Selected all environments (Production, Preview, Development)
- [ ] Redeployed the application

---

## Verify It's Working

1. Visit your Vercel URL: https://notebooklm-marketing.vercel.app
2. Go to `/chat`
3. Ask a question
4. If you get an answer, it's working! ✅
5. If you get an error, check:
   - API key is correct (no extra spaces)
   - All environments are selected
   - You redeployed after adding

---

## Troubleshooting

### "ANTHROPIC_API_KEY is not set" Error
- ✅ Check the variable name is exactly `ANTHROPIC_API_KEY` (case-sensitive)
- ✅ Verify you selected all environments
- ✅ Make sure you redeployed after adding
- ✅ Check for extra spaces in the key

### "Invalid API Key" Error
- ✅ Verify the key starts with `sk-ant-`
- ✅ Make sure you copied the entire key
- ✅ Check there are no extra spaces or line breaks
- ✅ Try creating a new key if needed

### API Key Not Working
- ✅ Check your Anthropic account has credits/quota
- ✅ Verify the key hasn't been revoked
- ✅ Check Vercel logs for specific error messages

---

## Security Notes

- ✅ Never commit API keys to GitHub
- ✅ API keys in Vercel are encrypted
- ✅ Only add keys to environments you need
- ✅ Rotate keys periodically for security

---

## Alternative: Using Vercel CLI

If you prefer command line:

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login
vercel login

# Link to project (if not already linked)
cd "C:\Users\danie\OneDrive\Desktop\Cursor Projects\NotebookLM - Marketing"
vercel link

# Add environment variable
vercel env add ANTHROPIC_API_KEY
# When prompted, paste your key and press Enter
# Select all environments

# Add other variables
vercel env add SEARCH_MODE
# Enter: simple

vercel env add AI_PROVIDER
# Enter: anthropic

vercel env add NEXT_PUBLIC_SITE_URL
# Enter: https://notebooklm-marketing.vercel.app

# Deploy
vercel --prod
```

---

## Need Help?

- Check Vercel logs: Deployments → Latest → Functions → View logs
- Check Anthropic console: https://console.anthropic.com → Usage
- Verify key is active in Anthropic dashboard

