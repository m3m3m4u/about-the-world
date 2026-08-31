'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { SiteLayout } from '@/components/SiteLayout';
import { NahostSection } from '@/components/NahostSection';
import { CountriesSection } from '@/components/CountriesSection';
import { USStatesSection } from '@/components/USStatesSection';
import { TopicView } from '@/components/TopicView';
import { H5PPlayer } from '@/components/H5PPlayer';
import { useLanguage } from '@/context/LanguageContext';
import { ModuleItem } from '@/types';
import mappingData from '@/data/slug_and_id_map.json';
import { notFound } from 'next/navigation';
import { AlertCircle } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function DynamicSlugPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const rawSlug = resolvedParams.slug || '';
  const slug = rawSlug.toLowerCase();
  const { language, setLanguage, t } = useLanguage();

  if (slug.includes('.')) {
    notFound();
  }

  // 1. Check topic & chapter aliases (e.g. /the-middle-east-conflict, /pays-du-monde-h5p, /geschichte-israels-und-palaestinas)
  const alias = (mappingData.topic_aliases as Record<string, any>)[slug];
  if (alias) {
    if (alias.topic === 'middle-east') {
      return (
        <SiteLayout activeSection="middle-east">
          <div style={{ marginBottom: 20 }}>
            <Link href="/" className="nav-btn active" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              ← {t.backToOverview}
            </Link>
          </div>
          <NahostSection initialChapterId={alias.chapter} />
        </SiteLayout>
      );
    }
    if (alias.topic === 'countries') {
      return (
        <SiteLayout activeSection="countries">
          <div style={{ marginBottom: 20 }}>
            <Link href="/" className="nav-btn active" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              ← {t.backToOverview}
            </Link>
          </div>
          <CountriesSection />
        </SiteLayout>
      );
    }
    if (alias.topic === 'us-states') {
      return (
        <SiteLayout activeSection="us-states">
          <div style={{ marginBottom: 20 }}>
            <Link href="/" className="nav-btn active" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              ← {t.backToOverview}
            </Link>
          </div>
          <USStatesSection />
        </SiteLayout>
      );
    }
    if (alias.topic === 'presidents') {
      return (
        <SiteLayout activeSection="presidents">
          <div style={{ marginBottom: 20 }}>
            <Link href="/" className="nav-btn active" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              ← {t.backToOverview}
            </Link>
          </div>
          <TopicView sectionId="presidents" />
        </SiteLayout>
      );
    }
    if (alias.topic === 'geography') {
      return (
        <SiteLayout activeSection="geography">
          <div style={{ marginBottom: 20 }}>
            <Link href="/" className="nav-btn active" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              ← {t.backToOverview}
            </Link>
          </div>
          <TopicView sectionId="geography" />
        </SiteLayout>
      );
    }
  }

  // 2. Check numeric ID (e.g. /2942, /5987, /1, /2)
  let targetPackageSlug: string | null = null;
  if (/^\d+$/.test(slug)) {
    targetPackageSlug = (mappingData.id_to_package as Record<string, string>)[slug] || null;
  }

  // 3. Check standalone post / page slug (e.g. /deutschland, /frankreich, /kalifornien)
  const pageInfo = (mappingData.slug_to_page as Record<string, any>)[slug];
  if (!targetPackageSlug && pageInfo && pageInfo.h5p_slugs && pageInfo.h5p_slugs.length > 0) {
    targetPackageSlug = pageInfo.h5p_slugs[0];
  }

  // 4. Direct package slug fallback (e.g. /nao-balfour-4, /deutschland-2942)
  if (!targetPackageSlug && Object.values(mappingData.id_to_package).includes(slug)) {
    targetPackageSlug = slug;
  }

  // If a matching H5P package was resolved:
  if (targetPackageSlug) {
    const formattedTitle = pageInfo?.title || targetPackageSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const moduleItem: ModuleItem = {
      id: `h5p-${targetPackageSlug}`,
      slug: targetPackageSlug,
      title: {
        de: formattedTitle,
        en: formattedTitle,
        fr: formattedTitle,
        es: formattedTitle,
        it: formattedTitle,
      },
      type: 'CoursePresentation',
    };

    return (
      <SiteLayout>
        <div style={{ marginBottom: 20 }}>
          <Link href="/" className="nav-btn active" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
            ← {t.backToOverview}
          </Link>
        </div>

        <div className="section-block" style={{ margin: 0 }}>
          <H5PPlayer module={moduleItem} />
        </div>
      </SiteLayout>
    );
  }

  // 5. 404 / Not Found Fallback with clean UI
  return (
    <SiteLayout>
      <div style={{ marginBottom: 20 }}>
        <Link href="/" className="nav-btn active" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
          ← {t.backToOverview}
        </Link>
      </div>

      <div className="info-box-section" style={{ textAlign: 'center', padding: '48px 24px' }}>
        <div style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: 'var(--green-light)',
          color: 'var(--green-dark)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto'
        }}>
          <AlertCircle style={{ width: 28, height: 28 }} />
        </div>
        <h2 style={{ fontSize: '20px', color: 'var(--green-dark)', marginBottom: 8 }}>
          Seite oder Übung nicht gefunden
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto 20px auto', lineHeight: 1.6 }}>
          Die aufgerufene Adresse <code>/{rawSlug}</code> konnte keinem Inhalt zugeordnet werden.
        </p>
        <Link
          href="/"
          className="nav-btn active"
          style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', padding: '10px 18px', fontWeight: 700 }}
        >
          Zur Startseite zurückkehren
        </Link>
      </div>
    </SiteLayout>
  );
}
