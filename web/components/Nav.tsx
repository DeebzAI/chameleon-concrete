'use client';

import { useEffect, useRef, useState } from 'react';
import { BRAND } from '@/lib/content';

const LINKS: [string, string][] = [
  ['Work',     '#work'],
  ['Services', '#services'],
  ['Process',  '#process'],
  ['Studio',   '#studio'],
  ['Contact',  '#contact'],
];

export function Nav({ ctaCopy = 'Begin a Project' }: { ctaCopy?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Drawer accessibility: lock body scroll, close on Escape, focus the first
  // link on open and return focus to the trigger on close, basic focus trap.
  useEffect(() => {
    if (!open) return;

    // Save the previous overflow so we don't clobber another modal's
    // lock when the drawer closes (e.g. GalleryModal also captures and
    // restores overflow). Restoring an empty string would unlock body
    // scroll while a different overlay still wants it locked.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const drawer = drawerRef.current;
    const focusables = drawer?.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );

    // Defer the focus call so the drawer's CSS transition has time to
    // make the element visible. Calling .focus() while
    // `visibility: hidden` is still applied is a no-op — the bind-time
    // 480ms slide-in animation needs a beat before focus lands.
    const focusTimer = window.setTimeout(() => {
      focusables?.[0]?.focus();
    }, 80);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      } else if (e.key === 'Tab' && focusables && focusables.length) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a href="#top" className="nav-logo" aria-label={BRAND.name}>
          <span className="mark" aria-hidden="true">C</span>
          <span>Chameleon&nbsp;Concrete</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a href="#contact" className="nav-cta">{ctaCopy}</a>
        <button
          ref={triggerRef}
          className={`nav-mobile-toggle ${open ? 'open' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="nav-drawer"
        >
          <span></span>
          <span></span>
        </button>
      </header>

      <div
        id="nav-drawer"
        ref={drawerRef}
        className={`nav-drawer ${open ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
      >
        {LINKS.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <div className="nav-drawer-foot">
          <a
            href="#contact"
            className="btn"
            onClick={() => setOpen(false)}
          >
            {ctaCopy} <span className="arr">→</span>
          </a>
          <div className="kicker" style={{ marginTop: 8 }}>
            <a href={`tel:${BRAND.phoneTel}`}>{BRAND.phone}</a> · {BRAND.city} {BRAND.region}
          </div>
        </div>
      </div>
    </>
  );
}
