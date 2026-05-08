import type { Metadata, Viewport } from 'next';
import { inter, fraunces, jetbrains } from '@/lib/fonts';
import { BRAND } from '@/lib/content';
import './globals.css';

export const metadata: Metadata = {
  // Update this to your production hostname before deploy.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://chameleonconcrete.com',
  ),
  title: 'Chameleon Concrete Projects · Custom Carved & Decorative Concrete',
  description:
    'Custom carved and decorative concrete for outdoor spaces — water features, grottos, patios, pools and walls. Designed and carved on site in Franklin, MA by Adam Samarco and crew.',
  keywords: [
    'custom concrete', 'carved concrete', 'decorative concrete',
    'concrete water feature', 'concrete grotto', 'concrete pool',
    'concrete patio', 'Franklin MA', 'New England concrete contractor',
    'Adam Samarco', 'Chameleon Concrete',
  ],
  authors: [{ name: BRAND.owner }],
  creator: BRAND.name,
  openGraph: {
    type: 'website',
    title: 'Chameleon Concrete Projects · Custom Carved Concrete',
    description:
      'Sculpted concrete water features, grottos, pools and walls — carved on site by Adam Samarco. Franklin, MA & surrounding New England.',
    siteName: BRAND.name,
    locale: 'en_US',
    images: [{ url: '/images/chameleon_concrete_42.jpg', width: 1600, height: 900,
      alt: 'Carved concrete fire pit and tree-stump pizza oven at twilight' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chameleon Concrete Projects',
    description: 'Sculpted concrete environments — carved by hand in Franklin, MA.',
    images: ['/images/chameleon_concrete_42.jpg'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0E0D0B',
};

// JSON-LD: local business schema for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://chameleonconcrete.com',
  name: BRAND.name,
  description: 'Custom carved and decorative concrete contractor specializing in water features, grottos, pools, walls and outdoor living spaces.',
  founder: { '@type': 'Person', name: BRAND.owner, jobTitle: BRAND.role },
  telephone: BRAND.phone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Franklin',
    addressRegion: 'MA',
    addressCountry: 'US',
  },
  areaServed: 'Franklin, MA & surrounding New England',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: BRAND.reviews.stars,
    reviewCount: BRAND.reviews.count,
  },
  priceRange: '$$$',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable}`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
