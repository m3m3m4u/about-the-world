'use client';

import React from 'react';
import Link from 'next/link';
import { SiteLayout } from '@/components/SiteLayout';
import { NahostSection } from '@/components/NahostSection';
import { useLanguage } from '@/context/LanguageContext';

export default function NahostPage() {
  const { t } = useLanguage();

  return (
    <SiteLayout activeSection="middle-east">
      <div style={{ marginBottom: 20 }}>
        <Link
          href="/"
          className="nav-btn active"
          style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
        >
          ← {t.backToOverview}
        </Link>
      </div>

      <NahostSection />
    </SiteLayout>
  );
}
