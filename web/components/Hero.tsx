'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { BRAND, HERO_IMAGE, HEADLINE_HTML } from '@/lib/content';
import { SplitHeadline } from './SplitHeadline';

export function Hero({
  headline = HEADLINE_HTML,
  ctaPrimary = 'Request a Custom Quote',
  ctaSecondary = 'View the Work',
}: {
  headline?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
}) {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // rAF-throttled scroll → updates --scroll: 0..1 on bg + content. CSS
  // does the parallax + brightness + headline fade. Skipped if user
  // prefers reduced motion (CSS also forces transform: none in that case).
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf: number | null = null;
    const tick = () => {
      raf = null;
      const hero = heroRef.current;
      if (!hero) return;
      const r = hero.getBoundingClientRect();
      const h = r.height || 1;
      const p = Math.max(0, Math.min(1, -r.top / h));
      const v = p.toFixed(3);
      bgRef.current?.style.setProperty('--scroll', v);
      contentRef.current?.style.setProperty('--scroll', v);
    };
    const onScroll = () => { if (raf == null) raf = requestAnimationFrame(tick); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="hero-bg-wrap" ref={bgRef}>
        <div className="hero-bg" style={{ position: 'absolute', inset: 0 }}>
          <Image
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            fill
            priority
            quality={85}
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      <div className="hero-meta">
        <div className="hero-meta-block">
          <span className="num">{BRAND.name}</span>
          Custom carved &amp; decorative concrete — water features, grottos, walls &amp; pools
        </div>
        <div className="hero-meta-block" style={{ textAlign: 'right' }}>
          <span className="num">{BRAND.city}</span>
          Serving Franklin {BRAND.region}
        </div>
      </div>

      <div className="hero-content" ref={contentRef}>
        <div className="reveal">
          <span
            className="eyebrow no-line"
            style={{ marginBottom: 28, display: 'inline-flex' }}
          >
            <span
              aria-hidden
              style={{
                width: 6, height: 6, borderRadius: 99,
                background: 'var(--sandstone)', display: 'inline-block',
              }}
            />
            Now booking · {BRAND.bookingSeason} season
          </span>
        </div>

        <SplitHeadline html={headline} />

        <div className="hero-sub reveal" style={{ ['--rd' as string]: '260ms' }}>
          <p>
            Custom carved and decorative concrete for outdoor spaces — water
            features, grottos, patios, pools and walls. Designed and carved on
            site by Adam and crew. No two projects alike.
          </p>
          <div>
            <div className="hero-cta-row">
              <a href="#contact" className="btn lg">
                {ctaPrimary} <span className="arr">→</span>
              </a>
              <a href="#work" className="btn ghost lg">
                {ctaSecondary} <span className="arr">→</span>
              </a>
            </div>
            <div className="hero-phone-kicker">
              <a href={`tel:${BRAND.phoneTel}`}>{BRAND.phone}</a> · {BRAND.city} {BRAND.region}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
