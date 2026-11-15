import React from 'react';
import BuchtippsPageClient from '@/components/buchtipps/BuchtippsPageClient';
import { getAllBuchTipps } from '@/lib/buchtipps/data';

export default function BuchtippsPage() {
  const books = getAllBuchTipps();
  const baseUrl = 'https://www.about-the-world.org';

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Startseite',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Buchtipps',
        item: `${baseUrl}/buchtipps`,
      },
    ],
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Buchtipps: Geographie, Geschichte, Biologie & Bildung',
    description:
      'Kuratierte Buchempfehlungen in 5 Sprachen (DE, EN, FR, ES, IT) zu Geographie, Weltpolitik, Nahostkonflikt, US-Präsidenten, Biologie und modernem Unterricht.',
    url: `${baseUrl}/buchtipps`,
    inLanguage: ['de', 'en', 'fr', 'es', 'it'],
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: books.length,
      itemListElement: books.map((b, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `${baseUrl}/buchtipps/${b.id}`,
        name: b.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <BuchtippsPageClient />
    </>
  );
}
