# Why You're Getting "Failed to process question" Error

I've improved the error messages to be more specific. After the next deployment, you'll see clearer error messages. Here are the most common causes:

## Most Common Causes

### 1. ❌ Missing Document
**Error:** "Document not found. Please add DOCUMENT_CONTENT or DOCUMENT_URL to Vercel environment variables."

**Fix:**
1. Go to Vercel → Settings → Environment Variables
2. Add either:
   - `DOCUMENT_CONTENT` = (paste your document text)
   - OR `DOCUMENT_URL` = (your Google Drive link)
3. Make sure it's added to all environments
4. Redeploy

---

### 2. ❌ Google Drive Document Not Public
**Error:** "Failed to load document from URL. Please check that your Google Drive document is set to 'Anyone with the link can view'."

**Fix:**
1. Open your Google Doc
2. Click "Share" button
3. Change to "Anyone with the link can view"
4. Make sure it's set to "Viewer" (not Editor)
5. Copy the share link again
6. Update `DOCUMENT_URL` in Vercel
7. Redeploy

---

### 3. ❌ Missing API Key
**Error:** "AI service configuration error. Please check your API keys in Vercel environment variables."

**Fix:**
1. Go to Vercel → Settings → Environment Variables
2. Check if `ANTHROPIC_API_KEY` is set
3. If missing, add it
4. Make sure it's added to all environments
5. Redeploy

---

### 4. ❌ Invalid API Key
**Error:** "AI service configuration error..."

**Fix:**
1. Verify your API key at https://console.anthropic.com
2. Make sure there are no extra spaces
3. Check the key hasn't been revoked
4. Try creating a new key if needed

---

### 5. ❌ Google Drive Link Format Issue
**Error:** "Received HTML instead of document text..."

**Fix:**
1. Make sure you're using a Google Doc (not a regular Drive file)
2. Use the share link format: `https://docs.google.com/document/d/FILE_ID/edit`
3. Make sure document is set to "Anyone with the link can view"
4. The system will automatically convert it to the export format

---

## How to Debug

### Step 1: Check Environment Variables
Visit: `https://your-app.vercel.app/api/check-env`

Look for:
- `ANTHROPIC_API_KEY: true` ✅
- `DOCUMENT_CONTENT: true` OR `DOCUMENT_URL: true` ✅

### Step 2: Check Vercel Logs
1. Go to Vercel Dashboard
2. Your Project → Deployments
3. Click latest deployment
4. Click **Functions** tab
5. Click on `/api/ask` function
6. View logs - you'll see the actual error

### Step 3: Test Your Google Drive Link
1. Open your Google Drive share link in a browser
2. Make sure it opens without asking for permission
3. If it asks for access, it's not public enough

---

## Quick Fix Checklist

- [ ] `ANTHROPIC_API_KEY` is set in Vercel
- [ ] `DOCUMENT_CONTENT` or `DOCUMENT_URL` is set in Vercel
- [ ] Both are added to all environments (Production, Preview, Development)
- [ ] Google Drive doc is set to "Anyone with the link can view"
- [ ] Redeployed after adding/updating variables
- [ ] API key is valid (check Anthropic console)

---

## After Next Deployment

The error messages will be more specific, telling you exactly what's wrong:
- ✅ "Document not found..." → Add document
- ✅ "Failed to load document from URL..." → Check Google Drive permissions
- ✅ "AI service configuration error..." → Check API key
- ✅ "Network error..." → Check URL accessibility

This will make debugging much easier! 🎯

