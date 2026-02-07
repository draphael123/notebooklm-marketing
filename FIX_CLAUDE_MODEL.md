# Fix Claude Model Error

The error `404 {"type":"not_found_error","message":"model: claude-3-5-sonnet-20240620"}` means the model name isn't recognized.

## Solution: Use Environment Variable

I've made the model name configurable. You can now set it in Vercel:

### Step 1: Add Model Name to Vercel

1. Go to Vercel → Settings → Environment Variables
2. Click **Add New**
3. Enter:
   - **Key:** `CLAUDE_MODEL`
   - **Value:** Try one of these:
     - `claude-3-5-sonnet-20240620` (if available)
     - `claude-3-sonnet-20240229` (older, but stable)
     - `claude-3-opus-20240229` (if you have access)
     - `claude-3-haiku-20240307` (fastest, cheapest)
   - **Environments:** All
4. Click **Save**

### Step 2: Redeploy

- Go to **Deployments** → **Redeploy**

---

## Try These Model Names (in order)

1. **`claude-3-5-sonnet-20240620`** - Latest Sonnet (if available)
2. **`claude-3-sonnet-20240229`** - Stable Sonnet version
3. **`claude-3-opus-20240229`** - Most capable (if you have access)
4. **`claude-3-haiku-20240307`** - Fastest/cheapest

---

## Check Your Anthropic Account

The model might not be available in your account tier. Check:

1. Go to https://console.anthropic.com
2. Check your account/plan
3. See which models are available
4. Use a model that's available in your account

---

## Quick Fix

**Try this first:**
1. Add `CLAUDE_MODEL=claude-3-sonnet-20240229` to Vercel
2. Redeploy
3. Test again

This is a stable model that should work for most accounts.

---

## If Still Not Working

1. **Check Anthropic Console:**
   - Which models are available in your account?
   - Do you have API access enabled?

2. **Check API Key:**
   - Is your API key valid?
   - Does it have the right permissions?

3. **Check Vercel Logs:**
   - Deployments → Latest → Functions → `/api/ask` → Logs
   - Look for the exact error message

---

## Most Likely Fix

Add this to Vercel environment variables:
- **Key:** `CLAUDE_MODEL`
- **Value:** `claude-3-sonnet-20240229`
- **Environments:** All

Then redeploy. This should work! 🎯

