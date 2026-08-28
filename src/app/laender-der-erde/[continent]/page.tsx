'use client';

import React, { use } from 'react';
import { SiteLayout } from '@/components/SiteLayout';
import { CountriesSection } from '@/components/CountriesSection';

interface PageProps {
  params: Promise<{ continent: string }>;
}

export default function ContinentPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const continentSlug = (resolvedParams.continent || '').toLowerCase();

  const slugToContinentId: Record<string, string> = {
    'europa': 'europa',
    'europe': 'europa',
    'asien': 'asien',
    'asia': 'asien',
    'asie': 'asien',
    'afrika': 'afrika',
    'africa': 'afrika',
    'afrique': 'afrika',
    'nordamerika': 'nordamerika',
    'north-america': 'nordamerika',
    'north-central-america': 'nordamerika',
    'suedamerika': 'suedamerika',
    'south-america': 'suedamerika',
    'ozeanien': 'ozeanien',
    'oceania': 'ozeanien',
    'australien-ozeanien': 'ozeanien'
  };

  const continentId = slugToContinentId[continentSlug] || 'europa';

  return (
    <SiteLayout activeSection="countries">
      <CountriesSection initialContinentId={continentId} />
    </SiteLayout>
  );
}
