'use client';

import React from 'react';
import Link from 'next/link';
import { SiteLayout } from '@/components/SiteLayout';
import { CountriesSection } from '@/components/CountriesSection';
import { useLanguage } from '@/context/LanguageContext';

export default function CountriesPage() {
  const { t } = useLanguage();

  return (
    <SiteLayout activeSection="countries">
      <div style={{ marginBottom: 20 }}>
        <Link
          href="/"
          className="nav-btn active"
          style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
        >
          ← {t.backToOverview}
        </Link>
      </div>

      <CountriesSection />
    </SiteLayout>
  );
}
