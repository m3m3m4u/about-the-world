'use client';

import React from 'react';
import Link from 'next/link';
import { SiteLayout } from '@/components/SiteLayout';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Globe, 
  BookOpen, 
  Compass, 
  Map, 
  ArrowRight,
  ShieldCheck,
  Flag,
  Leaf
} from 'lucide-react';

export default function HomePage() {
  const { t, language } = useLanguage();

  const mainTopics = [
    {
      id: 'geography',
      href: '/geographie',
      icon: Compass,
      title: t.navGeography,
      desc:
        language === 'de' ? 'Allgemeine geographische Themen, Kontinente, Ozeane und Zonen.' :
        language === 'fr' ? 'Sujets géographiques généraux, continents, océans et zones climatiques.' :
        language === 'es' ? 'Temas geográficos generales, continentes, océanos y zonas climáticas.' :
        language === 'it' ? 'Argomenti geografici generali, continenti, oceani e zone climatiche.' :
        'General geographical topics, continents, oceans, and zones.',
    },
    {
      id: 'geography-quiz',
      href: '/geographie-quiz',
      icon: BookOpen,
      title: t.navGeographyQuiz,
      desc:
        language === 'de' ? 'Umfangreiches Quiz mit über 500 Fragen zu Hauptstädten, Flüssen, Gebirgen und Weltrekorden.' :
        language === 'fr' ? 'Grand quiz avec plus de 500 questions sur les capitales, fleuves, montagnes et records.' :
        language === 'es' ? 'Gran quiz con más de 500 preguntas sobre capitales, ríos, montañas y récords mundiales.' :
        language === 'it' ? 'Grande quiz con oltre 500 domande su capitali, fiumi, montagne e record mondiali.' :
        'Comprehensive quiz with over 500 questions covering capitals, rivers, mountains, and world records.',
    },
    {
      id: 'countries',
      href: '/laender-der-erde',
      icon: Globe,
      title: t.navCountries,
      desc:
        language === 'de' ? 'Erklärvideos und Online-Übungen zu allen Ländern der Erde.' :
        language === 'fr' ? 'Vidéos explicatives et exercices interactifs sur tous les pays du monde.' :
        language === 'es' ? 'Vídeos explicativos y ejercicios interactivos sobre todos los países del mundo.' :
        language === 'it' ? 'Video esplicativi ed esercizi interattivi su tutti i paesi del mondo.' :
        'Explainer videos and online exercises for all world countries.',
    },
    {
      id: 'flagquiz',
      href: '/flaggenquiz',
      icon: Flag,
      title: t.navFlagQuiz,
      desc:
        language === 'de' ? 'Interaktives Flaggenquiz mit Kontinent-Auswahl, Streak-Counter und Highscore-Bestenliste.' :
        language === 'fr' ? 'Quiz interactif des drapeaux avec choix des continents, séries de victoires et classement.' :
        language === 'es' ? 'Quiz interactivo de banderas con selección de continentes, contador de rachas y récords.' :
        language === 'it' ? 'Quiz interattivo delle bandiere con selezione dei continenti, serie e classifica.' :
        'Interactive flag quiz with continent selection, streak counters, and highscore leaderboard.',
    },
    {
      id: 'mapquiz',
      href: '/kartenquiz',
      icon: Map,
      title: t.navMapQuiz,
      desc:
        language === 'de' ? 'Interaktives Landkarten- & Satellitenquiz zu Ländern, Bundesländern, Kantonen und Städten weltweit.' :
        language === 'fr' ? 'Quiz interactif de cartes et images satellite sur les pays, états, cantons et métropoles.' :
        language === 'es' ? 'Quiz interactivo de mapas e imágenes satelitales sobre países, estados, cantones y ciudades.' :
        language === 'it' ? 'Quiz interattivo di mappe e immagini satellitari su paesi, stati, cantoni e metropoli.' :
        'Interactive map and satellite quiz for countries, federal states, cantons, and global cities.',
    },
    {
      id: 'biology',
      href: '/biologie',
      icon: Leaf,
      title: t.biologyTitle,
      desc:
        language === 'de' ? 'Bestimme Tiere und Pflanzen anhand detailreicher Bildkarten und interaktiver Quiz-Duelle.' :
        language === 'fr' ? 'Identifiez les animaux et les plantes grâce à des cartes illustrées et des quiz interactifs.' :
        language === 'es' ? 'Identifica animales y plantas mediante tarjetas ilustradas y juegos de preguntas interactivos.' :
        language === 'it' ? 'Riconosci animali e piante attraverso schede fotografiche e quiz interattivi.' :
        'Identify animals and plants through high-resolution photo flashcards and interactive quiz challenges.',
    },
    {
      id: 'middle-east',
      href: '/der-nahostkonflikt',
      icon: BookOpen,
      title: t.navMiddleEast,
      desc:
        language === 'de' ? 'Dossier zum Nahostkonflikt: Geschichte, Kriege, Bevölkerung und Friedenschancen.' :
        language === 'fr' ? 'Dossier sur le conflit au Proche-Orient : histoire, guerres, populations et paix.' :
        language === 'es' ? 'Dossier sobre el conflicto de Oriente Medio: historia, guerras, población y paz.' :
        language === 'it' ? 'Dossier sul conflitto in Medio Oriente: storia, guerre, popolazione e pace.' :
        'Middle East conflict dossier: history, crises, population and peace efforts.',
    },
    {
      id: 'presidents',
      href: '/praesidenten-der-usa',
      icon: ShieldCheck,
      title: t.navPresidents,
      desc:
        language === 'de' ? 'Chronologie und Biographien aller Präsidenten der USA.' :
        language === 'fr' ? 'Chronologie et biographies de tous les présidents des États-Unis.' :
        language === 'es' ? 'Cronología y biografías de todos los presidentes de los Estados Unidos.' :
        language === 'it' ? 'Cronologia e biografie di tutti i presidenti degli Stati Uniti.' :
        'Chronology and biographies of all US presidents.',
    },
    {
      id: 'us-states',
      href: '/us-bundesstaaten',
      icon: Map,
      title: t.navUsStates,
      desc:
        language === 'de' ? 'Alle 50 Bundesstaaten der USA mit Hauptstädten und Kartenübungen.' :
        language === 'fr' ? 'Les 50 États américains avec leurs capitales et exercices cartographiques.' :
        language === 'es' ? 'Los 50 estados de EE. UU. con capitales y ejercicios de mapas interactivos.' :
        language === 'it' ? 'Tutti i 50 stati degli USA con capitali ed esercizi interattivi sulle mappe.' :
        'All 50 US states with capitals and interactive map exercises.',
    },
  ];

  return (
    <SiteLayout activeSection="home">
      
      {/* Welcome Info Box */}
      <div className="info-box-section">
        <h2>{t.welcomeHeading}</h2>
        <p>{t.welcomeText}</p>

        {/* Compact "Neu" Highlights Bar without Emojis/Icons */}
        <div style={{
          marginTop: 12,
          padding: '8px 14px',
          background: 'var(--bg-white)',
          border: '1px solid var(--green-border)',
          borderRadius: 4,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '6px 12px',
          fontSize: '12.5px',
        }}>
          <span style={{
            fontWeight: 700,
            color: 'var(--green-dark)',
            background: 'var(--green-light)',
            padding: '2px 8px',
            borderRadius: 3,
            border: '1px solid var(--green-border)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {t.whatsNewTitle}:
          </span>

          <span style={{ color: 'var(--text-color)' }}>
            <strong>{t.featureLayout}</strong>
          </span>

          <span style={{ color: 'var(--green-dark)', opacity: 0.5 }}>•</span>

          <span style={{ color: 'var(--text-color)' }}>
            <strong>{t.featureSpeed}</strong>
          </span>

          <span style={{ color: 'var(--green-dark)', opacity: 0.5 }}>•</span>

          <span style={{ color: 'var(--text-color)' }}>
            <strong>{t.featureStudents}</strong>
          </span>

          <span style={{ color: 'var(--green-dark)', opacity: 0.5 }}>•</span>

          <span style={{ color: 'var(--text-color)' }}>
            <strong>{t.featureTasks}</strong>
          </span>

          <span style={{ color: 'var(--green-dark)', opacity: 0.5 }}>•</span>

          <span style={{ color: 'var(--text-color)' }}>
            <strong>{t.featurePrivacy}</strong>
          </span>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: 12 }}>
          {language === 'de' 
            ? 'Viele Übungen wurden bereits in andere Sprachen übersetzt. Noch viel mehr wird folgen. Viel Spaß beim Üben!' 
            : 'Many exercises are available in multiple languages. Enjoy learning!'}
        </p>
      </div>

      {/* Topics Section matching global.css .section-block & .cards-grid (3 per row) */}
      <div className="section-block" style={{ marginTop: 24 }}>
        <h2 className="section-main-heading">{t.exploreTopicsTitle}</h2>

        <div className="cards-grid cards-grid-3-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {mainTopics.map((topic) => {
            const Icon = topic.icon;
            return (
              <Link
                key={topic.id}
                href={topic.href}
                className="tile-card"
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  cursor: 'pointer',
                  background: 'var(--bg-white)',
                  textDecoration: 'none',
                  color: 'inherit'
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
                  <h3 className="tile-title" style={{ textAlign: 'left', marginBottom: 6, fontSize: '15px' }}>
                    {topic.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 12 }}>
                    {topic.desc}
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
                  <span>Thema öffnen</span>
                  <ArrowRight style={{ width: 14, height: 14 }} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

    </SiteLayout>
  );
}
