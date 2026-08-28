'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SiteLayout } from '@/components/SiteLayout';
import ConfirmModal from '@/components/ConfirmModal';
import { useLanguage } from '@/context/LanguageContext';
import { Users, GraduationCap, CheckCircle2, ShieldAlert, KeyRound, Trash2, AlertCircle } from 'lucide-react';

interface Teacher {
  id: string;
  email: string;
  createdAt: string;
  studentCount: number;
  completedTasksCount: number;
}

export default function AdminPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [totalCompletedTasks, setTotalCompletedTasks] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Confirmation overlay modal state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: React.ReactNode;
    confirmLabel: string;
    loading: boolean;
    onConfirm: () => Promise<void>;
  }>({
    isOpen: false,
    title: '',
    message: null,
    confirmLabel: 'Löschen',
    loading: false,
    onConfirm: async () => {},
  });

  // Per-teacher reset state
  const [resetTeacherId, setResetTeacherId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  // Verify admin session
  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => {
        if (!data.user || data.user.role !== 'admin') {
          router.replace('/');
        }
      })
      .catch(() => router.replace('/'));
  }, [router]);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t.loginErrorDefault);
      } else {
        setTeachers(data.teachers || []);
        setTotalStudents(data.totalStudents ?? 0);
        setTotalCompletedTasks(data.totalCompletedTasks ?? 0);
      }
    } catch {
      setError(t.loginNetworkError);
    } finally {
      setLoading(false);
    }
  }, [t.loginErrorDefault, t.loginNetworkError]);

  useEffect(() => { loadData(); }, [loadData]);

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(''), 4000);
  };

  // Reset teacher password
  const handlePasswordReset = async (teacherId: string) => {
    if (!newPassword.trim()) { setError(t.minCharsHint); return; }
    if (newPassword.trim().length < 6) { setError(t.minCharsHint); return; }
    setResetLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'teacher-password', id: teacherId, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t.loginErrorDefault);
      } else {
        setResetTeacherId('');
        setNewPassword('');
        showSuccess(t.adminPasswordResetSuccess);
      }
    } catch {
      setError(t.loginNetworkError);
    } finally {
      setResetLoading(false);
    }
  };

  // Delete teacher + all data (via overlay confirmation)
  const promptDeleteTeacher = (teacherId: string, email: string, studentCount: number) => {
    setError('');
    const confirmMessage = t.adminDeleteTeacherConfirm
      .replace('{email}', email)
      .replace('{count}', String(studentCount));

    setConfirmModal({
      isOpen: true,
      title: t.adminDeleteTeacherTitle,
      message: <span>{confirmMessage}</span>,
      confirmLabel: t.adminDeleteTeacherBtn,
      loading: false,
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, loading: true }));
        try {
          const res = await fetch('/api/admin/users', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ teacherId }),
          });
          const data = await res.json();
          if (!res.ok) {
            setError(data.error || t.loginErrorDefault);
          } else {
            showSuccess(t.adminTeacherDeletedSuccess.replace('{email}', email));
            await loadData();
          }
        } catch {
          setError(t.loginNetworkError);
        } finally {
          setConfirmModal((prev) => ({ ...prev, isOpen: false, loading: false }));
        }
      },
    });
  };

  const localeStr = language === 'en' ? 'en-US' : language === 'fr' ? 'fr-FR' : language === 'es' ? 'es-ES' : language === 'it' ? 'it-IT' : 'de-DE';

  return (
    <SiteLayout>
      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '32px 20px', width: '100%' }}>
        
        {/* Title Header */}
        <div style={{ marginBottom: 24, borderBottom: '1px solid var(--border-light, #e2e8f0)', paddingBottom: 16 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--green-dark, #0f766e)', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShieldAlert style={{ width: 26, height: 26 }} />
            <span>{t.adminDashboardTitle}</span>
          </h1>
          <p style={{ color: 'var(--text-muted, #64748b)', margin: 0, fontSize: 13.5 }}>
            {t.adminDashboardDesc}
          </p>
        </div>

        {/* Stats Summary Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
            marginBottom: 26,
          }}
        >
          <div className="h5p-player-card" style={{ margin: 0, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 8, background: 'var(--green-light, #e6f4f1)', color: 'var(--green-dark, #0f766e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GraduationCap style={{ width: 24, height: 24 }} />
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--green-dark, #0f766e)' }}>{teachers.length}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted, #64748b)' }}>{t.adminRegisteredTeachers}</div>
              </div>
            </div>
          </div>

          <div className="h5p-player-card" style={{ margin: 0, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 8, background: '#ede9fe', color: '#6d28d9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users style={{ width: 24, height: 24 }} />
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#6d28d9' }}>{totalStudents}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted, #64748b)' }}>{t.adminTotalStudents}</div>
              </div>
            </div>
          </div>

          <div className="h5p-player-card" style={{ margin: 0, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 8, background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 style={{ width: 24, height: 24 }} />
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#15803d' }}>{totalCompletedTasks}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted, #64748b)' }}>{t.adminTotalTasks}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div style={{ background: '#fee2e2', border: '1px solid #f87171', color: '#b91c1c', padding: '10px 16px', borderRadius: 6, marginBottom: 20, fontSize: 13.5, display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertCircle style={{ width: 16, height: 16 }} />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#166534', padding: '10px 16px', borderRadius: 6, marginBottom: 20, fontSize: 13.5, display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle2 style={{ width: 16, height: 16 }} />
            <span>{success}</span>
          </div>
        )}

        {/* Teachers List */}
        {loading ? (
          <p style={{ color: 'var(--text-muted, #64748b)', padding: '20px 0' }}>{t.loading}</p>
        ) : teachers.length === 0 ? (
          <div className="h5p-player-card" style={{ padding: 24, textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted, #64748b)', margin: 0 }}>{t.adminNoTeachersYet}</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="h5p-player-card"
                style={{ margin: 0, padding: '18px 22px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--green-dark, #0f766e)' }}>{teacher.email}</span>
                      <span style={{ fontSize: 12, color: 'var(--text-muted, #64748b)' }}>
                        ({t.adminRegisteredDate} {new Date(teacher.createdAt).toLocaleDateString(localeStr)})
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: 10, marginTop: 8, flexWrap: 'wrap' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 5,
                          background: 'var(--green-light, #e6f4f1)',
                          color: 'var(--green-dark, #0f766e)',
                          border: '1px solid var(--green-border, #a7f3d0)',
                          borderRadius: 4,
                          padding: '2px 8px',
                          fontSize: 12.5,
                          fontWeight: 600,
                        }}
                      >
                        <strong>{teacher.studentCount}</strong> {t.totalStudentsCard}
                      </span>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 5,
                          background: '#f8fafc',
                          color: '#334155',
                          border: '1px solid #e2e8f0',
                          borderRadius: 4,
                          padding: '2px 8px',
                          fontSize: 12.5,
                          fontWeight: 600,
                        }}
                      >
                        <strong>{teacher.completedTasksCount}</strong> {t.totalSolvedTasksCard}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="admin-action-btn"
                      onClick={() => {
                        setResetTeacherId(resetTeacherId === teacher.id ? '' : teacher.id);
                        setNewPassword('');
                      }}
                      style={{ padding: '6px 12px', fontSize: 12.5 }}
                    >
                      <KeyRound style={{ width: 13, height: 13 }} />
                      <span>{resetTeacherId === teacher.id ? t.btnCancel : t.adminResetPasswordBtn}</span>
                    </button>

                    <button
                      type="button"
                      className="admin-action-btn"
                      style={{ padding: '6px 12px', fontSize: 12.5, color: '#dc2626' }}
                      onClick={() => promptDeleteTeacher(teacher.id, teacher.email, teacher.studentCount)}
                    >
                      <Trash2 style={{ width: 13, height: 13 }} />
                      <span>{t.adminDeleteTeacherBtn}</span>
                    </button>
                  </div>
                </div>

                {/* Inline Password Reset Form */}
                {resetTeacherId === teacher.id && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border-light, #e2e8f0)', display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                    <input
                      type="password"
                      placeholder={t.adminNewPasswordPlaceholder}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      style={{ flex: '1 1 240px', padding: '6px 12px', fontSize: 13, border: '1px solid var(--border-light, #e2e8f0)', borderRadius: 4 }}
                    />
                    <button
                      type="button"
                      onClick={() => handlePasswordReset(teacher.id)}
                      disabled={resetLoading}
                      className="dashboard-add-btn"
                      style={{ padding: '7px 16px', fontSize: 12.5, background: 'var(--green-primary, #0f766e)', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                    >
                      {resetLoading ? t.btnSaving : t.adminSetNewPasswordBtn}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Global Confirm Modal */}
        <ConfirmModal
          isOpen={confirmModal.isOpen}
          title={confirmModal.title}
          message={confirmModal.message}
          confirmLabel={confirmModal.confirmLabel}
          loading={confirmModal.loading}
          onConfirm={confirmModal.onConfirm}
          onCancel={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
        />

      </div>
    </SiteLayout>
  );
}
