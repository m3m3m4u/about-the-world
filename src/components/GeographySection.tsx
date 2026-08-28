'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { H5PPlayer } from '@/components/H5PPlayer';
import { ModuleItem } from '@/types';
import geoChaptersData from '@/data/geography_complete.json';
import { 
  Flame, 
  Mountain, 
  Waves, 
  Sun, 
  Globe2, 
  Building2,
  ArrowRight,
  PlayCircle
} from 'lucide-react';

const iconMap: Record<string, any> = {
  vulkanismus_erdbeben: Flame,
  gebirge_gipfel: Mountain,
  ozeane_fluesse: Waves,
  wuesten_klima: Sun,
  metropolen_staedte: Building2,
  raum_zeit_naturschutz: Globe2
};

const chapterSlugMap: Record<string, string> = {
  vulkanismus_erdbeben: 'vulkanismus-und-erdbeben',
  gebirge_gipfel: 'gebirge-und-gipfel',
  ozeane_fluesse: 'ozeane-und-fluesse',
  wuesten_klima: 'wuesten-und-klima',
  metropolen_staedte: 'metropolen-und-staedte',
  raum_zeit_naturschutz: 'zeitzonen-und-nationalparks'
};

interface GeographySectionProps {
  initialChapterId?: string;
}

export function GeographySection({ initialChapterId }: GeographySectionProps = {}) {
  const { language } = useLanguage();

  // Selected chapter: null = Overview Page with 6 cards; string = Chapter detail page
  const [activeChapterId, setActiveChapterId] = useState<string | null>(initialChapterId || null);
  const activeChapter = geoChaptersData.find(c => c.id === activeChapterId) || null;

  const [activeLessonId, setActiveLessonId] = useState<string>('');
  const activeLesson = activeChapter ? (activeChapter.lessons.find(l => l.id === activeLessonId) || activeChapter.lessons[0]) : null;

  const getLessonTitle = (lesson: any, lang: string): string => {
    if (!lesson) return '';
    if (typeof lesson.title === 'string') return lesson.title;
    return lesson.title[lang] || lesson.title.de || '';
  };

  const getLessonText = (lesson: any, lang: string): string => {
    if (!lesson) return '';
    if (typeof lesson.text === 'string') return lesson.text;
    return lesson.text[lang] || lesson.text.de || '';
  };

  const currentModule: ModuleItem | null = activeLesson && activeChapter ? {
    id: `geo-${activeChapter.id}-${activeLesson.id}-${language}`,
    slug: (activeLesson.h5pSlugs && (activeLesson.h5pSlugs[language as keyof typeof activeLesson.h5pSlugs] || activeLesson.h5pSlugs.de)) || (activeLesson as any).h5pSlug || 'die-groesten-ozeane-und-meere-der-erde-4311',
    title: {
      de: getLessonTitle(activeLesson, 'de'),
      en: getLessonTitle(activeLesson, 'en'),
      fr: getLessonTitle(activeLesson, 'fr'),
      es: getLessonTitle(activeLesson, 'es'),
      it: getLessonTitle(activeLesson, 'it'),
    },
    type: 'CoursePresentation',
  } : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      
      {/* 1. ÜBERSICHTSSEITE DES FACHPORTALS (ZWISCHENSEITE) */}
      {!activeChapter ? (
        <div>
          
          {/* Header Info Box */}
          <div className="info-box-section">
            <h2>
              {language === 'de' && 'Fachportal: Allgemeine Geographie & Erdkunde'}
              {language === 'en' && 'Subject Portal: General Geography & Earth Sciences'}
              {language === 'fr' && 'Portail thématique : Géographie générale et sciences de la Terre'}
              {language === 'es' && 'Portal temático: Geografía general y ciencias de la Tierra'}
              {language === 'it' && 'Portale tematico: Geografia generale e scienze della Terra'}
            </h2>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-color)', marginTop: 8 }}>
              {language === 'de' && 'Umfassendes multimediales Lernportal mit verifizierten H5P-Lerneinheiten und Fachtexten zu Vulkanismus, Plattentektonik, Gebirgen, Ozeanen, Flüssen, Klimazonen und Stadtgeographie.'}
              {language === 'en' && 'Comprehensive learning portal with verified H5P modules and educational texts on volcanism, tectonics, mountains, oceans, rivers, climate zones, and urban geography.'}
              {language === 'fr' && 'Portail d\'apprentissage avec modules H5P vérifiés sur le volcanisme, la tectonique, les montagnes, les océans, les fleuves et les climats.'}
              {language === 'es' && 'Portal educativo con módulos H5P verificados sobre vulcanismo, tectónica, montañas, océanos, ríos y zonas climáticas.'}
              {language === 'it' && 'Portale didattico con moduli H5P verificati su vulcanismo, tettonica, montagne, oceani, fiumi e zone climatiche.'}
            </p>
          </div>

          {/* Die 6 Fachkapitel-Kacheln (3 pro Reihe auf Desktop) */}
          <div className="section-block">
            <h3 className="section-main-heading">Die 6 Fachgebiete der Geographie</h3>

            <div className="cards-grid cards-grid-3-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {geoChaptersData.map((ch) => {
                const Icon = iconMap[ch.id] || Flame;
                const chapterSlug = chapterSlugMap[ch.id] || ch.id;
                const chapterUrl = `/geographie/${chapterSlug}`;

                return (
                  <Link
                    key={ch.id}
                    href={chapterUrl}
                    className="tile-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      cursor: 'pointer',
                      background: 'var(--bg-white)',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div>
                      <div style={{
                        width: 44,
                        height: 44,
                        borderRadius: 6,
                        background: 'var(--green-light)',
                        color: 'var(--green-dark)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 12
                      }}>
                        <Icon style={{ width: 22, height: 22 }} />
                      </div>

                      <h3 className="tile-title" style={{ textAlign: 'left', marginBottom: 6, fontSize: '16px' }}>
                        {ch.title[language as keyof typeof ch.title] || ch.title.de}
                      </h3>

                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: 16 }}>
                        {ch.desc[language as keyof typeof ch.desc] || ch.desc.de}
                      </p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                        {ch.lessons.map((les) => (
                          <span
                            key={les.id}
                            style={{
                              fontSize: '11px',
                              padding: '2px 8px',
                              background: 'var(--bg-body)',
                              border: '1px solid var(--border-light)',
                              borderRadius: 4,
                              color: 'var(--text-color)'
                            }}
                          >
                            {getLessonTitle(les, language)}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: 'var(--green-dark)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      borderTop: '1px solid var(--border-light)',
                      paddingTop: 12,
                      width: '100%'
                    }}>
                      <span>Fachgebiet öffnen ({ch.lessons.length} Lerneinheiten)</span>
                      <ArrowRight style={{ width: 14, height: 14 }} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

        </div>
      ) : (
        /* 2. KAPITELSEITE (OHNE DIE DOPPELTE LEISTE, NUR DAS AKTIVE KAPITEL MIT LEKTIONEN) */
        <div>
          
          {/* Zurück zur Kapitelübersicht */}
          <div style={{ marginBottom: 16 }}>
            <Link
              href="/geographie"
              className="nav-btn"
              style={{
                border: '1px solid var(--green-border)',
                background: 'var(--bg-white)',
                color: 'var(--green-dark)',
                cursor: 'pointer',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 4,
                textDecoration: 'none'
              }}
            >
              <span>← Zurück zur Fachgebietsübersicht</span>
            </Link>
          </div>

          {/* Titel-Box des gewählten Kapitels */}
          <div className="info-box-section" style={{ padding: '16px 20px', marginBottom: 20 }}>
            <h2 style={{ fontSize: '18px', color: 'var(--green-dark)', margin: '0 0 6px 0', fontWeight: 700 }}>
              {activeChapter.title[language as keyof typeof activeChapter.title] || activeChapter.title.de}
            </h2>
            <p style={{ fontSize: '13.5px', color: 'var(--text-color)', margin: 0, lineHeight: 1.5 }}>
              {activeChapter.desc[language as keyof typeof activeChapter.desc] || activeChapter.desc.de}
            </p>
          </div>

          {/* Lektionen-Navigation des geöffneten Kapitels */}
          <div className="section-block" style={{ margin: 0 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
              {activeChapter.lessons.map((lesson, idx) => {
                const isLessonActive = lesson.id === activeLesson?.id;
                const lTitle = getLessonTitle(lesson, language);
                return (
                  <button
                    key={lesson.id}
                    type="button"
                    onClick={() => setActiveLessonId(lesson.id)}
                    className={`nav-btn ${isLessonActive ? 'active' : ''}`}
                    style={{
                      border: isLessonActive ? '1px solid var(--green-dark)' : '1px solid var(--border-light)',
                      background: isLessonActive ? 'var(--green-light)' : 'var(--bg-white)',
                      color: isLessonActive ? 'var(--green-dark)' : 'var(--text-color)',
                      fontWeight: isLessonActive ? 700 : 500,
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '8px 14px',
                      borderRadius: 4
                    }}
                  >
                    <PlayCircle style={{ width: 14, height: 14, color: isLessonActive ? 'var(--green-primary)' : 'var(--text-muted)' }} />
                    <span>{idx + 1}. {lTitle}</span>
                  </button>
                );
              })}
            </div>

            {/* Fachtext zur ausgewählten Lektion */}
            {activeLesson && (
              <div className="h5p-player-card" style={{ margin: '0 0 20px 0', textAlign: 'left', padding: '18px 22px' }}>
                <h4 style={{ fontSize: '17px', color: 'var(--green-dark)', marginBottom: 8, fontWeight: 700 }}>
                  {getLessonTitle(activeLesson, language)}
                </h4>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-color)', margin: 0 }}>
                  {getLessonText(activeLesson, language)}
                </p>
              </div>
            )}

            {/* Interaktiver H5P-Player */}
            {currentModule && (
              <div>
                <H5PPlayer
                  key={currentModule.id}
                  module={currentModule}
                  onComplete={() => {}}
                />
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
