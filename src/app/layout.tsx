import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import AnalyticsTracker from '@/components/AnalyticsTracker';

const openSans = Open_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-open-sans',
  display: 'swap',
});

const siteUrl = 'https://www.about-the-world.org';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'About the World | Geographie, Länder der Erde & Interaktive Übungen',
    template: '%s | About the World',
  },
  description:
    'Interaktive Lernplattform für Schule & Allgemeinbildung: Lerne Geographie, alle Länder der Erde, interaktives Flaggen- und Kartenquiz, Biologie, US-Präsidenten und den Nahostkonflikt mit multimedialen H5P-Übungen.',
  keywords: [
    'Geographie',
    'Länder der Erde',
    'Flaggenquiz',
    'Kartenquiz',
    'Landkarten Quiz',
    'Geographie Quiz',
    'Biologie Quiz',
    'Nahostkonflikt',
    'US-Präsidenten',
    'US-Bundesstaaten',
    'Hauptstädte lernen',
    'Schule',
    'Unterrichtsmaterial',
    'H5P Übungen',
    'Erdkunde interaktiv',
    'Allgemeinbildung',
    'Kontinente und Ozeane',
    'Generative Engine Optimization',
    'World Geography',
  ],
  authors: [{ name: 'About the World', url: siteUrl }],
  creator: 'About the World',
  publisher: 'About the World',
  category: 'education',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      de: '/',
      en: '/',
      fr: '/',
      es: '/',
      it: '/',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    alternateLocale: ['en_US', 'fr_FR', 'es_ES', 'it_IT'],
    url: siteUrl,
    siteName: 'About the World',
    title: 'About the World | Geographie, Länder der Erde & Interaktive Übungen',
    description:
      'Entdecke die Welt interaktiv: Geographie-Themen, Flaggenquiz, Kartenquiz, Länderprofile, Biologie und Geschichte mit Hunderten von Übungen.',
    images: [
      {
        url: '/ATW_Logo.png',
        width: 1200,
        height: 630,
        alt: 'About the World - Interaktives Weltwissen & Geographie',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About the World | Geographie, Länder & Interaktives Lernen',
    description:
      'Interaktive Übungen zu Geographie, Flaggen, Weltkarten, Biologie und Geschichte.',
    images: ['/ATW_Logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/ATW_Logo.png?v=2', type: 'image/png' },
      { url: '/favicon.ico?v=2' },
      { url: '/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=2', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/ATW_Logo.png?v=2',
    apple: [
      { url: '/apple-touch-icon.png?v=2', sizes: '180x180', type: 'image/png' },
    ],
  },
  other: {
    'geo.region': 'DE',
    'geo.placename': 'Deutschland',
    'application-name': 'About the World',
  },
};

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'About the World',
    alternateName: ['ATW', 'AboutTheWorld'],
    url: siteUrl,
    description:
      'Interaktive Bildungsplattform für Geographie, Länder der Erde, Flaggen, Landkarten, Biologie und Geschichte.',
    inLanguage: ['de', 'en', 'fr', 'es', 'it'],
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'About the World',
      url: siteUrl,
      logo: `${siteUrl}/ATW_Logo.png`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/{search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'About the World',
    url: siteUrl,
    logo: `${siteUrl}/ATW_Logo.png`,
    description:
      'Digitale interaktive Lernmaterialien und H5P-Übungen für Schule, Unterricht und Allgemeinbildung.',
    email: 'm3m3m4u@gmail.com',
    sameAs: [siteUrl],
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={openSans.variable}>
      <head>
        <link rel="icon" href="/ATW_Logo.png?v=2" type="image/png" />
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={openSans.className}>
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
