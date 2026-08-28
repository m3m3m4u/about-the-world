'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import LoginButton from './LoginButton';
import { Menu, ChevronDown, ChevronUp } from 'lucide-react';

interface HeaderProps {
  onOpenGuide?: () => void;
  activeSection?: string;
  onSelectSection?: (sectionId: string) => void;
}

export function Header({ activeSection }: HeaderProps) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', href: '/', label: t.navHome },
    { id: 'geography', href: '/geographie', label: t.navGeography },
    { id: 'countries', href: '/laender-der-erde', label: t.navCountries },
    { id: 'middle-east', href: '/der-nahostkonflikt', label: t.navMiddleEast },
    { id: 'presidents', href: '/praesidenten-der-usa', label: t.navPresidents },
    { id: 'us-states', href: '/us-bundesstaaten', label: t.navUsStates },
  ];

  return (
    <header className="main-header">
      {/* Obere Header-Zeile: Marke links, "Inhalte"-Button & Flaggen rechts */}
      <div className="header-inner">
        {/* Brand Area matching global.css .brand */}
        <div className="brand">
          <Link
            href="/"
            className="brand-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', textDecoration: 'none' }}
          >
            <div className="brand-logo-wrapper">
              <Image
                src="/ATW_Logo.png"
                alt="About the World Logo"
                width={48}
                height={48}
                className="brand-favicon"
                priority
              />
            </div>
            <div className="brand-titles">
              <span className="site-title">About the World</span>
              <span className="site-subtitle">{t.platformSubtitle}</span>
            </div>
          </Link>
        </div>

        {/* Rechte Seite: Inhalte-Button & Flaggen-Sprachumschalter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          
          {/* "Inhalte" Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`nav-btn themen-toggle-btn ${isMenuOpen ? 'themen-open active' : ''}`}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 6,
              cursor: 'pointer',
              border: '1px solid var(--green-border)',
              background: isMenuOpen ? 'var(--green-light)' : 'var(--bg-white)',
              color: 'var(--green-dark)',
              fontWeight: 700
            }}
            aria-expanded={isMenuOpen}
            aria-label="Inhalte Menü öffnen"
          >
            <Menu style={{ width: 16, height: 16 }} className="themen-icon-bars" />
            <span>{t.navContentsToggle}</span>
            {isMenuOpen ? (
              <ChevronUp style={{ width: 15, height: 15 }} className="themen-icon-arrow" />
            ) : (
              <ChevronDown style={{ width: 15, height: 15 }} className="themen-icon-arrow" />
            )}
          </button>

          {/* Flaggen-Sprachumschalter in der oberen Header-Zeile */}
          <LanguageSwitcher />

          {/* Benutzeranmeldung / Login-Button & Dropdown */}
          <LoginButton />

        </div>
      </div>

      {/* Zweite Header-Zeile: Klappt auf, wenn "Inhalte" aktiv ist */}
      {isMenuOpen && (
        <div 
          style={{ 
            background: 'var(--bg-white)', 
            borderTop: '1px solid var(--border-light)', 
            borderBottom: '2px solid var(--green-primary)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            padding: '8px 0',
          }}
        >
          <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 20px' }}>
            <nav className="site-nav" style={{ flexWrap: 'wrap', gap: 8, justifyContent: 'flex-start' }}>
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href)) || activeSection === link.id;
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`nav-btn ${isActive ? 'active' : ''}`}
                    style={{ cursor: 'pointer', textDecoration: 'none' }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
