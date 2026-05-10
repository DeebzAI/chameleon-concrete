'use client';

import { useEffect, useRef } from 'react';
import { OWNER, STUDIO_VIDEO } from '@/lib/content';

export function OwnerStory() {
  // Respect prefers-reduced-motion: if the user has set it, pause the
  // walkthrough loop on mount so they see the poster frame only. We
  // can't gate this in CSS alone — `animation-play-state` doesn't
  // affect <video> playback.
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      if (mq.matches) v.pause();
      else v.play().catch(() => {/* autoplay may be blocked; that's fine */});
    };
    apply();
    mq.addEventListener?.('change', apply);
    return () => mq.removeEventListener?.('change', apply);
  }, []);

  return (
    <section className="section" id="studio" style={{ background: 'var(--bg-2)' }}>
      <div className="container-x owner">
        {/* Portrait slot now plays the A-frame walkthrough video —
            ambient, muted, looping. Shows the carved-concrete "log"
            railings and stamped steps in motion (stills don't reveal
            the depth of the carving). When Adam delivers a real
            on-site portrait of him + crew, we can split this into a
            video + portrait pair, or swap back to a still. */}
        <div className="owner-portrait reveal-left">
          <video
            ref={videoRef}
            className="owner-portrait-video"
            src={STUDIO_VIDEO.src}
            poster={STUDIO_VIDEO.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={STUDIO_VIDEO.caption}
          />
        </div>
        <div className="owner-text">
          <span className="eyebrow reveal">The Studio</span>
          <h2 className="display h-md reveal" style={{ ['--rd' as string]: '100ms' }}>
            {OWNER.headline}
          </h2>
          <blockquote className="owner-quote reveal" style={{ ['--rd' as string]: '200ms' }}>
            “{OWNER.quote}”
          </blockquote>
          <p className="owner-bio reveal" style={{ ['--rd' as string]: '300ms' }}>
            {OWNER.bio}
          </p>
          <div className="owner-sig reveal" style={{ ['--rd' as string]: '400ms' }}>
            <span className="name">Adam Samarco</span>
            <span className="role">Owner · Lead Carver</span>
          </div>
        </div>
      </div>
    </section>
  );
}
