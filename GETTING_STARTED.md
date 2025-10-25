# Getting Started with Stop Crop Burning Website

Welcome! This guide will help you get the website live in 3 steps.

## 🚀 Quick Start (30 minutes total)

### Step 1: Deploy to Cloudflare Pages (10 min)

1. **Push to GitHub** (if not done):
   ```bash
   git push -u origin main
   ```

2. **Follow the Cloudflare guide:**
   - Open `CLOUDFLARE_DEPLOYMENT.md`
   - Follow steps 1-7
   - Your site will be live at `stopcropburning-com.pages.dev`

### Step 2: Set Up Sanity CMS (15 min)

1. **Run the automated setup:**
   ```bash
   ./setup-sanity.sh
   ```

2. **Or follow manual steps:**
   - Open `SANITY_QUICK_START.md`
   - Follow the guide step-by-step

3. **Add your content:**
   - Open http://localhost:3333
   - Add 3-5 Problems about crop burning
   - Add 4-6 Solutions
   - Click "Publish" for each

### Step 3: Connect Everything (5 min)

1. **Update Cloudflare environment variables:**
   - Go to Cloudflare Dashboard → Your Project → Settings
   - Add your Sanity Project ID and API Token
   - Redeploy

2. **Point your domain:**
   - Follow "Step 8" in `CLOUDFLARE_DEPLOYMENT.md`
   - Add `stopcropburning.com` as custom domain

**Done!** Your site is live with real content! 🎉

---

## 📁 Project Structure

```
stopcropburning/
├── app/                          # Next.js app directory
│   ├── [locale]/                # Locale-based routing (en, th)
│   │   ├── layout.tsx           # Layout with i18n provider
│   │   └── page.tsx             # Homepage
│   └── globals.css              # Global styles
│
├── components/                   # React components
│   ├── Header.tsx               # Navigation with language switcher
│   ├── Hero.tsx                 # Hero section
│   ├── Footer.tsx               # Footer
│   ├── PageContent.tsx          # Main content wrapper
│   ├── ProblemCard.tsx          # Problem display card
│   └── SolutionCard.tsx         # Solution display card
│
├── lib/                         # Utilities and configurations
│   ├── sanity/                  # Sanity CMS integration
│   │   ├── client.ts            # Sanity client setup
│   │   └── queries.ts           # GROQ queries
│   └── i18n/                    # Internationalization
│       ├── config.ts            # Locale configuration
│       └── request.ts           # i18n request handler
│
├── messages/                    # Translation files
│   ├── en.json                  # English translations
│   └── th.json                  # Thai translations
│
├── sanity/                      # Sanity schemas
│   └── schemas/
│       ├── problem.ts           # Problem content type
│       ├── solution.ts          # Solution content type
│       └── index.ts             # Schema exports
│
├── public/                      # Static assets
│
├── .env.local                   # Environment variables (not in git)
├── .env.example                 # Example env file (in git)
│
└── Documentation:
    ├── README.md                # Project overview
    ├── GETTING_STARTED.md       # This file
    ├── CLOUDFLARE_DEPLOYMENT.md # Cloudflare deployment guide
    ├── DEPLOYMENT.md            # All deployment options
    ├── SANITY_QUICK_START.md    # Quick Sanity setup
    └── SANITY_SETUP.md          # Detailed Sanity guide
```

---

## 🛠️ Development

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Build static site
npm run build

# Output goes to ./out directory

# Test production build locally
npx serve out
```

### Start Sanity Studio

```bash
cd sanity-studio
npm run dev

# Open http://localhost:3333
```

---

## 🌍 Language Support

The site supports:
- **English** (`/en`)
- **Thai** (`/th`)

### Adding Content in Both Languages

When creating content in Sanity:
1. Fill in **both** English and Thai fields
2. This ensures the content displays correctly in both languages
3. The language switcher in the header toggles between them

---

## 🎨 Customization

### Colors and Styling

Edit `app/globals.css` and Tailwind classes in components.

Primary color scheme:
- Green: `green-600`, `green-700` (environmental theme)
- Gray: `gray-50` to `gray-900`

### Adding New Content Types

1. Create a new schema in `sanity/schemas/`
2. Add it to `sanity/schemas/index.ts`
3. Create corresponding queries in `lib/sanity/queries.ts`
4. Create a component to display it
5. Add to the page

### Adding More Languages

1. Add locale to `lib/i18n/config.ts`:
   ```typescript
   export const locales = ['en', 'th', 'hi'] as const;  // Added Hindi
   ```

2. Create `messages/hi.json` with translations

3. Update Sanity schemas to include new language field:
   ```typescript
   title: {
     en: 'string',
     th: 'string',
     hi: 'string'  // Added
   }
   ```

---

## 📊 Content Guidelines

### Problems

Focus on the key issues with crop burning:
- **Air pollution** - Health impacts, AQI levels
- **Soil degradation** - Loss of nutrients, microorganisms
- **Health impacts** - Respiratory issues, cardiovascular problems
- **Economic costs** - Healthcare costs, productivity loss
- **Climate impact** - Greenhouse gas emissions

### Solutions

Provide practical, actionable alternatives:
- **Agricultural practices** - Zero-till farming, mulching
- **Technology** - Bio-decomposers, baler machines
- **Policy** - Subsidies, regulations, incentives
- **Economic** - Market creation for crop residue

Make solutions:
- ✅ Practical for farmers
- ✅ Economically viable
- ✅ Environmentally sound
- ✅ Culturally appropriate

---

## 🔒 Security

### Environment Variables

Never commit these files:
- ❌ `.env.local`
- ❌ `.env.production`
- ❌ Any file with actual API keys

Always use:
- ✅ `.env.example` (with placeholder values)

### API Tokens

- Use **read-only** tokens for the website
- Use **editor** tokens only in Sanity Studio
- Never expose tokens in client-side code

---

## 📈 Analytics (Optional)

Add analytics to track impact:

1. **Plausible** (privacy-friendly):
   - Add script to `app/[locale]/layout.tsx`

2. **Google Analytics**:
   - Add GA script to layout

3. **Cloudflare Web Analytics**:
   - Enable in Cloudflare Dashboard (free)

---

## 🤝 Contributing

This is an open-source project for a critical environmental issue.

### To Contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Content Contributions:

- Add more problems and solutions
- Improve translations
- Add regional variations
- Provide farmer testimonials

---

## 🆘 Troubleshooting

### Site shows mock data instead of Sanity content:

- ✅ Check that Sanity environment variables are set
- ✅ Verify content is **published** (not draft) in Sanity
- ✅ Check CORS settings in Sanity dashboard
- ✅ Redeploy on Cloudflare

### Build fails:

- ✅ Run `npm install` to update dependencies
- ✅ Delete `.next` folder and rebuild
- ✅ Check environment variables are set correctly

### Language switcher not working:

- ✅ Verify both `/en` and `/th` routes exist in build output
- ✅ Check that messages files exist for both languages
- ✅ Clear browser cache

### Deployment issues:

- ✅ Check build logs in Cloudflare/Vercel
- ✅ Verify build command is `npm run build`
- ✅ Verify output directory is `out`

---

## 📚 Resources

### Documentation:
- [Next.js Docs](https://nextjs.org/docs)
- [Sanity Docs](https://www.sanity.io/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [next-intl Docs](https://next-intl-docs.vercel.app/)

### Deployment:
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages)
- [Vercel Docs](https://vercel.com/docs)

---

## 🎯 Roadmap

Future enhancements:
- [ ] Add farmer testimonials section
- [ ] Include case studies
- [ ] Add image gallery
- [ ] Create downloadable resources (PDFs)
- [ ] Add contact/feedback form
- [ ] Implement search functionality
- [ ] Add more regional languages
- [ ] Create admin dashboard for analytics

---

## 📞 Support

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and ideas

---

## 📜 License

MIT License - This is free and open-source software for the benefit of farmers and the environment.

---

**Thank you for helping stop crop burning! 🌾🌍**

Every visit, every share, every solution implemented makes a difference.
