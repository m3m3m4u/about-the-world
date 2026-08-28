'use client';

import React, { use } from 'react';
import { SiteLayout } from '@/components/SiteLayout';
import { GeographySection } from '@/components/GeographySection';

interface PageProps {
  params: Promise<{ chapter: string }>;
}

export default function GeographyChapterPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const chapterSlug = (resolvedParams.chapter || '').toLowerCase();

  const slugToChapterId: Record<string, string> = {
    'vulkanismus-und-erdbeben': 'vulkanismus_erdbeben',
    'vulkanismus': 'vulkanismus_erdbeben',
    'vulkane': 'vulkanismus_erdbeben',
    'erdbeben': 'vulkanismus_erdbeben',
    'gebirge-und-gipfel': 'gebirge_gipfel',
    'gebirge': 'gebirge_gipfel',
    'gletscher': 'gebirge_gipfel',
    'ozeane-und-fluesse': 'ozeane_fluesse',
    'ozeane': 'ozeane_fluesse',
    'fluesse': 'ozeane_fluesse',
    'wuesten-und-klima': 'wuesten_klima',
    'wuesten': 'wuesten_klima',
    'klima': 'wuesten_klima',
    'metropolen-und-staedte': 'metropolen_staedte',
    'metropolen': 'metropolen_staedte',
    'staedte': 'metropolen_staedte',
    'zeitzonen-und-nationalparks': 'raum_zeit_naturschutz',
    'zeitzonen': 'raum_zeit_naturschutz',
    'nationalparks': 'raum_zeit_naturschutz'
  };

  const chapterId = slugToChapterId[chapterSlug] || 'vulkanismus_erdbeben';

  return (
    <SiteLayout activeSection="geography">
      <GeographySection initialChapterId={chapterId} />
    </SiteLayout>
  );
}
