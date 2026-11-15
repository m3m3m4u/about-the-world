'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BuchTipp } from '@/lib/buchtipps/types';
import { BUCHTIPPS_UI } from '@/lib/buchtipps/data';
import { buildAmazonAffiliateUrl, isbn13ToIsbn10 } from '@/lib/buchtipps/isbnConverter';
import { useLanguage } from '@/context/LanguageContext';

interface BuchCardProps {
  book: BuchTipp;
}

export default function BuchCard({ book }: BuchCardProps) {
  const { language } = useLanguage();
  const ui = BUCHTIPPS_UI[language] || BUCHTIPPS_UI.de;

  const [imageError, setImageError] = useState(false);
  const asin = isbn13ToIsbn10(book.isbn) || book.isbn;
  const coverUrl = `https://images-na.ssl-images-amazon.com/images/P/${asin}.01.LZZZZZZZ.jpg`;
  const affiliateUrl = buildAmazonAffiliateUrl(book.isbn, book.lang);
  const detailUrl = `/buchtipps/${book.id}`;

  return (
    <article className="buchtipp-card">
      <div>
        {/* Cover & Header row */}
        <div className="buchtipp-header">
          <Link
            href={detailUrl}
            className="buchtipp-cover-wrapper"
            title={book.title}
          >
            {!imageError ? (
              <Image
                src={coverUrl}
                alt={book.title}
                fill
                sizes="(min-width: 768px) 108px, 96px"
                className="object-contain"
                style={{ objectFit: 'contain', padding: '2px' }}
                onLoad={(e) => {
                  if (e.currentTarget.naturalWidth <= 2) {
                    setImageError(true);
                  }
                }}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="buchtipp-cover-fallback">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--green-primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginBottom: '4px' }}
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                <span style={{ fontWeight: 600, color: 'var(--green-dark)', lineHeight: 1.2 }}>
                  {book.title}
                </span>
              </div>
            )}
          </Link>

          <div className="buchtipp-meta">
            <div className="buchtipp-badges">
              <span className="buchtipp-badge">
                {book.publisher || 'Book'}
              </span>
              {book.publishYear && (
                <span className="buchtipp-year">{book.publishYear}</span>
              )}
            </div>

            <Link href={detailUrl} style={{ textDecoration: 'none' }}>
              <h3 className="buchtipp-title">{book.title}</h3>
            </Link>

            {book.subtitle && (
              <p className="buchtipp-subtitle">{book.subtitle}</p>
            )}

            <p className="buchtipp-author">
              {ui.authorPrefix} {book.authorName}
            </p>
          </div>
        </div>

        {/* Why recommended highlight / Praxis-Tipp */}
        <Link href={detailUrl} className="buchtipp-praxis-box">
          <div className="buchtipp-praxis-title">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--green-primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>{ui.praxisTipLabel}</span>
          </div>
          <p className="buchtipp-praxis-text">{book.whyRecommended}</p>
        </Link>

        {/* Topics / Tags */}
        <div className="buchtipp-topics">
          {book.topics.map((topic) => (
            <span key={topic} className="buchtipp-topic-tag">
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Detail Link & Amazon Affiliate Button */}
      <div className="buchtipp-card-footer">
        <Link href={detailUrl} className="buchtipp-detail-link">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <span>{ui.readMoreLabel}</span>
        </Link>

        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="buchtipp-amazon-btn"
          title={ui.amazonBtnTitle}
        >
          <span>{ui.amazonBtnShort}</span>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>
    </article>
  );
}
