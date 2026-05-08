import { Fragment } from 'react';
import { MARQUEE } from '@/lib/content';

/**
 * Italic Fraunces capability ticker. Each word is a flex item with a
 * sandstone "✦" glyph between (not at the end of every cycle, like the
 * prototype did). Two copies of the word list translate from 0 to -50%
 * on a linear loop so the seam is invisible.
 */
export function Marquee() {
  // Two passes for a seamless -50% translate.
  const passes = 2;

  return (
    <section className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {Array.from({ length: passes }).map((_, p) => (
          <Fragment key={p}>
            {MARQUEE.map((word, i) => (
              <span key={`${p}-${i}`} className="marquee-word">{word}</span>
            ))}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
