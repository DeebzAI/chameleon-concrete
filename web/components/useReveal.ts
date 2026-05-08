'use client';

import { useEffect } from 'react';

/**
 * Page-level reveal observer. Watches every element with one of the reveal
 * classes and adds `.in` when 12% of it scrolls into view (with a -60px
 * bottom margin so reveals trigger slightly before the viewport edge).
 *
 * Mounted once at the page root — picks up newly-added nodes via a small
 * MutationObserver so dynamic content is observed too. Single-fire per
 * element (unobserve once revealed).
 */
export function useReveal() {
  useEffect(() => {
    // .reveal-img / .reveal-diag were dropped — never assigned to any
    // JSX. If you bring them back, add them here AND keep their CSS
    // rules in globals.css.
    const REVEAL_SEL =
      '.reveal, .reveal-left, .split-line, .eyebrow, .proc-step';

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    const observe = (root: ParentNode) => {
      root.querySelectorAll(REVEAL_SEL).forEach((el) => io.observe(el));
    };
    observe(document);

    // Reveal classes added later (React effects, route transitions) get
    // picked up here. Cheap because we only inspect added nodes.
    const mo = new MutationObserver((muts) => {
      for (const m of muts) {
        m.addedNodes.forEach((n) => {
          if (n.nodeType !== 1) return;
          const el = n as Element;
          if (el.matches?.(REVEAL_SEL)) io.observe(el);
          observe(el);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Failsafe: after 1.2s, force `.in` on any reveal element still hidden.
    // .reveal-* classes use clip-path / opacity that hide content until `.in`
    // is added, so an IO miss (HMR race, deep nesting, dev-mode hydration
    // hiccup, browser without IO) leaves whole sections invisible. This is
    // worse than skipping the animation. Ensure content always renders.
    const failsafe = window.setTimeout(() => {
      document.querySelectorAll(REVEAL_SEL).forEach((el) => {
        if (!el.classList.contains('in')) el.classList.add('in');
      });
    }, 1200);

    return () => {
      io.disconnect();
      mo.disconnect();
      clearTimeout(failsafe);
    };
  }, []);
}
