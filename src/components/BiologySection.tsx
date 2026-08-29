'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  BIOLOGIE_CATEGORIES,
  ALL_ANIMALS,
  ALL_PLANTS,
  BIOLOGIE_ITEMS,
} from '@/data/biology_data';
import {
  Bug,
  Leaf,
  PawPrint,
  Bird,
  Fish,
  Shield,
  Waves,
  Trees,
  TreePine,
  Flower2,
  Trophy,
  HelpCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const ICON_COMPONENTS: Record<string, React.ComponentType<{ style?: React.CSSProperties; className?: string }>> = {
  PawPrint,
  Bird,
  Fish,
  Shield,
  Waves,
  Bug,
  Trees,
  TreePine,
  Flower2,
};

export function BiologySection() {
  const { t, language } = useLanguage();

  const tierKategorien = BIOLOGIE_CATEGORIES.filter((k) => k.group === 'tiere');
  const pflanzenKategorien = BIOLOGIE_CATEGORIES.filter((k) => k.group === 'pflanzen');

  return (
    <div className="section-block" style={{ width: '100%' }}>
      {/* Intro Box */}
      <div className="info-box-section">
        <h2>{t.biologyTitle}</h2>
        <p>{t.biologySubtitle}</p>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: 8 }}>
          {language === 'de' && 'Erkenne Säugetiere, Vögel, Fische, Reptilien, Amphibien und Wirbellose auf detailreichen Fotografien oder trainiere dein Wissen über Bäume, Sträucher und Blütenpflanzen.'}
          {language === 'en' && 'Recognize mammals, birds, fish, reptiles, amphibians, and invertebrates from detailed photographs, or practice your knowledge of trees, shrubs, and flowering plants.'}
          {language === 'fr' && 'Reconnaissez les mammifères, oiseaux, poissons, reptiles, amphibiens et invertébrés sur des photos détaillées, ou entraînez vos connaissances sur les arbres, arbustes et plantes à fleurs.'}
          {language === 'es' && 'Reconoce mamíferos, aves, peces, reptiles, anfibios e invertebrados en fotografías detalladas o practica tus conocimientos sobre árboles, arbustos y plantas con flores.'}
          {language === 'it' && 'Riconosci mammiferi, uccelli, pesci, rettili, anfibi e invertebrati su fotografie dettagliate o allena le tue conoscenze su alberi, arbusti e piante da fiore.'}
        </p>
      </div>

      {/* Special Game Modes Cards (Tierart-Quiz & Master-Quiz) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16, marginTop: 16 }}>
        {/* Tierart-Quiz */}
        <div
          className="tile-card"
          style={{
            background: 'var(--bg-white)',
            border: '1px solid var(--green-border)',
            borderRadius: 8,
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <HelpCircle style={{ width: 20, height: 20, color: 'var(--green-dark)' }} />
              <h3 style={{ fontSize: '17px', margin: 0 }}>{t.navAnimalClassificationQuiz}</h3>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 14 }}>
              {t.biologyClassificationQuizDesc}
            </p>
          </div>
          <Link
            href="/biologie/tierart-quiz"
            className="nav-btn active"
            style={{
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              fontWeight: 700,
              padding: '8px 16px',
            }}
          >
            <span>{t.biologyStartQuiz}</span>
            <ArrowRight style={{ width: 15, height: 15 }} />
          </Link>
        </div>

        {/* Master-Quiz */}
        <div
          className="tile-card"
          style={{
            background: 'var(--bg-white)',
            border: '1px solid var(--green-border)',
            borderRadius: 8,
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Trophy style={{ width: 20, height: 20, color: 'var(--green-dark)' }} />
              <h3 style={{ fontSize: '17px', margin: 0 }}>{t.biologyMasterQuizTitle}</h3>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 14 }}>
              {t.biologyMasterQuizDesc} ({BIOLOGIE_ITEMS.length} {t.biologySpeciesCount})
            </p>
          </div>
          <Link
            href="/biologie/quiz?kategorie=alle"
            className="nav-btn active"
            style={{
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              fontWeight: 700,
              padding: '8px 16px',
            }}
          >
            <span>{t.biologyStartQuiz}</span>
            <ArrowRight style={{ width: 15, height: 15 }} />
          </Link>
        </div>
      </div>

      {/* Tierwelt Block */}
      <div
        style={{
          background: 'var(--bg-white)',
          border: '1px solid var(--border-light)',
          borderRadius: 8,
          padding: 20,
          marginTop: 20,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            marginBottom: 16,
            paddingBottom: 10,
            borderBottom: '1px solid var(--border-light)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <PawPrint style={{ width: 20, height: 20, color: 'var(--green-dark)' }} />
            <h2 style={{ fontSize: '18px', margin: 0 }}>
              {t.biologyAnimalsHeading} ({ALL_ANIMALS.length} {t.biologySpeciesCount})
            </h2>
          </div>
          <Link
            href="/biologie/quiz?kategorie=alle-tiere"
            className="nav-btn"
            style={{
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '13px',
              padding: '6px 12px',
            }}
          >
            <Sparkles style={{ width: 14, height: 14 }} />
            <span>{t.biologyAllAnimals}</span>
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 12,
          }}
        >
          {tierKategorien.map((kat) => {
            const Icon = ICON_COMPONENTS[kat.icon] || Bug;
            const count = BIOLOGIE_ITEMS.filter((i) => i.kategorie === kat.id).length;
            const name = kat.name[language] || kat.name.de;

            return (
              <Link
                key={kat.id}
                href={`/biologie/quiz?kategorie=${kat.id}`}
                className="tile-card"
                style={{
                  background: 'var(--bg-body)',
                  border: '1px solid var(--green-border)',
                  borderRadius: 6,
                  padding: '14px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 8,
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.15s ease',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 6,
                    background: 'var(--bg-white)',
                    border: '1px solid var(--green-border)',
                    color: 'var(--green-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon style={{ width: 20, height: 20 }} />
                </div>
                <div style={{ fontWeight: 700, fontSize: '13.5px', color: 'var(--green-dark)' }}>
                  {name}
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  {count} {t.biologySpeciesCount}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Pflanzenwelt Block */}
      <div
        style={{
          background: 'var(--bg-white)',
          border: '1px solid var(--border-light)',
          borderRadius: 8,
          padding: 20,
          marginTop: 20,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            marginBottom: 16,
            paddingBottom: 10,
            borderBottom: '1px solid var(--border-light)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Leaf style={{ width: 20, height: 20, color: 'var(--green-dark)' }} />
            <h2 style={{ fontSize: '18px', margin: 0 }}>
              {t.biologyPlantsHeading} ({ALL_PLANTS.length} {t.biologySpeciesCount})
            </h2>
          </div>
          <Link
            href="/biologie/quiz?kategorie=alle-pflanzen"
            className="nav-btn"
            style={{
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '13px',
              padding: '6px 12px',
            }}
          >
            <Sparkles style={{ width: 14, height: 14 }} />
            <span>{t.biologyAllPlants}</span>
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 12,
          }}
        >
          {pflanzenKategorien.map((kat) => {
            const Icon = ICON_COMPONENTS[kat.icon] || Leaf;
            const count = BIOLOGIE_ITEMS.filter((i) => i.kategorie === kat.id).length;
            const name = kat.name[language] || kat.name.de;

            return (
              <Link
                key={kat.id}
                href={`/biologie/quiz?kategorie=${kat.id}`}
                className="tile-card"
                style={{
                  background: 'var(--bg-body)',
                  border: '1px solid var(--green-border)',
                  borderRadius: 6,
                  padding: '16px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.15s ease',
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 6,
                    background: 'var(--bg-white)',
                    border: '1px solid var(--green-border)',
                    color: 'var(--green-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon style={{ width: 22, height: 22 }} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--green-dark)' }}>
                    {name}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: 2 }}>
                    {count} {t.biologySpeciesCount}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
