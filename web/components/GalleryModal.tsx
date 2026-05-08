'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { GALLERY, BASE_PATH } from '@/lib/content';

type Props = {
  open: boolean;
  onClose: () => void;
};

/**
 * Full-gallery overlay launched from FeaturedWork. Two-level UI:
 *
 *   1. Modal — masonry of every project photo not already featured
 *      elsewhere on the page (hero, owner, before/after, CTA), in a
 *      3-up CSS-columns layout that collapses to 2-up on tablet and
 *      1-up on mobile. Photos render at their natural aspect ratios.
 *
 *   2. Lightbox — clicking a photo opens it large (≤92vw × ≤88vh)
 *      with prev/next nav. ESC, backdrop click, or × closes.
 *
 * Single keyboard handler at the modal level routes:
 *   • ESC          — closes lightbox first, then modal
 *   • ← / →        — when lightbox open: prev / next photo
 *
 * Body scroll is locked while the modal is open. Plain <img> (not
 * next/image) because we don't know per-image dimensions ahead of
 * time. Native loading="lazy" defers offscreen fetches.
 */
export function GalleryModal({ open, onClose }: Props) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement | null>(null);
  // Remember which gallery cell opened the lightbox so we can return
  // focus to it on close — keyboard users get to keep their place in
  // the grid instead of being parachuted back to the gallery's close
  // button.
  const lastFocusedCellRef = useRef<HTMLElement | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const total = GALLERY.length;

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const prevLightbox = useCallback(() => {
    setLightboxIdx((i) => (i == null ? null : (i - 1 + total) % total));
  }, [total]);
  const nextLightbox = useCallback(() => {
    setLightboxIdx((i) => (i == null ? null : (i + 1) % total));
  }, [total]);

  // Body scroll lock + initial focus on the gallery's close button.
  // Keyed only on `open` so it does NOT tear down + re-add when the
  // user navigates between lightbox photos.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
    };
  }, [open]);

  // Keyboard router — single window listener for the whole modal +
  // lightbox tree. Reads latest state via refs so the listener is
  // stable across renders (no rebind on every arrow press, which was
  // dropping keys when held down with key-repeat).
  const stateRef = useRef({ lightboxIdx, onClose, prevLightbox, nextLightbox, closeLightbox });
  stateRef.current = { lightboxIdx, onClose, prevLightbox, nextLightbox, closeLightbox };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      const s = stateRef.current;
      if (e.key === 'Escape') {
        if (s.lightboxIdx !== null) s.closeLightbox();
        else s.onClose();
        return;
      }
      if (s.lightboxIdx !== null) {
        if (e.key === 'ArrowLeft')  { e.preventDefault(); s.prevLightbox(); }
        if (e.key === 'ArrowRight') { e.preventDefault(); s.nextLightbox(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Reset lightbox state when modal closes — otherwise reopening jumps
  // straight back into the lightbox at the previously-viewed photo.
  useEffect(() => {
    if (!open) setLightboxIdx(null);
  }, [open]);

  // Lightbox focus management — when a photo opens, move focus into
  // the lightbox close button (so ESC works immediately and Tab cycles
  // among lightbox controls). When it closes, return focus to the
  // gallery cell that opened it.
  useEffect(() => {
    if (lightboxIdx === null) {
      // Lightbox just closed — restore focus to the originating cell.
      lastFocusedCellRef.current?.focus();
      return;
    }
    // Lightbox opening — defer until paint so the button exists in DOM.
    const t = window.setTimeout(() => lightboxCloseRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [lightboxIdx]);

  if (!open) return null;

  const lightboxItem = lightboxIdx !== null ? GALLERY[lightboxIdx] : null;

  return (
    <div
      className="gallery-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Full project gallery"
      onClick={onClose}
    >
      <div className="gallery-modal__inner" onClick={(e) => e.stopPropagation()}>
        <header className="gallery-modal__head">
          <div>
            <span className="eyebrow no-line">
              The Archive · {total} Projects
            </span>
            <h2 className="display h-md" style={{ marginTop: 12 }}>
              Full <em>gallery.</em>
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            className="gallery-close"
            onClick={onClose}
            aria-label="Close gallery"
          >
            <span aria-hidden>×</span>
            <span className="gallery-close__label">Close</span>
          </button>
        </header>

        <div className="gallery-grid">
          {GALLERY.map((item, i) => (
            <button
              key={item.src}
              type="button"
              className="gallery-cell"
              style={{ animationDelay: `${Math.min(i * 24, 480)}ms` }}
              onClick={(e) => {
                lastFocusedCellRef.current = e.currentTarget;
                setLightboxIdx(i);
              }}
              aria-label={`Open photo: ${item.alt}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BASE_PATH}${item.src}`}
                alt={item.alt}
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      </div>

      {lightboxItem && lightboxIdx !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.alt}
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="lightbox-nav prev"
            onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
            aria-label="Previous photo"
          >
            ‹
          </button>

          <figure
            className="lightbox-figure"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE_PATH}${lightboxItem.src}`}
              alt={lightboxItem.alt}
              decoding="async"
            />
            <figcaption className="lightbox-caption">
              <span className="kicker">
                {String(lightboxIdx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
              <span>{lightboxItem.alt}</span>
            </figcaption>
          </figure>

          <button
            type="button"
            className="lightbox-nav next"
            onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
            aria-label="Next photo"
          >
            ›
          </button>

          <button
            ref={lightboxCloseRef}
            type="button"
            className="lightbox-close"
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            aria-label="Close photo"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
