'use client';

import React from 'react';
import Link from 'next/link';
import { SiteLayout } from '@/components/SiteLayout';
import { USStatesSection } from '@/components/USStatesSection';
import { useLanguage } from '@/context/LanguageContext';

export default function USStatesPage() {
  const { t } = useLanguage();

  return (
    <SiteLayout activeSection="us-states">
      <div style={{ marginBottom: 20 }}>
        <Link
          href="/"
          className="nav-btn active"
          style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
        >
          ← {t.backToOverview}
        </Link>
      </div>

      <USStatesSection />
    </SiteLayout>
  );
}
