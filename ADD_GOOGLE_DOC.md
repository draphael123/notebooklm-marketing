# How to Add a Google Doc

Here are several ways to add your Google Doc to the project:

## ⚡ Method 1: Copy from Google Docs (Easiest)

### Step 1: Open and Copy
1. **Open your Google Doc**
2. Press **Ctrl+A** (Select All) - or **Cmd+A** on Mac
3. Press **Ctrl+C** (Copy) - or **Cmd+C** on Mac
4. All your document text is now copied!

### Step 2: Add to Vercel
1. Go to https://vercel.com
2. Select your **notebooklm-marketing** project
3. **Settings** → **Environment Variables**
4. Click **Add New**
5. **Key:** `DOCUMENT_CONTENT`
6. **Value:** Press **Ctrl+V** to paste your text
7. **Environments:** Select all (Production, Preview, Development)
8. Click **Save**

### Step 3: Redeploy
- **Deployments** tab → **⋯** → **Redeploy**

**Done!** ✅

---

## 🔗 Method 2: Use Google Doc as Public URL (Best for Large Docs)

This method keeps your document in Google Docs and updates automatically!

### Step 1: Make Google Doc Publicly Accessible
1. **Open your Google Doc**
2. Click **Share** button (top right)
3. Click **Change to anyone with the link**
4. Select **Viewer** (so people can only view, not edit)
5. Click **Copy link**
6. **Important:** The link will look like:
   ```
   https://docs.google.com/document/d/DOC_ID/edit?usp=sharing
   ```

### Step 2: Convert to Export URL
Google Docs doesn't allow direct text access, so we need to use the export format:

**Change the URL from:**
```
https://docs.google.com/document/d/DOC_ID/edit?usp=sharing
```

**To:**
```
https://docs.google.com/document/d/DOC_ID/export?format=txt
```

**Or for plain text:**
```
https://docs.google.com/document/d/DOC_ID/export?format=txt&id=DOC_ID
```

**How to find DOC_ID:**
- It's the long string between `/d/` and `/edit` in your share link
- Example: `https://docs.google.com/document/d/1a2b3c4d5e6f7g8h9i0j/edit`
- DOC_ID = `1a2b3c4d5e6f7g8h9i0j`

### Step 3: Add to Vercel
1. **Settings** → **Environment Variables**
2. Click **Add New**
3. **Key:** `DOCUMENT_URL`
4. **Value:** Your export URL (the one ending in `format=txt`)
5. **Environments:** All
6. Click **Save**

### Step 4: Redeploy
- **Deployments** → **Redeploy**

**Note:** This method requires the doc to be publicly accessible. If you update the Google Doc, the changes will be reflected automatically (after redeploy or cache clear).

---

## 📥 Method 3: Download and Convert

### Step 1: Download as Text
1. **Open your Google Doc**
2. Click **File** → **Download** → **Plain Text (.txt)**
3. The file will download to your computer

### Step 2: Copy the Text
1. **Open the downloaded .txt file**
2. **Ctrl+A** → **Ctrl+C** (Select All and Copy)

### Step 3: Add to Vercel
- Same as Method 1, Step 2 above

---

## 🌐 Method 4: Use Google Docs Publish Feature

### Step 1: Publish to Web
1. **Open your Google Doc**
2. Click **File** → **Share** → **Publish to web**
3. Click **Publish**
4. Copy the published link

### Step 2: Convert to Text Export
The published link won't work directly, but you can:
1. Use the publish link to get the document ID
2. Convert to export format (see Method 2)
3. Or just copy the content (Method 1 is easier)

---

## ✅ Recommended: Method 1 (Copy from Google Docs)

**This is the fastest and most reliable:**
1. Open Google Doc
2. **Ctrl+A** → **Ctrl+C** (copy all)
3. Paste into Vercel `DOCUMENT_CONTENT`
4. Redeploy

**Takes 2 minutes!**

---

## 🔄 Keeping Google Doc Updated

If you want the Q&A system to always use the latest version of your Google Doc:

### Option A: Re-copy When Updated
1. Update your Google Doc
2. Copy all text again
3. Update `DOCUMENT_CONTENT` in Vercel
4. Redeploy

### Option B: Use Public Export URL (Method 2)
- Set up once with export URL
- Updates automatically (may need cache clear)
- Requires doc to be publicly accessible

---

## 🐛 Troubleshooting

### Can't select all text in Google Docs
- ✅ Click in the document first
- ✅ Try **Ctrl+A** again
- ✅ Or use **Edit** → **Select all** from menu

### Export URL not working
- ✅ Make sure doc is set to "Anyone with the link can view"
- ✅ Verify the DOC_ID is correct
- ✅ Try the copy method (Method 1) instead

### Text formatting looks weird
- ✅ This is normal - formatting is removed
- ✅ The text content is what matters
- ✅ The AI will understand it fine

---

## 📋 Quick Checklist

- [ ] Opened Google Doc
- [ ] Selected all text (Ctrl+A)
- [ ] Copied text (Ctrl+C)
- [ ] Added `DOCUMENT_CONTENT` to Vercel
- [ ] Pasted text into value field
- [ ] Selected all environments
- [ ] Saved
- [ ] Redeployed
- [ ] Tested with a question

---

## 💡 Pro Tip

**For frequently updated Google Docs:**
- Use Method 2 (export URL) if you want automatic updates
- Or set a reminder to re-copy when you update the doc

**For one-time setup:**
- Use Method 1 (copy/paste) - it's the simplest!

---

**You're all set!** Your Google Doc content is now available to the Q&A system. 🎉

