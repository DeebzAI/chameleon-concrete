// sections-top.jsx — Nav, Hero, Trust, Marquee

const { useState, useEffect, useRef } = React;

/* ── Reveal hook ───────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    // Auto-split any element with .split target into per-line spans inside
    // .split-line wrappers so each line masks up independently.
    document.querySelectorAll("[data-split]").forEach((el) => {
      if (el.dataset.splitDone) return;
      const html = el.innerHTML;
      // Split on <br/> to keep author-controlled line breaks; wrap each line
      // in a clipping mask + an inner span we slide.
      const parts = html.split(/<br\s*\/?>/i);
      el.innerHTML = parts
        .map((p, i) => `<span class="split-line"><span style="--ld:${i * 90}ms">${p}</span></span>`)
        .join("");
      el.dataset.splitDone = "1";
    });

    const els = document.querySelectorAll(".reveal, .reveal-img, .reveal-diag, .reveal-left, .split-line, .eyebrow");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));

    // Hero scroll-driven parallax + fade.
    const hero = document.querySelector(".hero");
    const heroBg = document.querySelector(".hero-bg");
    const heroContent = document.querySelector(".hero-content");
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        if (!hero) return;
        const r = hero.getBoundingClientRect();
        const h = r.height || 1;
        const p = Math.max(0, Math.min(1, -r.top / h));
        if (heroBg) heroBg.style.setProperty("--scroll", p.toFixed(3));
        if (heroContent) heroContent.style.setProperty("--scroll", p.toFixed(3));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}

/* ── Image slot helper ─────────────────────────────────────── */
function ImageSlot({ id, label, placeholder, ...rest }) {
  return (
    <div className="img-frame" {...rest}>
      <image-slot id={id} placeholder={placeholder || label}></image-slot>
      {label ? <div className="label">{label}</div> : null}
    </div>
  );
}

/* ── Nav ───────────────────────────────────────────────────── */
function Nav({ ctaCopy }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["Work", "#work"],
    ["Services", "#services"],
    ["Process", "#process"],
    ["Studio", "#studio"],
    ["Contact", "#contact"],
  ];

  return (
    <React.Fragment>
      <header className={"nav " + (scrolled ? "scrolled" : "")}>
        <a href="#" className="nav-logo">
          <span className="mark">C</span>
          <span>Chameleon&nbsp;Concrete</span>
        </a>
        <nav className="nav-links">
          {links.map(([l, h]) => (
            <a key={h} href={h}>{l}</a>
          ))}
        </nav>
        <button className="nav-cta" onClick={() => (location.hash = "#contact")}>
          {ctaCopy}
        </button>
        <button
          className={"nav-mobile-toggle " + (open ? "open" : "")}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
        </button>
      </header>
      <div className={"nav-drawer " + (open ? "open" : "")}>
        {links.map(([l, h]) => (
          <a key={h} href={h} onClick={() => setOpen(false)}>
            {l}
          </a>
        ))}
        <div className="nav-drawer-foot">
          <button className="btn" onClick={() => { setOpen(false); location.hash = "#contact"; }}>
            {ctaCopy} <span className="arr">→</span>
          </button>
          <div className="kicker" style={{ marginTop: 8 }}>(916) 215 — 6482 · Franklin, MA &amp; Surrounding</div>
        </div>
      </div>
    </React.Fragment>
  );
}

/* ── Hero ──────────────────────────────────────────────────── */
function Hero({ headline, ctaPrimary, ctaSecondary }) {
  // headline is a string with optional <em>...</em> for italic accent
  const headlineHtml = headline;
  return (
    <section className="hero" id="top">
      <div className="hero-bg">
        <image-slot
          id="hero-bg"
          placeholder="HERO  ·  signature project, twilight, water + stone"
        ></image-slot>
      </div>

      <div className="hero-meta">
        <div className="hero-meta-block">
          <span className="num">Chameleon Concrete Projects</span>
          Custom carved &amp; decorative concrete — water features, grottos, walls &amp; pools
        </div>
        <div className="hero-meta-block" style={{ textAlign: "right" }}>
          <span className="num">Franklin, MA</span>
          Serving Franklin &amp; surrounding New England communities
        </div>
      </div>

      <div className="hero-content">
        <div className="reveal">
          <span className="eyebrow no-line" style={{ marginBottom: 28, display: "inline-flex" }}>
            <span style={{
              width: 6, height: 6, borderRadius: 99,
              background: "var(--sandstone)", display: "inline-block"
            }}></span>
            Now booking · 2026 season
          </span>
        </div>
        <h1 className="display h-xl reveal" data-split style={{ "--rd": "120ms" }}
            dangerouslySetInnerHTML={{ __html: headlineHtml }}></h1>
        <div className="hero-sub reveal" style={{ "--rd": "260ms" }}>
          <p>
            Custom carved and decorative concrete for outdoor spaces — water
            features, grottos, patios, pools and walls. Designed and carved on
            site by Adam and crew. No two projects alike.
          </p>
          <div className="hero-cta-row">
            <a href="#contact" className="btn lg">
              {ctaPrimary} <span className="arr">→</span>
            </a>
            <a href="#work" className="btn ghost lg">
              {ctaSecondary} <span className="arr">→</span>
            </a>
          </div>
        </div>
      </div>

      <div className="scroll-cue">
        <div className="line"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
}

/* ── Trust strip ───────────────────────────────────────────── */
function TrustStrip({ items }) {
  return (
    <section className="trust">
      {items.map((it, i) => (
        <div key={i} className="trust-item reveal" style={{ "--rd": `${i * 80}ms` }}>
          <div className="trust-num" dangerouslySetInnerHTML={{ __html: it.num }}></div>
          <div className="trust-label">{it.label}</div>
        </div>
      ))}
    </section>
  );
}

/* ── Marquee ───────────────────────────────────────────────── */
function Marquee({ words }) {
  const line = words.join("   ");
  return (
    <section className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <span>{line}</span>
        <span>{line}</span>
        <span>{line}</span>
      </div>
    </section>
  );
}

Object.assign(window, { useReveal, ImageSlot, Nav, Hero, TrustStrip, Marquee });
