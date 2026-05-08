'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';
import { BA_IMAGES } from '@/lib/content';

/**
 * Before/After slider. Drag the vertical handle (mouse, touch, pointer)
 * or use the keyboard (◀ ▶ Home End) to scrub between the two images.
 * Exposed as role="slider" with aria-valuenow for screen readers.
 *
 * Position is held in a ref + a CSS variable rather than React state
 * during drag — every pointermove would otherwise reflow + re-render
 * the whole component. State only updates on pointerup so a11y values
 * stay coherent.
 */
export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const wrapRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const liveValRef = useRef(50);

  const apply = useCallback((val: number) => {
    const clamped = Math.max(2, Math.min(98, val));
    liveValRef.current = clamped;
    wrapRef.current?.style.setProperty('--ba-pos', `${clamped}%`);
    return clamped;
  }, []);

  const setFromX = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    apply(((clientX - r.left) / r.width) * 100);
  }, [apply]);

  // Capture on `currentTarget` (the wrapper) rather than `e.target` (the
  // deepest hit, often the inner <Image> or a tag chip). Capturing the
  // wrapper makes the drag survive pointer travel between children, and
  // matches the element our pointermove handler is bound to.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    draggingRef.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setFromX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    setFromX(e.clientX);
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    setPos(liveValRef.current);
  };

  // Keyboard support — README spec: arrow keys move 2% each.
  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let next = liveValRef.current;
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown': next -= 2; break;
      case 'ArrowRight':
      case 'ArrowUp':   next += 2; break;
      case 'PageDown':  next -= 10; break;
      case 'PageUp':    next += 10; break;
      case 'Home':      next = 0; break;
      case 'End':       next = 100; break;
      default: return;
    }
    e.preventDefault();
    setPos(apply(next));
  };

  // Initial CSS var — match React state on mount (SSR delivers the static 50%).
  useEffect(() => {
    apply(pos);
    // we only want to run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="section">
      <div className="container-x">
        <div className="sect-head">
          <div className="left">
            <span className="eyebrow reveal">Transformations</span>
            <h2 className="display h-lg reveal" style={{ ['--rd' as string]: '120ms' }}>
              Drag the line.<br /><em>Change the land.</em>
            </h2>
          </div>
          <div className="right reveal" style={{ ['--rd' as string]: '240ms' }}>
            <p className="lede">
              Most of our projects begin as flat lawn or unfinished slab. The
              same footprint becomes a sculpted environment in eight to fourteen
              weeks, poured and carved by hand.
            </p>
          </div>
        </div>

        <div
          ref={wrapRef}
          className="ba-wrap reveal"
          style={{ ['--ba-pos' as string]: `${pos}%` }}
          role="slider"
          tabIndex={0}
          aria-label="Before / after comparison — drag or use arrow keys"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)} percent revealed of the after image`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={onKey}
        >
          <div className="ba-img before">
            <Image
              src={BA_IMAGES.before.src}
              alt={BA_IMAGES.before.alt}
              fill
              sizes="(max-width: 960px) 100vw, 1400px"
              style={{ objectFit: 'cover' }}
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
          <div className="ba-img after">
            <Image
              src={BA_IMAGES.after.src}
              alt={BA_IMAGES.after.alt}
              fill
              sizes="(max-width: 960px) 100vw, 1400px"
              style={{ objectFit: 'cover' }}
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
          <div className="ba-tag left">Before</div>
          <div className="ba-tag right">After · Stamped Patio</div>
          <div className="ba-handle" aria-hidden="true"></div>
        </div>

        <div
          style={{
            marginTop: 24, display: 'flex', justifyContent: 'space-between',
            fontFamily: 'var(--font-jetbrains), monospace', fontSize: 11,
            letterSpacing: '.14em', textTransform: 'uppercase',
            color: 'var(--muted-2)', flexWrap: 'wrap', gap: 12,
          }}
        >
          <span>{BA_IMAGES.caption}</span>
          <span>Drag ↔ or use arrow keys</span>
        </div>
      </div>
    </section>
  );
}
