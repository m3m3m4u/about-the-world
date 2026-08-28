'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, Check } from 'lucide-react';

interface CookieBannerProps {
  onOpenLegal: (type: 'impressum' | 'datenschutz') => void;
}

export function CookieBanner({ onOpenLegal }: CookieBannerProps) {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [allowMedia, setAllowMedia] = useState(true);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('atw_cookie_consent');
      if (!consent) {
        setIsVisible(true);
      }
    } catch (e) {
      // localStorage not accessible
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('atw_cookie_consent', JSON.stringify({
        essential: true,
        media: true,
        timestamp: Date.now(),
      }));
    } catch (e) {}
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    try {
      localStorage.setItem('atw_cookie_consent', JSON.stringify({
        essential: true,
        media: allowMedia,
        timestamp: Date.now(),
      }));
    } catch (e) {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const content = {
    de: {
      title: 'Cookie- & Datenschutzeinstellungen',
      desc: 'Wir nutzen essenzielle Technologien und Speicherfunktionen, um Ihnen die Lernplattform mit interaktiven Übungen, Sprachauswahl und Lernstandsspeicherung optimal bereitzustellen.',
      opt1Title: 'Technisch notwendige Funktionen & Speicherstände (Immer aktiv)',
      opt1Desc: 'Erforderlich für die Navigation, Sprachumschaltung und lokale Sicherung Ihres Lernfortschritts in Übungen.',
      opt2Title: 'Externe Medien & interaktive Videoinhalte (z. B. YouTube)',
      opt2Desc: 'Ermöglicht das direkte Abspielen von Lehrvideos in den interaktiven Modulen.',
      privacy: 'Datenschutzerklärung',
      imprint: 'Impressum',
      btnEssential: 'Nur essenzielle akzeptieren',
      btnAll: 'Alle akzeptieren',
    },
    en: {
      title: 'Cookie & Privacy Settings',
      desc: 'We use essential technologies and storage features to provide you with the learning platform, interactive exercises, language selection, and progress saving.',
      opt1Title: 'Technically necessary functions & saved progress (Always active)',
      opt1Desc: 'Required for navigation, language switching, and local storage of your exercise progress.',
      opt2Title: 'External media & interactive video content (e.g. YouTube)',
      opt2Desc: 'Allows direct playback of educational videos within interactive learning modules.',
      privacy: 'Privacy Policy',
      imprint: 'Legal Notice',
      btnEssential: 'Accept Essential Only',
      btnAll: 'Accept All',
    },
    fr: {
      title: 'Paramètres des cookies et de confidentialité',
      desc: 'Nous utilisons des technologies essentielles pour vous offrir la plateforme d\'apprentissage avec exercices interactifs et enregistrement de progression.',
      opt1Title: 'Fonctions techniques et progression (Toujours actif)',
      opt1Desc: 'Nécessaire à la navigation, au choix de la langue et à l\'enregistrement local de vos exercices.',
      opt2Title: 'Médias externes et vidéos (ex. YouTube)',
      opt2Desc: 'Permet la lecture directe de vidéos éducatives dans les modules interactifs.',
      privacy: 'Politique de confidentialité',
      imprint: 'Mentions légales',
      btnEssential: 'Essentiels uniquement',
      btnAll: 'Tout accepter',
    },
    es: {
      title: 'Configuración de cookies y privacidad',
      desc: 'Utilizamos tecnologías esenciales para brindarle la plataforma educativa con ejercicios interactivos y guardado de progreso.',
      opt1Title: 'Funciones técnicas y progreso guardado (Siempre activo)',
      opt1Desc: 'Necesario para la navegación, cambio de idioma y almacenamiento local de su progreso.',
      opt2Title: 'Medios externos y videos (p. ej. YouTube)',
      opt2Desc: 'Permite la reproducción directa de videos educativos en los módulos interactivos.',
      privacy: 'Política de privacidad',
      imprint: 'Aviso legal',
      btnEssential: 'Solo esenciales',
      btnAll: 'Aceptar todo',
    },
    it: {
      title: 'Impostazioni cookie e privacy',
      desc: 'Utilizziamo tecnologie essenziali per fornirti la piattaforma didattica con esercizi interattivi e salvataggio dei progressi.',
      opt1Title: 'Funzioni tecniche e progressi salvati (Sempre attivo)',
      opt1Desc: 'Necessario per la navigazione, cambio lingua e memorizzazione locale dei tuoi progressi.',
      opt2Title: 'Media esterni e video (es. YouTube)',
      opt2Desc: 'Consente la riproduzione diretta di video didattici nei moduli interattivi.',
      privacy: 'Informativa sulla privacy',
      imprint: 'Note legali',
      btnEssential: 'Solo essenziali',
      btnAll: 'Accetta tutti',
    },
  }[language] || {
    title: 'Cookie- & Datenschutzeinstellungen',
    desc: 'Wir nutzen essenzielle Technologien und Speicherfunktionen.',
    opt1Title: 'Technisch notwendige Funktionen',
    opt1Desc: 'Erforderlich für Navigation und Lernstand.',
    opt2Title: 'Externe Medien (z. B. YouTube)',
    opt2Desc: 'Ermöglicht das Abspielen von Lehrvideos.',
    privacy: 'Datenschutzerklärung',
    imprint: 'Impressum',
    btnEssential: 'Nur essenzielle akzeptieren',
    btnAll: 'Alle akzeptieren',
  };

  return (
    <div className="cookie-overlay" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
      <div className="cookie-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <ShieldCheck style={{ width: 24, height: 24, color: 'var(--green-dark)' }} />
          <h2 id="cookie-title" className="cookie-title" style={{ margin: 0 }}>
            {content.title}
          </h2>
        </div>

        <p className="cookie-desc">
          {content.desc}
        </p>

        <div className="cookie-options">
          {/* Essenzielle Cookies */}
          <div className="cookie-option-item">
            <label className="cookie-checkbox-label">
              <input type="checkbox" checked disabled readOnly style={{ accentColor: 'var(--green-primary)', cursor: 'default' }} />
              <span>{content.opt1Title}</span>
            </label>
            <p className="cookie-option-info">
              {content.opt1Desc}
            </p>
          </div>

          {/* Externe Medien (YouTube / Videos) */}
          <div className="cookie-option-item">
            <label className="cookie-checkbox-label">
              <input 
                type="checkbox" 
                checked={allowMedia} 
                onChange={(e) => setAllowMedia(e.target.checked)} 
                style={{ accentColor: 'var(--green-primary)', cursor: 'pointer' }}
              />
              <span>{content.opt2Title}</span>
            </label>
            <p className="cookie-option-info">
              {content.opt2Desc}
            </p>
          </div>
        </div>

        <div className="cookie-footer">
          <div className="cookie-links">
            <button
              type="button"
              onClick={() => onOpenLegal('datenschutz')}
              style={{ background: 'none', border: 'none', color: 'var(--green-dark)', textDecoration: 'underline', cursor: 'pointer', fontSize: '12.5px', padding: 0 }}
            >
              {content.privacy}
            </button>
            <span style={{ color: 'var(--text-muted)' }}>•</span>
            <button
              type="button"
              onClick={() => onOpenLegal('impressum')}
              style={{ background: 'none', border: 'none', color: 'var(--green-dark)', textDecoration: 'underline', cursor: 'pointer', fontSize: '12.5px', padding: 0 }}
            >
              {content.imprint}
            </button>
          </div>

          <div className="cookie-buttons" style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleAcceptEssential}
              className="cookie-btn-secondary"
              style={{
                background: 'var(--green-light)',
                border: '1px solid var(--green-border)',
                color: 'var(--green-dark)',
                padding: '9px 16px',
                fontSize: '13px',
                fontWeight: 600,
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <span>{content.btnEssential}</span>
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="cookie-btn-primary"
              style={{
                background: 'var(--green-primary)',
                border: '1px solid transparent',
                color: '#ffffff',
                padding: '9px 20px',
                fontSize: '13px',
                fontWeight: 700,
                borderRadius: '6px',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(148, 187, 62, 0.3)',
                transition: 'all 0.15s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <Check style={{ width: 15, height: 15 }} />
              <span>{content.btnAll}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
