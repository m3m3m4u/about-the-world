'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { H5PPlayer } from '@/components/H5PPlayer';
import { ModuleItem } from '@/types';
import usRegionsData from '@/data/us_states_complete.json';
import { 
  Map, 
  MapPin, 
  Sparkles,
  ArrowRight,
  PlayCircle
} from 'lucide-react';

interface USStatesSectionProps {
  initialRegionId?: string;
}

export function USStatesSection({ initialRegionId }: USStatesSectionProps = {}) {
  const { language } = useLanguage();

  // Selected region: null = Overview page with 6 region tiles; string = Region detail page
  const [activeRegionId, setActiveRegionId] = useState<string | null>(initialRegionId || null);
  const activeRegion = usRegionsData.find(r => r.id === activeRegionId) || null;

  const [activeStateSlug, setActiveStateSlug] = useState<string>('');
  const activeState = activeRegion ? (activeRegion.states.find(s => s.slug === activeStateSlug) || activeRegion.states[0]) : null;

  const currentModule: ModuleItem | null = activeState ? {
    id: `state-${activeState.slug}`,
    slug: activeState.h5p,
    title: {
      de: `Der US-Bundesstaat ${activeState.name}`,
      en: `US State: ${activeState.name}`,
      fr: `L'État américain : ${activeState.name}`,
      es: `El Estado de EE. UU.: ${activeState.name}`,
      it: `Lo Stato USA: ${activeState.name}`,
    },
    type: 'CoursePresentation',
  } : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      
      {/* 1. ÜBERSICHTSSEITE (ZWISCHENSEITE MIT DEN 6 REGIONEN-KACHELN) */}
      {!activeRegion ? (
        <div>
          
          {/* Header Info Box */}
          <div className="info-box-section">
            <h2>
              {language === 'de' && 'Die 50 US-Bundesstaaten – Interaktive Lernmodule'}
              {language === 'en' && 'The 50 US States – Interactive Learning Modules'}
              {language === 'fr' && 'Les 50 États américains – Modules interactifs'}
              {language === 'es' && 'Los 50 Estados de EE. UU. – Módulos interactivos'}
              {language === 'it' && 'I 50 Stati degli USA – Moduli interattivi'}
            </h2>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-color)', marginTop: 8 }}>
              {language === 'de' && 'Entdecken Sie alle 50 Bundesstaaten der USA geordnet nach geographischen Regionen. Wählen Sie eine Region und einen Bundesstaat aus, um den Fachtext zu lesen und die interaktive H5P-Lerneinheit zu starten.'}
              {language === 'en' && 'Explore all 50 states of the USA organized by geographical regions. Select a region and a state to view key facts and start the interactive H5P learning unit.'}
              {language === 'fr' && 'Découvrez les 50 États américains organisés par régions géographiques. Choisissez une région et un État pour démarrer le module H5P.'}
              {language === 'es' && 'Descubra los 50 estados de EE. UU. organizados por regiones geográficas. Elija una región y un estado para iniciar el módulo H5P.'}
              {language === 'it' && 'Scopri tutti i 50 stati degli USA organizzati per regioni geografiche. Scegli una regione e uno stato per avviare il modulo H5P.'}
            </p>
          </div>

          {/* Die 6 Regionen-Kacheln (3 pro Reihe auf Desktop) */}
          <div className="section-block">
            <h3 className="section-main-heading">Die 6 Großregionen der USA</h3>

            <div className="cards-grid cards-grid-3-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {usRegionsData.map((reg) => {
                const title = reg.title[language as keyof typeof reg.title] || reg.title.de;
                const desc = reg.desc[language as keyof typeof reg.desc] || reg.desc.de;
                const regionUrl = `/us-bundesstaaten/${reg.id}`;
                
                return (
                  <Link
                    key={reg.id}
                    href={regionUrl}
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
                        <Map style={{ width: 22, height: 22 }} />
                      </div>

                      <h3 className="tile-title" style={{ textAlign: 'left', marginBottom: 6, fontSize: '16px' }}>
                        {title}
                      </h3>

                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: 16 }}>
                        {desc}
                      </p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                        {reg.states.slice(0, 6).map((s) => (
                          <span
                            key={s.slug}
                            style={{
                              fontSize: '11px',
                              padding: '2px 8px',
                              background: 'var(--bg-body)',
                              border: '1px solid var(--border-light)',
                              borderRadius: 4,
                              color: 'var(--text-color)'
                            }}
                          >
                            {s.name}
                          </span>
                        ))}
                        {reg.states.length > 6 && (
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)', alignSelf: 'center' }}>
                            +{reg.states.length - 6} weitere
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
                      <span>Region öffnen ({reg.states.length} Bundesstaaten)</span>
                      <ArrowRight style={{ width: 14, height: 14 }} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

        </div>
      ) : (
        /* 2. REGIONEN-DETAILANSICHT (OHNE DOPPELTE LEISTE, DIREKT MIT STAATEN) */
        <div>
          
          {/* Zurück zur Regionenübersicht */}
          <div style={{ marginBottom: 16 }}>
            <Link
              href="/us-bundesstaaten"
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
              <span>← Zurück zur Regionenübersicht</span>
            </Link>
          </div>

          {/* Titel-Box der gewählten Region */}
          <div className="info-box-section" style={{ padding: '16px 20px', marginBottom: 20 }}>
            <h2 style={{ fontSize: '18px', color: 'var(--green-dark)', margin: '0 0 6px 0', fontWeight: 700 }}>
              {activeRegion.title[language as keyof typeof activeRegion.title] || activeRegion.title.de}
            </h2>
            <p style={{ fontSize: '13.5px', color: 'var(--text-color)', margin: 0, lineHeight: 1.5 }}>
              {activeRegion.desc[language as keyof typeof activeRegion.desc] || activeRegion.desc.de}
            </p>
          </div>

          {/* Staaten-Navigation des geöffneten Gebiets */}
          <div className="section-block" style={{ margin: 0 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
              {activeRegion.states.map((state, idx) => {
                const isStateActive = state.slug === activeState?.slug;
                return (
                  <button
                    key={state.slug}
                    type="button"
                    onClick={() => setActiveStateSlug(state.slug)}
                    className={`nav-btn ${isStateActive ? 'active' : ''}`}
                    style={{
                      border: isStateActive ? '1px solid var(--green-dark)' : '1px solid var(--border-light)',
                      background: isStateActive ? 'var(--green-light)' : 'var(--bg-white)',
                      color: isStateActive ? 'var(--green-dark)' : 'var(--text-color)',
                      fontWeight: isStateActive ? 700 : 500,
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '8px 14px',
                      borderRadius: 4
                    }}
                  >
                    <PlayCircle style={{ width: 14, height: 14, color: isStateActive ? 'var(--green-primary)' : 'var(--text-muted)' }} />
                    <span>{idx + 1}. {state.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Steckbrief-Box des aktiven Bundesstaats */}
            {activeState && (
              <div className="h5p-player-card" style={{ margin: '0 0 16px 0', textAlign: 'left', padding: '12px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                  <h4 style={{ fontSize: '16px', color: 'var(--green-dark)', margin: 0, fontWeight: 700 }}>
                    Der US-Bundesstaat {activeState.name}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: '13px', color: 'var(--text-color)', fontWeight: 600 }}>
                    {activeState.cap && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <MapPin style={{ width: 14, height: 14, color: 'var(--green-primary)' }} />
                        <span>Hauptstadt: {activeState.cap}</span>
                      </div>
                    )}
                    {activeState.nick && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Sparkles style={{ width: 14, height: 14, color: 'var(--green-primary)' }} />
                        <span>Beiname: „{activeState.nick}“</span>
                      </div>
                    )}
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
