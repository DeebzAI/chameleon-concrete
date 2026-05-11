import Image from 'next/image';
import { BRAND, CTA_IMAGE } from '@/lib/content';

/**
 * Bottom-of-page contact panel — the destination of every
 * "Request a Custom Quote" link on the site (Hero, Nav, Sticky, Footer).
 *
 * Phone-first by design: Adam handles every inquiry himself by call or
 * text, no forms, no inbox. The two CTAs below are the only contact
 * actions on the entire site:
 *
 *   • Primary  — `tel:` opens the dialer with Adam's number
 *   • Secondary — `sms:` opens the messages app pre-addressed to him
 *
 * On desktop where `tel:` has no native handler, most modern browsers
 * surface "Call with FaceTime / Skype / Teams" or simply show the
 * number — both acceptable fallbacks. The number is also rendered in
 * the button label so users on any device can copy or dial it manually.
 */
export function FinalCTA() {
  return (
    <section className="final-cta" id="contact">
      <div className="final-cta-bg-wrap">
        <Image
          src={CTA_IMAGE.src}
          alt={CTA_IMAGE.alt}
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="final-cta-content">
        <span className="eyebrow no-line reveal">Begin Your Project</span>
        <h2 className="display h-xl reveal" style={{ ['--rd' as string]: '120ms' }}>
          Let&apos;s design something <em>you can&apos;t unsee.</em>
        </h2>
        <p
          className="lede reveal"
          style={{ ['--rd' as string]: '240ms', textAlign: 'center', margin: '0 auto' }}
        >
          Call or text Adam directly. He answers personally. No forms,
          no inbox, no middlemen. Most days he&apos;ll pick up; if he&apos;s
          on site he&apos;ll get back same day.
        </p>
        <div className="final-cta-row reveal" style={{ ['--rd' as string]: '340ms' }}>
          <a href={`tel:${BRAND.phoneTel}`} className="btn lg">
            Call Adam · {BRAND.phone} <span className="arr">→</span>
          </a>
          <a href={`sms:${BRAND.phoneTel}`} className="btn ghost lg">
            Text Adam <span className="arr">→</span>
          </a>
        </div>
        <div className="final-cta-meta reveal" style={{ ['--rd' as string]: '440ms' }}>
          <div className="item"><span className="v">Free</span><span>Estimate</span></div>
          <div className="item"><span className="v">Direct</span><span>Call or text · No forms</span></div>
          <div className="item"><span className="v">{BRAND.reviews.stars} ★</span><span>Google · {BRAND.reviews.count} reviews</span></div>
          <div className="item"><span className="v">{BRAND.city}</span><span>{BRAND.region}</span></div>
        </div>
      </div>
    </section>
  );
}
