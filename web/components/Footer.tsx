import { BRAND } from '@/lib/content';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="logo">
            Chameleon Concrete
            <em style={{ color: 'var(--sandstone)', fontStyle: 'italic' }}>.</em>
          </div>
          <p>
            Custom carved and decorative concrete — water features, grottos,
            patios, pools and walls. Based in {BRAND.city}, serving Franklin
            and surrounding New England communities.
          </p>
          <div className="meta-row">
            <span>{BRAND.reviews.stars} ★ {BRAND.reviews.source}</span>
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
            <li><a href={`tel:${BRAND.phoneTel}`}>Call · {BRAND.phone}</a></li>
            <li><a href={`sms:${BRAND.phoneTel}`}>Text · {BRAND.phone}</a></li>
            <li>{BRAND.city} {BRAND.region}</li>
            <li><a href="#contact">Free estimate ↗</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {BRAND.name} · {BRAND.owner}</span>
        <span>Designed for craft</span>
      </div>
    </footer>
  );
}
