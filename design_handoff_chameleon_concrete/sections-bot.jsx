// sections-bot.jsx — Owner story, Process, Testimonials, Final CTA, Footer

/* ── Owner / craftsman ─────────────────────────────────────── */
function OwnerStory({ owner }) {
  return (
    <section className="section" id="studio" style={{ background: "var(--bg-2)" }}>
      <div className="container owner">
        <div className="owner-portrait reveal-img">
          <ImageSlot id="owner-portrait" label="OWNER · portrait at site, hands or carving in frame" />
        </div>
        <div className="owner-text">
          <span className="eyebrow reveal">The Studio</span>
          <h2 className="display h-md reveal" style={{ "--rd": "100ms" }}>
            {owner.headline}
          </h2>
          <blockquote className="owner-quote reveal" style={{ "--rd": "200ms" }}>
            “{owner.quote}”
          </blockquote>
          <p className="owner-bio reveal" style={{ "--rd": "300ms" }}>
            {owner.bio}
          </p>
          <div className="owner-sig reveal" style={{ "--rd": "400ms" }}>
            <span className="name">{owner.name}</span>
            <span className="role">{owner.role}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Process ───────────────────────────────────────────────── */
function Process({ steps }) {
  return (
    <section className="section" id="process">
      <div className="container">
        <div className="sect-head">
          <div className="left">
            <span className="eyebrow reveal">The Process</span>
            <h2 className="display h-lg reveal" style={{ "--rd": "120ms" }}>
              How an environment <em>takes shape.</em>
            </h2>
          </div>
          <div className="right reveal" style={{ "--rd": "240ms" }}>
            <p className="lede">
              Four phases, one crew. Most residential projects run 8–14 weeks from
              first walk to final reveal.
            </p>
          </div>
        </div>
      </div>

      <div className="process">
        {steps.map((s, i) => (
          <div key={i} className="proc-step reveal" style={{ "--rd": `${(i % 4) * 100}ms` }}>
            <span className="proc-num">{String(i + 1).padStart(2, "0")}</span>
            <h4>{s.title}</h4>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Testimonials ──────────────────────────────────────────── */
function Testimonials({ items }) {
  return (
    <section className="section" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <div className="sect-head">
          <div className="left">
            <span className="eyebrow reveal">Client Voices</span>
            <h2 className="display h-lg reveal" style={{ "--rd": "120ms" }}>
              What homeowners <em>say after.</em>
            </h2>
          </div>
          <div className="right reveal" style={{ "--rd": "240ms" }}>
            <p className="lede">
              A small selection from clients across New England — many of whom
              return for second and third projects.
            </p>
          </div>
        </div>

        <div className="testimonials">
          {items.map((t, i) => (
            <div key={i} className="tst reveal" style={{ "--rd": `${i * 100}ms` }}>
              <div className="tst-stars">★ ★ ★ ★ ★</div>
              <p className="tst-quote">“{t.quote}”</p>
              <div className="tst-attr">
                <span className="name">{t.name}</span>
                <span className="loc">{t.loc} · {t.project}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Final CTA ─────────────────────────────────────────────── */
function FinalCTA({ ctaPrimary, ctaSecondary }) {
  return (
    <section className="final-cta" id="contact">
      <div className="final-cta-bg">
        <image-slot id="cta-bg" placeholder="CTA BG  ·  moody waterfall detail or grotto interior"></image-slot>
      </div>
      <div className="final-cta-content">
        <span className="eyebrow no-line reveal">Begin Your Project</span>
        <h2 className="display h-xl reveal" style={{ "--rd": "120ms" }}>
          Let's design something <em>you can't unsee.</em>
        </h2>
        <p className="lede reveal" style={{ "--rd": "240ms", textAlign: "center", margin: "0 auto" }}>
          Tell us about your land, your inspiration, your timeline. We respond to
          every inquiry within two business days and book a small number of
          projects each season.
        </p>
        <div className="final-cta-row reveal" style={{ "--rd": "340ms" }}>
          <a href="mailto:adam@chameleonconcrete.com" className="btn lg">
            {ctaPrimary} <span className="arr">→</span>
          </a>
          <a href="tel:9162156482" className="btn ghost lg">
            {ctaSecondary}
          </a>
        </div>
        <div className="final-cta-meta reveal" style={{ "--rd": "440ms" }}>
          <div className="item"><span className="v">Free</span><span>Estimate</span></div>
          <div className="item"><span className="v">Call or Text</span><span>(916) 215-6482</span></div>
          <div className="item"><span className="v">5.0 ★</span><span>Google · 18 reviews</span></div>
          <div className="item"><span className="v">Franklin, MA</span><span>& surrounding</span></div>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">Chameleon Concrete<em style={{ color: "var(--sandstone)", fontStyle: "italic" }}>.</em></div>
            <p>
              Custom carved and decorative concrete — water features, grottos,
              patios, pools and walls. Based in Franklin, MA, serving Franklin
              and surrounding New England communities.
            </p>
            <div style={{ display: "flex", gap: 16, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)" }}>
              <span>5.0 ★ Google</span>
              <span>·</span>
              <span>Free Estimates</span>
            </div>
          </div>
          <div className="footer-col">
            <h5>Studio</h5>
            <ul>
              <li><a href="#work">Selected Work</a></li>
              <li><a href="#services">Capabilities</a></li>
              <li><a href="#process">Process</a></li>
              <li><a href="#studio">Craftsman</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Capabilities</h5>
            <ul>
              <li><a href="#services">Water Features &amp; Grottos</a></li>
              <li><a href="#services">Carved &amp; Retaining Walls</a></li>
              <li><a href="#services">Pools &amp; Pool Decks</a></li>
              <li><a href="#services">Patios &amp; Outdoor Living</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contact</h5>
            <ul>
              <li><a href="mailto:adam@chameleonconcrete.com">adam@chameleonconcrete.com</a></li>
              <li><a href="tel:9162156482">(916) 215 — 6482</a></li>
              <li><a href="#">Franklin, MA &amp; surrounding</a></li>
              <li><a href="#">Free estimate ↗</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Chameleon Concrete Projects · Adam Samarco</span>
          <span>Concept redesign · Mockup</span>
        </div>
      </div>
    </footer>
  );
}

/* ── Sticky mobile CTA ─────────────────────────────────────── */
function StickyCTA({ ctaCopy }) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      // hide when at very top, also hide near final CTA
      const nearBottom = window.innerHeight + y > document.body.scrollHeight - 800;
      setHidden(y < 400 || nearBottom);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={"sticky-cta " + (hidden ? "hidden" : "")}>
      <div className="label">
        <span className="a">Begin your project</span>
        <span className="b">2 day response · book 2026</span>
      </div>
      <a href="#contact" className="btn">{ctaCopy} <span className="arr">→</span></a>
    </div>
  );
}

Object.assign(window, { OwnerStory, Process, Testimonials, FinalCTA, Footer, StickyCTA });
