'use client';

import React from 'react';
import Link from 'next/link';
import { SiteLayout } from '@/components/SiteLayout';
import { FlagQuiz } from '@/components/FlagQuiz';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeft } from 'lucide-react';

export default function FlagQuizPage() {
  const { t } = useLanguage();

  return (
    <SiteLayout activeSection="flagquiz">
      <div style={{ marginBottom: 20 }}>
        <Link
          href="/"
          className="nav-btn active"
          style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          <ArrowLeft style={{ width: 15, height: 15 }} />
          <span>{t.backToOverview}</span>
        </Link>
      </div>

      <FlagQuiz />
    </SiteLayout>
  );
}
