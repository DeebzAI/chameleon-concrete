import { OWNER } from '@/lib/content';

export function OwnerStory() {
  return (
    <section className="section" id="studio" style={{ background: 'var(--bg-2)' }}>
      <div className="container-x owner">
        {/* TODO(Adam): when an actual on-site portrait of Adam (or
            Adam + crew) is available, swap this placeholder for a
            <Image src={OWNER.portrait} alt={OWNER.portraitAlt} ... />
            block. The current OWNER.portrait field in content.ts
            points at project 31, which is a patio shot, not a person. */}
        <div className="owner-portrait owner-portrait-placeholder reveal-left">
          <div className="owner-portrait-slot" aria-hidden="true">
            <span className="kicker">Inset Photo</span>
            <p>
              of <em>Adam &amp; crew.</em>
            </p>
            <span className="kicker">On site · coming soon</span>
          </div>
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
