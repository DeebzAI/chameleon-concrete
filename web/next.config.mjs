/** @type {import('next').NextConfig} */

// GitHub Pages serves the site at `https://<user>.github.io/<repo>/`,
// so every internal asset path needs a `/<repo>` prefix or it 404s.
// In CI we read the repo name from `GITHUB_REPOSITORY` (auto-set by
// GitHub Actions). Locally there's no env var, so basePath stays
// empty and `next dev` keeps working at localhost:3000.
//
// `output: 'export'` produces a static `out/` folder that Pages can
// serve as-is. `images.unoptimized: true` is required because the
// Next.js image optimizer is a server-side route — Pages can't run
// it. Images load at their original size (file in /public).
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const basePath = process.env.GITHUB_ACTIONS && repoName ? `/${repoName}` : '';

const nextConfig = {
  output: 'export',
  basePath,
  // assetPrefix duplicates basePath for /_next/static/* assets. Empty
  // string would still be valid, but Next prefers `undefined` when
  // there's no prefix so leaving it conditional.
  assetPrefix: basePath || undefined,
  // GH Pages serves /foo/ as /foo/index.html; without trailingSlash
  // the static export emits /foo.html which only resolves at /foo
  // (no slash) and breaks relative asset URLs.
  trailingSlash: true,
  images: {
    unoptimized: true,
    qualities: [75, 80, 85, 90],
  },
  // Expose basePath to client code so plain `<img>` tags (gallery,
  // lightbox) can manually prefix their src — Next.js Image components
  // auto-prefix, but raw img elements don't.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  experimental: {
    optimizePackageImports: [],
  },
};

export default nextConfig;
