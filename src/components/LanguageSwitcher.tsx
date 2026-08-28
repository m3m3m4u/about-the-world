'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/types';
import { FlagIcon } from './FlagIcon';

const LANGUAGES: { code: Language; name: string; title: string }[] = [
  { code: 'de', name: 'Deutsch', title: 'Deutsch' },
  { code: 'en', name: 'English', title: 'English' },
  { code: 'fr', name: 'Français', title: 'Français' },
  { code: 'es', name: 'Español', title: 'Español' },
  { code: 'it', name: 'Italiano', title: 'Italiano' },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div 
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '8px', 
        background: 'var(--green-light)',
        border: '1px solid var(--green-border)',
        borderRadius: '4px',
        padding: '4px 8px',
      }}
      role="group"
      aria-label="Sprachauswahl"
    >
      {LANGUAGES.map((lang) => {
        const isActive = language === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => setLanguage(lang.code)}
            style={{
              background: 'transparent',
              border: isActive ? '2px solid var(--green-dark)' : '2px solid transparent',
              borderRadius: '3px',
              padding: '1px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: isActive ? 1 : 0.6,
              transform: isActive ? 'scale(1.1)' : 'scale(1)',
              transition: 'all 0.15s ease',
            }}
            title={lang.title}
            aria-label={lang.name}
            aria-pressed={isActive}
          >
            <FlagIcon lang={lang.code} width={24} height={16} />
          </button>
        );
      })}
    </div>
  );
}
