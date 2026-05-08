# Handoff: Chameleon Concrete Projects — Homepage Redesign

## Overview
A premium, cinematic single-page marketing site for **Chameleon Concrete Projects**, a custom carved- and decorative-concrete contractor in Franklin, MA owned by Adam Samarco. The page positions Adam's work as artisan craft — water features, grottos, pools, carved walls, and patios — and drives leads to a free-estimate CTA via phone, email, or form.

## About the Design Files
The files in this bundle are **design references created in HTML** — interactive prototypes showing intended look, motion, and behavior. They are **not production code to copy directly**.

The task is to **recreate these designs in the target codebase's existing environment** (Next.js, Astro, plain HTML/CSS, etc.) using its established patterns, component primitives, and asset pipeline. If no codebase exists yet, build it in **Next.js (App Router) + Tailwind + a CMS-friendly content layer** (MDX or a headless CMS) so Adam can edit copy, photos, and project entries without a developer.

## Fidelity
**High-fidelity.** Pixel-targeted mockups with final palette, typography scale, spacing rhythm, scroll-driven motion, and interaction states. Recreate the visual language and animations as faithfully as the target stack allows; do not redesign.

## Screens / Views

The prototype is a **single long-scroll homepage** with the following sections, in order:

### 1. Fixed Top Nav (`<Nav>`)
- **Position:** `position: fixed; top: 0`, full-width, transparent on hero, gains a charcoal background + bottom hairline once `scrollY > 40`.
- **Layout:** logo left · link group center · CTA button right. Mobile collapses to hamburger that slides a full-screen drawer down from the top.
- **Logo:** Square sandstone "C" mark + wordmark "Chameleon Concrete" in Fraunces semibold.
- **Links:** Work, Services, Process, Studio, Contact.
- **CTA:** "Begin a Project" — outlined warm-white button, fills on hover.
- **Underline animation:** each nav link has a sandstone hairline that scales from `scaleX(0)` left-origin to `1` on hover (320 ms).

### 2. Hero (`<Hero>`)
- **Full-bleed photographic background** filling at least `100svh` (with a 640 px floor so short laptops still get a clean composition).
- **Image:** Adam's signature night fire-pit + carved tree-stump pizza oven shot with string lights overhead.
- **Overlay:** linear gradient charcoal-to-transparent bottom-up, plus a soft vignette, to keep the headline legible.
- **Eyebrow:** small mono caps "Chameleon Concrete · Custom carved concrete · est. Franklin MA".
- **Headline (h1):** Fraunces 300 italic-mix display, 96–168 px clamp, 2 lines. Default copy: "Concrete carved into *art.*". 5 alternates exposed via the Tweaks panel.
- **Sub:** 18 px Inter regular, max-width ~640 px.
- **Two CTAs:** primary filled "Request a Custom Quote" (mailto), secondary ghost "View the Work" (anchor). Animated arrow inside primary translates 4 px right on hover.
- **Phone kicker:** "(916) 215 — 6482 · Franklin, MA & Surrounding".
- **Animated scroll cue:** 1 px line that loops a slow drop from `top: -30 px` to `top: 60 px` (2.4 s ease-in-out infinite).
- **Scroll-driven motion:** as the hero leaves the viewport, the BG image scales from 1.0 → 1.08 + drifts 40 px down + dims to 75 % brightness; headline lifts 28 px and fades. Drive with a CSS custom property `--scroll: 0..1` updated in `requestAnimationFrame`.

### 3. Trust Strip (`<TrustStrip>`)
- **Layout:** 4-column grid, charcoal `bg-2`, hairline top + bottom borders, vertical hairlines between cells.
- **Cells:** "5.0 ★ — Google · 18 Reviews", "Free. — No-Obligation Estimates", "Franklin MA — & Surrounding New England", "Adam & Crew — One Team, Start to Finish".
- **Type:** big number/word in Fraunces 144 px wonk, label in mono caps 11 px.

### 4. Featured Work (`<FeaturedWork>`)
- **Heading block:** eyebrow "Selected Work · 2018 — 2026" / h2 "Each environment, *singular.*" / right-side lede + "View Full Portfolio →" link.
- **Grid:** 12-col CSS grid, 32 px gap, asymmetric placement:
  - Card 1: `span 7`, water feature
  - Card 2: `span 5`, accent wall detail
  - Card 3: `span 5`, lit waterfall grotto (night)
  - Card 4: `span 7`, pool
  - Card 5: `span 12`, fire-pit + stump-oven landscape
- **Card:** 4:5 aspect image-frame + meta row (title + tag left, location right).
- **Reveal:** diagonal clip-path wipe (`polygon(0 100%, 0 100%, 100% 100%, 100% 100%)` → `polygon(0 0, 0 100%, 100% 100%, 100% 0)`), 1500 ms, staggered.
- **Hover:** card lifts 6 px, image scales to 1.07 (1200 ms ease-out), meta slides 6 px right.
- **Mobile:** all cards span 12.

### 5. Marquee (`<Marquee>`)
- **Italic Fraunces** running ticker of capability words: Pools / Waterfalls / Grottos / Carved Walls / Outdoor Rooms / Fireplaces / Sculpted Stone / By Hand. Loops `translateX(0)` → `translateX(-50%)` over 60 s.
- **Hover:** slows to 80 s.

### 6. Services (`<Services>`)
- **Heading:** eyebrow "Capabilities" / h2 "From study to *sculpted form.*" / right-side lede.
- **Grid:** 2×2 on desktop, 1 col on mobile. Each row has top + left hairlines.
- **Service:**
  - Title (Fraunces 36 px)
  - Body (Inter 16 px, max ~52ch)
  - Numbered "01"–"04" in mono caps, top-right
  - Diagonal arrow `↗` bottom-right that translates 8 px NE on hover
- **Hover:** sandstone underline grows from `width: 0` to `100%` along the row's top edge, 700 ms.
- **Items:** Water Features & Grottos · Pools & Pool Decks · Carved & Retaining Walls · Patios & Outdoor Living.

### 7. Before / After Slider (`<BeforeAfter>`)
- **Heading:** eyebrow "Transformations" / h2 "Drag the line. *Change the land.*"
- **Frame:** 16:9, two stacked images. The "after" image is clipped via `clip-path: inset(0 0 0 var(--ba-pos))`. A vertical handle at `--ba-pos` (default 50 %) is draggable (mouse + touch + keyboard).
- **Tags:** "Before" bottom-left, "After" bottom-right, mono caps.
- **Footer caption:** mono small text under the slider with project name.

### 8. Owner / Studio (`<OwnerStory>`)
- **Layout:** 2-col on desktop. Left = portrait (4:5, image-slot id `owner-portrait`). Right = eyebrow + h2 headline + pull-quote (Fraunces italic 28 px) + bio paragraph + name/role byline.
- **Reveal:** portrait uses left-to-right `clip-path: inset(0 100% 0 0)` wipe (1600 ms).
- **Copy** (placeholder until Adam confirms):
  - h2: "Adam & crew. Concrete as a craft."
  - Quote: "We build concrete that feels natural, permanent, and completely custom to the space."
  - Bio: see source data below.
  - Byline: "Adam Samarco · Owner · Lead Carver".

### 9. Process (`<Process>`)
- **Heading:** eyebrow "The Process" / h2 "How an environment *takes shape.*"
- **Layout:** 4 columns, each with mono "01"…"04", a Fraunces title, and an Inter body. Vertical hairlines between columns.
- **Reveal:** sandstone hairline draws across the bottom of each step (`width: 0 → 100%`, 1000 ms, staggered).
- **Steps:** Site Walk · Concept & Estimate · Form, Pour & Carve · Color & Finish.

### 10. Testimonials (`<Testimonials>`)
- **Heading:** eyebrow "Client Voices" / h2 "What homeowners *say after.*"
- **3 cards** in a row: large opening curly quote glyph (sandstone), Fraunces italic body 22 px, attribution row (name + location · project).
- **Hover:** card background lifts from `bg-2` to `bg-3`, border darkens to `line-strong`.
- **Currently uses anonymized "Google Review" attributions** — Adam needs to grant permission for real names before publishing.

### 11. Final CTA (`<FinalCTA>`)
- **Full-bleed background image** (moody night waterfall), 50 % charcoal overlay.
- **Centered:** eyebrow "Begin Your Project" (no underline variant) / h2 "Let's design something *you can't unsee.*" / two CTAs / 4-cell meta strip (Free Estimate · Call/Text · 5.0 ★ Google · Franklin MA).

### 12. Footer
- **3-col layout:** brand block (logo, paragraph, "5.0 ★ Google · Free Estimates"), Services links, Contact links.
- **Bottom row:** copyright + concept-mockup credit, mono caps.

### 13. Sticky Mobile CTA
- **Visible below 720 px and above the hero only.** Charcoal pill, "Begin your project · 2 day response · book 2026" + arrow CTA. Hides as user scrolls back to top.

## Interactions & Behavior

- **Reveal-on-scroll** — IntersectionObserver, threshold 0.12, rootMargin `0 0 -60 px 0`, fires once per element by class:
  - `.reveal` — 28 px slide up + fade (1100 ms)
  - `.reveal-img` — bottom-up clip-path wipe (1400 ms)
  - `.reveal-diag` — diagonal polygon wipe (1500 ms)
  - `.reveal-left` — left-to-right inset wipe (1600 ms)
  - `.split-line` — per-line `translateY(110%) → 0` (1100 ms, staggered 90 ms per line)
  - `.eyebrow` — sandstone hairline grows from `0 → 32px width`, 900 ms, 200 ms delay
- **Headline auto-split** — any element with `data-split` gets its `<br/>`-separated lines wrapped in `.split-line > span` and animated independently.
- **Hero parallax** — rAF-throttled scroll handler updates `--scroll: 0..1` on `.hero-bg` and `.hero-content`; CSS does the rest.
- **Sticky nav** — toggles `.scrolled` class at `scrollY > 40`.
- **Mobile drawer** — opens on hamburger click, slides from `translateY(-100%)` to 0 (480 ms).
- **Before/After slider** — pointer events on the handle update `--ba-pos: 0%..100%`. Keyboard accessible (arrow keys move 2 % each).
- **Sticky CTA** — hides while `scrollY < 200`, slides up after.
- **Smooth scroll** — `html { scroll-behavior: smooth }` for anchor jumps.
- **Reduced motion** — `@media (prefers-reduced-motion: reduce)` disables all transitions, parallax, grain, and clip-path reveals.

## State Management

The prototype is single-page and stateless on the server side. Client state needed:
- **Nav scrolled** (boolean)
- **Mobile drawer open** (boolean)
- **Tweaks** (palette, headlineIdx, ctaPrimary, ctaSecondary, navCta) — only used in the prototype; not a production concern.
- **Before/After position** (number, 0..100).

For the production site, you primarily need:
- A **lead-form submit** path (POST to email handler / CRM) — the prototype just does `mailto:` and `tel:`.
- **Content sourced from a CMS** (or MDX): projects array, services array, process steps, testimonials, owner copy.

## Design Tokens

Sourced from `styles.css`. The tokens below are the canonical "charcoal" palette; the prototype also has "sand" and "warm" alternates exposed via `data-palette` on `<html>`, but only "charcoal" needs to ship.

### Colors

| Token | Value | Usage |
|---|---|---|
| `--bg`           | `#0E0D0B` | Primary canvas |
| `--bg-2`         | `#161412` | Section bands, trust strip |
| `--bg-3`         | `#1F1C18` | Card / image-slot fallback |
| `--warm-white`   | `#F4EFE6` | Primary text on dark |
| `--off-white`    | `#E8E1D4` | Secondary text |
| `--muted`        | `#A39A8B` | Mono labels, eyebrows |
| `--muted-2`      | `#6B635A` | Tertiary |
| `--sandstone`    | `#D9A574` | Accent / italic / hover |
| `--sandstone-deep` | `#B07F4E` | Hover-deep |
| `--line`         | `rgba(244,239,230,.08)` | Hairlines |
| `--line-strong`  | `rgba(244,239,230,.18)` | Section borders |

### Typography

- **Display** — `Fraunces` (variable, opsz 9–144, wght 300–600, SOFT 30–100, WONK 0–1). Italic mix used for accent words inside headlines.
- **Body** — `Inter` 400/500/600.
- **Mono** — `JetBrains Mono` 400/500. Used for eyebrows, meta strips, numbers, captions.

### Type scale

| Class | Size (clamp) | Weight | Line-height |
|---|---|---|---|
| `.h-xl`  | clamp(56px, 9vw, 168px) | 300 | 0.92 |
| `.h-lg`  | clamp(40px, 6vw, 96px)  | 300 | 0.96 |
| `.h-md`  | clamp(32px, 4vw, 56px)  | 400 | 1.04 |
| `.lede`  | 18 px | 400 | 1.55 |
| `.eyebrow` | 11 px | 500 mono caps, 0.14em letter-spacing | 1 |

### Spacing

`--pad-x: clamp(20px, 5vw, 80px)` — horizontal page padding.
Section vertical padding: `clamp(80px, 12vh, 160px)`.
Grid gap: 32 px desktop / 16 px mobile.

### Radii / Shadows

- Buttons: 999 px (pill).
- Cards: 0 px (sharp corners).
- Project hover: `box-shadow: 0 12px 32px -12px rgba(217, 119, 87, 0.55)` on CTAs only; cards lift via `translateY(-6px)` only.

### Easing

- Default: `cubic-bezier(.2, .8, .2, 1)` (ease-out, slightly snappy)
- Reveals: `cubic-bezier(.7, 0, .3, 1)` (ease-in-out, longer)
- Diagonal: `cubic-bezier(.65, 0, .25, 1)`

### Motion timings

| Effect | Duration |
|---|---|
| Reveal slide+fade | 1100 ms |
| Image clip wipe | 1400 ms |
| Diagonal wipe | 1500 ms |
| Side wipe | 1600 ms |
| Marquee | 60 s default, 80 s on hover |
| Scroll cue | 2.4 s |
| Hover state | 280 ms |
| Nav scrolled | 320 ms |

## Source Content

Use this exact copy in production unless Adam supplies replacements. **Bolded** items are confirmed; *italicized* items are placeholders pending confirmation.

- **Brand:** Chameleon Concrete Projects
- **Owner:** Adam Samarco · Owner · Lead Carver
- **Location:** Franklin, MA · serving Franklin & surrounding New England communities
- **Phone:** (916) 215 — 6482
- *Email:* adam@chameleonconcrete.com (placeholder)
- **Reviews:** 5.0 ★ across 18 Google reviews
- **Services:** Water Features & Grottos · Pools & Pool Decks · Carved & Retaining Walls · Patios & Outdoor Living
- *Hero headline default:* "Concrete carved into *art.*" (5 alts in `HEADLINES` const)
- **Owner bio (placeholder):** "Chameleon Concrete Projects is led by Adam Samarco out of Franklin, Massachusetts. Adam is known by clients for creativity, deep concrete knowledge, and an eye for blending new carved work into existing decking and landscape — so what we add looks like it was always there. Every project is run by Adam and the same crew, start to finish."

### Open content questions for Adam (flag these to the client before launch)

- Founding year, total projects completed, crew size.
- License / insurance / bonded status + license numbers.
- Real project names, towns, and years for the 5 gallery cards (currently labeled "Confirm w/ owner").
- Permission to use Google reviewer names verbatim.
- Founding story / background (stonemasonry, theme parks, family trade?).
- Final email address and domain.
- Owner portrait — replace placeholder with on-site working shot.

## Assets

- **44 source photos** in `uploads/` — Adam's project photography (water features, fire pits, walls, patios, pools, grottos). Full-resolution JPEGs.
- **Sidecar** `.image-slots.state.json` — pre-cropped WebP data URLs at the slot's exact aspect ratio. Don't ship this in production; instead, export each photo at the listed crop and serve as a normal `<img>` or `<Image>` (Next.js).
  - `hero-bg` ← `chameleon_concrete_42.jpg`, 16:9
  - `proj-1` ← `chameleon_concrete_41.jpg`, 4:5 (water feature)
  - `proj-2` ← `chameleon_concrete_34.jpg`, 4:5 (carved post)
  - `proj-3` ← `chameleon_concrete_40.jpg`, 4:5 (lit waterfall)
  - `proj-4` ← `chameleon_concrete_03.jpg`, 4:5 (pool)
  - `proj-5` ← `chameleon_concrete_38.jpg`, 4:5 (night patio)
  - `ba-before` ← `chameleon_concrete_27.jpg`, 16:9 (fresh slab)
  - `ba-after` ← `chameleon_concrete_26.jpg`, 16:9 (finished slate walkway)
  - `cta-bg` ← `chameleon_concrete_39.jpg`, 16:7 (moody night waterfall)
  - `owner-portrait` ← `chameleon_concrete_31.jpg`, 4:5
- **Fonts** — Fraunces, Inter, JetBrains Mono (Google Fonts). Self-host in production for performance.

## Files

In this handoff:

- `Chameleon Concrete - Homepage.html` — entry point; data constants (HEADLINES, TRUST, PROJECTS, SERVICES, PROCESS, OWNER, TESTIMONIALS, MARQUEE) and root `<App>`.
- `sections-top.jsx` — `useReveal`, `ImageSlot`, `Nav`, `Hero`, `TrustStrip`, `Marquee`. Includes the scroll-driven hero parallax and headline split-line logic.
- `sections-mid.jsx` — `FeaturedWork`, `Services`, `BeforeAfter`.
- `sections-bot.jsx` — `OwnerStory`, `Process`, `Testimonials`, `FinalCTA`, `Footer`, `StickyCTA`.
- `styles.css` — full design system: tokens, typography, layout, every animation listed above. **This is the most authoritative artifact** — most production work is translating these styles into the target stack's idioms.
- `image-slot.js` — prototype-only image upload component; **do not ship**. Replace with `<Image>` / `<img>` in production.
- `tweaks-panel.jsx` — prototype-only Tweaks panel; **do not ship**.
- `uploads/` — original full-resolution photos.

## Recommended production stack

If starting fresh: **Next.js 14 (App Router) + Tailwind + a content layer** (MDX for projects/testimonials, or Sanity/Contentful if Adam needs a UI). Self-host fonts; serve photos through `next/image`. The lead form should POST to a Resend / SendGrid handler with Adam's inbox CC'd. Ship Lighthouse-clean: photos at modern formats (AVIF/WebP), `loading="lazy"` below the fold, `prefers-reduced-motion` respected exactly as in the prototype.
