import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buchtipps | Geographie, Geschichte, Biologie & Bildung',
  description:
    'Kuratierte Buchempfehlungen in 5 Sprachen (DE, EN, FR, ES, IT) passend zu Geographie, Geopolitik, Nahostkonflikt, US-Präsidenten, Biologie und modernem Unterricht.',
  alternates: {
    canonical: '/buchtipps',
  },
  openGraph: {
    title: 'Buchtipps | Geographie, Geschichte, Biologie & Bildung | About the World',
    description:
      'Handverlesene Sach- und Fachbücher zu Geographie, Weltpolitik, Naturkunde, US-Geschichte und KI im Unterricht.',
    url: 'https://www.about-the-world.org/buchtipps',
    siteName: 'About the World',
    type: 'website',
    images: [
      {
        url: '/ATW_Logo.png',
        width: 800,
        height: 600,
        alt: 'About the World Buchtipps',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buchtipps | About the World',
    description:
      'Kuratierte Buchempfehlungen in 5 Sprachen für Geographie, Weltwissen, Natur und Unterricht.',
    images: ['/ATW_Logo.png'],
  },
};

export default function BuchtippsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
