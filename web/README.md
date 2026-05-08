# Chameleon Concrete Projects — Production Site

Premium marketing site for **Chameleon Concrete Projects**, a custom
carved- and decorative-concrete contractor in Franklin, MA owned by
Adam Samarco. Single long-scroll homepage with cinematic motion,
sandstone + charcoal palette, real photography from the field.

Built from the design handoff in `../design_handoff_chameleon_concrete/`.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 3** for utility classes (theme tokens wired to CSS variables)
- **`next/font`** for self-hosted Fraunces, Inter, JetBrains Mono
- **`next/image`** for AVIF/WebP photo delivery
- 100% static build — deploys to Vercel, Netlify, or any static host

## Run it

```bash
cd web
npm install     # first time only
npm run dev     # dev server on http://localhost:3000
```

```bash
npm run build && npm start    # production server
```

## File map

```
web/
├── app/
│   ├── layout.tsx        # html shell, fonts, SEO meta, JSON-LD schema
│   ├── page.tsx          # composes the homepage
│   └── globals.css       # design system — tokens, type, sections, motion
├── components/
│   ├── Nav.tsx           # fixed nav + mobile drawer (focus trap, ESC)
│   ├── Hero.tsx          # full-bleed hero with rAF-driven parallax
│   ├── SplitHeadline.tsx # per-line mask-up reveal (works on prop change)
│   ├── TrustStrip.tsx    # 4 trust cells
│   ├── FeaturedWork.tsx  # 12-col asymmetric gallery, diagonal reveal
│   ├── Marquee.tsx       # italic capability ticker (each word a flex item)
│   ├── Services.tsx      # 2x2 capabilities grid
│   ├── BeforeAfter.tsx   # accessible drag/keyboard slider
│   ├── OwnerStory.tsx    # portrait + bio (left-to-right wipe)
│   ├── Process.tsx       # 4 process steps, sequential underline reveal
│   ├── Testimonials.tsx  # 3 quote cards
│   ├── FinalCTA.tsx      # full-bleed CTA + meta strip
│   ├── Footer.tsx        # 4-col footer
│   ├── StickyCTA.tsx     # mobile-only persistent CTA
│   └── useReveal.ts      # IntersectionObserver hook
├── lib/
│   ├── content.ts        # all copy/data — Adam edits this
│   └── fonts.ts          # next/font configs
├── public/images/        # 44 source photos
└── next.config.mjs       # AVIF/WebP, image optim
```

## Editing copy

Almost everything Adam might change lives in **`lib/content.ts`**:

- Brand: name, owner, phone, email, location, review count
- Headlines (5 alts, swap `HEADLINE_HTML` to use a different one)
- Trust strip cells
- Project list (image + alt + title + tag + location + grid size)
- Services, Process steps, Owner bio, Testimonials, Marquee words

Image filenames map to `/public/images/`. To swap a photo, drop a new
JPG (or AVIF/WebP) in there and update the `image:` path in `content.ts`.

## What got fixed from the prototype

The original handoff was a Babel-in-the-browser prototype. The audit found:

| Issue | Fix |
|---|---|
| Palette mismatch (README vs CSS) | Adopted README tokens as canonical |
| Owner portrait used wrong reveal class | `reveal-img` → `reveal-left` |
| Headline split broke on re-render | Done in JSX (`SplitHeadline.tsx`) |
| Project hover scale rule conflict (1.07 vs 1.04) | Single rule, 1.07 |
| Marquee mashed words into one string | Each word now a flex item |
| Marquee duration mismatch | 60s default / 80s on hover |
| `transition: animation-duration` (no-op) | Removed |
| Before/After missing keyboard | `role="slider"` + arrows + Home/End/PgUp/PgDn |
| Drawer no focus trap / Escape | Added |
| No `:focus-visible` styles | Sandstone outline on all interactive elements |
| Service cards faked clickability | Cursor only flagged interactive when actually so |
| Hero phone kicker missing | Added |
| StickyCTA threshold drift (400 vs 200) | 200 (matches README) |
| No SEO meta / OG / Twitter / JSON-LD | Full schema, OG image, Twitter card |
| `<a href="#">` empty logo link | `#top` |
| Duplicate `html { scroll-behavior }` | One declaration |
| Photos via prototype `<image-slot>` (not for prod) | `next/image` with explicit alt |
| Missing skip-to-content link | Added (visible on focus) |

## Open content questions for Adam

The prototype called these out — flag before launch:

- **Phone area code 916 is California.** Confirm whether to keep or replace with a Franklin-area number.
- **Email** — `adam@chameleonconcrete.com` is a placeholder.
- Real project names, towns, and years for the 5 gallery cards.
- Permission to use Google reviewer names verbatim.
- Founding year, total projects, crew size, license/insurance numbers.
- Founding story / background.
- Owner portrait — currently a project shot (`chameleon_concrete_31.jpg`); replace with a working-on-site shot when available.

## Deploy

**Vercel (recommended):**
```bash
npx vercel
```
Set `NEXT_PUBLIC_SITE_URL` to the final domain (e.g. `https://chameleonconcrete.com`) so OG/Twitter previews use absolute URLs.

**Anywhere else:** `npm run build` produces a `.next/` folder. Serve with `npm start` (Node), or run `next build && next export` if your host needs static HTML.

## Adding a real lead form

The current CTAs use `mailto:` and `tel:` — works on every device with no backend. When Adam wants a proper form (with spam protection, CRM forwarding, etc.), the cleanest path is:

1. Add an `app/api/lead/route.ts` that accepts a POST.
2. Forward via Resend / SendGrid to Adam's inbox.
3. Replace the "Request a Custom Quote" button in `FinalCTA.tsx` with a small form (name, email, phone, project description).

I left this as `mailto:` because it ships zero infra and works today.
