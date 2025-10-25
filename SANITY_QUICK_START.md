# Sanity CMS Quick Start Guide

Get your Sanity CMS up and running in 10 minutes.

## Quick Setup (3 Commands)

```bash
# 1. Install Sanity CLI globally
npm install -g @sanity/cli

# 2. Run the automated setup script
./setup-sanity.sh

# 3. Studio will open at http://localhost:3333
```

That's it! The script handles everything.

---

## Manual Setup (If You Prefer)

### Step 1: Install Sanity CLI

```bash
npm install -g @sanity/cli
```

### Step 2: Login to Sanity

```bash
sanity login
```

This opens your browser to login/create a Sanity account (free).

### Step 3: Create Sanity Project

```bash
mkdir sanity-studio
cd sanity-studio
sanity init
```

**When prompted, enter:**
- ✅ Create new project? → **Yes**
- ✅ Project name → **Stop Crop Burning**
- ✅ Use default dataset configuration? → **Yes**
- ✅ Output path → **.** (current directory)
- ✅ Select project template → **Clean project with no predefined schemas**

### Step 4: Copy Schema Files

The schemas are already created in your project. Copy them to Sanity Studio:

```bash
# From sanity-studio directory
cp -r ../sanity/schemas/* ./schemas/
```

### Step 5: Update Sanity Config

Edit `sanity-studio/sanity.config.ts`:

```typescript
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Stop Crop Burning',

  projectId: 'YOUR_PROJECT_ID', // Get this from sanity.io/manage
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
```

### Step 6: Get Your Project ID

```bash
sanity debug --secrets
```

Copy the **Project ID** from the output.

### Step 7: Update Environment Variables

Update `.env.local` in your main project:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here  # ← Paste your Project ID
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_token_here  # ← We'll get this next
```

### Step 8: Create API Token

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project: **Stop Crop Burning**
3. Go to **API** → **Tokens**
4. Click **Add API token**
5. Name: `Website Read Token`
6. Permissions: **Viewer** (read-only)
7. Click **Save**
8. **Copy the token** (you won't see it again!)
9. Paste it in `.env.local` as `SANITY_API_TOKEN`

### Step 9: Configure CORS

Allow your website to fetch data from Sanity:

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to **API** → **CORS Origins**
4. Click **Add CORS origin**
5. Add these origins:
   - `http://localhost:3000` (for local development)
   - `https://stopcropburning.com` (for production)
   - `https://stopcropburning-com.pages.dev` (for Cloudflare preview)
6. Check **Allow credentials**
7. Click **Save**

### Step 10: Start Sanity Studio

```bash
cd sanity-studio
npm run dev
```

Sanity Studio will open at: **http://localhost:3333**

---

## Adding Content

Once Sanity Studio is running:

### Add a Problem:

1. Click **"Problem"** in the sidebar
2. Click **"Create new Problem"**
3. Fill in:
   - **Title (English):** e.g., "Air Pollution"
   - **Title (Thai):** e.g., "มลพิษทางอากาศ"
   - **Description (English):** Detailed explanation
   - **Description (Thai):** คำอธิบายโดยละเอียด
   - **Icon:** An emoji like 💨
   - **Order:** 1, 2, 3... (display order)
4. Click **"Publish"**

### Add a Solution:

1. Click **"Solution"** in the sidebar
2. Click **"Create new Solution"**
3. Fill in:
   - **Title (English & Thai)**
   - **Description (English & Thai)**
   - **Category:** agricultural, technology, policy, or economic
   - **Icon:** An emoji
   - **Order:** Display order
4. Click **"Publish"**

### Example Content to Get Started:

**Problem 1:**
- Title (EN): Air Pollution
- Title (TH): มลพิษทางอากาศ
- Icon: 💨
- Order: 1

**Solution 1:**
- Title (EN): Zero-Till Farming
- Title (TH): การทำเกษตรแบบไม่ไถพรวน
- Category: agricultural
- Icon: 🌾
- Order: 1

---

## Deploying Sanity Studio

Once you're happy with your local studio:

```bash
cd sanity-studio
sanity deploy
```

Choose a hostname, e.g., `stopcropburning`

Your studio will be available at: **https://stopcropburning.sanity.studio**

Now you (or content editors) can add content from anywhere!

---

## Update Cloudflare Environment Variables

Once Sanity is set up:

1. Go to Cloudflare Dashboard
2. Workers & Pages → Your project
3. Settings → Environment variables
4. Update:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` → your real project ID
   - `SANITY_API_TOKEN` → your real token
5. Save
6. Deployments → Retry latest deployment

Your website will now fetch real content from Sanity! 🎉

---

## Content Structure Reference

### Problems Schema:
```
{
  title: {
    en: string,
    th: string
  },
  description: {
    en: text,
    th: text
  },
  icon: string (emoji),
  image: image (optional),
  order: number
}
```

### Solutions Schema:
```
{
  title: {
    en: string,
    th: string
  },
  description: {
    en: text,
    th: text
  },
  detailedContent: {
    en: rich text,
    th: rich text
  },
  icon: string (emoji),
  image: image (optional),
  category: 'agricultural' | 'technology' | 'policy' | 'economic',
  order: number
}
```

---

## Troubleshooting

**Studio won't start:**
```bash
cd sanity-studio
npm install
npm run dev
```

**Can't find project ID:**
```bash
sanity debug --secrets
```

**CORS errors:**
- Add your domain to CORS origins in Sanity dashboard

**Changes not showing on website:**
- Make sure you clicked "Publish" in Sanity Studio
- Content must be published, not just saved as draft
- Check that environment variables are correct
- Redeploy on Cloudflare if needed

---

## Next Steps

1. ✅ Set up Sanity CMS (you're doing this now)
2. 📝 Add 3-5 problems about crop burning
3. 💡 Add 4-6 solutions
4. 🌍 Deploy to Cloudflare Pages
5. 📢 Share with the world!

**Questions?** Check the main SANITY_SETUP.md for more details.
