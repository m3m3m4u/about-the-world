'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { H5PPlayer } from '@/components/H5PPlayer';
import { ModuleItem } from '@/types';
import { ChevronRight } from 'lucide-react';

interface TopicViewProps {
  sectionId: string;
}

export function TopicView({ sectionId }: TopicViewProps) {
  const { t, language } = useLanguage();
  
  const [pageData, setPageData] = useState<any>(null);
  const [subPages, setSubPages] = useState<any[]>([]);
  const [activeSubPage, setActiveSubPage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentModule, setCurrentModule] = useState<ModuleItem | null>(null);

  // Map section to relevant slug
  const sectionSlugs: Record<string, Record<string, string>> = {
    geography: {
      de: 'geographie_de',
      en: 'geography_en',
      fr: 'geographie_fr',
      es: 'geografia_es',
      it: 'geografia_it',
    },
    countries: {
      de: 'laender-der-erde-h5p',
      en: 'countries-of-the-world-h5p',
      fr: 'pays-du-monde-h5p',
      es: 'paises-del-mundo-h5p',
      it: 'paesi-della-terra-h5p',
    },
    'middle-east': {
      de: 'der-nahostkonflikt',
      en: 'the-middle-east-conflict',
      fr: 'le-conflit-au-proche-orient',
      es: 'el-conflicto-de-oriente-proximo',
      it: 'il-conflitto-in-medio-oriente',
    },

    presidents: {
      de: 'praesidenten-der-usa',
      en: 'presidents-of-the-usa',
      fr: 'presidents-des-etats-unis',
      es: 'presidentes-de-ee-uu',
      it: 'presidenti-degli-stati-uniti',
    },
    'us-states': {
      de: 'us-bundesstaaten',
      en: 'us-states',
      fr: 'etats-des-etats-unis',
      es: 'estados-de-ee-uu',
      it: 'stati-degli-stati-uniti',
    },
  };

  useEffect(() => {
    async function loadTopic() {
      setIsLoading(true);
      const slugMap = sectionSlugs[sectionId] || sectionSlugs.geography;
      const targetSlug = slugMap[language] || slugMap.de;

      try {
        const pageRes = await fetch(`/api/pages?slug=${targetSlug}`);
        const pageJson = await pageRes.json();
        
        if (pageJson.success && pageJson.page) {
          setPageData(pageJson.page);

          const subRes = await fetch(`/api/pages?parent_id=${pageJson.page.post_id}`);
          const subJson = await subRes.json();
          const subs = subJson.pages || [];
          setSubPages(subs);
          
          const initialTarget = subs.length > 0 ? subs[0] : pageJson.page;
          setActiveSubPage(subs.length > 0 ? subs[0] : null);

          // Configure initial H5P module
          const targetSlug = initialTarget.slug;
          const folder = pageJson.h5p_folder || targetSlug;
          setCurrentModule({
            id: `topic-${initialTarget.post_id}`,
            slug: folder,
            title: {
              de: initialTarget.title,
              en: initialTarget.title,
              fr: initialTarget.title,
              es: initialTarget.title,
              it: initialTarget.title,
            },
            type: 'CoursePresentation',
          });
        }
      } catch (err) {
        console.error('Error loading topic:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadTopic();
  }, [sectionId, language]);

  const handleSelectSubPage = async (sub: any) => {
    setActiveSubPage(sub);
    try {
      const res = await fetch(`/api/pages?slug=${sub.slug}`);
      const data = await res.json();
      const folder = data.h5p_folder || sub.slug;
      setCurrentModule({
        id: `topic-${sub.post_id}`,
        slug: folder,
        title: {
          de: sub.title,
          en: sub.title,
          fr: sub.title,
          es: sub.title,
          it: sub.title,
        },
        type: 'CoursePresentation',
      });
    } catch (e) {
      setCurrentModule({
        id: `topic-${sub.post_id}`,
        slug: sub.slug,
        title: {
          de: sub.title,
          en: sub.title,
          fr: sub.title,
          es: sub.title,
          it: sub.title,
        },
        type: 'CoursePresentation',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="h5p-player-card">
        <div className="h5p-status">
          {t.loading}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      {/* Topic Header Card */}
      <div className="info-box-section">
        <h2>{pageData?.title || 'Themenbereich'}</h2>

        <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-color)', marginTop: 8 }}>
          {sectionId === 'middle-east' && (
            <p>
              Umfassendes Fachportal zum Nahostkonflikt: Geschichte Israels und Palästinas, Schlüsselkrisen,
              weitere Akteure und Friedenschancen. Wählen Sie unten ein Kapitel aus, um die Fachinhalte und
              die zugehörigen Übungen zu starten.
            </p>
          )}
          {sectionId === 'geography' && (
            <p>
              Geographie und Erdkunde: Kontinente, Ozeane, Klimazonen, Hauptstädte und geographische Grundbegriffe.
            </p>
          )}
          {sectionId === 'countries' && (
            <p>
              Länder der Erde: Erklärvideos und interaktive Übungen zu den Staaten aller Kontinente.
            </p>
          )}

          {sectionId === 'presidents' && (
            <p>
              Alle Präsidenten der USA: Chronologie, historische Epochen und Biographien von George Washington bis heute.
            </p>
          )}
          {sectionId === 'us-states' && (
            <p>
              Die 50 Bundesstaaten der USA: Hauptstädte, Besonderheiten und Online-Kartenübungen.
            </p>
          )}
        </div>

        {/* Subchapters / Lessons Stepper */}
        {subPages.length > 0 && (
          <div style={{ paddingTop: 16, marginTop: 14, borderTop: '1px solid var(--green-border)' }}>
            <div style={{ 
              fontSize: '13px', 
              fontWeight: 700, 
              color: 'var(--green-dark)', 
              marginBottom: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {t.subChaptersTitle}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {subPages.map((sub) => {
                const isActive = activeSubPage?.post_id === sub.post_id;
                return (
                  <button
                    key={sub.post_id}
                    type="button"
                    onClick={() => handleSelectSubPage(sub)}
                    className={`nav-btn ${isActive ? 'active' : ''}`}
                    style={{
                      border: '1px solid var(--green-border)',
                      background: isActive ? 'var(--green-primary)' : 'var(--bg-white)',
                      color: isActive ? '#ffffff' : 'var(--text-color)',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{sub.title}</span>
                    <ChevronRight style={{ width: 14, height: 14, marginLeft: 4 }} />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Embedded Real H5P Exercise Player */}
      {currentModule && (
        <H5PPlayer
          module={currentModule}
          onComplete={() => {}}
        />
      )}

    </div>
  );
}
