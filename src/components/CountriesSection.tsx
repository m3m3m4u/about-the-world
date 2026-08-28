'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { H5PPlayer } from '@/components/H5PPlayer';
import { ModuleItem } from '@/types';
import continentsData from '@/data/countries_complete.json';
import { 
  Globe, 
  MapPin, 
  ArrowRight,
  PlayCircle
} from 'lucide-react';

interface CountriesSectionProps {
  initialContinentId?: string;
}

export function CountriesSection({ initialContinentId }: CountriesSectionProps = {}) {
  const { language } = useLanguage();

  // Selected continent: null = Overview page with 6 continent tiles; string = Continent detail page
  const [activeContinentId, setActiveContinentId] = useState<string | null>(initialContinentId || null);
  const activeContinent = continentsData.find(c => c.id === activeContinentId) || null;

  const [activeCountrySlug, setActiveCountrySlug] = useState<string>('');
  const activeCountry = activeContinent ? (activeContinent.countries.find(c => c.slug === activeCountrySlug) || activeContinent.countries[0]) : null;

  const getCountryName = (country: any, lang: string): string => {
    if (!country) return '';
    if (typeof country.title === 'string') return country.title;
    return country.title[lang] || country.title.de || '';
  };

  const currentModule: ModuleItem | null = activeCountry ? {
    id: `country-${activeCountry.slug}`,
    slug: activeCountry.h5p,
    title: {
      de: getCountryName(activeCountry, 'de'),
      en: getCountryName(activeCountry, 'en'),
      fr: getCountryName(activeCountry, 'fr'),
      es: getCountryName(activeCountry, 'es'),
      it: getCountryName(activeCountry, 'it'),
    },
    type: 'CoursePresentation',
  } : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      
      {/* 1. ÜBERSICHTSSEITE (ZWISCHENSEITE MIT DEN 6 KONTINENT-KACHELN) */}
      {!activeContinent ? (
        <div>
          
          {/* Header Info Box */}
          <div className="info-box-section">
            <h2>
              {language === 'de' && 'Länder der Erde – Erklärvideos und Online-Übungen'}
              {language === 'en' && 'Countries of the World – Explainer Videos & Exercises'}
              {language === 'fr' && 'Pays du monde – Vidéos explicatives et exercices'}
              {language === 'es' && 'Países del mundo – Videos explicativos y ejercicios'}
              {language === 'it' && 'Paesi della Terra – Video esplicativi ed esercizi'}
            </h2>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-color)', marginTop: 8 }}>
              {language === 'de' && 'Entdecken Sie die Staaten der Erde geordnet nach Kontinenten. Wählen Sie einen Kontinent und ein Land aus, um den Fachtext zu lesen und die interaktive H5P-Lerneinheit zu starten.'}
              {language === 'en' && 'Explore the countries of the world arranged by continents. Select a continent and a country to read the facts and start the interactive H5P learning unit.'}
              {language === 'fr' && 'Explorez les pays du monde classés par continents. Sélectionnez un continent et un pays pour lancer l\'exercice interactif.'}
              {language === 'es' && 'Explore los países del mundo organizados por continentes. Seleccione un continente y un país para comenzar el ejercicio interactivo.'}
              {language === 'it' && 'Esplora i paesi del mondo organizzati per continenti. Seleziona un continente e un paese per avviare l\'esercizio interattivo.'}
            </p>
          </div>

          {/* Die 6 Kontinente-Kacheln (3 pro Reihe auf Desktop) */}
          <div className="section-block">
            <h3 className="section-main-heading">Die 6 Kontinente</h3>

            <div className="cards-grid cards-grid-3-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {continentsData.map((cont) => {
                const title = cont.title[language as keyof typeof cont.title] || cont.title.de;
                const desc = cont.desc[language as keyof typeof cont.desc] || cont.desc.de;
                const continentUrl = `/laender-der-erde/${cont.id}`;
                
                return (
                  <Link
                    key={cont.id}
                    href={continentUrl}
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
                        <Globe style={{ width: 22, height: 22 }} />
                      </div>

                      <h3 className="tile-title" style={{ textAlign: 'left', marginBottom: 6, fontSize: '16px' }}>
                        {title}
                      </h3>

                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: 16 }}>
                        {desc}
                      </p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                        {cont.countries.slice(0, 6).map((c) => {
                          const cTitle = getCountryName(c, language);
                          return (
                            <span
                              key={c.slug}
                              style={{
                                fontSize: '11px',
                                padding: '2px 8px',
                                background: 'var(--bg-body)',
                                border: '1px solid var(--border-light)',
                                borderRadius: 4,
                                color: 'var(--text-color)'
                              }}
                            >
                              {cTitle}
                            </span>
                          );
                        })}
                        {cont.countries.length > 6 && (
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)', alignSelf: 'center' }}>
                            +{cont.countries.length - 6} weitere
                          </span>
                        )}
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
                      <span>Kontinent öffnen ({cont.countries.length} Länder)</span>
                      <ArrowRight style={{ width: 14, height: 14 }} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

        </div>
      ) : (
        /* 2. KONTINENT-DETAILANSICHT (OHNE DOPPELTE LEISTE, DIREKT MIT LÄNDERN) */
        <div>
          
          {/* Zurück zur Kontinentübersicht */}
          <div style={{ marginBottom: 16 }}>
            <Link
              href="/laender-der-erde"
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
              <span>← Zurück zur Kontinentübersicht</span>
            </Link>
          </div>

          {/* Titel-Box des gewählten Kontinents */}
          <div className="info-box-section" style={{ padding: '16px 20px', marginBottom: 20 }}>
            <h2 style={{ fontSize: '18px', color: 'var(--green-dark)', margin: '0 0 6px 0', fontWeight: 700 }}>
              {activeContinent.title[language as keyof typeof activeContinent.title] || activeContinent.title.de}
            </h2>
            <p style={{ fontSize: '13.5px', color: 'var(--text-color)', margin: 0, lineHeight: 1.5 }}>
              {activeContinent.desc[language as keyof typeof activeContinent.desc] || activeContinent.desc.de}
            </p>
          </div>

          {/* Länder-Navigation des geöffneten Kontinents */}
          <div className="section-block" style={{ margin: 0 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
              {activeContinent.countries.map((country, idx) => {
                const isCountryActive = country.slug === activeCountry?.slug;
                const cTitle = getCountryName(country, language);
                return (
                  <button
                    key={country.slug}
                    type="button"
                    onClick={() => setActiveCountrySlug(country.slug)}
                    className={`nav-btn ${isCountryActive ? 'active' : ''}`}
                    style={{
                      border: isCountryActive ? '1px solid var(--green-dark)' : '1px solid var(--border-light)',
                      background: isCountryActive ? 'var(--green-light)' : 'var(--bg-white)',
                      color: isCountryActive ? 'var(--green-dark)' : 'var(--text-color)',
                      fontWeight: isCountryActive ? 700 : 500,
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '8px 14px',
                      borderRadius: 4
                    }}
                  >
                    <PlayCircle style={{ width: 14, height: 14, color: isCountryActive ? 'var(--green-primary)' : 'var(--text-muted)' }} />
                    <span>{idx + 1}. {cTitle}</span>
                  </button>
                );
              })}
            </div>

            {/* Steckbrief-Box des aktiven Landes */}
            {activeCountry && activeCountry.cap && (
              <div className="h5p-player-card" style={{ margin: '0 0 16px 0', textAlign: 'left', padding: '12px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                  <h4 style={{ fontSize: '16px', color: 'var(--green-dark)', margin: 0, fontWeight: 700 }}>
                    {getCountryName(activeCountry, language)}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '13px', color: 'var(--text-color)', fontWeight: 600 }}>
                    <MapPin style={{ width: 14, height: 14, color: 'var(--green-primary)' }} />
                    <span>Hauptstadt: {activeCountry.cap}</span>
                  </div>
                </div>
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
