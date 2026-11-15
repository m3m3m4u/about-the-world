'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SiteLayout } from '@/components/SiteLayout';
import BuchtippsExplorer from '@/components/buchtipps/BuchtippsExplorer';
import { BUCHTIPPS_UI } from '@/lib/buchtipps/data';
import { useLanguage } from '@/context/LanguageContext';

export default function BuchtippsPageClient() {
  const { language } = useLanguage();
  const ui = BUCHTIPPS_UI[language] || BUCHTIPPS_UI.de;

  return (
    <SiteLayout activeSection="buchtipps">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-nav">
        <Link href="/">{ui.breadcrumbHome}</Link>
        <span>/</span>
        <strong>{ui.breadcrumbBooks}</strong>
      </div>

      {/* Intro Banner */}
      <section className="math-intro-banner">
        <div className="math-intro-content">
          <h1 className="math-page-title">{ui.pageTitle}</h1>
          <p className="math-page-desc">{ui.pageDesc}</p>
          <p className="math-page-note">{ui.pageNote}</p>
        </div>
        <div
          className="math-mascot"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Image
            src="/ATW_Logo.png"
            alt="About the World"
            width={100}
            height={100}
            className="math-mascot-img"
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </section>

      {/* Main Explorer (Search, Filter, Grid) */}
      <BuchtippsExplorer />

      {/* Legal & Transparency Notice Banner */}
      <div className="buchtipp-legal-notice">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 600,
            color: 'var(--green-dark)',
            marginBottom: '4px',
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--green-primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span>{ui.legalHeading}</span>
        </div>
        <p style={{ margin: 0 }}>{ui.legalBody}</p>
      </div>
    </SiteLayout>
  );
}
