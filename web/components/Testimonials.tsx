'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { TESTIMONIALS } from '@/lib/content';

/**
 * Client Voices — infinite-loop horizontal carousel.
 *
 * Auto-advances forward one card every 5 seconds. To make the wrap
 * seamless we render the testimonials TWICE end-to-end (DOM has 2N
 * cards). Each tick smooth-scrolls forward by one DOM card; when that
 * lands in the duplicate half, after the scroll settles we instant-snap
 * scrollLeft back by N cards' worth — the user sees identical content
 * before and after the snap, so there's no visible jump and the loop
 * appears to run forever.
 *
 * No hover behavior, no manual nav UI, no progress chrome — the section
 * is a passive reading band. User can still drag/swipe the track via
 * native overflow scrolling. Reduced-motion disables auto-advance.
 */

const AUTO_INTERVAL_MS = 5000;
// Browser smooth-scroll completes in ~300-600ms; padding to 700ms keeps
// the instant-snap reliably AFTER the smooth motion has finished.
const SCROLL_SETTLE_MS = 700;

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const total = TESTIMONIALS.length;

  const [autoOn, setAutoOn] = useState(true);
  useEffect(() => {
    setAutoOn(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // ── Helpers ──────────────────────────────────────────────────
  const findCurrentDomIdx = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const cards = track.children;
    if (cards.length === 0) return 0;
    const left = track.scrollLeft;
    let bestIdx = 0;
    let bestDist = Infinity;
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      const d = Math.abs(card.offsetLeft - left);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    }
    return bestIdx;
  }, []);

  // ── Auto-advance ─────────────────────────────────────────────
  // Pure setInterval — does NOT depend on logicalIdx, so user scroll
  // events don't reset the cadence. The tick reads scrollLeft fresh
  // each fire, so it always advances from wherever the user is.
  //
  // Pending wrap-snap timeouts are tracked in a Set so they can ALL
  // be cleared on unmount. Without this, a tick that schedules a
  // 700ms snap-back will fire after unmount and call scrollTo on a
  // stale ref (or worse, on a different mounted instance during HMR).
  useEffect(() => {
    if (!autoOn) return;
    const pendingSnaps = new Set<number>();

    const tick = () => {
      const track = trackRef.current;
      if (!track) return;
      const cards = track.children;
      if (cards.length < total * 2) return; // markup not hydrated yet

      const curDom = findCurrentDomIdx();
      const nextDom = curDom + 1;

      // Edge: user dragged to the absolute end (curDom = 2N-1). Snap
      // back to the first-half mirror so we have room to advance.
      if (nextDom >= cards.length) {
        const back = cards[curDom - total] as HTMLElement | undefined;
        if (back) track.scrollTo({ left: back.offsetLeft });
        return;
      }

      const target = cards[nextDom] as HTMLElement;
      track.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });

      // If we just stepped into the duplicate half, after the smooth
      // scroll completes instant-snap to the equivalent first-half
      // position. Visually identical content — no perceptible jump.
      if (nextDom >= total) {
        const snapId = window.setTimeout(() => {
          pendingSnaps.delete(snapId);
          const t = trackRef.current;
          if (!t) return;
          const equiv = t.children[nextDom - total] as HTMLElement | undefined;
          if (equiv) t.scrollTo({ left: equiv.offsetLeft });
        }, SCROLL_SETTLE_MS);
        pendingSnaps.add(snapId);
      }
    };
    const intervalId = window.setInterval(tick, AUTO_INTERVAL_MS);
    return () => {
      clearInterval(intervalId);
      for (const id of pendingSnaps) clearTimeout(id);
      pendingSnaps.clear();
    };
  }, [autoOn, total, findCurrentDomIdx]);

  // Render cards twice — same content, unique keys via the loop pass.
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="section" style={{ background: 'var(--bg-2)' }}>
      <div className="container-x">
        <div className="sect-head">
          <div className="left">
            <span className="eyebrow reveal">Client Voices</span>
            <h2 className="display h-lg reveal" style={{ ['--rd' as string]: '120ms' }}>
              What homeowners <em>say after.</em>
            </h2>
          </div>
          <div className="right reveal" style={{ ['--rd' as string]: '240ms' }}>
            <p className="lede">
              {total} verified Google reviews across our portfolio. Drag
              or swipe to read at your own pace — or let it cycle.
            </p>
          </div>
        </div>

        <div
          className="testimonials-carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >
          {/* No `aria-live` — auto-advance ticks every 5s would cause
              screen readers to narrate every testimonial as it scrolls
              past. The role/label on the parent + per-slide labels
              already inform AT users about the structure. */}
          <div
            ref={trackRef}
            className="testimonials-track"
          >
            {doubled.map((t, i) => {
              const logical = i % total;
              // Mark the duplicate copies aria-hidden so screen readers
              // don't read every quote twice. Visual users still see them.
              const isDuplicate = i >= total;
              return (
                <figure
                  key={i}
                  className="tst"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Testimonial ${logical + 1} of ${total}`}
                  aria-hidden={isDuplicate || undefined}
                >
                  <div className="tst-stars" aria-label="Five out of five stars">
                    <span aria-hidden>★ ★ ★ ★ ★</span>
                  </div>
                  <blockquote className="tst-quote">“{t.quote}”</blockquote>
                  <figcaption className="tst-attr">
                    <span className="name">{t.name}</span>
                    <span className="loc">{t.loc} · {t.project}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
