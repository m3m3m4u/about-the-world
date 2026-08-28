'use client';

import React from 'react';
import Link from 'next/link';
import { SiteLayout } from '@/components/SiteLayout';
import { PresidentsSection } from '@/components/PresidentsSection';
import { useLanguage } from '@/context/LanguageContext';

export default function PresidentsPage() {
  const { t } = useLanguage();

  return (
    <SiteLayout activeSection="presidents">
      <div style={{ marginBottom: 20 }}>
        <Link
          href="/"
          className="nav-btn active"
          style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
        >
          ← {t.backToOverview}
        </Link>
      </div>

      <PresidentsSection />
    </SiteLayout>
  );
}
