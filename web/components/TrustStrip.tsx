import { TRUST } from '@/lib/content';

export function TrustStrip() {
  return (
    <section className="trust" aria-label="Why work with us">
      {TRUST.map((it, i) => (
        <div
          key={i}
          className="trust-item reveal"
          style={{ ['--rd' as string]: `${i * 80}ms` }}
        >
          <div className="trust-num" dangerouslySetInnerHTML={{ __html: it.num }} />
          <div className="trust-label">{it.label}</div>
        </div>
      ))}
    </section>
  );
}
