'use client';

import React from 'react';
import Link from 'next/link';
import { SiteLayout } from '@/components/SiteLayout';
import { BiologyClassificationQuiz } from '@/components/BiologyClassificationQuiz';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeft } from 'lucide-react';

export default function BiologyTierartQuizPage() {
  const { t } = useLanguage();

  return (
    <SiteLayout activeSection="biology">
      <div style={{ marginBottom: 20 }}>
        <Link
          href="/biologie"
          className="nav-btn active"
          style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          <ArrowLeft style={{ width: 15, height: 15 }} />
          <span>{t.biologyBackToHub}</span>
        </Link>
      </div>

      <BiologyClassificationQuiz />
    </SiteLayout>
  );
}
