import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const fraunces = Fraunces({
  subsets: ['latin'],
  // 'variable' weight unlocks the SOFT/opsz/WONK axes used in headlines.
  // CSS picks the rendered weight via font-weight, italic via font-style.
  weight: 'variable',
  style: ['normal', 'italic'],
  axes: ['SOFT', 'opsz', 'WONK'],
  variable: '--font-fraunces',
  display: 'swap',
});

export const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});
