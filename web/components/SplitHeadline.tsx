'use client';

import { useId } from 'react';

/**
 * Split a headline string into per-line wrappers so each line masks up
 * independently from below. Replaces the DOM-mutating `useReveal` splitter
 * in the prototype — this version splits in JSX so it survives prop changes
 * (e.g. swapping the headline at runtime).
 *
 * Input HTML may contain <br/> as line break and <em>...</em> for the
 * sandstone italic accent. Both are passed through trustfully — content
 * is build-time, not user-supplied.
 */
export function SplitHeadline({
  html,
  className = 'display h-xl reveal',
  staggerMs = 90,
  delayMs = 120,
}: {
  html: string;
  className?: string;
  staggerMs?: number;
  delayMs?: number;
}) {
  const id = useId();
  const lines = html.split(/<br\s*\/?>/i);
  return (
    <h1
      className={className}
      style={{ ['--rd' as string]: `${delayMs}ms` }}
    >
      {lines.map((line, i) => (
        <span
          key={`${id}-${i}`}
          className="split-line"
        >
          <span
            style={{ ['--ld' as string]: `${i * staggerMs}ms` }}
            dangerouslySetInnerHTML={{ __html: line }}
          />
        </span>
      ))}
    </h1>
  );
}
