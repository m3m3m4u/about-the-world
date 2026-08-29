'use client';

import React from 'react';
import { SiteLayout } from '@/components/SiteLayout';
import { MapQuiz } from '@/components/MapQuiz';

export default function KartenquizPage() {
  return (
    <SiteLayout activeSection="mapquiz">
      <MapQuiz />
    </SiteLayout>
  );
}
