'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import LoginModal from './LoginModal';

interface User {
  id: string;
  role: 'teacher' | 'student' | 'admin';
  email?: string;
  code?: string;
  name?: string | null;
}

export default function LoginButton() {
  const { t } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Load current session on mount
  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => setUser(data.user || null))
      .catch(() => setUser(null));
  }, []);

  const handleLoginSuccess = useCallback((loggedInUser: User) => {
    setUser(loggedInUser);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    setMenuOpen(false);
    window.location.reload();
  };

  // Logged out → show Login button
  if (!user) {
    return (
      <>
        <button
          className="login-header-btn"
          onClick={() => setModalOpen(true)}
          title={t.loginBtn}
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>{t.loginBtn}</span>
        </button>
        <LoginModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </>
    );
  }

  // Logged in -> show user badge + dropdown menu
  const displayLabel =
    user.role === 'admin'
      ? t.roleAdmin
      : user.role === 'teacher'
      ? (user.email || t.roleTeacher)
      : (user.code || t.roleStudent);

  const roleSubtitle =
    user.role === 'teacher'
      ? t.roleTeacher
      : user.role === 'admin'
      ? t.roleAdmin
      : t.roleStudent;

  return (
    <div className="login-user-wrapper">
      <button
        className="login-user-btn"
        onClick={() => setMenuOpen((v) => !v)}
        title={displayLabel}
      >
        <span className="login-user-label">{displayLabel}</span>
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transform: menuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', marginLeft: 4 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {menuOpen && (
        <div className="login-user-menu" style={{ minWidth: 240, padding: '6px 0', border: '1.5px solid var(--green-primary, #0f766e)' }}>
          {/* User profile header */}
          <div style={{ padding: '10px 16px 8px', borderBottom: '1px solid var(--border-light, #e2e8f0)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green-dark, #0f766e)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user.email || user.code || displayLabel}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted, #64748b)', textTransform: 'uppercase', letterSpacing: '0.4px', marginTop: 2 }}>
              {roleSubtitle}
            </div>
          </div>

          {/* Role-specific menu items */}
          {user.role === 'admin' && (
            <Link href="/admin" className="login-user-menu-item" onClick={() => setMenuOpen(false)}>
              {t.menuAdmin}
            </Link>
          )}

          {user.role === 'teacher' && (
            <>
              <Link href="/dashboard" className="login-user-menu-item" onClick={() => setMenuOpen(false)}>
                {t.menuDashboard}
              </Link>
            </>
          )}

          {user.role === 'student' && (
            <>
              <Link href="/mein-fortschritt" className="login-user-menu-item" onClick={() => setMenuOpen(false)}>
                {t.menuProgress}
              </Link>
              <Link href="/" className="login-user-menu-item" onClick={() => setMenuOpen(false)}>
                {t.menuTopics}
              </Link>
            </>
          )}

          <button className="login-user-menu-item login-user-menu-logout" onClick={handleLogout}>
            {t.logoutBtn}
          </button>
        </div>
      )}
    </div>
  );
}
