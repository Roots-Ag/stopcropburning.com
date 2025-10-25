# Deployment Guide

This guide covers multiple deployment options for the Stop Crop Burning static website.

## Prerequisites

- The site is configured for static export (`output: 'export'` in `next.config.ts`)
- Build output is generated in the `out/` directory
- No server-side features are used

## Option 1: Vercel (Recommended)

Vercel is the easiest option for Next.js deployments.

### Steps:

1. Push your code to GitHub (already set up):
   ```bash
   git push -u origin main
   ```

2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `SANITY_API_TOKEN`
6. Deploy!

### Custom Domain:
- Add `stopcropburning.com` in Vercel project settings → Domains
- Update your DNS records as instructed by Vercel

## Option 2: Netlify

1. Push your code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `out`
6. Add environment variables in Site settings → Environment variables
7. Deploy!

## Option 3: GitHub Pages

1. Build the site:
   ```bash
   npm run build
   ```

2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add to `package.json` scripts:
   ```json
   "deploy": "gh-pages -d out"
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

5. Enable GitHub Pages in repository settings:
   - Go to Settings → Pages
   - Select `gh-pages` branch
   - Save

## Option 4: Custom Server / VPS

### Using a simple HTTP server:

1. Build the site:
   ```bash
   npm run build
   ```

2. Upload the `out/` directory to your server

3. Serve with any static file server:
   ```bash
   # Using Python
   cd out && python -m http.server 3000

   # Using Node.js serve package
   npx serve out

   # Using nginx (configure nginx to serve the out directory)
   ```

### Using Nginx:

```nginx
server {
    listen 80;
    server_name stopcropburning.com;

    root /path/to/stopcropburning/out;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html /404.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

## Environment Variables for Production

Create a `.env.production` file (don't commit this!):

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_actual_token
NEXT_PUBLIC_SITE_URL=https://stopcropburning.com
```

## Building for Production

```bash
# Install dependencies
npm install

# Build the static site
npm run build

# The output will be in the ./out directory
```

## Testing Production Build Locally

```bash
# Build the site
npm run build

# Serve it locally
npx serve out

# Open http://localhost:3000
```

## CI/CD with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        env:
          NEXT_PUBLIC_SANITY_PROJECT_ID: ${{ secrets.SANITY_PROJECT_ID }}
          NEXT_PUBLIC_SANITY_DATASET: production
          NEXT_PUBLIC_SANITY_API_VERSION: 2024-01-01
          SANITY_API_TOKEN: ${{ secrets.SANITY_TOKEN }}
        run: npm run build

      - name: Deploy to Vercel/Netlify/etc
        # Add your deployment step here
```

## Performance Optimization

The site is already optimized for performance:

- ✅ Static generation (no server required)
- ✅ Optimized fonts with Next.js font optimization
- ✅ Responsive images (when using Sanity)
- ✅ Tailwind CSS purging unused styles
- ✅ Minimal JavaScript (mostly static content)

## Monitoring and Analytics

Consider adding:

- Google Analytics or Plausible for visitor tracking
- Sentry for error monitoring
- Vercel Analytics (if using Vercel)

## SSL/HTTPS

All recommended deployment options (Vercel, Netlify, GitHub Pages) provide free SSL certificates automatically.

For custom servers, use [Let's Encrypt](https://letsencrypt.org/) with certbot.

## Domain Configuration

Point your domain to your deployment:

### For Vercel/Netlify:
- Follow their custom domain setup wizard
- They provide the DNS records to set

### For GitHub Pages:
- Add a `CNAME` file in the `public/` directory with: `stopcropburning.com`
- Set up DNS A records pointing to GitHub Pages IPs

### For Custom Server:
- Point A record to your server IP
- Set up reverse proxy with nginx/Apache

## Troubleshooting

### Build fails with Sanity errors:
- Ensure environment variables are set correctly
- The site will use mock data if Sanity is not configured

### 404 errors on navigation:
- Ensure your server is configured to serve `index.html` for directory paths
- Check trailing slash configuration

### Translations not working:
- Verify `messages/en.json` and `messages/th.json` exist
- Check that locale files are included in the build
