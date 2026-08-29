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
  PlayCircle,
  Flag,
  Trophy
} from 'lucide-react';

interface CountriesSectionProps {
  initialContinentId?: string;
}

export function CountriesSection({ initialContinentId }: CountriesSectionProps = {}) {
  const { language, t } = useLanguage();

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

  const getCountryH5PSlug = (country: any, lang: string): string => {
    if (!country) return '';
    if (country.h5p_folders && country.h5p_folders[lang]) {
      return country.h5p_folders[lang];
    }
    if (country.h5p_folders && country.h5p_folders.de) {
      return country.h5p_folders.de;
    }
    return country.h5p || '';
  };

  const currentModule: ModuleItem | null = activeCountry ? {
    id: `country-${activeCountry.slug}-${language}`,
    slug: getCountryH5PSlug(activeCountry, language),
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

          {/* Flaggenquiz Promo Banner matching global.css .banner-card */}
          <div className="banner-card" style={{ marginBottom: 24 }}>
            <div className="banner-inner">
              <div 
                style={{ 
                  width: 60, 
                  height: 60, 
                  borderRadius: 8, 
                  background: 'var(--green-light)', 
                  border: '1px solid var(--green-border)',
                  color: 'var(--green-dark)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0 
                }}
              >
                <Flag style={{ width: 30, height: 30 }} />
              </div>
              <div className="banner-text">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <h3 style={{ margin: 0 }}>
                    {language === 'de' ? 'Interaktives Flaggenquiz' : 'Interactive Flag Quiz'}
                  </h3>
                  <span style={{ 
                    fontSize: '11px', 
                    fontWeight: 700, 
                    background: 'var(--green-primary)', 
                    color: '#fff', 
                    padding: '2px 8px', 
                    borderRadius: 10 
                  }}>
                    NEU
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '13.5px' }}>
                  {language === 'de' 
                    ? 'Wie gut kennst du die Flaggen der Welt? Wähle Kontinente, spiele um den Highscore und trage deinen Namen in die Bestenliste ein!' 
                    : 'Test your world flag knowledge! Select continents, play for highscores, and enter your name into the leaderboard!'}
                </p>
              </div>
              <Link 
                href="/flaggenquiz" 
                className="flagquiz-primary-btn" 
                style={{ textDecoration: 'none', whiteSpace: 'nowrap', padding: '10px 20px', fontSize: '14px' }}
              >
                <Trophy style={{ width: 16, height: 16 }} />
                <span>{language === 'de' ? 'Quiz spielen' : 'Play Quiz'}</span>
              </Link>
            </div>
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
                      
                      <h4 className="tile-title" style={{ fontSize: '16px', marginBottom: 6, textAlign: 'left' }}>
                        {title}
                      </h4>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 12 }}>
                        {desc}
                      </p>
                    </div>

                    <div style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--green-dark)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4
                    }}>
                      <span>
                        {language === 'de' && 'Länder anzeigen'}
                        {language === 'en' && 'View countries'}
                        {language === 'fr' && 'Voir les pays'}
                        {language === 'es' && 'Ver países'}
                        {language === 'it' && 'Visualizza paesi'}
                        {' '}({cont.countries.length})
                      </span>
                      <ArrowRight style={{ width: 14, height: 14 }} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

        </div>
      ) : (
        
        /* 2. KONTINENT-DETAILANSICHT (MIT LÄNDERLISTE & H5P-PLAYER) */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          {/* Header mit Zurück-Button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h1 style={{ fontSize: '24px', color: 'var(--green-dark)', margin: 0 }}>
                {activeContinent.title[language as keyof typeof activeContinent.title] || activeContinent.title.de}
              </h1>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginTop: 4 }}>
                {activeContinent.desc[language as keyof typeof activeContinent.desc] || activeContinent.desc.de}
              </p>
            </div>

            <Link
              href="/laender-der-erde"
              className="nav-btn"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                fontSize: '13px',
                background: 'var(--bg-white)',
                border: '1px solid var(--border-light)',
                borderRadius: 4,
                color: 'var(--text-color)'
              }}
            >
              ← {language === 'de' && 'Alle Kontinente'}
              {language === 'en' && 'All continents'}
              {language === 'fr' && 'Tous les continents'}
              {language === 'es' && 'Todos los continentes'}
              {language === 'it' && 'Tutti i continenti'}
            </Link>
          </div>

          {/* Horizontale Länder-Auswahlleiste (Tabs / Pills) */}
          <div style={{
            display: 'flex',
            gap: 8,
            overflowX: 'auto',
            paddingBottom: 8,
            paddingTop: 4,
            borderBottom: '1px solid var(--border-light)'
          }}>
            {activeContinent.countries.map((c) => {
              const isSelected = activeCountry?.slug === c.slug;
              const countryName = getCountryName(c, language);

              return (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => setActiveCountrySlug(c.slug)}
                  style={{
                    background: isSelected ? 'var(--green-primary)' : 'var(--bg-white)',
                    color: isSelected ? '#ffffff' : 'var(--text-color)',
                    border: isSelected ? '1px solid var(--green-primary)' : '1px solid var(--green-border)',
                    borderRadius: 4,
                    padding: '7px 14px',
                    fontSize: '13px',
                    fontWeight: isSelected ? 600 : 500,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: 'all 0.15s ease'
                  }}
                >
                  <MapPin style={{ width: 14, height: 14, opacity: isSelected ? 1 : 0.6 }} />
                  <span>{countryName}</span>
                </button>
              );
            })}
          </div>

          {/* Aktiver Länder-Steckbrief & H5P Player */}
          {activeCountry && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{
                background: 'var(--bg-white)',
                border: '1px solid var(--green-border)',
                borderRadius: 6,
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 12
              }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--green-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {activeContinent.title[language as keyof typeof activeContinent.title] || activeContinent.title.de}
                  </div>
                  <h2 style={{ fontSize: '20px', color: 'var(--green-dark)', margin: '4px 0 2px 0' }}>
                    {getCountryName(activeCountry, language)}
                  </h2>
                  {activeCountry.cap && (
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      <strong>{language === 'de' ? 'Hauptstadt' : 'Capital'}:</strong> {activeCountry.cap}
                    </div>
                  )}
                </div>

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'var(--green-light)',
                  padding: '6px 12px',
                  borderRadius: 4,
                  border: '1px solid var(--green-border)',
                  fontSize: '12.5px',
                  color: 'var(--green-dark)',
                  fontWeight: 600
                }}>
                  <PlayCircle style={{ width: 16, height: 16 }} />
                  <span>Interaktive Übung & Video</span>
                </div>
              </div>

              {/* H5P Player für das gewählte Land in der aktuellen Sprache */}
              {currentModule && (
                <H5PPlayer module={currentModule} />
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
