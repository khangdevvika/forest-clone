---
name: zen-organic-style
description: Apply the "Zen Organic" design system to a Next.js + Tailwind CSS 4 + shadcn project. Sage & Cream light mode, Forest Floor dark mode, Outfit + Inter fonts, grain texture, thin icons, Framer Motion spring animations. No mesh gradients, no heavy glassmorphism.
---

# Zen Organic Design Style

## When to Use This Skill

Use this skill when the user asks to apply the "Zen Organic" style, or references the STYLE.md file in this project. The style is optimised for **calm, focus-oriented apps** (timers, journals, productivity tools). It is NOT appropriate for loud marketing sites or dashboards.

---

## Stack Requirements

Before applying, confirm the project has:

| Dependency             | Purpose                                    |
| ---------------------- | ------------------------------------------ |
| `next` (any v14+)      | `next/font/google` for font loading        |
| `tailwindcss` v4       | `@theme inline` block and CSS-first config |
| `framer-motion`        | Spring and stagger animations              |
| `lucide-react`         | Icon library (thin stroke support)         |
| `shadcn` / `@shadcn/*` | Component primitives                       |

If any are missing, install them before proceeding:

```bash
npm install framer-motion lucide-react
```

---

## Step-by-Step Implementation

### Step 1 — Load Fonts in `layout.tsx`

Replace existing font imports with Outfit + Inter. **Always use `next/font/google`, never `<link>` tags.**

```tsx
import { Outfit, Inter, Geist_Mono } from "next/font/google"

// Display / timer numbers — ultra-light weights
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600"],
  display: "swap",
})

// UI / body — readable weights
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})
```

Apply all three variables to `<body>`:

```tsx
<body className={`${outfit.variable} ${inter.variable} ${geistMono.variable} antialiased`}>
```

Update `globals.css` `@theme inline` to:

```css
--font-sans: var(--font-inter);
--font-display: var(--font-outfit);
--font-mono: var(--font-geist-mono);
```

---

### Step 2 — Replace `globals.css` Palette

Replace the entire CSS custom-properties block with the Zen Organic tokens below. Do **not** use Tailwind color utilities (e.g. `text-green-500`) for brand colors — always reference these CSS variables so dark mode works automatically.

#### Light Mode — "Sage & Cream"

```css
:root {
  /* ── Sage scale ───────────────────────────────────────── */
  --sage-50: #f4f7f3;
  --sage-100: #e6ede4;
  --sage-200: #c8d9c5;
  --sage-300: #a3be9e;
  --sage-400: #7ba87b;
  --sage-500: #6b8f6b; /* primary interactive */
  --sage-600: #5a7a5a;
  --sage-700: #4a6649;
  --sage-800: #3a5038;
  --sage-900: #2a3d27;

  /* ── Warm accent (coins, highlights) ─────────────────── */
  --warm-400: #d4af82;
  --warm-500: #c8a882;
  --warm-600: #b8926a;

  /* ── Neutral cream ────────────────────────────────────── */
  --cream-50: #fafaf7;
  --cream-100: #f5f5f0; /* bg-base */
  --cream-200: #efefea; /* bg-surface */
  --cream-300: #e8e8e2; /* bg-elevated */
  --cream-400: #d4d4cc;
  --cream-500: #b0b0a8;
  --cream-600: #8a9e86; /* text-muted */
  --cream-700: #4a5e47; /* text-secondary */
  --cream-800: #2d3e2b;
  --cream-900: #1b2b1a; /* text-primary */

  /* ── Semantic tokens ──────────────────────────────────── */
  --background: var(--cream-100);
  --foreground: var(--cream-900);
  --primary: var(--sage-500);
  --primary-hover: var(--sage-600);
  --primary-foreground: #ffffff;
  --secondary: var(--cream-200);
  --secondary-foreground: var(--cream-700);
  --muted: var(--cream-200);
  --muted-foreground: var(--cream-600);
  --card: var(--cream-50);
  --card-foreground: var(--cream-900);
  --popover: var(--cream-50);
  --popover-foreground: var(--cream-900);
  --border: rgba(107, 143, 107, 0.18);
  --input: rgba(107, 143, 107, 0.18);
  --ring: var(--sage-500);
  --accent: var(--cream-200);
  --accent-foreground: var(--cream-900);
  --destructive: oklch(0.577 0.245 27.325);
  --radius: 0.5rem;

  /* ── Sidebar (always Forest Floor, ignores light/dark) ── */
  --sidebar: #1b2b1a;
  --sidebar-foreground: #e8ede6;
  --sidebar-primary: var(--sage-400);
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #22311f;
  --sidebar-accent-foreground: #e8ede6;
  --sidebar-border: rgba(255, 255, 255, 0.06);
  --sidebar-ring: var(--sage-400);
}
```

#### Dark Mode — "Forest Floor"

```css
.dark {
  --background: #1b261a;
  --foreground: #e8ede6;
  --primary: var(--sage-400);
  --primary-hover: var(--sage-300);
  --primary-foreground: #1b261a;
  --secondary: #2a3d27;
  --secondary-foreground: #9ebd98;
  --muted: #22311f;
  --muted-foreground: #5c7a58;
  --card: #22311f;
  --card-foreground: #e8ede6;
  --popover: #22311f;
  --popover-foreground: #e8ede6;
  --border: rgba(107, 168, 107, 0.12);
  --input: rgba(107, 168, 107, 0.12);
  --ring: var(--sage-400);
  --accent: #2a3d27;
  --accent-foreground: #9ebd98;
}
```

---

### Step 3 — Add Grain Texture

Add to `globals.css` after the base styles. This creates a subtle paper-like texture via SVG noise. **No image files needed.**

```css
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.035; /* 3.5% in light mode */
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  background-repeat: repeat;
}
/* Slightly stronger in dark mode */
.dark body::before {
  opacity: 0.045;
}
```

---

### Step 4 — Background Utility Class

Add the `timer-bg` class (or rename it to match the page context, e.g. `page-bg`):

```css
/* Static — preferred. 2 radial hints + linear base. */
.zen-bg {
  background:
    radial-gradient(ellipse at 72% 8%, rgba(107, 143, 107, 0.2) 0%, transparent 55%), radial-gradient(ellipse at 20% 90%, rgba(107, 143, 107, 0.12) 0%, transparent 45%),
    linear-gradient(160deg, var(--timer-bg-from) 0%, var(--timer-bg-mid) 50%, var(--timer-bg-to) 100%);
}

/* Add per-theme gradient stop tokens to :root and .dark */
:root {
  --timer-bg-from: #d6e5d3;
  --timer-bg-mid: #c2d8be;
  --timer-bg-to: #b0c9ab;
  --timer-text: #1b2b1a;
  --timer-muted: rgba(27, 43, 26, 0.55);
  --timer-glass: rgba(255, 255, 255, 0.45);
  --timer-glass-border: rgba(255, 255, 255, 0.65);
}
.dark {
  --timer-bg-from: #1b2b1a;
  --timer-bg-mid: #22311f;
  --timer-bg-to: #1a2818;
  --timer-text: #e8ede6;
  --timer-muted: rgba(232, 237, 230, 0.5);
  --timer-glass: rgba(255, 255, 255, 0.06);
  --timer-glass-border: rgba(255, 255, 255, 0.1);
}
```

Apply on the page root: `<div className="zen-bg min-h-screen ...">`.

---

### Step 5 — Typography Rules

| Element                               | Font var                 | Weight  | Size     |
| ------------------------------------- | ------------------------ | ------- | -------- |
| Hero numbers (timer, big price, etc.) | `var(--font-outfit)`     | 100     | 88–108px |
| Section headings                      | `var(--font-inter)`      | 600     | 14–16px  |
| Labels, badges, buttons               | `var(--font-inter)`      | 500–600 | 11–13px  |
| Body / descriptions                   | `var(--font-inter)`      | 400     | 14px     |
| Code / monospace                      | `var(--font-geist-mono)` | 400     | —        |

Apply via inline style or Tailwind class:

```tsx
// Hero number
<div style={{ fontFamily: "var(--font-outfit)", fontWeight: 100 }}>25:00</div>

// UI label
<span className="font-[family-name:var(--font-inter)] font-medium text-sm">Timer</span>
```

---

### Step 6 — Icon Rules

All icons: `strokeWidth={1.25}`. Exception: destructive / alert icons use `strokeWidth={1.5}`.

```tsx
// ✅ All UI icons
<Menu className="h-4 w-4" strokeWidth={1.25} />
<Leaf className="h-4 w-4" strokeWidth={1.25} />

// ✅ Alert/destructive only
<AlertTriangle className="h-5 w-5" strokeWidth={1.5} />
```

**Never** use Lucide's default stroke (2px) — it looks too heavy against the muted palette.

---

### Step 7 — Framer Motion Animation Tokens

Define these constants at the top of any animated component/page:

```ts
import { motion, AnimatePresence } from "framer-motion"

// Standard — buttons, toggles, badges
const spring = { type: "spring", stiffness: 280, damping: 22 }

// Gentle — large containers, hero elements
const gentleSpring = { type: "spring", stiffness: 180, damping: 28 }

// Stagger container — for sequential reveals on mount
const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

// Standard fade-up child
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { ...spring } },
}

// Scale-in child (e.g. hero image, card)
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { ...gentleSpring } },
}
```

Usage pattern for a page:

```tsx
<motion.main variants={staggerContainer} initial="hidden" animate="show">
  <motion.header variants={fadeUp}>...</motion.header>
  <motion.div key={bloomKey} variants={scaleIn}>
    ...
  </motion.div>
  <motion.footer variants={fadeUp}>...</motion.footer>
</motion.main>
```

Use `AnimatePresence mode="wait"` for any conditional renders (active/inactive states, dialogs).

---

### Step 8 — Glass Panel Recipe

**Max blur: 8px (`backdrop-blur-sm`). Never exceed 12px.**

```tsx
// Light mode glass panel
<div className="bg-white/35 border border-white/50 backdrop-blur-sm rounded-lg px-3 py-1.5">

// Dark mode glass panel
<div className="bg-white/8 border border-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">

// Auto-switching (use CSS variables)
<div style={{ background: "var(--timer-glass)", border: "1px solid var(--timer-glass-border)" }}
     className="backdrop-blur-sm rounded-lg px-3 py-1.5">
```

---

### Step 9 — Sidebar (Always Forest Floor)

The sidebar is **always dark** regardless of the page's light/dark mode. Use these hardcoded values:

```tsx
<Sidebar style={{ background: "#1b2b1a" }} className="text-white border-r-0">
  {/* Active nav item */}
  <div style={{ background: "rgba(255,255,255,0.08)", color: "#e8ede6" }}>

  {/* Inactive nav item color */}
  style={{ color: "rgba(232,237,230,0.45)" }}

  {/* Section divider */}
  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
```

Active dot indicator: `style={{ background: "#7ba87b" }}` (sage-400).

---

### Step 10 — Scrollbar

```css
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(107, 143, 107, 0.3);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(107, 143, 107, 0.5);
}
```

---

## Do / Don't Cheatsheet

| ❌ NEVER                                    | ✅ ALWAYS                               |
| ------------------------------------------- | --------------------------------------- |
| Animated mesh gradient                      | Static or 60s-cycle max background      |
| `backdrop-blur > 12px`                      | `backdrop-blur-sm` (8px) maximum        |
| `strokeWidth` default (2px) on icons        | `strokeWidth={1.25}` for all icons      |
| Bold/heavy weights on hero numbers          | Outfit weight 100–200 only              |
| Vibrant, saturated greens (#22c55e etc.)    | Sage, muted, earthy greens only         |
| `transition: all`                           | Specify exact property in transition    |
| `text-green-*` Tailwind utilities for brand | `var(--sage-*)` CSS variables           |
| Drop shadows on everything                  | Shadows only on elevated dialogs/modals |
| Multiple mesh blobs animating               | Two static radial gradients max         |
| Geist Sans for UI                           | Inter for UI, Outfit for display        |

---

## Files Typically Modified

When applying this style to a new project, these are the files you will need to update:

1. **`src/app/globals.css`** — Palette tokens, grain texture, zen-bg class, scrollbar
2. **`src/app/layout.tsx`** — Outfit + Inter font setup
3. **`src/app/page.tsx`** (or main page) — zen-bg class, Framer Motion stagger, thin icons
4. **Modal/Dialog components** — Sage-colored confirm button, reduced shadows
5. **Navigation/Sidebar** — Forest Floor palette, thin icons
6. **Toggle components** — `layoutId` animated pill instead of hard background swap

---

## Reference Implementation

A complete reference implementation of this style exists in:

- `src/app/globals.css` — Full CSS with all tokens
- `src/app/layout.tsx` — Font loading
- `src/app/page.tsx` — Animated page with stagger
- `src/features/timer/components/mode-toggle.tsx` — layoutId pill animation
- `src/features/timer/components/circular-timer.tsx` — Earthy circle styling
- `src/components/app-sidebar.tsx` — Forest Floor sidebar

These files are the ground truth for how this style looks in production.
