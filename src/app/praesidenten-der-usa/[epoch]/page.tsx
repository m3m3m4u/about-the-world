'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { SiteLayout } from '@/components/SiteLayout';
import { PresidentsSection } from '@/components/PresidentsSection';
import { useLanguage } from '@/context/LanguageContext';

interface PageProps {
  params: Promise<{ epoch: string }>;
}

export default function PresidentEpochPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { t } = useLanguage();
  const epochSlug = (resolvedParams.epoch || '').toLowerCase();

  const slugToIdMap: Record<string, { type: 'epoch' | 'topic'; id: string }> = {
    // Epochs
    'gruendervaeter': { type: 'epoch', id: 'gruendervaeter' },
    'gruendervaeter-und-fruehe-republik': { type: 'epoch', id: 'gruendervaeter' },
    'founding-fathers': { type: 'epoch', id: 'gruendervaeter' },
    'expansion': { type: 'epoch', id: 'expansion_vorabend' },
    'expansion-und-vorabend-des-buergerkriegs': { type: 'epoch', id: 'expansion_vorabend' },
    'expansion_vorabend': { type: 'epoch', id: 'expansion_vorabend' },
    'buergerkrieg': { type: 'epoch', id: 'buergerkrieg_gilded_age' },
    'buergerkrieg-und-gilded-age': { type: 'epoch', id: 'buergerkrieg_gilded_age' },
    'buergerkrieg_gilded_age': { type: 'epoch', id: 'buergerkrieg_gilded_age' },
    'civil-war': { type: 'epoch', id: 'buergerkrieg_gilded_age' },
    'progressive-aera': { type: 'epoch', id: 'progressiv_weltkriege' },
    'progressive-aera-und-weltkriege': { type: 'epoch', id: 'progressiv_weltkriege' },
    'progressiv_weltkriege': { type: 'epoch', id: 'progressiv_weltkriege' },
    'kalter-krieg': { type: 'epoch', id: 'kalter_krieg' },
    'kalter-krieg-und-buergerrechte': { type: 'epoch', id: 'kalter_krieg' },
    'kalter_krieg': { type: 'epoch', id: 'kalter_krieg' },
    'cold-war': { type: 'epoch', id: 'kalter_krieg' },
    'moderne-aera': { type: 'epoch', id: 'moderne_aera' },
    'das-moderne-amerika-21-jahrhundert': { type: 'epoch', id: 'moderne_aera' },
    'moderne_aera': { type: 'epoch', id: 'moderne_aera' },
    'modern-era': { type: 'epoch', id: 'moderne_aera' },

    // Special Topics
    'wahlsystem': { type: 'topic', id: 'wahlsystem' },
    'us-praesidentschaftswahlsystem': { type: 'topic', id: 'wahlsystem' },
    'election-system': { type: 'topic', id: 'wahlsystem' },
    'wichtigste-praesidenten': { type: 'topic', id: 'wichtigste_praesidenten' },
    'die-wichtigsten-praesidenten': { type: 'topic', id: 'wichtigste_praesidenten' },
    'key-presidents': { type: 'topic', id: 'wichtigste_praesidenten' },
    'demokraten': { type: 'topic', id: 'demokraten' },
    'die-demokratische-partei': { type: 'topic', id: 'demokraten' },
    'republikaner': { type: 'topic', id: 'republikaner' },
    'die-republikanische-partei': { type: 'topic', id: 'republikaner' },
    'kamala-harris': { type: 'topic', id: 'kamala_harris' },
    'donald-trump': { type: 'topic', id: 'donald_trump_kandidat' },
    'donald-trump-wahlen': { type: 'topic', id: 'donald_trump_kandidat' },
  };

  const matched = slugToIdMap[epochSlug] || { type: 'epoch', id: 'gruendervaeter' };

  return (
    <SiteLayout activeSection="presidents">
      <div style={{ marginBottom: 20 }}>
        <Link
          href="/praesidenten-der-usa"
          className="nav-btn active"
          style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
        >
          ← {t.backToOverview}
        </Link>
      </div>

      {matched.type === 'epoch' ? (
        <PresidentsSection initialEpochId={matched.id} />
      ) : (
        <PresidentsSection initialTopicId={matched.id} />
      )}
    </SiteLayout>
  );
}
