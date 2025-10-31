# ✅ AstroWind POC Portfolio - Setup Complete

Your POC-focused portfolio is now live on AstroWind!

## What's Been Implemented

### ✅ Core Structure
- **AstroWind Theme** installed and configured
- **Content Collections** set up for POC blog posts
- **Navigation** simplified to: Home | Work | Contact
- **Layouts** using AstroWind's PageLayout
- **Tailwind CSS** + AstroWind styling active

### ✅ Pages Created

#### 1. Home (`/`)
- Hero section with your tagline: "Designing through product with AI tools"
- Call-to-action buttons to "Work" and Contact
- About section highlighting your POC Design approach

#### 2. Work (`/work`)
- POC gallery with card grid layout
- Category filter chips (All, Design System Evolution, AI-Augmented Tooling, etc.)
- Shows: thumb, title, subtitle, category, tags
- Links to individual POC detail pages

#### 3. POC Detail Pages (`/poc/[slug]`)
- Full MDX content rendering
- Hero images
- Category badge
- Role, Status, Date metadata
- Tags
- Impact callout box
- Back to gallery link

#### 4. Category Pages (`/category/[slug]`)
- Filter POCs by category
- Same card grid layout
- Breadcrumb navigation

#### 5. Contact (`/contact`)
- Simple, clean contact page
- Email CTA button
- LinkedIn & GitHub links

### ✅ Sample POC Posts Created

Located in `src/content/blog/`:

1. **Pop the Hood (EUI Inspector)** (`pop-the-hood.mdx`)
   - Category: AI-Augmented Tooling
   - Status: POC
   - Full MDX with Challenge → Idea → AI Workflow → Outcome → Reflection

2. **EUI Split Button** (`split-button-poc.mdx`)
   - Category: Design System Evolution
   - Status: PR
   - Component design exploration

3. **Spaces Selector Enhancement** (`spaces-selector-enhancement.mdx`)
   - Category: Product UX Enhancements
   - Status: Merged
   - Navigation improvement POC

4. **Observability Cues in Discover** (`observability-cues-discover.mdx`)
   - Category: Visionary POCs
   - Status: POC
   - Future-state vision prototype

### ✅ Content Model (POC Schema)

Each POC post supports:
```yaml
title: String (required)
subTitle: String (optional)
description: String (for SEO)
date: Date (required)
updated: Date (optional)
category: String (required)
tags: Array<String>
status: POC | PR | Merged | Draft
role: String
impact: String
thumb: String (path to thumbnail image)
hero: String (path to hero image/gif)
priority: Number (for sorting)
draft: Boolean
canonical: String (SEO)
```

### ✅ Configuration Updated

- **Site name:** Ryan Keairns
- **Site URL:** https://ryankeairns.com
- **Description:** "Principal Designer using AI tools to move from ideas to working proofs of concept"
- **Social links:** LinkedIn & GitHub
- **Footer:** Simplified, professional

---

## 🚀 Next Steps

### 1. Add Your POC Images
Place your images in `/public/images/pocs/`:
- `{slug}-thumb.png` - Card thumbnails (16:9, ~800x450px)
- `{slug}-hero.png` or `.gif` - Hero images for detail pages

**Placeholder service:** Use https://placehold.co/800x450 until you have real images

### 2. Create More POC Posts
Copy one of the existing MDX files in `src/content/blog/` and customize:
```bash
cp src/content/blog/pop-the-hood.mdx \
   src/content/blog/your-new-poc.mdx
```

Then edit the frontmatter and content sections.

### 3. Suggested POCs from Your List
Based on your original plan, consider creating:
- **App Menu Redesign** (Product UX Enhancements)
- **User-based Solution View Switching** (Product UX Enhancements)
- **EUI Content Cooker Plugin** (AI-Augmented Tooling)
- **Local Start/Build Scripts** (Infrastructure & Enablement)
- **Dynamic Home Pages** (Visionary POCs)

### 4. Customize Styling (Optional)
AstroWind uses Tailwind. To customize:
- **Colors:** Edit `tailwind.config.js`
- **Global styles:** `src/assets/styles/tailwind.css`
- **Component overrides:** Create custom components in `src/components/`

### 5. Remove Demo Pages (Optional)
AstroWind includes demo pages you may want to remove:
```bash
rm -rf src/pages/homes/
rm -rf src/pages/landing/
rm src/pages/about.astro
rm src/pages/pricing.astro
rm src/pages/services.astro
```

---

## 📁 Key File Locations

```
ryankeairns.com/
├── src/
│   ├── content/
│   │   ├── config.ts          # Content Collections schema
│   │   └── blog/              # Your POC MDX posts here
│   ├── pages/
│   │   ├── index.astro        # Home page
│   │   ├── work.astro         # POC gallery
│   │   ├── contact.astro      # Contact page
│   │   ├── poc/[slug].astro   # POC detail page
│   │   └── category/[slug].astro  # Category pages
│   ├── navigation.ts          # Header & footer nav
│   ├── config.yaml            # Site-wide config
│   └── layouts/
│       └── PageLayout.astro   # Main layout
├── public/
│   └── images/
│       └── pocs/              # Your POC images here
└── astro.config.ts            # Astro + AstroWind config
```

---

## 🎨 Categories (Use These Exact Strings)

For consistent filtering, use these category names:
- **Design System Evolution**
- **Product UX Enhancements**
- **AI‑Augmented Tooling**
- **Infrastructure & Enablement**
- **Visionary POCs**

---

## 🧪 Development Commands

```bash
# Start dev server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for errors
npm run check
```

---

## 🎯 Launch Checklist

- [ ] Add real POC images to `/public/images/pocs/`
- [ ] Create 3-5 more POC posts
- [ ] Update email address in Contact page (currently placeholder)
- [ ] Review and remove AstroWind demo pages
- [ ] Test all category filters
- [ ] Test all POC detail pages
- [ ] Verify responsive design on mobile
- [ ] Check accessibility (keyboard nav, screen readers)
- [ ] Add analytics (if desired)
- [ ] Deploy to Vercel/Netlify

---

## 💡 Tips

### Writing POC Posts
Follow this structure for consistency:
1. **Challenge** - What problem you were solving
2. **Idea** - Your solution approach
3. **AI Workflow** - How you used ChatGPT/Cursor
4. **Outcome** - What you built + results
5. **Reflection** - What you learned
6. **Supplemental** (optional) - Code snippets, links, etc.

### Image Best Practices
- **Thumbnails:** 800x450px, optimized PNGs or WebP
- **Heroes:** Can be larger, GIFs work great for demos
- **Alt text:** Descriptive (handled by markdown)

### Performance
- AstroWind includes image optimization
- Use WebP format for smaller file sizes
- Keep GIFs under 5MB

---

## 🐛 Known Issues / Notes

1. **Missing images:** POC posts reference placeholder images - add real ones
2. **AstroWind demo content:** Still present in `src/data/post/` (different from your POCs)
3. **Email address:** Update in `src/pages/contact.astro` (currently `ryan@ryankeairns.com`)
4. **Logo:** Update the "RK" logo in the header if desired

---

## 🙌 Success!

You now have a fully functional POC portfolio built on AstroWind. The structure follows your plan exactly:
- Simple navigation
- POC gallery with category filters
- Detailed POC pages with your content model
- Sample posts demonstrating your AI-assisted workflow

**Dev server running at:** http://localhost:4321

Visit `/work` to see your POC gallery in action!

---

**Questions or issues?** Check the AstroWind docs or Astro docs for customization guidance.

