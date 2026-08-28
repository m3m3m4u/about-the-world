'use client';

import React, { useState, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface User {
  id: string;
  role: 'teacher' | 'student' | 'admin';
  email?: string;
  code?: string;
  name?: string | null;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

type Step = 'choose' | 'teacher-login' | 'teacher-register' | 'student-login';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState<Step>('choose');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const reset = useCallback(() => {
    setStep('choose');
    setEmail('');
    setPassword('');
    setCode('');
    setError('');
    setLoading(false);
  }, []);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const handleTeacherLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'teacher', email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t.loginErrorDefault);
      } else {
        onLoginSuccess({ id: data.id || '', role: data.role || 'teacher', email: data.email });
        handleClose();
      }
    } catch {
      setError(t.loginNetworkError);
    } finally {
      setLoading(false);
    }
  };

  const handleTeacherRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t.loginErrorDefault);
      } else {
        onLoginSuccess({ id: data.id || '', role: data.role || 'teacher', email: data.email });
        handleClose();
      }
    } catch {
      setError(t.loginNetworkError);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'student', code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t.loginErrorDefault);
      } else {
        onLoginSuccess({ id: data.id || '', role: data.role || 'student', code: data.code, name: data.name });
        handleClose();
      }
    } catch {
      setError(t.loginNetworkError);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay" onClick={handleClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="login-modal-close" onClick={handleClose} aria-label="Schließen">
          &times;
        </button>

        {/* STEP: Choose role */}
        {step === 'choose' && (
          <div className="login-modal-body">
            <h2 className="login-modal-title">{t.loginModalTitle}</h2>
            <p className="login-modal-subtitle">{t.loginRolePrompt}</p>
            <div className="login-role-buttons">
              <button
                className="login-role-btn login-role-teacher"
                onClick={() => setStep('teacher-login')}
              >
                <span>{t.loginRoleTeacherBtn}</span>
              </button>
              <button
                className="login-role-btn login-role-student"
                onClick={() => setStep('student-login')}
              >
                <span>{t.loginRoleStudentBtn}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP: Teacher Login */}
        {step === 'teacher-login' && (
          <div className="login-modal-body">
            <button className="login-back-btn" onClick={() => { setStep('choose'); setError(''); }}>
              {t.btnBack}
            </button>
            <h2 className="login-modal-title">{t.teacherLoginTitle}</h2>
            <form onSubmit={handleTeacherLogin} className="login-form">
              <label className="login-label">
                {t.emailOrUsername}
                <input
                  type="text"
                  className="login-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  placeholder="name@email.com"
                  autoCapitalize="none"
                  autoCorrect="off"
                />
              </label>
              <label className="login-label">
                {t.password}
                <input
                  type="password"
                  className="login-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                />
              </label>
              {error && <p className="login-error">{error}</p>}
              <button type="submit" className="login-submit-btn" disabled={loading}>
                {loading ? t.btnLoginLoading : t.btnLoginSubmit}
              </button>
            </form>
            <p className="login-switch-text">
              {t.noAccountPrompt}{' '}
              <button
                className="login-link-btn"
                onClick={() => { setStep('teacher-register'); setError(''); }}
              >
                {t.registerNowLink}
              </button>
            </p>
          </div>
        )}

        {/* STEP: Teacher Register */}
        {step === 'teacher-register' && (
          <div className="login-modal-body">
            <button className="login-back-btn" onClick={() => { setStep('teacher-login'); setError(''); }}>
              {t.btnBack}
            </button>
            <h2 className="login-modal-title">{t.teacherRegisterTitle}</h2>
            <form onSubmit={handleTeacherRegister} className="login-form">
              <label className="login-label">
                {t.email}
                <input
                  type="email"
                  className="login-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  placeholder="name@email.com"
                />
              </label>
              <label className="login-label">
                {t.password} <span className="login-hint">{t.minCharsHint}</span>
                <input
                  type="password"
                  className="login-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="••••••••"
                />
              </label>
              {error && <p className="login-error">{error}</p>}
              <button type="submit" className="login-submit-btn" disabled={loading}>
                {loading ? t.btnRegisterLoading : t.btnRegisterSubmit}
              </button>
            </form>
            <p className="login-switch-text">
              {t.alreadyHaveAccountPrompt}{' '}
              <button
                className="login-link-btn"
                onClick={() => { setStep('teacher-login'); setError(''); }}
              >
                {t.loginNowLink}
              </button>
            </p>
          </div>
        )}

        {/* STEP: Student Login */}
        {step === 'student-login' && (
          <div className="login-modal-body">
            <button className="login-back-btn" onClick={() => { setStep('choose'); setError(''); }}>
              {t.btnBack}
            </button>
            <h2 className="login-modal-title">{t.studentLoginTitle}</h2>
            <p className="login-modal-subtitle">
              {t.studentLoginSubtitle}
            </p>
            <form onSubmit={handleStudentLogin} className="login-form">
              <label className="login-label">
                {t.studentCode}
                <input
                  type="text"
                  className="login-input login-code-input"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z1-9]/gi, '').slice(0, 5))}
                  required
                  autoFocus
                  placeholder={t.studentCodePlaceholder}
                  maxLength={5}
                  spellCheck={false}
                  autoCapitalize="characters"
                />
              </label>
              {error && <p className="login-error">{error}</p>}
              <button type="submit" className="login-submit-btn" disabled={loading || code.length !== 5}>
                {loading ? t.btnLoginLoading : t.btnLoginSubmit}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
