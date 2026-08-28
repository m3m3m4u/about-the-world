'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { CookieBanner } from '@/components/CookieBanner';
import { LegalModal } from '@/components/LegalModal';
import { useLanguage } from '@/context/LanguageContext';

interface SiteLayoutProps {
  children: React.ReactNode;
  activeSection?: string;
}

export function SiteLayout({ children, activeSection }: SiteLayoutProps) {
  const { t } = useLanguage();
  const [legalType, setLegalType] = useState<'impressum' | 'datenschutz' | null>(null);

  const handleOpenCookieSettings = () => {
    try {
      localStorage.removeItem('atw_cookie_consent');
      window.location.reload();
    } catch (e) {}
  };

  return (
    <div className="site-wrapper">
      
      {/* Header strictly matching global.css .main-header */}
      <Header activeSection={activeSection} />

      {/* Main Content strictly matching global.css .content-container */}
      <main className="content-container">
        {children}
      </main>

      {/* Footer strictly matching global.css .main-footer */}
      <footer className="main-footer">
        <div className="footer-inner" style={{ justifyContent: 'center' }}>
          <div className="footer-links">
            <button
              type="button"
              onClick={() => setLegalType('impressum')}
              className="footer-cookie-btn"
            >
              {t.footerImprint}
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setLegalType('datenschutz')}
              className="footer-cookie-btn"
            >
              {t.footerPrivacy}
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={handleOpenCookieSettings}
              className="footer-cookie-btn"
            >
              {t.footerCookieSettings}
            </button>
          </div>
        </div>
      </footer>

      {/* DSGVO Cookie Banner */}
      <CookieBanner onOpenLegal={(type) => setLegalType(type)} />

      {/* Impressum & Datenschutz Modal */}
      <LegalModal type={legalType} onClose={() => setLegalType(null)} />

    </div>
  );
}
