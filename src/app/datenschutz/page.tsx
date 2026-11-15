'use client';

import React from 'react';
import Link from 'next/link';
import { SiteLayout } from '@/components/SiteLayout';
import { LegalDocument } from '@/components/LegalModal';
import { useLanguage } from '@/context/LanguageContext';

export default function DatenschutzPage() {
  const { t } = useLanguage();

  return (
    <SiteLayout>
      <div style={{ marginBottom: 16 }}>
        <Link
          href="/"
          className="nav-btn active"
          style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
        >
          ← {t.backToOverview}
        </Link>
      </div>
      <div className="legal-paper">
        <LegalDocument type="datenschutz" />
      </div>
    </SiteLayout>
  );
}
