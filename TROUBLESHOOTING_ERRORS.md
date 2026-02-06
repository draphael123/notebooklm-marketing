# Troubleshooting "Failed to get response" Error

## Common Causes

### 1. ❌ Missing API Key
**Error:** "Failed to get response" or "AI service configuration error"

**Fix:**
1. Go to Vercel → Settings → Environment Variables
2. Check if `ANTHROPIC_API_KEY` is set
3. Verify it's added to all environments
4. Make sure the key is correct (starts with `sk-ant-`)
5. Redeploy after adding/updating

**Check:**
- Visit `/api/check-env` to see if API key is set

---

### 2. ❌ Missing Document
**Error:** "Failed to get response" or "Document not found"

**Fix:**
1. Go to Vercel → Settings → Environment Variables
2. Add either:
   - `DOCUMENT_CONTENT` = (paste your document text)
   - OR `DOCUMENT_URL` = (public URL to your document)
3. Make sure it's added to all environments
4. Redeploy

**Check:**
- Visit `/api/check-env` to see if document is set

---

### 3. ❌ Invalid API Key
**Error:** "Failed to get response" or API errors

**Fix:**
1. Verify key in Anthropic console: https://console.anthropic.com
2. Check key hasn't been revoked
3. Make sure there are no extra spaces
4. Try creating a new key if needed

---

### 4. ❌ Document URL Not Accessible
**Error:** "Failed to get response" (if using DOCUMENT_URL)

**Fix:**
1. Make sure URL is publicly accessible (try opening in browser)
2. Verify URL returns plain text (not HTML)
3. Check URL doesn't require authentication
4. Try using `DOCUMENT_CONTENT` instead

---

### 5. ❌ Network/Timeout Issues
**Error:** "Failed to get response" (timeout)

**Fix:**
1. Check your internet connection
2. Try again (might be temporary)
3. Check Vercel logs for timeout errors

---

## How to Debug

### Step 1: Check Environment Variables
Visit: `https://notebooklm-marketing.vercel.app/api/check-env`

Look for:
- `ANTHROPIC_API_KEY: true` ✅
- `DOCUMENT_CONTENT: true` OR `DOCUMENT_URL: true` ✅

If either is `false`, that's your problem!

### Step 2: Check Vercel Logs
1. Go to Vercel Dashboard
2. Your Project → Deployments
3. Click on latest deployment
4. Click **Functions** tab
5. Click on `/api/ask` function
6. View logs to see actual error

### Step 3: Test API Directly
Open browser console and run:
```javascript
fetch('/api/ask', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ question: 'test' })
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

This will show you the actual error message.

---

## Quick Fix Checklist

- [ ] `ANTHROPIC_API_KEY` is set in Vercel
- [ ] `DOCUMENT_CONTENT` or `DOCUMENT_URL` is set in Vercel
- [ ] Both are added to all environments (Production, Preview, Development)
- [ ] Redeployed after adding variables
- [ ] API key is valid (check Anthropic console)
- [ ] Document URL is publicly accessible (if using URL)

---

## Most Common Issue

**90% of the time, it's one of these:**
1. Missing `ANTHROPIC_API_KEY` → Add it to Vercel
2. Missing `DOCUMENT_CONTENT` → Add it to Vercel
3. Forgot to redeploy → Redeploy after adding variables

---

## Still Not Working?

1. **Check Vercel Logs** (most important!)
   - Deployments → Latest → Functions → View logs
   - Look for error messages

2. **Verify Environment Variables**
   - Visit `/api/check-env`
   - Make sure everything shows `true`

3. **Test with Simple Question**
   - Try: "What is this document about?"
   - If it works, the issue might be with specific questions

4. **Check API Key Status**
   - Go to https://console.anthropic.com
   - Verify key is active and has credits

---

## Error Messages You Might See

- **"AI service configuration error"** → Missing or invalid API key
- **"Document not found"** → Missing DOCUMENT_CONTENT or DOCUMENT_URL
- **"Rate limit exceeded"** → Too many requests (wait a bit)
- **"Failed to process question"** → Generic error (check logs)

---

**The most likely fix:** Add missing environment variables and redeploy! 🚀

