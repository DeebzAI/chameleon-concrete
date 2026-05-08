'use client';

import { useEffect, useState } from 'react';
import { BRAND } from '@/lib/content';

/**
 * Mobile-only sticky CTA.
 * Visible after scrolling past the hero (~200px), hidden again near the
 * final CTA so it doesn't compete with the in-page form. Mobile-only via
 * `display:none` + `@media (max-width: 960px)` in globals.css.
 */
export function StickyCTA({ ctaCopy = 'Begin a Project' }: { ctaCopy?: string }) {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom = window.innerHeight + y > document.body.scrollHeight - 800;
      setHidden(y < 200 || nearBottom);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`sticky-cta ${hidden ? 'hidden' : ''}`}
      role="complementary"
      aria-label="Quick contact"
      aria-hidden={hidden}
    >
      <div className="label">
        <span className="a">Begin your project</span>
        <span className="b">Call or text · book {BRAND.bookingSeason}</span>
      </div>
      <a href="#contact" className="btn">
        {ctaCopy} <span className="arr">→</span>
      </a>
    </div>
  );
}
