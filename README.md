# Chameleon Concrete — Site

Marketing site for Chameleon Concrete Projects (Adam Samarco, Franklin MA).
Next.js 15 + React 19 + Tailwind, statically exported for GitHub Pages.

## Local dev

```bash
cd web
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy

Pushed to `main` → the workflow at `.github/workflows/deploy.yml`
builds the static export and publishes it to GitHub Pages.

Repo Settings → Pages → Source must be set to **GitHub Actions**.

## Where things live

- `web/app/` — Next.js App Router pages + global CSS
- `web/components/` — section components (Hero, FeaturedWork, Testimonials…)
- `web/lib/content.ts` — single source of truth for site copy + image lists
- `web/public/images/` — project photos
- `design_handoff_chameleon_concrete/` — original Figma handoff (reference only)

## Updating content

Most edits happen in `web/lib/content.ts`. The arrays there drive the
hero, services, projects grid, gallery, testimonials, and contact panel.
