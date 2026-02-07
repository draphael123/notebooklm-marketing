# Fix Model Not Found Error

If you're getting `404 not_found_error` for Claude models, try these solutions:

## Solution 1: Use Model Name Without Date

The model name format might be different for your account. Try:

1. **In Vercel Environment Variables:**
   - **Key:** `CLAUDE_MODEL`
   - **Value:** `claude-3-5-sonnet` (without date)
   - **Environments:** All
   - **Save**

2. **Redeploy**

---

## Solution 2: Check Your Anthropic Account

The models available depend on your Anthropic account tier:

1. **Go to:** https://console.anthropic.com
2. **Check:**
   - Which models are available in your account?
   - Do you have API access enabled?
   - What's your account tier/plan?

3. **Use a model that's available in your account**

---

## Solution 3: Try Different Model Names

Add `CLAUDE_MODEL` to Vercel and try these (one at a time):

### Option A: Latest Sonnet (without date)
```
CLAUDE_MODEL=claude-3-5-sonnet
```

### Option B: Older Sonnet (with date)
```
CLAUDE_MODEL=claude-3-sonnet-20240229
```

### Option C: Haiku (fastest, cheapest)
```
CLAUDE_MODEL=claude-3-haiku-20240307
```

### Option D: Opus (if you have access)
```
CLAUDE_MODEL=claude-3-opus-20240229
```

---

## Solution 4: Verify API Key

1. **Check your API key:**
   - Go to https://console.anthropic.com
   - Verify the key is active
   - Check if it has the right permissions

2. **Test the key:**
   - Try making a test API call from Anthropic console
   - See which models work

---

## Most Likely Fix

**Try this first:**

1. Add to Vercel:
   - **Key:** `CLAUDE_MODEL`
   - **Value:** `claude-3-5-sonnet` (no date)
   - **Environments:** All

2. **Redeploy**

3. **Test**

If that doesn't work, try `claude-3-haiku-20240307` (Haiku is usually available in all accounts).

---

## Check Vercel Logs

If still not working:

1. Vercel → Deployments → Latest → Functions → `/api/ask` → Logs
2. Look for the exact error message
3. Check what model name is being used

The error message will now be more helpful and suggest valid model names! 🎯

