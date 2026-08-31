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
  BookOpen, 
  KeyRound, 
  Download, 
  Copy, 
  Check, 
  Trash2, 
  Edit3, 
  Plus, 
  Filter
} from 'lucide-react';

interface Student {
  id: string;
  code: string;
  className: string;
}

interface ProgressEntry {
  studentId: string;
  h5pId: string;
  h5pTitle: string;
  score: number;
  updatedAt: string;
}

function downloadBlob(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function DashboardPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [students, setStudents] = useState<Student[]>([]);
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [count, setCount] = useState<number>(20);
  const [classNameInput, setClassNameInput] = useState<string>('');
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [addLoading, setAddLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [teacherEmail, setTeacherEmail] = useState('');

  // Password change modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Rename class state
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameTargetClass, setRenameTargetClass] = useState('');
  const [newClassNameInput, setNewClassNameInput] = useState('');
  const [renameLoading, setRenameLoading] = useState(false);
  const [renameError, setRenameError] = useState('');

  // Assignment state
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [assignmentTargetClass, setAssignmentTargetClass] = useState('');
  const [selectedH5pIds, setSelectedH5pIds] = useState<Set<string>>(new Set());
  const [catalog, setCatalog] = useState<{ id: string; title: string; subject: string; subjectSlug: string; topicTitle: string; topicSlug: string; url: string }[]>([]);
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [assignmentSearch, setAssignmentSearch] = useState('');
  const [assignmentSaving, setAssignmentSaving] = useState(false);
  const [assignmentsByClass, setAssignmentsByClass] = useState<Record<string, string[]>>({});

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

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [studentsRes, progressRes] = await Promise.all([
        fetch('/api/teacher/students'),
        fetch('/api/teacher/progress'),
      ]);
      const studentsData = await studentsRes.json();
      const progressData = await progressRes.json();
      const loadedStudents: Student[] = studentsData.students || [];
      setStudents(loadedStudents);
      setProgress(progressData.progress || []);

      // Load assignments for all classes
      const distinctClasses = Array.from(new Set(loadedStudents.map((s) => s.className || 'Ohne Klasse')));
      const assignMap: Record<string, string[]> = {};
      await Promise.all(
        distinctClasses.map(async (cls) => {
          try {
            const res = await fetch(`/api/teacher/assignments?className=${encodeURIComponent(cls)}`);
            const d = await res.json();
            assignMap[cls] = d.h5pIds || [];
          } catch {
            assignMap[cls] = [];
          }
        })
      );
      setAssignmentsByClass(assignMap);
    } catch {
      setError(t.loginNetworkError);
    } finally {
      setLoading(false);
    }
  }, [t.loginNetworkError]);

  // Check auth and load data
  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => {
        if (!data.user || data.user.role !== 'teacher') {
          router.replace('/');
        } else {
          setTeacherEmail(data.user.email || '');
          loadData();
        }
      })
      .catch(() => router.replace('/'));
  }, [router, loadData]);

  // Load catalog eagerly or when needed
  const ensureCatalog = async () => {
    if (catalog.length > 0) return catalog;
    setCatalogLoading(true);
    try {
      const res = await fetch('/api/modules?limit=500');
      const data = await res.json();
      if (data.items) {
        const cat = data.items.map((item: any) => ({
          id: item.slug || item.id,
          title: item.title?.de || item.title?.en || item.slug,
          subject: 'Allgemein',
          subjectSlug: 'allgemein',
          topicTitle: item.library_title || 'Übung',
          topicSlug: item.slug,
          url: `/${item.slug}`,
        }));
        setCatalog(cat);
        return cat;
      }
    } catch {
      // ignore
    } finally {
      setCatalogLoading(false);
    }
    return [];
  };

  const handleAddStudents = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setAddLoading(true);
    try {
      const res = await fetch('/api/teacher/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count, className: classNameInput }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t.loginErrorDefault);
      } else {
        const msg = t.accountsCreatedSuccess
          .replace('{count}', String(data.count))
          .replace('{className}', String(data.className));
        setSuccessMsg(msg);
        setClassNameInput('');
        loadData();
      }
    } catch {
      setError(t.loginNetworkError);
    } finally {
      setAddLoading(false);
    }
  };

  const handleDeleteStudent = (student: Student) => {
    const confirmMessage = t.deleteStudentConfirm
      .replace('{code}', student.code)
      .replace('{className}', student.className);

    setConfirmModal({
      isOpen: true,
      title: t.deleteStudentTitle,
      message: <span>{confirmMessage}</span>,
      confirmLabel: t.btnDeleteClass,
      loading: false,
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, loading: true }));
        try {
          const res = await fetch(`/api/teacher/students/${student.id}`, { method: 'DELETE' });
          if (res.ok) {
            setConfirmModal((prev) => ({ ...prev, isOpen: false }));
            loadData();
          }
        } finally {
          setConfirmModal((prev) => ({ ...prev, loading: false }));
        }
      },
    });
  };

  const handleDeleteClass = (className: string) => {
    const classCount = students.filter((s) => s.className === className).length;
    const confirmMessage = t.deleteClassConfirm
      .replace('{className}', className)
      .replace('{count}', String(classCount));

    setConfirmModal({
      isOpen: true,
      title: t.deleteClassTitle.replace('{className}', className),
      message: <span>{confirmMessage}</span>,
      confirmLabel: t.btnDeleteClass,
      loading: false,
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, loading: true }));
        try {
          const res = await fetch('/api/teacher/classes', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ className }),
          });
          if (res.ok) {
            setConfirmModal((prev) => ({ ...prev, isOpen: false }));
            if (selectedClassFilter === className) setSelectedClassFilter('all');
            loadData();
          }
        } finally {
          setConfirmModal((prev) => ({ ...prev, loading: false }));
        }
      },
    });
  };

  const handleOpenRename = (className: string) => {
    setRenameTargetClass(className);
    setNewClassNameInput(className === 'Ohne Klasse' ? '' : className);
    setRenameError('');
    setShowRenameModal(true);
  };

  const handleRenameClassSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRenameError('');
    setRenameLoading(true);
    try {
      const res = await fetch('/api/teacher/classes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          oldClassName: renameTargetClass,
          newClassName: newClassNameInput,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setRenameError(data.error || t.loginErrorDefault);
      } else {
        setShowRenameModal(false);
        if (selectedClassFilter === renameTargetClass) {
          setSelectedClassFilter(data.newClassName);
        }
        loadData();
      }
    } catch {
      setRenameError(t.loginNetworkError);
    } finally {
      setRenameLoading(false);
    }
  };

  const handleOpenAssignments = async (className: string) => {
    setAssignmentTargetClass(className);
    await ensureCatalog();
    const existing = assignmentsByClass[className] || [];
    setSelectedH5pIds(new Set(existing));
    setShowAssignmentModal(true);
  };

  const handleSaveAssignments = async () => {
    setAssignmentSaving(true);
    try {
      const res = await fetch('/api/teacher/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          className: assignmentTargetClass,
          h5pIds: Array.from(selectedH5pIds),
        }),
      });
      if (res.ok) {
        setAssignmentsByClass((prev) => ({
          ...prev,
          [assignmentTargetClass]: Array.from(selectedH5pIds),
        }));
        setShowAssignmentModal(false);
      }
    } finally {
      setAssignmentSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    if (newPassword !== confirmNewPassword) {
      setPasswordError(t.passwordMismatchError);
      return;
    }
    setPasswordLoading(true);
    try {
      const res = await fetch('/api/teacher/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPasswordError(data.error || t.loginErrorDefault);
      } else {
        setShowPasswordModal(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setSuccessMsg(t.passwordChangedSuccess);
      }
    } catch {
      setPasswordError(t.loginNetworkError);
    } finally {
      setPasswordLoading(false);
    }
  };

  const distinctClasses = Array.from(new Set(students.map((s) => s.className || 'Ohne Klasse'))).sort();
  const filteredStudents = selectedClassFilter === 'all'
    ? students
    : students.filter((s) => s.className === selectedClassFilter);

  const progressByStudent = new Map<string, ProgressEntry[]>();
  for (const p of progress) {
    const list = progressByStudent.get(p.studentId) || [];
    list.push(p);
    progressByStudent.set(p.studentId, list);
  }

  const handleCopyCodes = () => {
    const text = filteredStudents.map((s) => `${s.code} (${t.classItemLabel} ${s.className})`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    const csvContent = `${t.thStudentCode},${t.thClass}\n` + filteredStudents.map((s) => `${s.code},"${s.className}"`).join('\n');
    downloadBlob(csvContent, `atw_schueler_codes_${selectedClassFilter}.csv`, 'text/csv;charset=utf-8;');
  };

  const localeStr = language === 'en' ? 'en-US' : language === 'fr' ? 'fr-FR' : language === 'es' ? 'es-ES' : language === 'it' ? 'it-IT' : 'de-DE';

  return (
    <SiteLayout>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '30px 20px' }}>
        
        {/* Header Title Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 24, borderBottom: '1px solid var(--border-light, #e2e8f0)', paddingBottom: 16 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--green-dark, #0f766e)', margin: '0 0 4px 0' }}>
              {t.teacherDashboardTitle}
            </h1>
            <p style={{ fontSize: 13, color: 'var(--text-muted, #64748b)', margin: 0 }}>
              {t.loggedInAs} <strong>{teacherEmail}</strong>
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              type="button"
              onClick={() => setShowPasswordModal(true)}
              className="admin-action-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', fontSize: 13 }}
            >
              <KeyRound style={{ width: 14, height: 14 }} />
              <span>{t.btnChangePassword}</span>
            </button>
          </div>
        </div>

        {/* Status Alerts */}
        {error && (
          <div style={{ background: '#fee2e2', border: '1px solid #f87171', color: '#b91c1c', padding: '10px 16px', borderRadius: 6, marginBottom: 20, fontSize: 13.5 }}>
            {error}
          </div>
        )}
        {successMsg && (
          <div style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#166534', padding: '10px 16px', borderRadius: 6, marginBottom: 20, fontSize: 13.5, display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle2 style={{ width: 16, height: 16 }} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
          <div className="h5p-player-card" style={{ margin: 0, padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: 8, background: 'var(--green-light, #e6f4f1)', color: 'var(--green-dark, #0f766e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users style={{ width: 22, height: 22 }} />
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--green-dark, #0f766e)' }}>{students.length}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted, #64748b)' }}>{t.totalStudentsCard}</div>
              </div>
            </div>
          </div>

          <div className="h5p-player-card" style={{ margin: 0, padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: 8, background: '#ede9fe', color: '#6d28d9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GraduationCap style={{ width: 22, height: 22 }} />
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#6d28d9' }}>{distinctClasses.length}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted, #64748b)' }}>{t.totalClassesCard}</div>
              </div>
            </div>
          </div>

          <div className="h5p-player-card" style={{ margin: 0, padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: 8, background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 style={{ width: 22, height: 22 }} />
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#15803d' }}>{progress.length}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted, #64748b)' }}>{t.totalSolvedTasksCard}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Create Students Form */}
        <div className="h5p-player-card" style={{ marginBottom: 28, padding: 22 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--green-dark, #0f766e)', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Plus style={{ width: 18, height: 18 }} />
            <span>{t.createStudentsTitle}</span>
          </h2>
          <form onSubmit={handleAddStudents} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ flex: '1 1 200px' }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-color, #1e293b)', marginBottom: 6 }}>
                {t.classNameLabel}
              </label>
              <input
                type="text"
                value={classNameInput}
                onChange={(e) => setClassNameInput(e.target.value)}
                required
                placeholder={t.classNamePlaceholder}
                style={{ width: '100%', padding: '8px 12px', fontSize: 13, border: '1px solid var(--border-light, #e2e8f0)', borderRadius: 6 }}
              />
            </div>

            <div style={{ width: 140 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-color, #1e293b)', marginBottom: 6 }}>
                {t.countCodesLabel}
              </label>
              <select
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value, 10))}
                style={{ width: '100%', padding: '8px 12px', fontSize: 13, border: '1px solid var(--border-light, #e2e8f0)', borderRadius: 6, background: '#fff' }}
              >
                <option value={5}>5 {t.studentsCountLabel}</option>
                <option value={10}>10 {t.studentsCountLabel}</option>
                <option value={15}>15 {t.studentsCountLabel}</option>
                <option value={20}>20 {t.studentsCountLabel}</option>
                <option value={25}>25 {t.studentsCountLabel}</option>
                <option value={30}>30 {t.studentsCountLabel}</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={addLoading}
              className="dashboard-add-btn"
              style={{
                padding: '9px 18px',
                fontSize: 13,
                fontWeight: 600,
                background: 'var(--green-primary, #0f766e)',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
              }}
            >
              {addLoading ? t.btnCreating : t.btnCreateAccounts}
            </button>
          </form>
        </div>

        {/* Section: Classes Management & Assignments */}
        {distinctClasses.length > 0 && (
          <div className="h5p-player-card" style={{ marginBottom: 28, padding: 22 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--green-dark, #0f766e)', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
              <BookOpen style={{ width: 18, height: 18 }} />
              <span>{t.classManagementTitle}</span>
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
              {distinctClasses.map((cls) => {
                const countInClass = students.filter((s) => s.className === cls).length;
                const assignedExercises = assignmentsByClass[cls] || [];
                const assignBtnLabel = t.btnAssignTasksForClass.replace('{className}', cls);

                return (
                  <div
                    key={cls}
                    style={{
                      border: '1px solid var(--border-light, #e2e8f0)',
                      borderRadius: 6,
                      padding: '14px 16px',
                      background: 'var(--bg-body, #f8fafc)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <div>
                        <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--green-dark, #0f766e)', margin: 0 }}>
                          {t.classItemLabel} {cls}
                        </h3>
                        <span style={{ fontSize: 12, color: 'var(--text-muted, #64748b)' }}>
                          {countInClass} {t.studentsCount}
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          type="button"
                          onClick={() => handleOpenRename(cls)}
                          className="admin-action-btn"
                          style={{ padding: '4px 8px', fontSize: 11 }}
                          title={t.btnRenameClass}
                        >
                          <Edit3 style={{ width: 12, height: 12 }} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteClass(cls)}
                          className="admin-action-btn"
                          style={{ padding: '4px 8px', fontSize: 11, color: '#dc2626' }}
                          title={t.btnDeleteClass}
                        >
                          <Trash2 style={{ width: 12, height: 12 }} />
                        </button>
                      </div>
                    </div>

                    <div style={{ fontSize: 12, color: 'var(--text-color, #1e293b)', marginBottom: 12 }}>
                      {t.assignedTasksCount} <strong>{assignedExercises.length}</strong>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenAssignments(cls)}
                      className="admin-action-btn"
                      style={{
                        width: '100%',
                        padding: '6px 12px',
                        fontSize: 12.5,
                        fontWeight: 600,
                        justifyContent: 'center',
                        color: 'var(--green-dark, #0f766e)',
                        borderColor: 'var(--green-border, #a7f3d0)',
                        background: '#fff',
                      }}
                    >
                      {assignBtnLabel}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Section: Student List & Progress Table */}
        <div className="h5p-player-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--green-dark, #0f766e)', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Users style={{ width: 18, height: 18 }} />
              <span>{t.studentsAndResultsTitle}</span>
            </h2>

            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              {/* Filter */}
              {distinctClasses.length > 1 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                  <Filter style={{ width: 14, height: 14, color: 'var(--text-muted, #64748b)' }} />
                  <select
                    value={selectedClassFilter}
                    onChange={(e) => setSelectedClassFilter(e.target.value)}
                    style={{ padding: '5px 10px', fontSize: 12.5, border: '1px solid var(--border-light, #e2e8f0)', borderRadius: 4, background: '#fff' }}
                  >
                    <option value="all">{t.allClassesOption} ({students.length})</option>
                    {distinctClasses.map((cls) => (
                      <option key={cls} value={cls}>
                        {t.classItemLabel} {cls} ({students.filter((s) => s.className === cls).length})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                type="button"
                onClick={handleCopyCodes}
                className="admin-action-btn"
                style={{ padding: '6px 12px', fontSize: 12 }}
                title={t.btnCopyCodes}
              >
                {copied ? <Check style={{ width: 13, height: 13 }} /> : <Copy style={{ width: 13, height: 13 }} />}
                <span>{copied ? t.copiedNotice : t.btnCopyCodes}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadCSV}
                className="admin-action-btn"
                style={{ padding: '6px 12px', fontSize: 12 }}
                title={t.btnDownloadCSV}
              >
                <Download style={{ width: 13, height: 13 }} />
                <span>{t.btnDownloadCSV}</span>
              </button>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <p style={{ color: 'var(--text-muted, #64748b)', padding: '20px 0', textAlign: 'center' }}>{t.loading}</p>
          ) : filteredStudents.length === 0 ? (
            <p style={{ color: 'var(--text-muted, #64748b)', padding: '20px 0', textAlign: 'center' }}>
              {t.noStudentsInFilter}
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-light, #e2e8f0)', textAlign: 'left' }}>
                    <th style={{ padding: '10px 12px', color: 'var(--text-muted, #64748b)', fontWeight: 600 }}>{t.thNumber}</th>
                    <th style={{ padding: '10px 12px', color: 'var(--text-muted, #64748b)', fontWeight: 600 }}>{t.thStudentCode}</th>
                    <th style={{ padding: '10px 12px', color: 'var(--text-muted, #64748b)', fontWeight: 600 }}>{t.thClass}</th>
                    <th style={{ padding: '10px 12px', color: 'var(--text-muted, #64748b)', fontWeight: 600 }}>{t.thSolvedTasks}</th>
                    <th style={{ padding: '10px 12px', color: 'var(--text-muted, #64748b)', fontWeight: 600 }}>{t.thLastActive}</th>
                    <th style={{ padding: '10px 12px', color: 'var(--text-muted, #64748b)', fontWeight: 600, textAlign: 'right' }}>{t.thActions}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((s, idx) => {
                    const studentProgress = progressByStudent.get(s.id) || [];
                    const lastActive = studentProgress.length > 0
                      ? new Date(studentProgress[0].updatedAt).toLocaleDateString(localeStr, { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                      : '–';

                    return (
                      <tr key={s.id} style={{ borderBottom: '1px solid var(--border-light, #e2e8f0)' }}>
                        <td style={{ padding: '10px 12px', color: 'var(--text-muted, #64748b)' }}>{idx + 1}</td>
                        <td style={{ padding: '10px 12px' }}>
                          <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 14, color: 'var(--green-dark, #0f766e)', background: 'var(--green-light, #e6f4f1)', padding: '2px 8px', borderRadius: 4 }}>
                            {s.code}
                          </span>
                        </td>
                        <td style={{ padding: '10px 12px', fontWeight: 600 }}>{s.className}</td>
                        <td style={{ padding: '10px 12px' }}>
                          {studentProgress.length > 0 ? (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#15803d', fontWeight: 600 }}>
                              <CheckCircle2 style={{ width: 14, height: 14 }} />
                              {studentProgress.length} {t.scoreCompleted}
                            </span>
                          ) : (
                            <span style={{ color: 'var(--text-muted, #64748b)' }}>{t.noExercisesSolvedYet}</span>
                          )}
                        </td>
                        <td style={{ padding: '10px 12px', color: 'var(--text-muted, #64748b)' }}>{lastActive}</td>
                        <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                          <button
                            type="button"
                            onClick={() => handleDeleteStudent(s)}
                            className="admin-action-btn"
                            style={{ padding: '4px 8px', fontSize: 11, color: '#dc2626' }}
                            title={t.deleteStudentTitle}
                          >
                            <Trash2 style={{ width: 12, height: 12 }} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal: Assignments */}
        {showAssignmentModal && (
          <div className="login-modal-overlay" onClick={() => setShowAssignmentModal(false)} style={{ zIndex: 9999 }}>
            <div className="login-modal" style={{ maxWidth: 640 }} onClick={(e) => e.stopPropagation()}>
              <button className="login-modal-close" onClick={() => setShowAssignmentModal(false)}>&times;</button>
              <div className="login-modal-body" style={{ padding: '24px 22px' }}>
                <h2 className="login-modal-title" style={{ fontSize: 18, marginBottom: 4 }}>
                  {t.btnAssignTasksForClass.replace('{className}', assignmentTargetClass)}
                </h2>
                <p className="login-modal-subtitle" style={{ fontSize: 13, marginBottom: 16 }}>
                  {t.selectClassesPrompt}
                </p>

                {/* Search & Selection */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                  <input
                    type="text"
                    placeholder={t.searchExercisePlaceholder}
                    value={assignmentSearch}
                    onChange={(e) => setAssignmentSearch(e.target.value)}
                    style={{ flex: 1, padding: '7px 12px', fontSize: 13, border: '1px solid var(--border-light, #e2e8f0)', borderRadius: 6 }}
                  />
                  <button
                    type="button"
                    className="admin-action-btn"
                    style={{ fontSize: 12, padding: '6px 10px' }}
                    onClick={() => setSelectedH5pIds(new Set(catalog.map((c) => c.id)))}
                  >
                    {t.selectAll}
                  </button>
                  <button
                    type="button"
                    className="admin-action-btn"
                    style={{ fontSize: 12, padding: '6px 10px' }}
                    onClick={() => setSelectedH5pIds(new Set())}
                  >
                    {t.selectNone}
                  </button>
                </div>

                <div style={{ maxHeight: 320, overflowY: 'auto', border: '1px solid var(--border-light, #e2e8f0)', borderRadius: 6, padding: 8, display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16 }}>
                  {catalog
                    .filter((c) => !assignmentSearch || c.title.toLowerCase().includes(assignmentSearch.toLowerCase()))
                    .map((item) => {
                      const isChecked = selectedH5pIds.has(item.id);
                      return (
                        <label
                          key={item.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '6px 10px',
                            borderRadius: 4,
                            background: isChecked ? '#f0fdf4' : 'transparent',
                            cursor: 'pointer',
                            fontSize: 13,
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              const next = new Set(selectedH5pIds);
                              if (e.target.checked) next.add(item.id);
                              else next.delete(item.id);
                              setSelectedH5pIds(next);
                            }}
                          />
                          <span style={{ fontWeight: isChecked ? 600 : 400, color: isChecked ? 'var(--green-dark, #0f766e)' : 'inherit' }}>
                            {item.title}
                          </span>
                        </label>
                      );
                    })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted, #64748b)' }}>
                    {t.selectedCountLabel.replace('{count}', String(selectedH5pIds.size))}
                  </span>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button
                      type="button"
                      className="admin-action-btn"
                      onClick={() => setShowAssignmentModal(false)}
                      disabled={assignmentSaving}
                    >
                      {t.btnCancel}
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveAssignments}
                      disabled={assignmentSaving}
                      className="dashboard-add-btn"
                      style={{ padding: '7px 16px', fontSize: 13, background: 'var(--green-primary, #0f766e)', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer' }}
                    >
                      {assignmentSaving ? t.btnSaving : t.btnSaveAssignment}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Rename Class */}
        {showRenameModal && (
          <div className="login-modal-overlay" onClick={() => setShowRenameModal(false)} style={{ zIndex: 9999 }}>
            <div className="login-modal" style={{ maxWidth: 440 }} onClick={(e) => e.stopPropagation()}>
              <button className="login-modal-close" onClick={() => setShowRenameModal(false)}>&times;</button>
              <div className="login-modal-body" style={{ padding: '24px 22px' }}>
                <h2 className="login-modal-title" style={{ fontSize: 18, marginBottom: 8 }}>
                  {t.renameClassTitle}
                </h2>
                <form onSubmit={handleRenameClassSubmit}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>
                    {t.newClassNameLabel}
                  </label>
                  <input
                    type="text"
                    value={newClassNameInput}
                    onChange={(e) => setNewClassNameInput(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px 12px', fontSize: 13, border: '1px solid var(--border-light, #e2e8f0)', borderRadius: 6, marginBottom: 14 }}
                  />
                  {renameError && <p style={{ color: '#dc2626', fontSize: 12, marginBottom: 12 }}>{renameError}</p>}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                    <button type="button" className="admin-action-btn" onClick={() => setShowRenameModal(false)}>
                      {t.btnCancel}
                    </button>
                    <button type="submit" disabled={renameLoading} className="dashboard-add-btn" style={{ padding: '7px 16px', fontSize: 13, background: 'var(--green-primary, #0f766e)', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer' }}>
                      {renameLoading ? t.btnSaving : t.btnRenameSubmit}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Password Change */}
        {showPasswordModal && (
          <div className="login-modal-overlay" onClick={() => setShowPasswordModal(false)} style={{ zIndex: 9999 }}>
            <div className="login-modal" style={{ maxWidth: 440 }} onClick={(e) => e.stopPropagation()}>
              <button className="login-modal-close" onClick={() => setShowPasswordModal(false)}>&times;</button>
              <div className="login-modal-body" style={{ padding: '24px 22px' }}>
                <h2 className="login-modal-title" style={{ fontSize: 18, marginBottom: 8 }}>
                  {t.passwordModalTitle}
                </h2>
                <form onSubmit={handlePasswordChange}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
                    {t.currentPasswordLabel}
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px 12px', fontSize: 13, border: '1px solid var(--border-light, #e2e8f0)', borderRadius: 6, marginBottom: 12 }}
                  />
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
                    {t.newPasswordLabel}
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                    style={{ width: '100%', padding: '8px 12px', fontSize: 13, border: '1px solid var(--border-light, #e2e8f0)', borderRadius: 6, marginBottom: 12 }}
                  />
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
                    {t.confirmNewPasswordLabel}
                  </label>
                  <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px 12px', fontSize: 13, border: '1px solid var(--border-light, #e2e8f0)', borderRadius: 6, marginBottom: 14 }}
                  />
                  {passwordError && <p style={{ color: '#dc2626', fontSize: 12, marginBottom: 12 }}>{passwordError}</p>}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                    <button type="button" className="admin-action-btn" onClick={() => setShowPasswordModal(false)}>
                      {t.btnCancel}
                    </button>
                    <button type="submit" disabled={passwordLoading} className="dashboard-add-btn" style={{ padding: '7px 16px', fontSize: 13, background: 'var(--green-primary, #0f766e)', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer' }}>
                      {passwordLoading ? t.btnSaving : t.btnChangePassword}
                    </button>
                  </div>
                </form>
              </div>
            </div>
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
