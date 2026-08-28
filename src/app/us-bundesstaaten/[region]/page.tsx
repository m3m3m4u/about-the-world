'use client';

import React, { use } from 'react';
import { SiteLayout } from '@/components/SiteLayout';
import { USStatesSection } from '@/components/USStatesSection';

interface PageProps {
  params: Promise<{ region: string }>;
}

export default function USStateRegionPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const regionSlug = (resolvedParams.region || '').toLowerCase();

  const slugToRegionId: Record<string, string> = {
    'nordosten': 'nordosten',
    'new-england': 'nordosten',
    'neuengland': 'nordosten',
    'suedosten': 'suedosten',
    'southeast': 'suedosten',
    'midwest': 'midwest',
    'mittlerer-westen': 'midwest',
    'sueden': 'sueden',
    'south': 'sueden',
    'plains_mountains': 'plains_mountains',
    'great-plains-rocky-mountains': 'plains_mountains',
    'rocky-mountains': 'plains_mountains',
    'plains-mountains': 'plains_mountains',
    'pazifik_uebersee': 'pazifik_uebersee',
    'pazifik': 'pazifik_uebersee',
    'pacific': 'pazifik_uebersee',
    'pazifik-alaska-hawaii': 'pazifik_uebersee'
  };

  const regionId = slugToRegionId[regionSlug] || 'nordosten';

  return (
    <SiteLayout activeSection="us-states">
      <USStatesSection initialRegionId={regionId} />
    </SiteLayout>
  );
}
