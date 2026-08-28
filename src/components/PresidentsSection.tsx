'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { H5PPlayer } from '@/components/H5PPlayer';
import { ModuleItem, Language } from '@/types';
import rawData from '@/data/presidents_complete.json';
import { 
  Landmark, 
  Award, 
  Vote, 
  History, 
  Users, 
  Scroll, 
  Sparkles, 
  ArrowRight, 
  PlayCircle, 
  Search,
  BookOpen,
  Calendar,
  Flag,
  ChevronLeft
} from 'lucide-react';

interface President {
  number: number;
  name: string;
  period: string;
  img: string;
  local_img?: string;
  youtube?: string;
  party: Record<string, string>;
  epoch_id?: string;
  epoch_title?: Record<string, string>;
  h5p_ids: Record<string, number | null>;
  h5p_folders: Record<string, string>;
  slugs: Record<string, string>;
}

interface Epoch {
  id: string;
  slug: string;
  title: Record<string, string>;
  desc: Record<string, string>;
  president_numbers: number[];
  presidents?: President[];
}

interface SpecialTopic {
  id: string;
  slug: string;
  title: Record<string, string>;
  desc: Record<string, string>;
  h5p_folders: Record<string, string>;
}

interface PresidentsData {
  epochs: Epoch[];
  special_topics: SpecialTopic[];
  presidents: President[];
}

const data = rawData as PresidentsData;

const epochIcons: Record<string, any> = {
  gruendervaeter: Scroll,
  expansion_vorabend: Landmark,
  buergerkrieg_gilded_age: History,
  progressiv_weltkriege: Award,
  kalter_krieg: Flag,
  moderne_aera: Vote,
};

const UI_TEXT = {
  de: {
    sectionHeading: 'Die Präsidenten der USA – Interaktives Lernportal',
    sectionDesc: 'Umfassendes Portal zu allen 45 Präsidenten der Vereinigten Staaten von Amerika von 1789 bis heute, dem Wahlsystem und den historischen Epochen. Jede Lektion enthält ein Erklärvideo und interaktive H5P-Übungen.',
    tabEpochs: 'Historische Epochen',
    tabAllPresidents: 'Alle 45 Präsidenten',
    tabSpecialTopics: 'Wahlsystem & Schwerpunkte',
    epochsHeading: 'Die 6 historischen Epochen der US-Präsidentschaft',
    openEpoch: 'Epoche öffnen',
    presidentsCount: 'Präsidenten',
    searchPlaceholder: 'Präsident, Jahreszahl oder Partei suchen...',
    allEpochs: 'Alle Epochen',
    allParties: 'Alle Parteien',
    backToOverview: 'Zurück zur Epochenübersicht',
    backToPresidents: 'Zurück zur Übersicht',
    termLabel: 'Amtszeit',
    partyLabel: 'Partei',
    epochLabel: 'Historische Epoche',
    interactiveLesson: 'Interaktive H5P-Lerneinheit',
    noResults: 'Keine Präsidenten für diese Suche gefunden.',
    videoBadge: 'Mit Erklärvideo & Übungen',
    specialTopicsHeading: 'Schwerpunktthemen & Wahlsystem',
    exploreTopic: 'Thema öffnen',
    selectPresident: 'Präsidenten auswählen:',
  },
  en: {
    sectionHeading: 'Presidents of the USA – Interactive Learning Portal',
    sectionDesc: 'Comprehensive portal on all 45 Presidents of the United States of America from 1789 to present, the election system, and historical eras. Each lesson includes an educational video and interactive H5P exercises.',
    tabEpochs: 'Historical Eras',
    tabAllPresidents: 'All 45 Presidents',
    tabSpecialTopics: 'Election System & Topics',
    epochsHeading: 'The 6 Historical Eras of the US Presidency',
    openEpoch: 'Open Era',
    presidentsCount: 'Presidents',
    searchPlaceholder: 'Search president, year, or party...',
    allEpochs: 'All Eras',
    allParties: 'All Parties',
    backToOverview: 'Back to Eras Overview',
    backToPresidents: 'Back to Overview',
    termLabel: 'Term in Office',
    partyLabel: 'Political Party',
    epochLabel: 'Historical Era',
    interactiveLesson: 'Interactive H5P Learning Unit',
    noResults: 'No presidents found matching your search.',
    videoBadge: 'With Video & Exercises',
    specialTopicsHeading: 'Special Topics & Election System',
    exploreTopic: 'Open Topic',
    selectPresident: 'Select a President:',
  },
  fr: {
    sectionHeading: 'Présidents des États-Unis – Portail éducatif interactif',
    sectionDesc: 'Portail complet sur les 45 présidents des États-Unis de 1789 à nos jours, le système électoral et les époques historiques. Chaque leçon comprend une vidéo explicative et des exercices interactifs H5P.',
    tabEpochs: 'Époques historiques',
    tabAllPresidents: 'Les 45 Présidents',
    tabSpecialTopics: 'Système électoral & Thèmes',
    epochsHeading: 'Les 6 époques historiques de la présidence américaine',
    openEpoch: 'Ouvrir l\'époque',
    presidentsCount: 'Présidents',
    searchPlaceholder: 'Rechercher un président, une année, un parti...',
    allEpochs: 'Toutes les époques',
    allParties: 'Tous les partis',
    backToOverview: 'Retour à l\'aperçu des époques',
    backToPresidents: 'Retour à l\'aperçu',
    termLabel: 'Mandat',
    partyLabel: 'Parti politique',
    epochLabel: 'Époque historique',
    interactiveLesson: 'Module interactif H5P',
    noResults: 'Aucun président trouvé pour cette recherche.',
    videoBadge: 'Avec vidéo & exercices',
    specialTopicsHeading: 'Thématiques & Système électoral',
    exploreTopic: 'Ouvrir le thème',
    selectPresident: 'Sélectionner un président :',
  },
  es: {
    sectionHeading: 'Presidentes de EE.UU. – Portal educativo interactivo',
    sectionDesc: 'Portal completo sobre los 45 presidentes de los Estados Unidos desde 1789 hasta hoy, el sistema electoral y las épocas históricas con vídeos y ejercicios interactivos H5P.',
    tabEpochs: 'Épocas históricas',
    tabAllPresidents: 'Los 45 Presidentes',
    tabSpecialTopics: 'Sistema electoral y temas',
    epochsHeading: 'Las 6 épocas históricas de la presidencia de EE.UU.',
    openEpoch: 'Abrir época',
    presidentsCount: 'Presidentes',
    searchPlaceholder: 'Buscar presidente, año o partido...',
    allEpochs: 'Todas las épocas',
    allParties: 'Todos los partidos',
    backToOverview: 'Volver a la vista de épocas',
    backToPresidents: 'Volver al inicio',
    termLabel: 'Mandato',
    partyLabel: 'Partido político',
    epochLabel: 'Época histórica',
    interactiveLesson: 'Módulo interactivo H5P',
    noResults: 'No se encontraron presidentes con esta búsqueda.',
    videoBadge: 'Con vídeo y ejercicios',
    specialTopicsHeading: 'Temas especiales y sistema electoral',
    exploreTopic: 'Abrir tema',
    selectPresident: 'Seleccionar presidente:',
  },
  it: {
    sectionHeading: 'Presidenti degli Stati Uniti – Portale interattivo',
    sectionDesc: 'Portale completo su tutti i 45 presidenti degli Stati Uniti d\'America dal 1789 a oggi, il sistema elettorale e le epoche storiche con video ed esercizi interattivi H5P.',
    tabEpochs: 'Epoche storiche',
    tabAllPresidents: 'Tutti i 45 Presidenti',
    tabSpecialTopics: 'Sistema elettorale e temi',
    epochsHeading: 'Le 6 epoche storiche della presidenza USA',
    openEpoch: 'Apri epoca',
    presidentsCount: 'Presidenti',
    searchPlaceholder: 'Cerca presidente, anno o partito...',
    allEpochs: 'Tutte le epoche',
    allParties: 'Tutti i partiti',
    backToOverview: 'Torna all\'elenco delle epoche',
    backToPresidents: 'Torna alla panoramica',
    termLabel: 'Mandato',
    partyLabel: 'Partito politico',
    epochLabel: 'Epoca storica',
    interactiveLesson: 'Modulo interattivo H5P',
    noResults: 'Nessun presidente trovato per questa ricerca.',
    videoBadge: 'Con video ed esercizi',
    specialTopicsHeading: 'Temi speciali e sistema elettorale',
    exploreTopic: 'Apri tema',
    selectPresident: 'Seleziona un presidente:',
  },
};

interface PresidentsSectionProps {
  initialEpochId?: string;
  initialTopicId?: string;
}

export function PresidentsSection({ initialEpochId, initialTopicId }: PresidentsSectionProps = {}) {
  const { language } = useLanguage();
  const currentLang = (language in UI_TEXT ? language : 'de') as keyof typeof UI_TEXT;
  const ui = UI_TEXT[currentLang] || UI_TEXT.de;

  // Active view: 'epochs' | 'all' | 'special'
  const [activeTab, setActiveTab] = useState<'epochs' | 'all' | 'special'>('epochs');

  // Selected Epoch
  const [activeEpochId, setActiveEpochId] = useState<string | null>(initialEpochId || null);
  const activeEpoch = useMemo(() => {
    if (!activeEpochId) return null;
    return data.epochs.find(e => e.id === activeEpochId || e.slug === activeEpochId) || null;
  }, [activeEpochId]);

  // Selected Special Topic
  const [activeSpecialTopicId, setActiveSpecialTopicId] = useState<string | null>(initialTopicId || null);
  const activeSpecialTopic = useMemo(() => {
    if (!activeSpecialTopicId) return null;
    return data.special_topics.find(t => t.id === activeSpecialTopicId || t.slug === activeSpecialTopicId) || null;
  }, [activeSpecialTopicId]);

  // Selected President (for detail view)
  const [selectedPresidentNumber, setSelectedPresidentNumber] = useState<number | null>(null);

  // Search & Filter in "All Presidents" view
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEpoch, setFilterEpoch] = useState<string>('all');
  const [filterParty, setFilterParty] = useState<string>('all');

  // List of presidents for the active epoch
  const epochPresidents = useMemo(() => {
    if (!activeEpoch) return [];
    return data.presidents.filter(p => activeEpoch.president_numbers.includes(p.number));
  }, [activeEpoch]);

  // Active president object
  const activePresident = useMemo(() => {
    if (selectedPresidentNumber) {
      return data.presidents.find(p => p.number === selectedPresidentNumber) || null;
    }
    if (epochPresidents.length > 0) {
      return epochPresidents[0];
    }
    return null;
  }, [selectedPresidentNumber, epochPresidents]);

  // Filtered presidents for "All Presidents" gallery
  const filteredPresidents = useMemo(() => {
    return data.presidents.filter(p => {
      const q = searchQuery.toLowerCase().trim();
      const partyStr = (p.party[currentLang] || p.party.de || '').toLowerCase();
      const nameMatch = !q || p.name.toLowerCase().includes(q) || p.period.includes(q) || partyStr.includes(q);
      const epochMatch = filterEpoch === 'all' || p.epoch_id === filterEpoch;
      const partyMatch = filterParty === 'all' || partyStr.includes(filterParty.toLowerCase());
      return nameMatch && epochMatch && partyMatch;
    });
  }, [searchQuery, filterEpoch, filterParty, currentLang]);

  // Build the active ModuleItem for H5P Player
  const currentModule: ModuleItem | null = useMemo(() => {
    if (activeSpecialTopic) {
      const folder = activeSpecialTopic.h5p_folders[currentLang] || activeSpecialTopic.h5p_folders.de || '';
      return {
        id: `topic-${activeSpecialTopic.id}-${currentLang}`,
        slug: folder,
        title: {
          de: activeSpecialTopic.title.de,
          en: activeSpecialTopic.title.en,
          fr: activeSpecialTopic.title.fr,
          es: activeSpecialTopic.title.es,
          it: activeSpecialTopic.title.it,
        },
        type: 'CoursePresentation',
      };
    }

    if (activePresident) {
      const folder = activePresident.h5p_folders[currentLang] || activePresident.h5p_folders.de || '';
      return {
        id: `pres-${activePresident.number}-${currentLang}`,
        slug: folder,
        title: {
          de: `${activePresident.number}. Präsident der USA: ${activePresident.name} (${activePresident.period})`,
          en: `${activePresident.number}th US President: ${activePresident.name} (${activePresident.period})`,
          fr: `${activePresident.number}e président des États-Unis : ${activePresident.name} (${activePresident.period})`,
          es: `${activePresident.number}.º Presidente de EE.UU.: ${activePresident.name} (${activePresident.period})`,
          it: `${activePresident.number}° Presidente degli USA: ${activePresident.name} (${activePresident.period})`,
        },
        type: 'CoursePresentation',
      };
    }

    return null;
  }, [activeSpecialTopic, activePresident, currentLang]);

  // Handler for selecting an epoch
  const handleSelectEpoch = (epoch: Epoch) => {
    setActiveEpochId(epoch.id);
    setActiveSpecialTopicId(null);
    setSelectedPresidentNumber(epoch.president_numbers[0]);
  };

  // Handler for selecting a special topic
  const handleSelectSpecialTopic = (topic: SpecialTopic) => {
    setActiveSpecialTopicId(topic.id);
    setActiveEpochId(null);
    setSelectedPresidentNumber(null);
  };

  // Handler for selecting a president directly
  const handleSelectPresidentDirect = (pres: President) => {
    setSelectedPresidentNumber(pres.number);
    setActiveEpochId(pres.epoch_id || null);
    setActiveSpecialTopicId(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      
      {/* 1. TOP HEADER INFO BOX */}
      <div className="info-box-section">
        <h2>{ui.sectionHeading}</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-color)', marginTop: 8 }}>
          {ui.sectionDesc}
        </p>
      </div>

      {/* 2. MAIN NAVIGATION TABS (When not in full detail view) */}
      {!activeEpoch && !activeSpecialTopic && (
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 10, 
          borderBottom: '2px solid var(--green-border)', 
          paddingBottom: 12 
        }}>
          <button
            type="button"
            onClick={() => setActiveTab('epochs')}
            className={`nav-btn ${activeTab === 'epochs' ? 'active' : ''}`}
            style={{
              padding: '9px 18px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              border: activeTab === 'epochs' ? '1px solid var(--green-dark)' : '1px solid var(--border-light)',
              background: activeTab === 'epochs' ? 'var(--green-primary)' : 'var(--bg-white)',
              color: activeTab === 'epochs' ? '#ffffff' : 'var(--text-color)',
            }}
          >
            <History style={{ width: 16, height: 16 }} />
            <span>{ui.tabEpochs}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`nav-btn ${activeTab === 'all' ? 'active' : ''}`}
            style={{
              padding: '9px 18px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              border: activeTab === 'all' ? '1px solid var(--green-dark)' : '1px solid var(--border-light)',
              background: activeTab === 'all' ? 'var(--green-primary)' : 'var(--bg-white)',
              color: activeTab === 'all' ? '#ffffff' : 'var(--text-color)',
            }}
          >
            <Users style={{ width: 16, height: 16 }} />
            <span>{ui.tabAllPresidents} (45)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('special')}
            className={`nav-btn ${activeTab === 'special' ? 'active' : ''}`}
            style={{
              padding: '9px 18px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              border: activeTab === 'special' ? '1px solid var(--green-dark)' : '1px solid var(--border-light)',
              background: activeTab === 'special' ? 'var(--green-primary)' : 'var(--bg-white)',
              color: activeTab === 'special' ? '#ffffff' : 'var(--text-color)',
            }}
          >
            <Vote style={{ width: 16, height: 16 }} />
            <span>{ui.tabSpecialTopics}</span>
          </button>
        </div>
      )}

      {/* 3. VIEW: HISTORICAL EPOCHS (OVERVIEW WITH 6 TILES) */}
      {!activeEpoch && !activeSpecialTopic && activeTab === 'epochs' && (
        <div className="section-block" style={{ margin: 0 }}>
          <h3 className="section-main-heading">{ui.epochsHeading}</h3>

          <div className="cards-grid cards-grid-3-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {data.epochs.map((ep) => {
              const Icon = epochIcons[ep.id] || Landmark;
              const epTitle = ep.title[currentLang] || ep.title.de;
              const epDesc = ep.desc[currentLang] || ep.desc.de;
              const epPresidents = data.presidents.filter(p => ep.president_numbers.includes(p.number));
              const firstPres = epPresidents[0];

              return (
                <div
                  key={ep.id}
                  onClick={() => handleSelectEpoch(ep)}
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
                    transition: 'all 0.15s ease',
                    position: 'relative'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                      <div style={{
                        width: 44,
                        height: 44,
                        borderRadius: 6,
                        background: 'var(--green-light)',
                        color: 'var(--green-dark)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Icon style={{ width: 22, height: 22 }} />
                      </div>

                      <span style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '3px 8px',
                        background: 'var(--green-light)',
                        color: 'var(--green-dark)',
                        borderRadius: 4,
                        border: '1px solid var(--green-border)'
                      }}>
                        {epPresidents.length} {ui.presidentsCount}
                      </span>
                    </div>

                    <h3 className="tile-title" style={{ textAlign: 'left', marginBottom: 6, fontSize: '15.5px' }}>
                      {epTitle}
                    </h3>

                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 14 }}>
                      {epDesc}
                    </p>

                    {/* Presidents Badge Preview */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                      {epPresidents.map((p) => (
                        <span
                          key={p.number}
                          style={{
                            fontSize: '11px',
                            padding: '2px 7px',
                            background: 'var(--bg-body)',
                            border: '1px solid var(--border-light)',
                            borderRadius: 4,
                            color: 'var(--text-color)'
                          }}
                        >
                          #{p.number} {p.name}
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
                    <span>{ui.openEpoch} ({epPresidents.length} {ui.presidentsCount})</span>
                    <ArrowRight style={{ width: 14, height: 14 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. VIEW: ALL 45 PRESIDENTS (GRID WITH SEARCH & FILTER) */}
      {!activeEpoch && !activeSpecialTopic && activeTab === 'all' && (
        <div className="section-block" style={{ margin: 0 }}>
          
          {/* Search & Filter Toolbar */}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 12, 
            marginBottom: 20,
            background: 'var(--bg-white)',
            padding: '14px 18px',
            borderRadius: 6,
            border: '1px solid var(--border-light)'
          }}>
            {/* Search Input */}
            <div style={{ flex: '1 1 240px', position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search style={{ width: 16, height: 16, position: 'absolute', left: 12, color: 'var(--text-muted)' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={ui.searchPlaceholder}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 36px',
                  borderRadius: 4,
                  border: '1px solid var(--border-light)',
                  fontSize: '13.5px',
                  outline: 'none'
                }}
              />
            </div>

            {/* Epoch Filter */}
            <select
              value={filterEpoch}
              onChange={(e) => setFilterEpoch(e.target.value)}
              style={{
                padding: '9px 12px',
                borderRadius: 4,
                border: '1px solid var(--border-light)',
                fontSize: '13px',
                background: 'var(--bg-white)',
                color: 'var(--text-color)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="all">{ui.allEpochs}</option>
              {data.epochs.map(e => (
                <option key={e.id} value={e.id}>{e.title[currentLang] || e.title.de}</option>
              ))}
            </select>

            {/* Party Filter */}
            <select
              value={filterParty}
              onChange={(e) => setFilterParty(e.target.value)}
              style={{
                padding: '9px 12px',
                borderRadius: 4,
                border: '1px solid var(--border-light)',
                fontSize: '13px',
                background: 'var(--bg-white)',
                color: 'var(--text-color)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="all">{ui.allParties}</option>
              <option value="demokrat">Demokraten / Democrats</option>
              <option value="republikan">Republikaner / Republicans</option>
              <option value="demokratisch-republikanisch">Demokratisch-Republikanisch</option>
              <option value="whig">Whig-Partei</option>
              <option value="föderal">Föderalisten / Federalists</option>
              <option value="parteilos">Parteilos / Independent</option>
            </select>
          </div>

          {/* Gallery of Presidents */}
          {filteredPresidents.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              {ui.noResults}
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
              gap: 14 
            }}>
              {filteredPresidents.map((p) => {
                const partyName = p.party[currentLang] || p.party.de;
                return (
                  <div
                    key={p.number}
                    onClick={() => handleSelectPresidentDirect(p)}
                    className="tile-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      cursor: 'pointer',
                      padding: 14,
                      background: 'var(--bg-white)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {/* Portrait Photo */}
                    <div style={{
                      width: 90,
                      height: 110,
                      borderRadius: 4,
                      overflow: 'hidden',
                      marginBottom: 10,
                      position: 'relative',
                      border: '1px solid var(--border-light)',
                      background: '#f0f0f0'
                    }}>
                      <Image
                        src={p.local_img || p.img}
                        alt={p.name}
                        fill
                        sizes="90px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>

                    {/* Order & Name */}
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: 'var(--green-dark)',
                      textTransform: 'uppercase',
                      marginBottom: 2
                    }}>
                      #{p.number}
                    </span>

                    <h4 style={{ fontSize: '14.5px', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-color)' }}>
                      {p.name}
                    </h4>

                    {/* Term in office */}
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: 6 }}>
                      {p.period}
                    </span>

                    {/* Party Tag */}
                    <span style={{
                      fontSize: '10.5px',
                      padding: '2px 6px',
                      background: partyName.includes('Republik') ? '#fee2e2' : partyName.includes('Demokrat') ? '#dbeafe' : 'var(--bg-body)',
                      color: partyName.includes('Republik') ? '#991b1b' : partyName.includes('Demokrat') ? '#1e40af' : 'var(--text-color)',
                      borderRadius: 3,
                      fontWeight: 600,
                      maxWidth: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {partyName}
                    </span>

                    <div style={{
                      marginTop: 10,
                      paddingTop: 8,
                      borderTop: '1px solid var(--border-light)',
                      width: '100%',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--green-dark)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 4
                    }}>
                      <PlayCircle style={{ width: 13, height: 13 }} />
                      <span>{ui.interactiveLesson}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* 5. VIEW: SPECIAL TOPICS (WAHLSYSTEM, PARTEIEN, WICHTIGSTE PRÄSIDENTEN) */}
      {!activeEpoch && !activeSpecialTopic && activeTab === 'special' && (
        <div className="section-block" style={{ margin: 0 }}>
          <h3 className="section-main-heading">{ui.specialTopicsHeading}</h3>

          <div className="cards-grid cards-grid-3-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {data.special_topics.map((topic) => {
              const title = topic.title[currentLang] || topic.title.de;
              const desc = topic.desc[currentLang] || topic.desc.de;
              return (
                <div
                  key={topic.id}
                  onClick={() => handleSelectSpecialTopic(topic)}
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
                      <Vote style={{ width: 22, height: 22 }} />
                    </div>

                    <h3 className="tile-title" style={{ textAlign: 'left', marginBottom: 6, fontSize: '16px' }}>
                      {title}
                    </h3>

                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: 16 }}>
                      {desc}
                    </p>
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
                    <span>{ui.exploreTopic}</span>
                    <ArrowRight style={{ width: 14, height: 14 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. DETAIL VIEW: SELECTED EPOCH OR SPECIAL TOPIC */}
      {(activeEpoch || activeSpecialTopic) && (
        <div>
          
          {/* Back Navigation Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <button
              type="button"
              onClick={() => {
                setActiveEpochId(null);
                setActiveSpecialTopicId(null);
                setSelectedPresidentNumber(null);
              }}
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
              }}
            >
              <ChevronLeft style={{ width: 16, height: 16 }} />
              <span>{activeEpoch ? ui.backToOverview : ui.backToPresidents}</span>
            </button>
          </div>

          {/* Epoch Title Box */}
          {activeEpoch && (
            <div className="info-box-section" style={{ padding: '16px 20px', marginBottom: 18 }}>
              <h2 style={{ fontSize: '18px', color: 'var(--green-dark)', margin: '0 0 6px 0', fontWeight: 700 }}>
                {activeEpoch.title[currentLang] || activeEpoch.title.de}
              </h2>
              <p style={{ fontSize: '13.5px', color: 'var(--text-color)', margin: 0, lineHeight: 1.5 }}>
                {activeEpoch.desc[currentLang] || activeEpoch.desc.de}
              </p>
            </div>
          )}

          {/* Special Topic Title Box */}
          {activeSpecialTopic && (
            <div className="info-box-section" style={{ padding: '16px 20px', marginBottom: 18 }}>
              <h2 style={{ fontSize: '18px', color: 'var(--green-dark)', margin: '0 0 6px 0', fontWeight: 700 }}>
                {activeSpecialTopic.title[currentLang] || activeSpecialTopic.title.de}
              </h2>
              <p style={{ fontSize: '13.5px', color: 'var(--text-color)', margin: 0, lineHeight: 1.5 }}>
                {activeSpecialTopic.desc[currentLang] || activeSpecialTopic.desc.de}
              </p>

              {/* Quick switch between special topics */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--green-border)' }}>
                {data.special_topics.map((st) => {
                  const isActive = st.id === activeSpecialTopic.id;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => handleSelectSpecialTopic(st)}
                      className={`nav-btn ${isActive ? 'active' : ''}`}
                      style={{
                        padding: '6px 12px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        background: isActive ? 'var(--green-primary)' : 'var(--bg-white)',
                        color: isActive ? '#ffffff' : 'var(--text-color)',
                        border: '1px solid var(--green-border)'
                      }}
                    >
                      {st.title[currentLang] || st.title.de}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Presidents Horizontal Stepper / Buttons (For Epoch View) */}
          {activeEpoch && epochPresidents.length > 0 && (
            <div className="section-block" style={{ margin: '0 0 16px 0' }}>
              <div style={{ 
                fontSize: '12.5px', 
                fontWeight: 700, 
                color: 'var(--green-dark)', 
                marginBottom: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {ui.selectPresident}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {epochPresidents.map((p) => {
                  const isPresActive = p.number === activePresident?.number;
                  return (
                    <button
                      key={p.number}
                      type="button"
                      onClick={() => setSelectedPresidentNumber(p.number)}
                      className={`nav-btn ${isPresActive ? 'active' : ''}`}
                      style={{
                        border: isPresActive ? '1px solid var(--green-dark)' : '1px solid var(--border-light)',
                        background: isPresActive ? 'var(--green-light)' : 'var(--bg-white)',
                        color: isPresActive ? 'var(--green-dark)' : 'var(--text-color)',
                        fontWeight: isPresActive ? 700 : 500,
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '6px 12px',
                        borderRadius: 4
                      }}
                    >
                      <div style={{
                        width: 24,
                        height: 28,
                        borderRadius: 2,
                        overflow: 'hidden',
                        position: 'relative',
                        background: '#e2e8f0',
                        flexShrink: 0
                      }}>
                        <Image
                          src={p.local_img || p.img}
                          alt={p.name}
                          fill
                          sizes="24px"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <span>#{p.number} {p.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Active President Profile Card */}
          {activePresident && !activeSpecialTopic && (
            <div className="h5p-player-card" style={{ margin: '0 0 16px 0', textAlign: 'left', padding: '16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
                {/* Large Portrait */}
                <div style={{
                  width: 80,
                  height: 100,
                  borderRadius: 4,
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid var(--border-light)',
                  background: '#f0f0f0',
                  flexShrink: 0
                }}>
                  <Image
                    src={activePresident.local_img || activePresident.img}
                    alt={activePresident.name}
                    fill
                    sizes="80px"
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>

                {/* Info Text */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 6px',
                      background: 'var(--green-light)',
                      color: 'var(--green-dark)',
                      borderRadius: 3,
                      border: '1px solid var(--green-border)'
                    }}>
                      #{activePresident.number}
                    </span>
                    <h3 style={{ fontSize: '18px', color: 'var(--green-dark)', margin: 0, fontWeight: 700 }}>
                      {activePresident.name}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: '13px', color: 'var(--text-color)', marginTop: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Calendar style={{ width: 14, height: 14, color: 'var(--green-primary)' }} />
                      <span><strong>{ui.termLabel}:</strong> {activePresident.period}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Flag style={{ width: 14, height: 14, color: 'var(--green-primary)' }} />
                      <span><strong>{ui.partyLabel}:</strong> {activePresident.party[currentLang] || activePresident.party.de}</span>
                    </div>

                    {activePresident.epoch_title && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <History style={{ width: 14, height: 14, color: 'var(--green-primary)' }} />
                        <span><strong>{ui.epochLabel}:</strong> {activePresident.epoch_title[currentLang] || activePresident.epoch_title.de}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Embedded Real H5P Exercise Player */}
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
      )}

    </div>
  );
}
