# Design Review: Fotos de Alegria

## Typography

~~**Problem:** Inter is the most generic, overused font in web development.~~

**DONE** — Replaced Inter + Geist Mono with Cormorant Garamond (display/headings) + Outfit (body). Applied via CSS variables `--font-display` and `--font-body`.

---

## Color & Theme

~~**Problem:** Palette is mostly gray-on-gray. Social buttons (gold, pink, blue) feel disconnected.~~

**DONE** — Unified gold accent system (`--gold`, `--gold-light`). Rainbow social buttons replaced with consistent outlined buttons with gold hover. Card background updated to soft ash (`#1c1c1c`) for subtle separation without navy tint.

---

## Layout & Spacing

~~1. Gallery `object-fit: contain` leaves visible gaps.~~
~~2. Fixed-height image containers force uniform boxes.~~
~~4. Indentation issue in page-client.tsx.~~

**DONE** — Masonry layout with CSS columns, natural aspect ratios (3:4 portrait default), `object-fit: contain` to avoid cropping vertical photos. Category headers added (Coop, Auto, Self-Portraits). Hover interaction with scale + shadow. Indentation fixed.

**Still open:**
3. About section — two stacked centered cards feel formulaic. Consider asymmetric layout or combining About + Connect into one section.

---

## Blog Spacing Issues

**DONE** — All spacing issues addressed:
- Figure spacing increased to `space-y-8 md:space-y-16`
- Card gap increased to `gap-8`
- Header metadata margin increased to `mb-16`
- Gold visual separator between header and images
- Figcaption spacing increased to `mt-4`
- Photo borders added for gallery feel (`border border-white/10` with padding)
- Back button removed (navbar handles navigation)

---

## Motion & Animation

**DONE:**
- Gallery animations set to `once: true`
- Hero CTA buttons staggered at 0.9s, 1.0s, 1.1s

**Still open:**
- No page transitions between home and blog. Add fade transition via AnimatePresence on layout level.
- Lightbox lacks swipe gestures for mobile.

---

## Gallery — Core Experience

**DONE:**
- Masonry layout with CSS columns
- Category headers/dividers (Coop, Auto, Self-Portraits)
- Hover interaction: scale + shadow lift

**Still open:**
- Lightbox improvements: Add image count ("3 of 12"), swipe support, zoom, smoother backdrop blur.

---

## Blog Page

**DONE:**
- Removed `!important` on `.card` color — applied directly instead
- Added persistent sticky navbar with backdrop-blur

**Still open:**
- Blog post pages could use a reading progress bar.

---

## Miscellaneous

**DONE:**
1. ~~DisableDevtools.tsx~~ — Removed entirely.
2. ~~`gemini-watermark` class~~ — Renamed to `.copyright-badge`.
3. ~~No navigation component~~ — Sticky translucent navbar added (Fotos de Alegría + Gallery/About/Blog links, hide on scroll down, show on scroll up).

**Still open:**
4. No custom favicon: Add a custom favicon matching the brand (stylized "A" or camera icon in gold accent).
5. Accessibility: Gallery alt text is just "Photo 1", "Photo 2". Hero alt is "Featured photography". Make these more descriptive.

---

## Priority Ranking — Remaining Items

1. **Page transitions** — AnimatePresence fade between routes
2. **About section redesign** — asymmetric or combined layout
3. **Reading progress bar** — for blog posts
4. **Custom favicon** — gold-accented brand icon
5. **Accessibility improvements** — descriptive alt text for gallery images
