'use client';

import React, { use } from 'react';
import { SiteLayout } from '@/components/SiteLayout';
import { NahostSection } from '@/components/NahostSection';

interface PageProps {
  params: Promise<{ chapter: string }>;
}

export default function NahostChapterPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const chapterSlug = (resolvedParams.chapter || '').toLowerCase();

  const slugToChapterId: Record<string, string> = {
    'geschichte-israels-und-palaestinas': 'geschichte',
    'geschichte': 'geschichte',
    'history-of-israel-and-palestine': 'geschichte',
    'kriege-und-krisen': 'kriege',
    'kriege': 'kriege',
    'wars-and-crises': 'kriege',
    'gruende-fuer-konflikt': 'gruende',
    'gruende': 'gruende',
    'reasons-for-the-conflict': 'gruende',
    'lage-der-bevoelkerung': 'lage',
    'lage': 'lage',
    'situation-of-the-population': 'lage',
    'die-rolle-von-aussenstehenden-parteien': 'akteure',
    'akteure': 'akteure',
    'other-players-in-the-crisis': 'akteure',
    'chancen-fuer-den-frieden': 'chancen',
    'chancen': 'chancen',
    'opportunities-for-peace': 'chancen'
  };

  const chapterId = slugToChapterId[chapterSlug] || 'geschichte';

  return (
    <SiteLayout activeSection="middle-east">
      <NahostSection initialChapterId={chapterId} />
    </SiteLayout>
  );
}
