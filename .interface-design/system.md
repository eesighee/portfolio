# Fotos de Alegría — Design System

## Direction

**Darkroom-gallery.** The interface is a darkroom made digital. Charcoal surfaces where images emerge from shadow. The only warm element is safelight amber — it guides without shouting. Images are the light source. Everything else recedes.

**Who:** Visitors experiencing a photographer's eye — automotive beauty, self-portraits, atmospheric moments.

**Feel:** Intimate, deliberate, unhurried. Like stepping into a developing room where prints appear from chemical darkness.

## Token Architecture

All colors trace to named primitives. No random hex values.

### Canvas (surfaces)

| Token        | Dark (default)  | Light            | Role                    |
|-------------|-----------------|------------------|-------------------------|
| `--darkroom` | `#141414`       | `#f0f1f3`        | Base canvas             |
| `--film`     | `#1c1c1c`       | `#e4e6ea`        | Elevated surface (cards) |
| `--print`    | `#242424`       | `#ffffff`        | Highest elevation       |

Neutral charcoal temperature. Whisper-quiet 3-5% lightness jumps between levels.

### Text (silver hierarchy)

| Token            | Dark            | Light            | Role                  |
|-----------------|-----------------|------------------|-----------------------|
| `--silver`       | `#f0f0f0`       | `#171717`        | Primary text          |
| `--silver-soft`  | `#a3a3a3`       | `#4b5563`        | Supporting text       |
| `--silver-faint` | `#737373`       | `#9ca3af`        | Metadata, timestamps  |
| `--silver-ghost` | `#404040`       | `#c9cdd4`        | Disabled, copyright   |

### Accent

| Token              | Value     | Role                  |
|--------------------|-----------|------------------------|
| `--safelight`      | `#B8860B` | Primary accent (amber) |
| `--safelight-glow` | `#D4A017` | Hover/active states    |

Single accent color. No other hues.

### Borders

| Token          | Dark                        | Light                       | Role              |
|---------------|-----------------------------|-----------------------------|-------------------|
| `--edge`       | `rgba(255,255,255,0.08)`    | `rgba(0,0,0,0.10)`         | Standard border   |
| `--edge-soft`  | `rgba(255,255,255,0.04)`    | `rgba(0,0,0,0.05)`         | Subtle separation |
| `--edge-bright`| `rgba(255,255,255,0.15)`    | `rgba(0,0,0,0.18)`         | Emphasis/focus    |

### Grain

| Token     | Dark                       | Light                    | Role         |
|----------|----------------------------|--------------------------|--------------|
| `--grain` | `rgba(255,255,255,0.03)`   | `rgba(0,0,0,0.04)`      | Film texture |

Applied as radial-gradient dots at 12px spacing on body.

## Depth Strategy

**Borders only.** No drop shadows for layout. In dark environments you see edges, not shadows. Exception: hover states on images can use `shadow-black/30` for lift.

## Typography

| Role    | Font              | Usage                        |
|---------|-------------------|------------------------------|
| Display | Cormorant Garamond | Headings — editorial, gallery catalog feel |
| Body    | Outfit            | UI text — quiet utility       |

## Spacing

4px base (Tailwind default). Consistent multiples via Tailwind classes.

## Border Radius

`rounded-sm` throughout. Sharp-but-not-harsh. Technical, not playful.

## Key Patterns

### Hero
- Full-screen parallax image, `brightness-90`
- Bottom-up gradient overlay: `from-darkroom/60 via-darkroom/10 to-transparent`
- Text anchored to bottom-left
- Buttons: smaller on mobile (`py-2 text-sm`), scale up at `md`

### Gallery
- No card wrapper — images emerge directly from the dark canvas
- CSS columns masonry (1 → 2 → 3 cols responsive)
- Images animate in with blur-to-sharp + scale on scroll
- Section dividers: centered title + safelight amber rule

### Cards (About, Blog)
- `bg-film` surface, `border-[var(--edge)]`
- No gold/safelight borders on containers — accent is reserved for interactive elements
- Hover: border shifts to `safelight/40`

### Navbar
- `bg-darkroom/80` with `backdrop-blur-md`
- Border: `border-[var(--edge)]`
- Links: `text-silver-soft` → `hover:text-safelight`
- Hides on scroll down, shows on scroll up

### Page Transitions
- Simple `motion.div` fade + y-shift in `template.tsx`
- No `AnimatePresence` (causes double animation with Next.js template remounting)

## Layout

- `scrollbar-gutter: stable` on `html` to prevent layout shift
- Dark theme is default in `:root`, light behind `prefers-color-scheme: light`
- Body background: solid `--darkroom` + grain pattern (no gradient overlay)

## Signature

Safelight amber as the singular warm element in a cool-dark environment. It appears in: section dividers, CTA fills, hover states, profile border, role subtitle. Everything else is silver on charcoal.
