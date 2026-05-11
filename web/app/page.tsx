'use client';

import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { TrustStrip } from '@/components/TrustStrip';
import { FeaturedWork } from '@/components/FeaturedWork';
import { Marquee } from '@/components/Marquee';
import { Services } from '@/components/Services';
import { BeforeAfter } from '@/components/BeforeAfter';
import { OwnerStory } from '@/components/OwnerStory';
import { Process } from '@/components/Process';
import { Testimonials } from '@/components/Testimonials';
import { Award } from '@/components/Award';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { StickyCTA } from '@/components/StickyCTA';
import { useReveal } from '@/components/useReveal';

export default function Home() {
  useReveal();

  return (
    <>
      <a
        href="#main"
        style={{
          position: 'absolute', left: -9999, top: 'auto',
          padding: '12px 16px', background: 'var(--warm-white)',
          color: 'var(--bg)', fontFamily: 'var(--font-inter), sans-serif',
          fontSize: 12, fontWeight: 600, zIndex: 1000, borderRadius: 4,
        }}
        onFocus={(e) => {
          e.currentTarget.style.left = '20px';
          e.currentTarget.style.top = '20px';
        }}
        onBlur={(e) => { e.currentTarget.style.left = '-9999px'; }}
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <TrustStrip />
        <FeaturedWork />
        <Marquee />
        <BeforeAfter />
        <Services />
        <OwnerStory />
        <Process />
        <Testimonials />
        <Award />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
