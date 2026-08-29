'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SiteLayout } from '@/components/SiteLayout';
import { BiologyQuiz } from '@/components/BiologyQuiz';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeft, Loader2 } from 'lucide-react';

function BiologyQuizWrapper() {
  const searchParams = useSearchParams();
  const kategorie = searchParams.get('kategorie') || 'alle';

  return <BiologyQuiz initialCategory={kategorie} />;
}

export default function BiologyQuizPage() {
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

      <Suspense
        fallback={
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            <Loader2 style={{ width: 24, height: 24, animation: 'spin 1s linear infinite', margin: '0 auto 8px' }} />
            <div>{t.loading}</div>
          </div>
        }
      >
        <BiologyQuizWrapper />
      </Suspense>
    </SiteLayout>
  );
}
