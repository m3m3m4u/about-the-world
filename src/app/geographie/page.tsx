'use client';

import React from 'react';
import Link from 'next/link';
import { SiteLayout } from '@/components/SiteLayout';
import { GeographySection } from '@/components/GeographySection';
import { useLanguage } from '@/context/LanguageContext';

export default function GeographyPage() {
  const { t } = useLanguage();

  return (
    <SiteLayout activeSection="geography">
      <div style={{ marginBottom: 20 }}>
        <Link
          href="/"
          className="nav-btn active"
          style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
        >
          ← {t.backToOverview}
        </Link>
      </div>

      <GeographySection />
    </SiteLayout>
  );
}
