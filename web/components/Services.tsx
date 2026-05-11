import { SERVICES } from '@/lib/content';

export function Services() {
  return (
    <section className="section" id="services">
      <div className="container-x">
        <div className="sect-head">
          <div className="left">
            <span className="eyebrow reveal">Capabilities</span>
            <h2 className="display h-lg reveal" style={{ ['--rd' as string]: '120ms' }}>
              From study<br />to <em>sculpted form.</em>
            </h2>
          </div>
          <div className="right reveal" style={{ ['--rd' as string]: '240ms' }}>
            <p className="lede">
              We are a single integrated studio: concept, engineering, pour and
              carve are all handled by the same craftsmen, on site, start to
              finish.
            </p>
          </div>
        </div>
      </div>

      <div className="services">
        {SERVICES.map((s, i) => (
          <div
            key={s.title}
            className="service reveal"
            style={{ ['--rd' as string]: `${(i % 2) * 80}ms` }}
          >
            <span className="service-num">
              {String(i + 1).padStart(2, '0')} / {String(SERVICES.length).padStart(2, '0')}
            </span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
