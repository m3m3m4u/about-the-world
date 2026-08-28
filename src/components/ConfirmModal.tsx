'use client';

import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: 'danger' | 'primary';
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel,
  cancelLabel,
  confirmVariant = 'danger',
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const { t } = useLanguage();
  const effectiveConfirmLabel = confirmLabel || t.btnConfirm;
  const effectiveCancelLabel = cancelLabel || t.btnCancel;

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, loading, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="login-modal-overlay"
      onClick={() => {
        if (!loading) onCancel();
      }}
      style={{ zIndex: 9999 }}
    >
      <div
        className="login-modal"
        style={{ maxWidth: 440, textAlign: 'center' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
      >
        <button
          className="login-modal-close"
          onClick={() => {
            if (!loading) onCancel();
          }}
          aria-label={t.closeHandbook}
          disabled={loading}
        >
          &times;
        </button>

        <div className="login-modal-body" style={{ padding: '28px 24px 24px' }}>
          <h2
            id="confirm-modal-title"
            className="login-modal-title"
            style={{ fontSize: 20, marginBottom: 12, color: confirmVariant === 'danger' ? '#b71c1c' : 'var(--green-dark, #0f766e)' }}
          >
            {title}
          </h2>

          <div
            className="login-modal-subtitle"
            style={{
              fontSize: 14,
              lineHeight: 1.55,
              marginBottom: 24,
              color: 'var(--text-color, #1e293b)',
            }}
          >
            {message}
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button
              type="button"
              className="admin-action-btn"
              style={{ padding: '9px 20px', fontSize: 14 }}
              onClick={onCancel}
              disabled={loading}
            >
              {effectiveCancelLabel}
            </button>
            <button
              type="button"
              className={confirmVariant === 'danger' ? 'dashboard-delete-btn' : 'dashboard-add-btn'}
              style={{
                padding: '9px 20px',
                fontSize: 14,
                fontWeight: 600,
                background: confirmVariant === 'danger' ? '#c62828' : undefined,
                color: confirmVariant === 'danger' ? '#ffffff' : undefined,
                borderRadius: 6,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
              }}
              onClick={onConfirm}
              disabled={loading}
            >
              {loading ? t.btnDeleting : effectiveConfirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
