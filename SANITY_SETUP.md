# Sanity CMS Setup Guide

This guide will help you set up Sanity CMS for the Stop Crop Burning website.

## Step 1: Create Sanity Account

1. Go to [sanity.io](https://www.sanity.io/)
2. Sign up for a free account

## Step 2: Create a New Sanity Project

1. Install Sanity CLI globally:
   ```bash
   npm install -g @sanity/cli
   ```

2. Login to Sanity:
   ```bash
   sanity login
   ```

3. Create a new Sanity project:
   ```bash
   sanity init
   ```

   - Choose "Create new project"
   - Give it a name: "Stop Crop Burning"
   - Use default dataset: "production"
   - Output path: `./sanity-studio`
   - Select schema template: "Clean project with no predefined schemas"

## Step 3: Set Up Sanity Studio

1. Navigate to the Sanity studio directory:
   ```bash
   cd sanity-studio
   ```

2. Copy the schemas from the `sanity/schemas` directory in the main project:
   - Copy `sanity/schemas/problem.ts`
   - Copy `sanity/schemas/solution.ts`
   - Copy `sanity/schemas/index.ts`

3. Update `sanity.config.ts` to import the schemas:
   ```typescript
   import { defineConfig } from 'sanity';
   import { deskTool } from 'sanity/desk';
   import { schemaTypes } from './schemas';

   export default defineConfig({
     name: 'default',
     title: 'Stop Crop Burning',
     projectId: 'YOUR_PROJECT_ID',
     dataset: 'production',
     plugins: [deskTool()],
     schema: {
       types: schemaTypes,
     },
   });
   ```

4. Start the Sanity Studio:
   ```bash
   npm run dev
   ```

5. Open http://localhost:3333 to access your Sanity Studio

## Step 4: Configure Environment Variables

1. Get your Project ID from the Sanity dashboard or `sanity.config.ts`

2. Generate an API token:
   - Go to https://www.sanity.io/manage
   - Select your project
   - Go to "API" → "Tokens"
   - Add a new token with "Read" permissions
   - Copy the token

3. Update `.env.local` in the main project:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   SANITY_API_TOKEN=your_api_token_here
   ```

## Step 5: Add Content

1. Open Sanity Studio at http://localhost:3333
2. Add "Problems" with Thai and English content
3. Add "Solutions" with Thai and English content
4. Publish the content

## Step 6: Deploy Sanity Studio (Optional)

```bash
cd sanity-studio
sanity deploy
```

Choose a studio hostname (e.g., `stopcropburning.sanity.studio`)

## Content Structure

### Problems
- **Title** (en/th): Short title
- **Description** (en/th): Detailed explanation
- **Icon**: Emoji or icon identifier
- **Image**: Optional image
- **Order**: Display order (number)

### Solutions
- **Title** (en/th): Short title
- **Description** (en/th): Brief description
- **Detailed Content** (en/th): Rich text content
- **Icon**: Emoji or icon identifier
- **Image**: Optional image
- **Category**: agricultural, technology, policy, or economic
- **Order**: Display order (number)

## Troubleshooting

If you see "Using mock data - Sanity not configured yet" in your console, check:

1. Environment variables are set correctly
2. Sanity project ID and token are valid
3. Content is published in Sanity Studio
4. CORS origins are configured in Sanity project settings

## CORS Configuration

1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to "API" → "CORS Origins"
4. Add your domains:
   - http://localhost:3000 (development)
   - https://stopcropburning.com (production)
   - Add any other deployment URLs
