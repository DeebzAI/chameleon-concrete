import { PROCESS } from '@/lib/content';

export function Process() {
  return (
    <section className="section" id="process">
      <div className="container-x">
        <div className="sect-head">
          <div className="left">
            <span className="eyebrow reveal">The Process</span>
            <h2 className="display h-lg reveal" style={{ ['--rd' as string]: '120ms' }}>
              How an environment <em>takes shape.</em>
            </h2>
          </div>
          <div className="right reveal" style={{ ['--rd' as string]: '240ms' }}>
            <p className="lede">
              Four phases, one crew. Most residential projects run 8 to 14 weeks
              from first walk to final reveal.
            </p>
          </div>
        </div>
      </div>

      <div className="process">
        {PROCESS.map((s, i) => (
          <div
            key={s.title}
            className="proc-step reveal"
            style={{ ['--rd' as string]: `${i * 100}ms` }}
          >
            <span className="proc-num">
              {String(i + 1).padStart(2, '0')} / {String(PROCESS.length).padStart(2, '0')}
            </span>
            <h4>{s.title}</h4>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
