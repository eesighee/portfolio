# Fotos de Alegría

> Small Next.js + Tailwind photography site (demo)

---

## Overview

Fotos de Alegría is a lightweight photography site built on Next.js (App Router), Tailwind CSS, and Framer Motion. It features:

**Implemented Features**
- Dynamic server-side discovery of images from `public/photos/` (no manual list maintenance)
- Automatic WebP variant + blur metadata (optional) via a custom `scripts/optimize-images.js` build tool
- Responsive gallery with grouping: all filenames containing `coop` first row(s), filenames containing `vette` second row(s), others follow
- Lightbox with keyboard navigation (Escape / ← / →) and backdrop click to close
- Deterministic ordering to prevent layout jumpiness when adding new files
- Environment hardening: dev indicators disabled, source maps off in production
- Simple color / texture theming via CSS variables in `app/globals.css`

**Recently Adjusted**
- Removed blur placeholders from UI (using direct images) while keeping metadata generation available
- Added stable grouping + sorting logic
- Improved lightbox transition (spring layout animation) and backdrop click behavior

---

## Project Structure (important files)

- `app/`
  - `layout.tsx` — root layout, imports global CSS and renders children
  - `page.tsx` — homepage that renders the gallery
  - `globals.css` — app-wide Tailwind imports and base styles
- `components/`
  - `Gallery.tsx` — responsive grid of images using `next/image` and motion
  - `Lightbox.tsx` — fullscreen lightbox with keyboard navigation
  - `DisableDevtools.tsx` — (optional) client component that stubs React DevTools hook and blocks common devtools shortcuts
- `public/photos/` — original images (JPG/PNG). Generated WebP variants & metadata file also live here.
- `next.config.ts` — Next configuration (dev indicators and production source map setting)
- `package.json` — scripts and dependencies
- `.nvmrc` — recommended Node version for development

---

## Requirements

- Node.js >= 20.9.0 (the project sets `engines.node` in `package.json` and includes `.nvmrc`)
- npm (or pnpm/yarn) to install dependencies

If you use `nvm`:
```bash
nvm install 20.9.0
nvm use 20.9.0
```

---

## Setup & Run (development)

1. Install dependencies
```bash
npm install
```

2. Run the dev server
```bash
npm run dev
```

Open http://localhost:3000/ to view the site.

To build for production:
```bash
npm run build
npm run start
```

---

## Adding Photos & Optimization

1. Drop new original images (e.g. `vette-6.jpg`) into `public/photos/`.
2. (Optional but recommended) Run the optimizer to create WebP variants + update metadata:
```bash
npm run optimize-images
```
3. Reload the site — new images appear automatically in their group based on filename.

**Grouping Rules**
- Filenames containing `coop` → first section
- Filenames containing `vette` → second section
- Everything else → final section

**How Ordering Works**
- Files are alphabetically sorted inside each group. Numeric suffixes sort lexicographically (e.g. `vette-10` after `vette-2`). If you want natural numeric sorting, adjust logic in `app/page.tsx`.

**Variants & Metadata**
- Optimizer outputs `<name>-small.webp|medium.webp|large.webp` plus base64 blur strings in `images-metadata.json`.
- The current UI ignores blur placeholders (placeholder removed) but you can re-enable by restoring `placeholder="blur" blurDataURL={imageMeta?.blur}` in `Gallery.tsx` and `Lightbox.tsx`.

**Cleaning Duplicates**
- If variants were duplicated from earlier runs, you can delete all `.webp` in the folder and re-run the script:
```bash
rm public/photos/*.webp
npm run optimize-images
```

**Performance Tips**
- Keep originals reasonably sized (under ~5000px longest side) for faster variant generation.
- Prefer JPG for photographs; PNG only when transparency/detail is needed.

---

## Dev UX / Notes

- Dev indicator disabled; restore by removing `devIndicators` override in `next.config.ts`.
- Source maps disabled for production (`productionBrowserSourceMaps: false`). Set to `true` if you need them for monitoring.
- `DisableDevtools.tsx` is a deterrent only; do not rely on it for security.
- Lightbox: click backdrop or press Escape to close; arrow keys navigate.
- Layout animations rely on stable ordering — adding many new files at once may reflow groups but not reorder existing items inside a group.

---

## Deployment

This site works well on Vercel (recommended for Next.js). Typical steps:

1. Push to a Git repository (GitHub/GitLab).
2. Connect the repository to Vercel and deploy the `main` branch.

Environment variables and advanced configuration can be set in the Vercel dashboard.

---

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| New image appears in wrong row | Filename missing expected substring | Rename to include `coop` or `vette` (case-insensitive) |
| Duplicate WebP variants | Old optimizer processed existing `.webp` | Remove `.webp` and re-run optimizer (script now skips WebP inputs) |
| Blur placeholder not showing | Blur removed intentionally | Re-enable blur props in components if desired |
| Lightbox not closing | Backdrop click intercepted | Ensure no overlapping z-index element; verify `onClick={onClose}` remains on overlay |
| Layout jump after rename | Order changed due to alpha sort | Adjust sorting logic or use timestamp-based ordering |

If something else feels off, run:
```bash
npm run optimize-images && npm run dev
```
Then hard-refresh the browser.

---

## Extending

Suggested next improvements:
- Natural numeric sorting (`vette-2` before `vette-10`)
- Optional EXIF caption extraction
- Swipe gestures (mobile) for Lightbox
- Accessibility: focus trap & ARIA roles for Lightbox
- Preload next/previous image in Lightbox
- Move generated variants to `public/photos/optimized/` for cleanliness

Open an issue or continue iterating in the repo to add any of these.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
