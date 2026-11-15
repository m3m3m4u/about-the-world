import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BuchtippDetailClient from '@/components/buchtipps/BuchtippDetailClient';
import { getBuchTippById, getAllBuchTipps } from '@/lib/buchtipps/data';
import { isbn13ToIsbn10 } from '@/lib/buchtipps/isbnConverter';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const books = getAllBuchTipps();
  return books.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const book = getBuchTippById(id);
  if (!book) {
    return { title: 'Buch nicht gefunden | About the World' };
  }

  const asin = isbn13ToIsbn10(book.isbn) || book.isbn;
  const coverUrl = `https://images-na.ssl-images-amazon.com/images/P/${asin}.01.LZZZZZZZ.jpg`;

  return {
    title: `${book.title} (${book.authorName}) – Buchtipp`,
    description: book.subtitle || book.summary.slice(0, 160),
    keywords: [...book.topics, 'Buchtipp', 'About the World', book.authorName],
    alternates: {
      canonical: `/buchtipps/${book.id}`,
    },
    openGraph: {
      title: `${book.title} – About the World`,
      description: book.subtitle || book.summary.slice(0, 160),
      url: `https://www.about-the-world.org/buchtipps/${book.id}`,
      siteName: 'About the World',
      type: 'book',
      images: [
        {
          url: coverUrl,
          alt: book.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${book.title} – Buchtipp`,
      description: book.subtitle || book.summary.slice(0, 160),
      images: [coverUrl],
    },
  };
}

export default async function BuchtippDetailPage({ params }: PageProps) {
  const { id } = await params;
  const book = getBuchTippById(id);

  if (!book) {
    notFound();
  }

  const asin = isbn13ToIsbn10(book.isbn) || book.isbn;
  const coverUrl = `https://images-na.ssl-images-amazon.com/images/P/${asin}.01.LZZZZZZZ.jpg`;

  const otherBooks = getAllBuchTipps()
    .filter((b) => b.lang === book.lang && b.id !== book.id)
    .slice(0, 2);

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
      {
        '@type': 'ListItem',
        position: 3,
        name: book.title,
        item: `${baseUrl}/buchtipps/${book.id}`,
      },
    ],
  };

  const bookJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    headline: book.subtitle || book.title,
    author: {
      '@type': 'Person',
      name: book.authorName,
    },
    isbn: book.isbn,
    inLanguage: book.lang,
    publisher: {
      '@type': 'Organization',
      name: book.publisher || 'Book',
    },
    datePublished: book.publishYear ? String(book.publishYear) : undefined,
    numberOfPages: book.pages,
    description: book.summary.slice(0, 300),
    image: coverUrl,
    url: `${baseUrl}/buchtipps/${book.id}`,
    genre: book.category,
    keywords: book.topics.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }}
      />
      <BuchtippDetailClient book={book} otherBooks={otherBooks} />
    </>
  );
}
