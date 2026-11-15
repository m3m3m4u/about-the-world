'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { BUCHTIPPS_UI } from '@/lib/buchtipps/data';

const STORAGE_KEY = 'atw_teacher_buchtipps_dismissed_until';
const TWO_MONTHS_MS = 60 * 24 * 60 * 60 * 1000; // 60 Tage

interface User {
  id: string;
  role: 'teacher' | 'student' | 'admin';
  email?: string;
}

export default function TeacherBuchtippsModal() {
  const { language } = useLanguage();
  const ui = BUCHTIPPS_UI[language] || BUCHTIPPS_UI.de;

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data?.user?.role === 'teacher') {
          setUser(data.user);
          if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/buchtipps')) {
            try {
              const dismissedUntil = localStorage.getItem(STORAGE_KEY);
              if (!dismissedUntil || Date.now() > Number(dismissedUntil)) {
                timer = setTimeout(() => {
                  setIsOpen(true);
                }, 750);
              }
            } catch {
              // LocalStorage nicht verfügbar
            }
          }
        }
      })
      .catch(() => {
        // Nicht eingeloggt
      });

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('open-teacher-buchtipps-modal', handleCustomOpen);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener('open-teacher-buchtipps-modal', handleCustomOpen);
    };
  }, [pathname]);

  const handleDismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now() + TWO_MONTHS_MS));
    } catch {
      // ignore
    }
    setIsOpen(false);
  };

  const handleNavigateToBuchtipps = () => {
    handleDismiss();
    router.push('/buchtipps');
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen || !user) {
    return null;
  }

  return (
    <div
      className="login-modal-overlay"
      onClick={handleDismiss}
      style={{
        zIndex: 99999,
        background: 'rgba(0, 0, 0, 0.55)',
        backdropFilter: 'blur(2px)',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="teacher-buchtipps-title"
    >
      <div
        className="login-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 520,
          width: '100%',
          border: '2px solid var(--green-primary)',
          borderRadius: 12,
          padding: 0,
          overflow: 'hidden',
          background: 'var(--bg-white)',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.22)',
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            background: 'var(--green-light)',
            borderBottom: '1px solid var(--green-border)',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                background: 'var(--green-primary)',
                color: '#ffffff',
                fontSize: 11,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                padding: '3px 8px',
                borderRadius: 4,
              }}
            >
              {ui.modalNewBadge}
            </span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--green-dark)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {ui.modalTeacherLabel}
            </span>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label={ui.modalCloseAria}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: 20,
              lineHeight: 1,
              cursor: 'pointer',
              padding: '2px 6px',
              borderRadius: 4,
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px 24px 20px 24px' }}>
          <h2
            id="teacher-buchtipps-title"
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: 'var(--green-dark)',
              lineHeight: 1.35,
              margin: '0 0 10px 0',
            }}
          >
            {ui.modalTitle}
          </h2>

          <p style={{ fontSize: 14, color: 'var(--text-color)', lineHeight: 1.55, margin: '0 0 16px 0' }}>
            {ui.modalBody}
          </p>

          {/* Highlights List */}
          <div
            style={{
              background: '#f7faf4',
              border: '1px solid var(--green-border)',
              borderRadius: 8,
              padding: '14px 16px',
              marginBottom: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'var(--text-color)' }}>
              <span style={{ color: 'var(--green-dark)', fontWeight: 700, flexShrink: 0 }}>✓</span>
              <div>
                <strong>{ui.modalHighlight1Title}</strong> {ui.modalHighlight1Desc}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'var(--text-color)' }}>
              <span style={{ color: 'var(--green-dark)', fontWeight: 700, flexShrink: 0 }}>✓</span>
              <div>
                <strong>{ui.modalHighlight2Title}</strong> {ui.modalHighlight2Desc}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'var(--text-color)' }}>
              <span style={{ color: 'var(--green-dark)', fontWeight: 700, flexShrink: 0 }}>✓</span>
              <div>
                <strong>{ui.modalHighlight3Title}</strong> {ui.modalHighlight3Desc}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 10,
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              onClick={handleDismiss}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-light)',
                borderRadius: 4,
                padding: '9px 16px',
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.15s ease',
              }}
            >
              {ui.modalLaterBtn}
            </button>

            <button
              type="button"
              onClick={handleNavigateToBuchtipps}
              className="button-link"
              style={{
                background: 'var(--green-primary)',
                color: '#ffffff',
                border: 'none',
                borderRadius: 4,
                padding: '9px 18px',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                boxShadow: '0 2px 6px rgba(148, 187, 62, 0.3)',
              }}
            >
              <span>{ui.modalGoBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
