# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint via next lint
npm run start    # Start production server (run build first)
```

No test suite configured.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 3** for styling
- **Framer Motion 12** for all animations
- **Lucide React** for icons
- Fonts loaded via Google Fonts in `globals.css` (Playfair Display + DM Sans), exposed as CSS vars `--font-playfair` and `--font-dm-sans`

## Architecture

Single-page site. `app/page.tsx` is marked `"use client"` and composes all sections in order. No routing beyond `app/work/page.tsx`.

**Section order in page.tsx:**
`Preloader` → `Navbar` → `Hero` → `AboutSection` → `ClientsSection` → `ReelSection` → `Footer`

`ServicesSection`, `WorkSection`, `ContactSection`, and `CustomCursor` exist as components but are **not currently rendered** in `page.tsx`.

### Design tokens (tailwind.config.ts)

| Token | Value |
|-------|-------|
| `bg` | `#0a0a0a` (near-black background) |
| `cream` | `#f5f0e8` (primary text) |
| `gold` | `#c9a96e` (accent) |
| `muted` | `#888888` |
| `font-serif` | Playfair Display |
| `font-sans` | DM Sans |

### CSS utilities (globals.css)

- `.glass-dark` — frosted glass card (used in Navbar when scrolled, mute button)
- `.text-gradient-gold` — gold shimmer gradient text
- `.noise-overlay::after` — SVG noise texture pseudo-element
- `.work-card` — hover scale + gradient overlay for portfolio cards
- `.form-input` — bottom-border-only input style
- `.marquee-track` — infinite scrolling marquee animation
- Custom gold scrollbar defined on `html`

### Animation patterns

All animations use Framer Motion. Common pattern: `initial` hidden state + `animate` driven by either scroll position (`useInView`) or a `ready` boolean set via `setTimeout` after mount. Easing standard: `[0.22, 1, 0.36, 1]` (snappy ease-out).

`Preloader` uses a 3-phase state machine (0=count, 1=reveal, 2=exit) with `setTimeout` chains; it calls `onComplete` at ~2600ms to remove itself via `loaded` state in `page.tsx`.

`Navbar` hides on scroll-down past 200px, shows on scroll-up. Transitions to a pill-shaped `glass-dark` card when scrolled past 60px.

### Adding a new section

1. Create component in `components/`
2. Add `"use client"` if using hooks or Framer Motion
3. Import and place in `app/page.tsx` between existing sections
4. Use `useInView` from framer-motion for scroll-triggered animations (pass `once: true, margin: "-8%"`)

### Client data

`ClientsSection.tsx` contains a hardcoded `clients` array with per-brand typography config (font, weight, size, color, bg). Grid is always 4 columns. To add/remove clients, edit that array — rows auto-form in groups of 4.
