// sections-mid.jsx — Featured Work, Services, Before/After

/* ── Featured projects ─────────────────────────────────────── */
function FeaturedWork({ projects }) {
  return (
    <section className="section" id="work">
      <div className="container">
        <div className="sect-head">
          <div className="left">
            <span className="eyebrow reveal">Selected Work · 2018 — 2026</span>
            <h2 className="display h-lg reveal" style={{ "--rd": "120ms" }}>
              Each environment, <em>singular.</em>
            </h2>
          </div>
          <div className="right reveal" style={{ "--rd": "240ms" }}>
            <p className="lede">
              Every project begins with the land — its grade, light and stone — and
              ends with a poured, hand-carved environment that looks as though it
              was always there.
            </p>
            <a href="#work" className="lnk">View Full Portfolio <span>→</span></a>
          </div>
        </div>

        <div className="projects">
          {projects.map((p, i) => (
            <article
              key={p.id}
              className={`proj reveal-diag ${p.size}`}
              style={{ "--rd": `${(i % 3) * 100}ms` }}
            >
              <ImageSlot
                id={`proj-${p.id}`}
                label={p.slot}
              />
              <div className="proj-meta">
                <div>
                  <h3 className="proj-title">{p.title}</h3>
                  <span className="proj-tag">{p.tag}</span>
                </div>
                <span className="proj-loc">{p.loc}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Services ──────────────────────────────────────────────── */
function Services({ items }) {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="sect-head">
          <div className="left">
            <span className="eyebrow reveal">Capabilities</span>
            <h2 className="display h-lg reveal" style={{ "--rd": "120ms" }}>
              From study<br/>to <em>sculpted form.</em>
            </h2>
          </div>
          <div className="right reveal" style={{ "--rd": "240ms" }}>
            <p className="lede">
              We are a single integrated studio: concept, engineering, pour and carve
              are all handled by the same craftsmen, on site, start to finish.
            </p>
          </div>
        </div>
      </div>

      <div className="services">
        {items.map((s, i) => (
          <div key={i} className="service reveal" style={{ "--rd": `${(i % 2) * 80}ms` }}>
            <span className="service-num">{String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            <span className="arrow">Explore <span>→</span></span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Before / After ────────────────────────────────────────── */
function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef(null);
  const dragging = useRef(false);

  const setFromX = (clientX) => {
    const r = ref.current.getBoundingClientRect();
    const x = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(2, Math.min(98, x)));
  };
  const onDown = (e) => {
    dragging.current = true;
    setFromX(e.touches ? e.touches[0].clientX : e.clientX);
  };
  const onMove = (e) => {
    if (!dragging.current) return;
    setFromX(e.touches ? e.touches[0].clientX : e.clientX);
  };
  const onUp = () => { dragging.current = false; };

  useEffect(() => {
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="sect-head">
          <div className="left">
            <span className="eyebrow reveal">Transformations</span>
            <h2 className="display h-lg reveal" style={{ "--rd": "120ms" }}>
              Drag the line.<br/><em>Change the land.</em>
            </h2>
          </div>
          <div className="right reveal" style={{ "--rd": "240ms" }}>
            <p className="lede">
              Most of our projects begin as flat lawn or unfinished slab. The same
              footprint becomes a sculpted environment in eight to fourteen weeks,
              poured and carved by hand.
            </p>
          </div>
        </div>

        <div
          ref={ref}
          className="ba-wrap reveal"
          style={{ "--ba-pos": `${pos}%` }}
          onMouseDown={onDown}
          onTouchStart={onDown}
        >
          <div className="ba-img before">
            <image-slot id="ba-before" placeholder="BEFORE  ·  bare yard, slab or grade"></image-slot>
          </div>
          <div className="ba-img after">
            <image-slot id="ba-after" placeholder="AFTER  ·  finished pool, grotto or carved feature"></image-slot>
          </div>
          <div className="ba-tag left">Before</div>
          <div className="ba-tag right">After · 11 weeks</div>
          <div className="ba-handle"></div>
        </div>

        <div style={{
          marginTop: 24, display: "flex", justifyContent: "space-between",
          fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".14em",
          textTransform: "uppercase", color: "var(--muted-2)"
        }}>
          <span>Project № 184 · Backyard transformation, Cohasset MA</span>
          <span>Drag ↔ to compare</span>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { FeaturedWork, Services, BeforeAfter });
