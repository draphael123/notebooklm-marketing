# How to Add a Word Document (.docx)

Since you have a Word document, here's the easiest way to extract the text and add it:

## ⚡ Method 1: Copy from Word (Easiest)

### Step 1: Open in Microsoft Word
1. Open your `.docx` file in Microsoft Word
2. Press **Ctrl+A** (Select All)
3. Press **Ctrl+C** (Copy)
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

## 📄 Method 2: Save as Text File

### Step 1: Save as .txt in Word
1. Open your `.docx` file in Word
2. Click **File** → **Save As**
3. Choose **Plain Text (.txt)** format
4. Save the file

### Step 2: Copy the Text
1. Open the `.txt` file (in Notepad or any text editor)
2. **Ctrl+A** → **Ctrl+C** to copy all text

### Step 3: Add to Vercel
- Same as Method 1, Step 2 above

---

## 🌐 Method 3: Use Online Converter

If you prefer not to use Word:

1. **Go to an online converter:**
   - https://www.zamzar.com/convert/docx-to-txt/
   - https://convertio.co/docx-txt/
   - Or search "docx to txt converter"

2. **Upload your Word document**
3. **Download the .txt file**
4. **Open the .txt file** and copy all text
5. **Add to Vercel** as `DOCUMENT_CONTENT`

---

## 🔗 Method 4: Upload to GitHub Gist (For Large Documents)

If your Word document is very large:

1. **Open Word document** → **Ctrl+A** → **Ctrl+C** (copy all)
2. **Go to https://gist.github.com**
3. **Paste your text** in the gist
4. **Click "Create public gist"**
5. **Click "Raw"** button
6. **Copy the URL**
7. **Add to Vercel:**
   - Key: `DOCUMENT_URL`
   - Value: Your GitHub Gist URL
   - Environments: All
8. **Redeploy**

---

## ✅ Recommended: Method 1 (Copy from Word)

**This is the fastest:**
1. Open Word doc
2. **Ctrl+A** → **Ctrl+C**
3. Paste into Vercel `DOCUMENT_CONTENT`
4. Redeploy

**That's it!** Takes 2 minutes.

---

## 🐛 Troubleshooting

### Text looks weird after copying
- ✅ This is normal - Word formatting is removed
- ✅ The text content is what matters
- ✅ The AI will understand it fine

### Document is too large
- ✅ Use Method 4 (GitHub Gist) instead
- ✅ Or split into multiple parts

### Can't select all text
- ✅ Make sure you're in the document (click in it first)
- ✅ Try **Ctrl+A** again
- ✅ Or use **Edit** → **Select All** from menu

---

## 📋 Quick Checklist

- [ ] Opened Word document
- [ ] Selected all text (Ctrl+A)
- [ ] Copied text (Ctrl+C)
- [ ] Added `DOCUMENT_CONTENT` to Vercel
- [ ] Pasted text into value field
- [ ] Selected all environments
- [ ] Saved
- [ ] Redeployed
- [ ] Tested with a question

---

**You're all set!** Your Word document content is now available to the Q&A system. 🎉

