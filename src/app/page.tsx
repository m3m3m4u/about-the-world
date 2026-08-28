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
  ShieldCheck
} from 'lucide-react';

export default function HomePage() {
  const { t, language } = useLanguage();

  const mainTopics = [
    {
      id: 'geography',
      href: '/geographie',
      icon: Compass,
      title: t.navGeography,
      desc: language === 'de' ? 'Allgemeine geographische Themen, Kontinente, Ozeane und Zonen.' : 'General geographical topics, continents, oceans, and zones.',
    },
    {
      id: 'countries',
      href: '/laender-der-erde',
      icon: Globe,
      title: t.navCountries,
      desc: language === 'de' ? 'Erklärvideos und Online-Übungen zu allen Ländern der Erde.' : 'Explainer videos and online exercises for all world countries.',
    },
    {
      id: 'middle-east',
      href: '/der-nahostkonflikt',
      icon: BookOpen,
      title: t.navMiddleEast,
      desc: language === 'de' ? 'Dossier zum Nahostkonflikt: Geschichte, Kriege, Bevölkerung und Friedenschancen.' : 'Middle East conflict dossier: history, crises, population and peace efforts.',
    },
    {
      id: 'presidents',
      href: '/praesidenten-der-usa',
      icon: ShieldCheck,
      title: t.navPresidents,
      desc: language === 'de' ? 'Chronologie und Biographien aller Präsidenten der USA.' : 'Chronology and biographies of all US presidents.',
    },
    {
      id: 'us-states',
      href: '/us-bundesstaaten',
      icon: Map,
      title: t.navUsStates,
      desc: language === 'de' ? 'Alle 50 Bundesstaaten der USA mit Hauptstädten und Kartenübungen.' : 'All 50 US states with capitals and interactive map exercises.',
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
