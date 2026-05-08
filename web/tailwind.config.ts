import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:           'var(--bg)',
        'bg-2':       'var(--bg-2)',
        'bg-3':       'var(--bg-3)',
        'warm-white': 'var(--warm-white)',
        'off-white':  'var(--off-white)',
        muted:        'var(--muted)',
        'muted-2':    'var(--muted-2)',
        sandstone:    'var(--sandstone)',
        'sandstone-deep': 'var(--sandstone-deep)',
        line:         'var(--line)',
        'line-strong':'var(--line-strong)',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono:  ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
      transitionTimingFunction: {
        'out-snap': 'cubic-bezier(.2,.8,.2,1)',
        'in-out-deep': 'cubic-bezier(.7,0,.3,1)',
        'diag': 'cubic-bezier(.65,0,.25,1)',
      },
    },
  },
  plugins: [],
};

export default config;
