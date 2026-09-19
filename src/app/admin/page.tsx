'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SiteLayout } from '@/components/SiteLayout';
import ConfirmModal from '@/components/ConfirmModal';
import { useLanguage } from '@/context/LanguageContext';
import {
  Users,
  GraduationCap,
  CheckCircle2,
  ShieldAlert,
  KeyRound,
  Trash2,
  AlertCircle,
  BarChart3,
  RotateCw,
  ExternalLink,
} from 'lucide-react';
import { AnalyticsReport, Timeframe } from '@/lib/analytics';

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

  // Active Tab: 'analytics' or 'users'
  const [activeTab, setActiveTab] = useState<'analytics' | 'users'>('analytics');

  // Teachers State
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [totalCompletedTasks, setTotalCompletedTasks] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Analytics State
  const [timeframe, setTimeframe] = useState<Timeframe>('7d');
  const [analytics, setAnalytics] = useState<AnalyticsReport | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [pageSearch, setPageSearch] = useState('');

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

  // Load User Data
  const loadUserData = useCallback(async () => {
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

  // Load Analytics Data
  const loadAnalyticsData = useCallback(async (tf: Timeframe) => {
    setAnalyticsLoading(true);
    try {
      const res = await fetch(`/api/admin/analytics?timeframe=${tf}`);
      const data = await res.json();
      if (res.ok) {
        setAnalytics(data);
      }
    } catch (e) {
      console.error('Failed to load analytics:', e);
    } finally {
      setAnalyticsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'users') {
      loadUserData();
    } else {
      loadAnalyticsData(timeframe);
    }
  }, [activeTab, timeframe, loadUserData, loadAnalyticsData]);

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
            await loadUserData();
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

  // Filtered pages for table search
  const filteredPages = (analytics?.pages || []).filter(
    (p) =>
      p.path.toLowerCase().includes(pageSearch.toLowerCase()) ||
      p.name.toLowerCase().includes(pageSearch.toLowerCase())
  );

  const maxHourlyViews = Math.max(...(analytics?.hourly || []).map((h) => h.views), 1);
  const maxPageViews = Math.max(...(analytics?.pages || []).map((p) => p.views), 1);

  return (
    <SiteLayout>
      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '32px 20px', width: '100%' }}>
        
        {/* Title Header */}
        <div style={{ marginBottom: 20, borderBottom: '1px solid var(--border-light, #e2e8f0)', paddingBottom: 16 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--green-dark, #0f766e)', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShieldAlert style={{ width: 26, height: 26 }} />
            <span>Admin-Bereich</span>
          </h1>
          <p style={{ color: 'var(--text-muted, #64748b)', margin: 0, fontSize: 13.5 }}>
            Verwaltung der Plattform, Benutzerkonten und detaillierte Website-Statistiken.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="admin-tab-nav">
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart3 style={{ width: 17, height: 17 }} />
            <span>Website-Analytics</span>
          </button>
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <Users style={{ width: 17, height: 17 }} />
            <span>Benutzer &amp; Klassen ({teachers.length > 0 ? teachers.length : '...'})</span>
          </button>
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

        {/* ========================================================================= */}
        {/* TAB 1: WEBSITE ANALYTICS                                                  */}
        {/* ========================================================================= */}
        {activeTab === 'analytics' && (
          <div>
            {/* Header Controls: Timeframe Filter + Live Indicator */}
            <div className="analytics-header-controls">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <div className="analytics-live-badge">
                  <span className="analytics-live-dot" />
                  <span>
                    <strong>{analytics?.activeNow ?? 0}</strong> {analytics?.activeNow === 1 ? 'Besucher' : 'Besucher'} aktuell online
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <div className="analytics-filter-group">
                  <button
                    type="button"
                    className={`analytics-filter-btn ${timeframe === 'today' ? 'active' : ''}`}
                    onClick={() => setTimeframe('today')}
                  >
                    Heute
                  </button>
                  <button
                    type="button"
                    className={`analytics-filter-btn ${timeframe === '7d' ? 'active' : ''}`}
                    onClick={() => setTimeframe('7d')}
                  >
                    Letzte 7 Tage
                  </button>
                  <button
                    type="button"
                    className={`analytics-filter-btn ${timeframe === '30d' ? 'active' : ''}`}
                    onClick={() => setTimeframe('30d')}
                  >
                    Letzte 30 Tage
                  </button>
                  <button
                    type="button"
                    className={`analytics-filter-btn ${timeframe === 'all' ? 'active' : ''}`}
                    onClick={() => setTimeframe('all')}
                  >
                    Gesamt
                  </button>
                </div>

                <button
                  type="button"
                  className="analytics-refresh-btn"
                  onClick={() => loadAnalyticsData(timeframe)}
                  title="Statistiken aktualisieren"
                  disabled={analyticsLoading}
                >
                  <RotateCw style={{ width: 13, height: 13, animation: analyticsLoading ? 'spin 1s linear infinite' : 'none' }} />
                  <span>{analyticsLoading ? 'Lädt...' : 'Aktualisieren'}</span>
                </button>
              </div>
            </div>

            {/* 4 KPI Summary Cards */}
            <div className="analytics-kpi-grid">
              <div className="analytics-kpi-card">
                <div className="analytics-kpi-label">
                  Aufrufe gesamt
                </div>
                <div className="analytics-kpi-value">
                  {analytics?.summary.totalViews.toLocaleString('de-AT') ?? 0}
                </div>
                <div className="analytics-kpi-sub">
                  Seitenaufrufe ({timeframe === 'today' ? 'Heute' : timeframe === '7d' ? '7 Tage' : timeframe === '30d' ? '30 Tage' : 'Gesamt'})
                </div>
              </div>

              <div className="analytics-kpi-card">
                <div className="analytics-kpi-label">
                  Besucher (Sitzungen)
                </div>
                <div className="analytics-kpi-value">
                  {analytics?.summary.uniqueVisitors.toLocaleString('de-AT') ?? 0}
                </div>
                <div className="analytics-kpi-sub">
                  Eindeutige Browser-Sitzungen
                </div>
              </div>

              <div className="analytics-kpi-card">
                <div className="analytics-kpi-label">
                  Ø Verweildauer
                </div>
                <div className="analytics-kpi-value" style={{ fontSize: 24 }}>
                  {analytics?.summary.avgDurationFormatted || '0 Sek.'}
                </div>
                <div className="analytics-kpi-sub">
                  Durchschnitt pro Seitenaufruf
                </div>
              </div>

              <div className="analytics-kpi-card">
                <div className="analytics-kpi-label">
                  Haupt-Uhrzeit
                </div>
                <div className="analytics-kpi-value" style={{ fontSize: 22 }}>
                  {analytics?.summary.peakHour.label || '–'}
                </div>
                <div className="analytics-kpi-sub">
                  Spitze: {analytics?.summary.peakHour.views ?? 0} Aufrufe
                </div>
              </div>
            </div>

            {/* SECTION: 24h-Verteilung auf den Tag */}
            <div className="analytics-section-card">
              <div className="analytics-section-header">
                <div>
                  <h2 className="analytics-section-title">
                    Tagesverlauf (24-Stunden-Aktivität)
                  </h2>
                  <div className="analytics-section-subtitle">
                    Wann greifen Schüler:innen und Lehrpersonen auf die Lerninhalte zu?
                  </div>
                </div>
                {analytics?.summary.peakHour && (
                  <span style={{ fontSize: 13, background: 'var(--green-light)', color: 'var(--green-dark)', padding: '4px 10px', borderRadius: 6, fontWeight: 600, border: '1px solid var(--green-border)' }}>
                    Spitzenzeit: {analytics.summary.peakHour.label}
                  </span>
                )}
              </div>

              {/* 24-Hour Bar Chart */}
              <div className="analytics-chart-container">
                <div className="analytics-hourly-bars">
                  {(analytics?.hourly || []).map((h) => {
                    const heightPercent = maxHourlyViews > 0 ? (h.views / maxHourlyViews) * 100 : 0;
                    const isPeak = h.hour === analytics?.summary.peakHour.hour && h.views > 0;
                    return (
                      <div key={h.hour} className="analytics-bar-col">
                        <div className="analytics-bar-tooltip">
                          <strong>{h.label} Uhr</strong>: {h.views} {h.views === 1 ? 'Aufruf' : 'Aufrufe'} ({h.percentage}%)
                        </div>
                        <div
                          className={`analytics-bar ${isPeak ? 'is-peak' : ''}`}
                          style={{
                            height: `${Math.max(heightPercent, h.views > 0 ? 8 : 2)}%`,
                          }}
                        />
                        <span className="analytics-bar-label">{h.hour % 2 === 0 ? `${h.hour}h` : ''}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Day Segments Summary */}
              <div className="analytics-segments-grid">
                {(analytics?.daySegments || []).map((seg) => (
                  <div key={seg.name} className="analytics-segment-item">
                    <div className="analytics-segment-title">
                      <span>{seg.badge}</span>
                      <span style={{ fontSize: 11 }}>{seg.timeRange}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 4 }}>
                      <div className="analytics-segment-val">{seg.count}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)' }}>{seg.percentage}%</div>
                    </div>
                    <div className="analytics-dist-track" style={{ marginTop: 6, height: 5 }}>
                      <div className="analytics-dist-fill" style={{ width: `${seg.percentage}%`, background: 'var(--green-primary)' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2-Column Grid: Herkunft & Verweildauer */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24, marginBottom: 24 }}>
              {/* SECTION: Herkunft & Traffic-Quellen */}
              <div className="analytics-section-card" style={{ marginBottom: 0 }}>
                <div className="analytics-section-header">
                  <div>
                    <h2 className="analytics-section-title">
                      Herkunft &amp; Traffic-Quellen
                    </h2>
                    <div className="analytics-section-subtitle">
                      Traffic-Quellen &amp; verweisende Webseiten / Portale
                    </div>
                  </div>
                </div>

                <div className="analytics-dist-list">
                  {(analytics?.sources.categories || []).map((cat) => (
                    <div key={cat.key} className="analytics-dist-item">
                      <div className="analytics-dist-header">
                        <span>{cat.label}</span>
                        <span>
                          <strong>{cat.count}</strong> ({cat.percentage}%)
                        </span>
                      </div>
                      <div className="analytics-dist-track">
                        <div
                          className="analytics-dist-fill"
                          style={{
                            width: `${cat.percentage}%`,
                            background:
                              cat.key === 'education'
                                ? '#2e6b0e'
                                : cat.key === 'search'
                                ? 'var(--green-primary)'
                                : cat.key === 'social'
                                ? '#805ad5'
                                : cat.key === 'direct'
                                ? '#3182ce'
                                : '#a0aec0',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Top Referrers List */}
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green-dark)', marginBottom: 10 }}>
                    Top Referrer-Domains
                  </div>
                  {analytics?.sources.topReferrers && analytics.sources.topReferrers.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {analytics.sources.topReferrers.map((ref) => (
                        <div
                          key={ref.host}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: 13,
                            padding: '4px 8px',
                            background: 'var(--bg-body)',
                            borderRadius: 4,
                          }}
                        >
                          <span style={{ fontWeight: 600, color: 'var(--text-color)' }}>{ref.host}</span>
                          <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                            {ref.count} Aufrufe ({ref.percentage}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Noch keine externen Referrer erfasst.</p>
                  )}
                </div>
              </div>

              {/* SECTION: Verweildauer-Analyse */}
              <div className="analytics-section-card" style={{ marginBottom: 0 }}>
                <div className="analytics-section-header">
                  <div>
                    <h2 className="analytics-section-title">
                      Verweildauer auf der Website
                    </h2>
                    <div className="analytics-section-subtitle">
                      Wie lange beschäftigen sich Besucher mit den Inhalten?
                    </div>
                  </div>
                </div>

                <div className="analytics-dist-list">
                  {(analytics?.durations.buckets || []).map((b, i) => (
                    <div key={b.key} className="analytics-dist-item">
                      <div className="analytics-dist-header">
                        <span>{b.label}</span>
                        <span>
                          <strong>{b.count}</strong> ({b.percentage}%)
                        </span>
                      </div>
                      <div className="analytics-dist-track">
                        <div
                          className="analytics-dist-fill"
                          style={{
                            width: `${b.percentage}%`,
                            background:
                              i >= 3
                                ? 'var(--green-dark)'
                                : i >= 1
                                ? 'var(--green-primary)'
                                : '#cbd5e1',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Device Breakdown */}
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green-dark)', marginBottom: 10 }}>
                    Verwendete Endgeräte
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {(analytics?.devices || []).map((dev) => (
                      <div
                        key={dev.device}
                        style={{
                          background: 'var(--bg-body)',
                          border: '1px solid var(--border-light)',
                          borderRadius: 6,
                          padding: '8px 10px',
                          textAlign: 'center',
                        }}
                      >
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>{dev.label}</div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--green-dark)' }}>{dev.percentage}%</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{dev.count} Aufrufe</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION: Aufrufe nach Seiten (Top-Inhalte) */}
            <div className="analytics-section-card">
              <div className="analytics-section-header">
                <div>
                  <h2 className="analytics-section-title">
                    Aufrufe nach Seiten (Top-Inhalte)
                  </h2>
                  <div className="analytics-section-subtitle">
                    Beliebteste Themen, Karten und Quiz-Module der Plattform
                  </div>
                </div>
                <div style={{ minWidth: 220 }}>
                  <input
                    type="text"
                    placeholder="Seiten filtern..."
                    value={pageSearch}
                    onChange={(e) => setPageSearch(e.target.value)}
                    style={{
                      padding: '6px 12px',
                      fontSize: 13,
                      border: '1px solid var(--border-light)',
                      borderRadius: 6,
                      background: 'var(--bg-body)',
                      width: '100%',
                    }}
                  />
                </div>
              </div>

              <div className="analytics-table-wrapper">
                {filteredPages.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', padding: '16px 0' }}>
                    {analytics?.summary.totalViews === 0
                      ? 'Noch keine Seitenaufrufe im ausgewählten Zeitraum erfasst.'
                      : 'Keine passenden Seiten gefunden.'}
                  </p>
                ) : (
                  <table className="analytics-table">
                    <thead>
                      <tr>
                        <th style={{ width: 44 }}>Rang</th>
                        <th>Seite / Pfad</th>
                        <th style={{ width: 140 }}>Aufrufe</th>
                        <th style={{ width: 100 }}>Besucher</th>
                        <th style={{ width: 130 }}>Ø Verweildauer</th>
                        <th style={{ width: 80, textAlign: 'right' }}>Anteil</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPages.map((page, index) => {
                        const barWidth = maxPageViews > 0 ? (page.views / maxPageViews) * 100 : 0;
                        return (
                          <tr key={page.path}>
                            <td>
                              <span className={`analytics-rank ${index === 0 ? 'top-1' : index === 1 ? 'top-2' : index === 2 ? 'top-3' : ''}`}>
                                {index + 1}
                              </span>
                            </td>
                            <td>
                              <div style={{ fontWeight: 600, color: 'var(--green-dark)' }}>
                                {page.name}
                              </div>
                              <Link
                                href={page.path}
                                target="_blank"
                                style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                              >
                                <span>{page.path}</span>
                                <ExternalLink style={{ width: 11, height: 11 }} />
                              </Link>
                            </td>
                            <td>
                              <div style={{ fontWeight: 700 }}>{page.views.toLocaleString('de-AT')}</div>
                              <div className="analytics-bar-inline" style={{ width: `${Math.max(barWidth, 4)}%` }} />
                            </td>
                            <td style={{ color: 'var(--text-muted)' }}>
                              {page.uniqueVisitors.toLocaleString('de-AT')}
                            </td>
                            <td>
                              <span style={{ fontSize: 13, background: 'var(--bg-body)', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border-light)' }}>
                                {page.avgDurationFormatted}
                              </span>
                            </td>
                            <td style={{ textAlign: 'right', fontWeight: 600 }}>
                              {page.percentage}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: BENUTZER & KLASSEN (Lehrpersonen & Klassen-Verwaltung)              */}
        {/* ========================================================================= */}
        {activeTab === 'users' && (
          <div>
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
