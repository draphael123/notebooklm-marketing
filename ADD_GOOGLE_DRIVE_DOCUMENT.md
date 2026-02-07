# Adding Google Drive Document

Yes! You can use a Google Drive link if your document is public. The system will automatically convert it to the correct format.

## Quick Steps

### Step 1: Make Your Document Public

1. **Open your Google Doc/Sheet**
2. **Click "Share" button** (top right)
3. **Change access:**
   - Click "Change" next to "Restricted"
   - Select **"Anyone with the link"**
   - Choose **"Viewer"** (read-only)
   - Click **"Done"**
4. **Copy the share link** (looks like: `https://docs.google.com/document/d/FILE_ID/edit`)

### Step 2: Add to Vercel

1. **Go to Vercel** → Your Project → **Settings** → **Environment Variables**
2. **Click "Add New"**
3. **Enter:**
   - **Key:** `DOCUMENT_URL`
   - **Value:** Paste your Google Drive link (the share link works!)
   - **Environments:** ✅ Production ✅ Preview ✅ Development
4. **Click "Save"**

### Step 3: Redeploy

- Go to **Deployments** tab
- Click **⋯** (three dots) → **Redeploy**

**Done!** ✅ The system will automatically convert your Google Drive link to the correct format.

---

## How It Works

The system automatically detects Google Drive links and converts them:

- **Google Docs** → Exports as plain text (`.txt`)
- **Google Sheets** → Exports as CSV
- **Regular Drive Files** → Direct download

You don't need to do anything special - just paste your share link!

---

## Supported Google Drive Formats

### ✅ Google Docs
- Share link: `https://docs.google.com/document/d/FILE_ID/edit`
- Automatically exports as plain text
- **Perfect for documents with tables/tabs!**

### ✅ Google Sheets
- Share link: `https://docs.google.com/spreadsheets/d/FILE_ID/edit`
- Automatically exports as CSV
- Great for tabular data

### ✅ Regular Files (PDF, DOCX, etc.)
- Share link: `https://drive.google.com/file/d/FILE_ID/view`
- Downloads directly
- Note: Binary files (PDF, DOCX) may need to be converted to text first

---

## Example

**Your Google Drive link:**
```
https://docs.google.com/document/d/1ABC123xyz/edit?usp=sharing
```

**Just paste it into Vercel:**
- Key: `DOCUMENT_URL`
- Value: `https://docs.google.com/document/d/1ABC123xyz/edit?usp=sharing`

The system handles the rest! 🎯

---

## Troubleshooting

### "Document not found" Error

**Check:**
- ✅ Document is set to "Anyone with the link can view"
- ✅ You copied the full share link (not a shortened URL)
- ✅ Document is not deleted or moved
- ✅ You redeployed after adding the variable

### Document Not Loading

**Try:**
1. Open the share link in a browser (make sure it works)
2. Verify it's set to "Anyone with the link"
3. Check Vercel logs for specific error messages
4. For binary files (PDF, DOCX), consider exporting as text first

### For Large Documents

If your document is very large:
- ✅ Google Drive links work great (no size limit in Vercel env vars)
- ✅ The system fetches it on-demand
- ✅ No need to copy-paste large text

---

## Benefits of Google Drive

- ✅ **No size limits** - Works for any document size
- ✅ **Easy updates** - Update the Google Doc, and it's automatically updated
- ✅ **No copying/pasting** - Just share the link
- ✅ **Preserves formatting** - Tables and tabs are preserved
- ✅ **Version control** - Google Docs keeps history

---

## Quick Checklist

- [ ] Document is set to "Anyone with the link can view"
- [ ] Copied the full Google Drive share link
- [ ] Added `DOCUMENT_URL` to Vercel environment variables
- [ ] Selected all environments (Production, Preview, Development)
- [ ] Redeployed after adding the variable
- [ ] Tested by asking a question in the chat

**That's it!** Your Google Drive document is now connected. 🚀

