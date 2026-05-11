'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PROJECTS, FEATURED_PROJECT_IDS } from '@/lib/content';
import { GalleryModal } from './GalleryModal';

// Build the curated list once at module load. Lookup by id keeps the
// editorial sequence in `FEATURED_PROJECT_IDS` independent of the
// PROJECTS array order — Adam can re-curate by editing one short list
// in `lib/content.ts` without re-shuffling the master data.
const _byId = new Map(PROJECTS.map((p) => [p.id, p]));
const FEATURED = FEATURED_PROJECT_IDS.map((id) => {
  const p = _byId.get(id);
  if (!p) throw new Error(`FEATURED_PROJECT_IDS references unknown id ${id}`);
  return p;
});

/**
 * Selected Work — editorial photo grid.
 *
 * Layout: 12-col asymmetric. Three full-width statement shots (start /
 * middle / end) anchor the spread; in between, alternating col-8 + col-4
 * and col-7 + col-5 pairs create dramatic size contrast row to row.
 *
 * Aspect varies per card so portraits stay tall and landscapes stay wide
 * (no awkward forced crops). Defaults flow from `span` — cards opt out
 * via the `aspect` field in `lib/content.ts`.
 *
 * Curation: render order + selection comes from FEATURED_PROJECT_IDS in
 * `lib/content.ts` (a tight 5-card cut — wide opener, three-portrait
 * row, wide closer). Everything else lives in the full-gallery modal
 * launched from the CTA underneath.
 *
 * Presentation:
 *   • Default state — only the photo + a small sequence number top-right.
 *     Number uses mix-blend-mode: difference so it reads on any background.
 *   • Hover — bottom gradient rises, italic Fraunces title slides up,
 *     mono caps tag (sandstone) and location appear beneath.
 *   • Touch / narrow viewports — overlay is always visible (no hover).
 */
export function FeaturedWork() {
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <section className="section" id="work">
      <div className="container-x">
        <div className="sect-head">
          <div className="left">
            <span className="eyebrow reveal">Selected Work · 2018 to 2026</span>
            <h2 className="display h-lg reveal" style={{ ['--rd' as string]: '120ms' }}>
              Each environment, <em>singular.</em>
            </h2>
          </div>
          <div className="right reveal" style={{ ['--rd' as string]: '240ms' }}>
            <p className="lede">
              A working archive of carved water features, sculpted walls,
              poured pools and stamped patios. Every piece designed and
              hand-finished on site by Adam and crew.
            </p>
            <a href="#contact" className="lnk">
              Discuss a Project <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        <div className="projects">
          {FEATURED.map((p, i) => (
            <article
              key={p.id}
              className={`proj col-${p.span}`}
              data-aspect={p.aspect ?? ''}
            >
              <div className="img-frame">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  loading="lazy"
                  quality={85}
                  sizes={
                    p.span === 12
                      ? '100vw'
                      : p.span === 8
                        ? '(max-width: 960px) 100vw, 66vw'
                        : p.span === 7
                          ? '(max-width: 960px) 100vw, 58vw'
                          : p.span === 5
                            ? '(max-width: 960px) 100vw, 42vw'
                            : '(max-width: 960px) 100vw, 33vw'
                  }
                />
                <span className="proj-num" aria-hidden>
                  {String(i + 1).padStart(3, '0')}
                </span>
                <div className="proj-overlay">
                  <h3>{p.title}</h3>
                  <div className="meta-row">
                    <span className="tag">{p.tag}</span>
                    <span className="loc">{p.loc}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="gallery-cta-wrap reveal">
          <button
            type="button"
            className="btn ghost lg"
            onClick={() => setGalleryOpen(true)}
          >
            View Full Gallery
            <span className="arr" aria-hidden>→</span>
          </button>
          <span className="gallery-cta-note kicker">
            All Projects · Photographed On Site
          </span>
        </div>
      </div>

      <GalleryModal open={galleryOpen} onClose={() => setGalleryOpen(false)} />
    </section>
  );
}
