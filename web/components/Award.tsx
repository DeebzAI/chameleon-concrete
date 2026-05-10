import Image from 'next/image';
import { AWARD } from '@/lib/content';

/**
 * Award strip — sits between Testimonials and FinalCTA. Visualizes
 * the actual BusinessRate plaque next to a brief credit so the award
 * reads as third-party recognition rather than self-claimed.
 *
 * Layout mirrors the OwnerStory two-column pattern (image left,
 * text right) but with a smaller/contained plaque framing instead
 * of a full-bleed portrait. Plaque is portrait-orientation and
 * graphic-heavy, so we cap its width and let it breathe.
 */
export function Award() {
  return (
    <section
      className="section award-section"
      id="award"
      aria-label="Recognition"
    >
      <div className="container-x award">
        <div className="award-plaque reveal-left">
          <Image
            src={AWARD.src}
            alt={AWARD.alt}
            width={480}
            height={600}
            sizes="(max-width: 960px) 70vw, 380px"
            quality={90}
          />
        </div>
        <div className="award-text">
          <span className="eyebrow reveal">{AWARD.eyebrow}</span>
          <h2
            className="display h-md reveal"
            style={{ ['--rd' as string]: '120ms' }}
            // headline contains <em> markup
            dangerouslySetInnerHTML={{ __html: AWARD.headline }}
          />
          <p
            className="award-body reveal"
            style={{ ['--rd' as string]: '240ms' }}
          >
            {AWARD.body}
          </p>
          <div
            className="award-meta reveal"
            style={{ ['--rd' as string]: '360ms' }}
          >
            <span className="kicker">BusinessRate</span>
            <span className="dot" aria-hidden>·</span>
            <span className="kicker">August 2025</span>
            <span className="dot" aria-hidden>·</span>
            <span className="kicker">Franklin, MA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
