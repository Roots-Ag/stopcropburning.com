# Cloudflare Pages Deployment Guide

This guide will walk you through deploying stopcropburning.com to Cloudflare Pages with unlimited bandwidth.

## Why Cloudflare Pages?

- ✅ **Unlimited bandwidth** (perfect for viral campaigns)
- ✅ Free SSL certificate
- ✅ Global CDN (fast worldwide, including Thailand)
- ✅ Automatic deployments from GitHub
- ✅ Free forever for static sites
- ✅ Great for mission-driven projects

## Step 1: Push Code to GitHub

First, make sure your code is on GitHub:

```bash
# If you haven't already pushed
git push -u origin main
```

You should now see your code at: https://github.com/Roots-Ag/stopcropburning.com

## Step 2: Sign Up for Cloudflare

1. Go to [cloudflare.com](https://cloudflare.com)
2. Click "Sign Up" (top right)
3. Create a free account with your email
4. Verify your email address

## Step 3: Create a Cloudflare Pages Project

1. After logging in, go to the Cloudflare Dashboard
2. Click on **"Workers & Pages"** in the left sidebar
3. Click the **"Create application"** button
4. Click the **"Pages"** tab
5. Click **"Connect to Git"**

## Step 4: Connect Your GitHub Repository

1. Click **"Connect GitHub"** (or the GitHub icon)
2. Authorize Cloudflare to access your GitHub account
3. Select **"Roots-Ag/stopcropburning.com"** from the repository list
   - If you don't see it, click "Add account" and grant access to the Roots-Ag organization
4. Click **"Begin setup"**

## Step 5: Configure Build Settings

On the "Set up builds and deployments" page:

### Project name:
```
stopcropburning-com
```
(This will be your preview URL: stopcropburning-com.pages.dev)

### Production branch:
```
main
```

### Build settings:
- **Framework preset:** Select **"Next.js (Static HTML Export)"**
- **Build command:**
  ```
  npm run build
  ```
- **Build output directory:**
  ```
  out
  ```

### Root directory:
Leave blank (or `/`)

## Step 6: Add Environment Variables

Click **"Add environment variable"** and add the following:

**For Production and Preview:**

1. Variable name: `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - Value: `your-sanity-project-id` (get this from Sanity after setup)

2. Variable name: `NEXT_PUBLIC_SANITY_DATASET`
   - Value: `production`

3. Variable name: `NEXT_PUBLIC_SANITY_API_VERSION`
   - Value: `2024-01-01`

4. Variable name: `SANITY_API_TOKEN`
   - Value: `your-sanity-api-token` (get this from Sanity)

5. Variable name: `NEXT_PUBLIC_SITE_URL`
   - Value: `https://stopcropburning.com`

> **Note:** For now, you can use placeholder values (like `demo-project` for the project ID). The site will use mock data until you set up Sanity CMS.

## Step 7: Deploy!

1. Click **"Save and Deploy"**
2. Cloudflare will start building your site (takes 1-2 minutes)
3. Watch the build logs in real-time
4. Once complete, you'll see: ✅ **"Success! Your site is live!"**

Your site will be available at:
```
https://stopcropburning-com.pages.dev
```

## Step 8: Connect Your Custom Domain

Now let's point stopcropburning.com to Cloudflare Pages:

### If your domain is already on Cloudflare:

1. Go to your project on Cloudflare Pages
2. Click the **"Custom domains"** tab
3. Click **"Set up a custom domain"**
4. Enter: `stopcropburning.com`
5. Click **"Continue"**
6. Cloudflare will automatically configure DNS
7. Also add `www.stopcropburning.com` if desired
8. SSL certificate will be provisioned automatically (takes a few minutes)

### If your domain is NOT on Cloudflare yet:

1. Go to the Cloudflare dashboard
2. Click **"Add a site"**
3. Enter: `stopcropburning.com`
4. Follow the wizard to:
   - Choose the Free plan
   - Copy the Cloudflare nameservers (e.g., `ns1.cloudflare.com`, `ns2.cloudflare.com`)
5. Go to your domain registrar (GoDaddy, Namecheap, etc.)
6. Update nameservers to Cloudflare's nameservers
7. Wait for DNS propagation (can take up to 24 hours, usually faster)
8. Once active, follow the "domain already on Cloudflare" steps above

### Quick DNS Setup (Alternative):

If you don't want to change nameservers:

1. In your domain registrar, add a **CNAME record**:
   - Name: `@` (or leave blank for root domain)
   - Target: `stopcropburning-com.pages.dev`
   - TTL: Auto or 3600

2. Add another **CNAME record** for www:
   - Name: `www`
   - Target: `stopcropburning-com.pages.dev`
   - TTL: Auto or 3600

Note: Some registrars don't support CNAME for root domains. In that case, use Cloudflare's nameservers.

## Step 9: Verify Your Deployment

1. Visit `https://stopcropburning.com` (after DNS propagation)
2. Check that:
   - ✅ Site loads in English
   - ✅ Language switcher works (EN ↔ TH)
   - ✅ Both languages display correctly
   - ✅ SSL/HTTPS is working (green padlock)
   - ✅ Mobile responsive design works

## Automatic Deployments

From now on, every time you push to GitHub:

```bash
git add .
git commit -m "Update content"
git push
```

Cloudflare Pages will automatically:
1. Detect the push
2. Build your site
3. Deploy to production
4. Update your live site (usually in 1-2 minutes)

## Managing Deployments

### View Deployments:
1. Go to Cloudflare Dashboard → Workers & Pages
2. Click your project
3. See all deployments with timestamps

### Rollback:
1. Click on any previous deployment
2. Click "Rollback to this deployment"

### Preview Branches:
- Any branch you push to GitHub gets a preview URL
- Example: `feature-branch.stopcropburning-com.pages.dev`

## Adding Sanity CMS Environment Variables Later

Once you set up Sanity (see SANITY_SETUP.md):

1. Go to your Cloudflare Pages project
2. Click **"Settings"** tab
3. Click **"Environment variables"**
4. Click **"Edit variables"**
5. Update the Sanity variables with real values:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` → your actual project ID
   - `SANITY_API_TOKEN` → your actual token
6. Click **"Save"**
7. Go to **"Deployments"** tab
8. Click **"Retry deployment"** on the latest build

## Performance Monitoring

Cloudflare provides:
- **Analytics:** See visitor stats, bandwidth usage (unlimited!)
- **Speed Insights:** Monitor page load times
- **Error Tracking:** See any build or runtime errors

Access these in: Dashboard → Workers & Pages → Your Project → Analytics

## Troubleshooting

### Build fails:
- Check the build logs in Cloudflare Pages
- Ensure all environment variables are set
- Verify `npm run build` works locally

### Domain not working:
- Wait 24 hours for DNS propagation
- Use [dnschecker.org](https://dnschecker.org) to verify DNS
- Check that nameservers are correctly set

### SSL certificate pending:
- Usually takes 5-15 minutes to provision
- Can take up to 24 hours in rare cases
- Will happen automatically

### Site shows mock data:
- Normal if Sanity is not set up yet
- Follow SANITY_SETUP.md to configure CMS
- Update environment variables with real Sanity credentials

## Cost

**Everything is FREE:**
- ✅ Unlimited bandwidth
- ✅ Unlimited builds
- ✅ SSL certificate
- ✅ Global CDN
- ✅ DDoS protection
- ✅ Automatic deployments

## Support

- Cloudflare Pages Docs: https://developers.cloudflare.com/pages
- Cloudflare Community: https://community.cloudflare.com
- Status Page: https://cloudflarestatus.com

## Next Steps

1. ✅ Deploy to Cloudflare Pages (you're doing this now!)
2. 🔄 Set up Sanity CMS (see SANITY_SETUP.md)
3. 📝 Add real content through Sanity Studio
4. 🌍 Share stopcropburning.com with the world!

---

**Your site will be live at:**
- Production: `https://stopcropburning.com`
- Preview: `https://stopcropburning-com.pages.dev`

**Unlimited bandwidth means:** No matter how viral this goes, you'll never pay anything! 🎉
