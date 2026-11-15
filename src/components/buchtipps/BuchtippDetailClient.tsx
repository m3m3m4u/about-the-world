'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SiteLayout } from '@/components/SiteLayout';
import { BuchTipp } from '@/lib/buchtipps/types';
import { BUCHTIPPS_UI } from '@/lib/buchtipps/data';
import {
  buildAmazonAffiliateUrl,
  buildAmazonDeAffiliateUrl,
  isbn13ToIsbn10,
} from '@/lib/buchtipps/isbnConverter';
import { useLanguage } from '@/context/LanguageContext';

interface BuchtippDetailClientProps {
  book: BuchTipp;
  otherBooks: BuchTipp[];
}

export default function BuchtippDetailClient({
  book,
  otherBooks,
}: BuchtippDetailClientProps) {
  const { language } = useLanguage();
  // UI text follows active site language; book content itself stays in book.lang
  const ui = BUCHTIPPS_UI[language] || BUCHTIPPS_UI[book.lang] || BUCHTIPPS_UI.de;

  const [imageError, setImageError] = useState(false);

  const asin = isbn13ToIsbn10(book.isbn) || book.isbn;
  const coverUrl = `https://images-na.ssl-images-amazon.com/images/P/${asin}.01.LZZZZZZZ.jpg`;
  const affiliateUrl = buildAmazonAffiliateUrl(book.isbn, book.lang);
  const affiliateDeUrl = buildAmazonDeAffiliateUrl(book.isbn);

  return (
    <SiteLayout activeSection="buchtipps">
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb-nav">
          <Link href="/">{ui.breadcrumbHome}</Link>
          <span>/</span>
          <Link href="/buchtipps">{ui.breadcrumbBooks}</Link>
          <span>/</span>
          <strong>{book.title}</strong>
        </div>

        {/* Back Link */}
        <div style={{ marginBottom: '16px' }}>
          <Link
            href="/buchtipps"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--green-dark)',
              textDecoration: 'none',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>{ui.backToAllBooks}</span>
          </Link>
        </div>

        {/* Main Presentation Card */}
        <article className="buchtipp-detail-card">
          {/* Hero Row: Cover + Key Facts */}
          <div className="buchtipp-detail-hero">
            <div className="buchtipp-detail-cover">
              {!imageError ? (
                <Image
                  src={coverUrl}
                  alt={book.title}
                  fill
                  sizes="(min-width: 640px) 170px, 140px"
                  priority
                  style={{ objectFit: 'contain', padding: '4px' }}
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
                    width="34"
                    height="34"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--green-primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginBottom: '6px' }}
                  >
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                  <span style={{ fontWeight: 600, color: 'var(--green-dark)', lineHeight: 1.25 }}>
                    {book.title}
                  </span>
                </div>
              )}
            </div>

            <div className="buchtipp-detail-info">
              <div className="buchtipp-badges">
                <span className="buchtipp-badge">{book.publisher || 'Book'}</span>
                {book.publishYear && (
                  <span className="buchtipp-year">
                    {ui.publishedPrefix} {book.publishYear}
                  </span>
                )}
              </div>

              <h1 className="buchtipp-detail-title">{book.title}</h1>

              {book.subtitle && (
                <p className="buchtipp-detail-subtitle">{book.subtitle}</p>
              )}

              <p className="buchtipp-detail-author">
                {ui.detailAuthorPrefix} {book.authorName}
              </p>

              {/* Bibliographic facts */}
              <div className="buchtipp-detail-facts">
                {book.pages && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--green-primary)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                    {book.pages} {ui.pagesSuffix}
                  </span>
                )}
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--green-primary)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="4" y1="9" x2="20" y2="9" />
                    <line x1="4" y1="15" x2="20" y2="15" />
                    <line x1="10" y1="3" x2="8" y2="21" />
                    <line x1="16" y1="3" x2="14" y2="21" />
                  </svg>
                  ISBN-13: {book.isbn}
                </span>
                {asin && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--green-primary)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="4" y1="9" x2="20" y2="9" />
                      <line x1="4" y1="15" x2="20" y2="15" />
                      <line x1="10" y1="3" x2="8" y2="21" />
                      <line x1="16" y1="3" x2="14" y2="21" />
                    </svg>
                    ASIN: {asin}
                  </span>
                )}
              </div>

              {/* Amazon Primary Action */}
              <div style={{ marginTop: '18px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="buchtipp-amazon-btn"
                    style={{ padding: '10px 20px', fontSize: '14px', borderRadius: '6px' }}
                  >
                    <span>{ui.amazonBtnLong}</span>
                    <svg
                      width="15"
                      height="15"
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

                  {book.lang !== 'de' && (
                    <a
                      href={affiliateDeUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '9px 14px',
                        fontSize: '13px',
                        fontWeight: 600,
                        borderRadius: '6px',
                        background: 'var(--green-light)',
                        border: '1px solid var(--green-border)',
                        color: 'var(--green-dark)',
                        textDecoration: 'none',
                      }}
                    >
                      <span>{ui.amazonDeBtnShort}</span>
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
                  )}
                </div>

                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px', marginBottom: 0 }}>
                  {ui.affiliateBadgeNotice}
                </p>
              </div>
            </div>
          </div>

          {/* Target Audience Box */}
          <div className="buchtipp-audience-box">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--green-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0, marginTop: '2px' }}
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <div>
              <strong style={{ display: 'block', color: 'var(--green-dark)', marginBottom: '2px' }}>
                {ui.recommendedForLabel}
              </strong>
              <span style={{ color: 'var(--text-color)' }}>{book.targetAudience}</span>
            </div>
          </div>

          {/* Why Recommended - Praxis-Tipp */}
          <section className="buchtipp-content-section">
            <h2>
              <svg
                width="18"
                height="18"
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
              <span>{ui.whyReadableHeading}</span>
            </h2>
            <div
              style={{
                background: 'var(--green-light)',
                border: '1px solid var(--green-border)',
                borderRadius: '6px',
                padding: '16px 20px',
                fontSize: '14.5px',
                lineHeight: 1.6,
                color: 'var(--text-color)',
              }}
            >
              {book.whyRecommended}
            </div>
          </section>

          {/* Comprehensive Summary */}
          <section className="buchtipp-content-section">
            <h2>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--green-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              <span>{ui.summaryHeading}</span>
            </h2>
            <div className="buchtipp-summary-text">{book.summary}</div>
          </section>

          {/* Topics & Keywords */}
          <section
            className="buchtipp-content-section"
            style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}
          >
            <h2 style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
              <span>{ui.topicsHeading}</span>
            </h2>
            <div className="buchtipp-topics">
              {book.topics.map((topic) => (
                <span
                  key={topic}
                  className="buchtipp-topic-tag"
                  style={{ fontSize: '12px', padding: '4px 10px' }}
                >
                  {topic}
                </span>
              ))}
            </div>
          </section>

          {/* Bottom Amazon CTA */}
          <div className="buchtipp-bottom-cta">
            <div>
              <h3 style={{ fontSize: '16px', color: 'var(--green-dark)', margin: '0 0 4px 0' }}>
                {ui.ctaHeading}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                {ui.ctaDesc}
              </p>
            </div>

            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="buchtipp-amazon-btn"
              style={{ padding: '9px 18px' }}
            >
              <span>{ui.amazonBtnLong}</span>
              <svg
                width="14"
                height="14"
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

        {/* Other Recommendations */}
        {otherBooks.length > 0 && (
          <section style={{ marginTop: '32px' }}>
            <h2 style={{ fontSize: '18px', color: 'var(--green-dark)', marginBottom: '14px' }}>
              {ui.relatedHeading}
            </h2>
            <div className="buchtipp-related-grid">
              {otherBooks.map((other) => {
                const otherAsin = isbn13ToIsbn10(other.isbn) || other.isbn;
                const otherCoverUrl = `https://images-na.ssl-images-amazon.com/images/P/${otherAsin}.01.LZZZZZZZ.jpg`;
                return (
                  <Link
                    key={other.id}
                    href={`/buchtipps/${other.id}`}
                    style={{
                      background: 'var(--bg-white)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '6px',
                      padding: '12px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'border-color 0.15s ease',
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: '48px',
                        aspectRatio: '2/3',
                        flexShrink: 0,
                        borderRadius: '4px',
                        overflow: 'hidden',
                        background: '#f6f8f4',
                        border: '1px solid var(--border-light)',
                      }}
                    >
                      <Image
                        src={otherCoverUrl}
                        alt={other.title}
                        fill
                        sizes="48px"
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span
                        className="buchtipp-badge"
                        style={{
                          fontSize: '10px',
                          padding: '1px 6px',
                          display: 'inline-block',
                          marginBottom: '4px',
                        }}
                      >
                        {other.publisher || 'Book'}
                      </span>
                      <h4
                        style={{
                          fontSize: '13.5px',
                          fontWeight: 700,
                          color: 'var(--green-dark)',
                          margin: '0 0 2px 0',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {other.title}
                      </h4>
                      <p
                        style={{
                          fontSize: '12px',
                          color: 'var(--text-muted)',
                          margin: 0,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {ui.authorPrefix} {other.authorName}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Footer Disclaimer */}
        <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)', marginTop: '28px' }}>
          {ui.affiliateBadgeNotice}
        </p>
      </div>
    </SiteLayout>
  );
}
