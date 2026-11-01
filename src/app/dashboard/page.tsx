'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { SiteLayout } from '@/components/SiteLayout';
import ConfirmModal from '@/components/ConfirmModal';

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

function DashboardPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [students, setStudents] = useState<Student[]>([]);
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [count, setCount] = useState<number>(20);
  const [classNameInput, setClassNameInput] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [addLoading, setAddLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
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

  // Assignments count per class
  const [assignmentsByClass, setAssignmentsByClass] = useState<Record<string, string[]>>({});

  // Team-Teaching / Klasse teilen state
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareTargetClass, setShareTargetClass] = useState('');
  const [shareEmailInput, setShareEmailInput] = useState('');
  const [shareLoading, setShareLoading] = useState(false);
  const [shareError, setShareError] = useState('');
  const [shareList, setShareList] = useState<{ email: string }[]>([]);
  const [shareOwnerEmail, setShareOwnerEmail] = useState('');
  const [sharedClassesMap, setSharedClassesMap] = useState<Record<string, string[]>>({});
  const [sharedWithMeMap, setSharedWithMeMap] = useState<Record<string, string>>({});

  // Inline student addition for specific class card
  const [inlineAddClass, setInlineAddClass] = useState<string | null>(null);

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

  // Check auth & query param for password modal
  useEffect(() => {
    if (searchParams.get('password') === '1') {
      setShowPasswordModal(true);
    }
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => {
        if (!data.user || data.user.role !== 'teacher') {
          router.replace('/');
        } else {
          setTeacherEmail(data.user.email || '');
        }
      })
      .catch(() => router.replace('/'));
  }, [router, searchParams]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [studentsRes, progressRes, sharesRes] = await Promise.all([
        fetch('/api/teacher/students'),
        fetch('/api/teacher/progress'),
        fetch('/api/teacher/classes/share'),
      ]);
      const studentsData = await studentsRes.json();
      const progressData = await progressRes.json();
      const sharesData = await sharesRes.json().catch(() => ({}));
      const loadedStudents: Student[] = studentsData.students || [];
      setStudents(loadedStudents);
      setProgress(progressData.progress || []);

      const myMap: Record<string, string[]> = {};
      for (const s of sharesData.myShares || []) {
        myMap[s.className] = [...(myMap[s.className] || []), s.email];
      }
      setSharedClassesMap(myMap);

      const withMeMap: Record<string, string> = {};
      for (const s of sharesData.sharedWithMe || []) {
        withMeMap[s.className] = s.ownerEmail || 'Team-Teaching';
      }
      setSharedWithMeMap(withMeMap);

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
      setError('Fehler beim Laden der Daten.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const openShareModal = async (targetClass: string) => {
    setShareTargetClass(targetClass);
    setShareEmailInput('');
    setShareError('');
    setShareList([]);
    setShareOwnerEmail('');
    setShowShareModal(true);
    try {
      const res = await fetch(`/api/teacher/classes/share?className=${encodeURIComponent(targetClass)}`);
      const data = await res.json();
      setShareList(data.sharedWith || []);
      setShareOwnerEmail(data.ownerEmail || '');
    } catch {
      setShareError('Fehler beim Laden der Team-Teacher.');
    }
  };

  const handleAddShare = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = shareEmailInput.trim().toLowerCase();
    if (!email) return;
    setShareLoading(true);
    setShareError('');
    try {
      const res = await fetch('/api/teacher/classes/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ className: shareTargetClass, email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setShareError(data.error || 'Fehler beim Teilen der Klasse.');
      } else {
        setShareEmailInput('');
        setShareList((prev) => (prev.some((x) => x.email === email) ? prev : [...prev, { email }]));
        setSuccessMsg(`Klasse „${shareTargetClass}“ mit ${email} geteilt.`);
        setTimeout(() => setSuccessMsg(''), 4000);
        await loadData();
      }
    } catch {
      setShareError('Netzwerkfehler.');
    } finally {
      setShareLoading(false);
    }
  };

  const handleRemoveShare = async (email: string) => {
    setShareLoading(true);
    setShareError('');
    try {
      const res = await fetch('/api/teacher/classes/share', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ className: shareTargetClass, email }),
      });
      if (res.ok) {
        setShareList((prev) => prev.filter((x) => x.email !== email));
        await loadData();
      }
    } finally {
      setShareLoading(false);
    }
  };

  // Collect distinct existing classes
  const existingClasses = Array.from(
    new Set(students.map((s) => s.className || 'Ohne Klasse'))
  ).sort();

  const focusAddForm = (cls: string) => {
    setClassNameInput(cls);
    document.getElementById('add-students-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => document.getElementById('student-class')?.focus(), 400);
  };

  const handleAddStudents = async (e: React.FormEvent) => {
    e.preventDefault();
    await addStudentsToClass(classNameInput.trim() || 'Klasse 1');
  };

  const addStudentsToClass = async (targetClass: string) => {
    const finalCount = Math.min(30, Math.max(1, count));

    setAddLoading(true);
    setError('');
    try {
      const res = await fetch('/api/teacher/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: finalCount, className: targetClass }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Fehler beim Anlegen.');
      } else {
        setSuccessMsg(`${finalCount} Schüleraccounts für „${targetClass}“ erfolgreich angelegt.`);
        setTimeout(() => setSuccessMsg(''), 4000);
        setClassNameInput('');
        await loadData();
      }
    } catch {
      setError('Netzwerkfehler.');
    } finally {
      setAddLoading(false);
    }
  };

  const promptDeleteClass = (className: string) => {
    setError('');
    const classStudents = students.filter((s) => (s.className || 'Ohne Klasse') === className);
    const countInClass = classStudents.length;

    setConfirmModal({
      isOpen: true,
      title: `Klasse „${className}“ löschen?`,
      message: (
        <>
          Möchtest du die gesamte Klasse <strong>„{className}“</strong> mit allen <strong>{countInClass}</strong> Schüleraccounts und deren Fortschrittsdaten wirklich unwiderruflich löschen?
        </>
      ),
      confirmLabel: 'Ganze Klasse löschen',
      loading: false,
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, loading: true }));
        try {
          const res = await fetch('/api/teacher/classes', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ className }),
          });
          const data = await res.json();
          if (!res.ok) {
            setError(data.error || 'Fehler beim Löschen der Klasse.');
          } else {
            setSuccessMsg(`Klasse „${className}“ mit ${data.deletedCount || countInClass} Schüleraccounts wurde gelöscht.`);
            setTimeout(() => setSuccessMsg(''), 4000);
            await loadData();
          }
        } catch {
          setError('Fehler beim Löschen der Klasse.');
        } finally {
          setConfirmModal((prev) => ({ ...prev, isOpen: false, loading: false }));
        }
      },
    });
  };

  const openRenameModal = (targetClass: string) => {
    setRenameTargetClass(targetClass);
    setNewClassNameInput(targetClass);
    setRenameError('');
    setShowRenameModal(true);
  };

  const handleRenameClass = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNewName = newClassNameInput.trim();
    if (!cleanNewName) {
      setRenameError('Bitte gib einen neuen Klassennamen ein.');
      return;
    }
    if (cleanNewName === renameTargetClass) {
      setRenameError('Der neue Name muss sich vom bisherigen unterscheiden.');
      return;
    }

    setRenameLoading(true);
    setRenameError('');
    try {
      const res = await fetch('/api/teacher/classes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          oldClassName: renameTargetClass,
          newClassName: cleanNewName,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setRenameError(data.error || 'Fehler beim Umbenennen der Klasse.');
      } else {
        setSuccessMsg(`Klasse „${renameTargetClass}“ wurde erfolgreich in „${cleanNewName}“ umbenannt.`);
        setTimeout(() => setSuccessMsg(''), 4000);
        setShowRenameModal(false);
        await loadData();
      }
    } catch {
      setRenameError('Netzwerkfehler beim Umbenennen.');
    } finally {
      setRenameLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    if (!currentPassword) {
      setPasswordError('Bitte gib dein aktuelles Passwort ein.');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setPasswordError('Das neue Passwort muss mindestens 6 Zeichen lang sein.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordError('Die neuen Passwörter stimmen nicht überein.');
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
        setPasswordError(data.error || 'Fehler beim Ändern des Passworts.');
      } else {
        setShowPasswordModal(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setSuccessMsg('Dein Passwort wurde erfolgreich geändert.');
        setTimeout(() => setSuccessMsg(''), 4000);
      }
    } catch {
      setPasswordError('Netzwerkfehler beim Ändern des Passworts.');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <SiteLayout>
      <div style={{ padding: '28px 24px', maxWidth: 1040, margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
          <div>
            <h1 style={{ marginBottom: 4 }}>Lehrperson-Dashboard</h1>
            {teacherEmail && (
              <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: 14 }}>
                Angemeldet als: <strong>{teacherEmail}</strong>
              </p>
            )}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link
              href="/dashboard/schueler"
              className="admin-action-btn"
              style={{ fontSize: 13, padding: '7px 14px', textDecoration: 'none' }}
            >
              Alle Schüler-Codes
            </Link>
            <Link
              href="/dashboard/fortschritt"
              className="admin-action-btn"
              style={{ fontSize: 13, padding: '7px 14px', textDecoration: 'none' }}
            >
              Fortschrittsübersicht
            </Link>
            <button
              type="button"
              className="admin-action-btn"
              onClick={() => {
                setShowPasswordModal(true);
                setPasswordError('');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
              }}
              style={{ fontSize: 13, padding: '7px 14px' }}
            >
              Passwort ändern
            </button>
          </div>
        </div>

        {successMsg && (
          <div
            style={{
              background: '#e6f4d7',
              color: '#2e6b0e',
              border: '1px solid #c3e6a4',
              borderRadius: 6,
              padding: '10px 16px',
              marginBottom: 20,
              fontSize: 14,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>✓ {successMsg}</span>
            <button
              type="button"
              onClick={() => setSuccessMsg('')}
              style={{ background: 'none', border: 'none', color: '#2e6b0e', cursor: 'pointer', fontSize: 16 }}
            >
              &times;
            </button>
          </div>
        )}

        {/* Compact KPI Statistics Summary Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: 12,
            marginBottom: 22,
          }}
        >
          <div
            style={{
              background: 'var(--bg-white)',
              border: '1.5px solid var(--green-primary)',
              borderRadius: 8,
              padding: '14px 16px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
            }}
          >
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
              Klassen
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--green-dark)' }}>
              {existingClasses.length}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
              angelegt
            </div>
          </div>

          <Link
            href="/dashboard/schueler"
            style={{
              background: 'var(--bg-white)',
              border: '1.5px solid var(--green-primary)',
              borderRadius: 8,
              padding: '14px 16px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
              textDecoration: 'none',
              display: 'block',
            }}
          >
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
              Schüler-Accounts
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--green-dark)' }}>
              {students.length}
            </div>
            <div style={{ fontSize: 12, color: 'var(--green-primary)', marginTop: 2, fontWeight: 600 }}>
              Zur Schülerliste &rarr;
            </div>
          </Link>

          <div
            style={{
              background: 'var(--bg-white)',
              border: '1.5px solid var(--green-primary)',
              borderRadius: 8,
              padding: '14px 16px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
            }}
          >
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
              Zugewiesene Übungen
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--green-dark)' }}>
              {Array.from(new Set(Object.values(assignmentsByClass).flat())).length}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
              im Einsatz
            </div>
          </div>

          <Link
            href="/dashboard/fortschritt"
            style={{
              background: 'var(--bg-white)',
              border: '1.5px solid var(--green-primary)',
              borderRadius: 8,
              padding: '14px 16px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
              textDecoration: 'none',
              display: 'block',
            }}
          >
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
              Erledigte Aufgaben
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--green-dark)' }}>
              {progress.length}
            </div>
            <div style={{ fontSize: 12, color: 'var(--green-primary)', marginTop: 2, fontWeight: 600 }}>
              {progress.length > 0
                ? `Ø ${Math.round(progress.reduce((sum, p) => sum + (p.score || 0), 0) / progress.length)} % • Fortschritt →`
                : 'Zum Fortschritt →'}
            </div>
          </Link>
        </div>

        {/* Classes Overview Grid */}
        {loading ? (
          <section className="dashboard-section" style={{ marginBottom: 22 }}>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Lade Klassenübersicht...</p>
          </section>
        ) : existingClasses.length > 0 ? (
          <section className="dashboard-section" style={{ marginBottom: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 18 }}>Meine Klassen ({existingClasses.length})</h2>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  Wähle pro Klasse direkt Schüler-Codes, Übungsverwaltung oder Fortschrittsübersicht.
                </span>
              </div>
              <button
                type="button"
                onClick={() => focusAddForm('')}
                className="admin-action-btn"
                style={{ fontSize: 13, fontWeight: 600 }}
              >
                + Neue Klasse anlegen
              </button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
                gap: 14,
              }}
            >
              {existingClasses.map((cls) => {
                const clsStudents = students.filter((s) => (s.className || 'Ohne Klasse') === cls);
                const assignedIds = assignmentsByClass[cls] || [];

                return (
                  <div
                    key={cls}
                    style={{
                      background: 'var(--bg-white)',
                      border: '1.5px solid var(--border-light)',
                      borderRadius: 8,
                      padding: '15px 16px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: 12,
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                        <strong style={{ fontSize: 17, color: 'var(--green-dark)' }}>
                          Klasse {cls}
                        </strong>
                        <span
                          style={{
                            fontSize: 12,
                            background: 'var(--green-light)',
                            color: 'var(--green-dark)',
                            padding: '2px 8px',
                            borderRadius: 4,
                            fontWeight: 700,
                          }}
                        >
                          {clsStudents.length} Schüler
                        </span>
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                        {assignedIds.length > 0
                          ? `${assignedIds.length} Übung(en) zugewiesen`
                          : 'Noch keine Übungen zugewiesen'}
                      </div>
                      {(sharedWithMeMap[cls] || (sharedClassesMap[cls] && sharedClassesMap[cls].length > 0)) && (
                        <div style={{ fontSize: 11.5, color: 'var(--green-dark)', marginTop: 4, fontWeight: 600 }}>
                          {sharedWithMeMap[cls]
                            ? `Geteilt von ${sharedWithMeMap[cls]}`
                            : `Team-Teaching (${sharedClassesMap[cls].length})`}
                        </div>
                      )}
                    </div>

                    {/* Main navigation links for this class */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
                      <Link
                        href={`/dashboard/schueler?className=${encodeURIComponent(cls)}`}
                        className="admin-action-btn"
                        style={{
                          fontSize: 12.5,
                          padding: '6px 8px',
                          textAlign: 'center',
                          textDecoration: 'none',
                          fontWeight: 600,
                          background: 'var(--green-light)',
                          color: 'var(--green-dark)',
                        }}
                      >
                        Schüler
                      </Link>
                      <Link
                        href={`/dashboard/uebungen?className=${encodeURIComponent(cls)}`}
                        className="admin-action-btn"
                        style={{
                          fontSize: 12.5,
                          padding: '6px 8px',
                          textAlign: 'center',
                          textDecoration: 'none',
                          fontWeight: 600,
                          background: 'var(--green-light)',
                          color: 'var(--green-dark)',
                        }}
                      >
                        Übungen
                      </Link>
                      <Link
                        href={`/dashboard/fortschritt?className=${encodeURIComponent(cls)}`}
                        className="admin-action-btn"
                        style={{
                          fontSize: 12.5,
                          padding: '6px 8px',
                          textAlign: 'center',
                          textDecoration: 'none',
                          fontWeight: 600,
                          background: 'var(--green-light)',
                          color: 'var(--green-dark)',
                        }}
                      >
                        Fortschritt
                      </Link>
                    </div>

                    {/* Secondary management actions */}
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', borderTop: '1px solid var(--border-light)', paddingTop: 10 }}>
                      <button
                        type="button"
                        onClick={() => setInlineAddClass(inlineAddClass === cls ? null : cls)}
                        className="admin-action-btn"
                        style={{
                          fontSize: 12,
                          padding: '4px 8px',
                          background: inlineAddClass === cls ? 'var(--green-primary)' : undefined,
                          color: inlineAddClass === cls ? '#ffffff' : undefined,
                        }}
                        title={`Schüler zu Klasse „${cls}“ hinzufügen`}
                      >
                        + Schüler
                      </button>
                      <button
                        type="button"
                        onClick={() => openShareModal(cls)}
                        className="admin-action-btn"
                        style={{ fontSize: 12, padding: '4px 8px' }}
                        title={`Klasse „${cls}“ mit anderer Lehrperson teilen (Team-Teaching)`}
                      >
                        Teilen
                      </button>
                      <button
                        type="button"
                        onClick={() => openRenameModal(cls)}
                        className="admin-action-btn"
                        style={{ fontSize: 12, padding: '4px 8px' }}
                        title={`Klasse „${cls}“ umbenennen`}
                      >
                        Umbenennen
                      </button>
                      <button
                        type="button"
                        onClick={() => promptDeleteClass(cls)}
                        className="dashboard-delete-btn"
                        style={{ fontSize: 12, padding: '4px 8px', marginLeft: 'auto' }}
                        title={`Klasse „${cls}“ löschen`}
                      >
                        Löschen
                      </button>
                    </div>

                    {inlineAddClass === cls && (
                      <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 10 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Anzahl (max. 30)</div>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center', marginBottom: 8 }}>
                          <input
                            type="number"
                            min={1}
                            max={30}
                            className="login-input"
                            value={count}
                            onChange={(e) => setCount(Math.max(1, Math.min(30, parseInt(e.target.value, 10) || 1)))}
                            style={{ width: 64 }}
                          />
                          {[5, 10, 15, 20, 25, 30].map((n) => (
                            <button
                              key={n}
                              type="button"
                              onClick={() => setCount(n)}
                              className="admin-action-btn"
                              style={{
                                fontSize: 12,
                                padding: '3px 7px',
                                background: count === n ? 'var(--green-primary)' : 'var(--green-light)',
                                color: count === n ? '#ffffff' : 'var(--green-dark)',
                              }}
                            >
                              {n}
                            </button>
                          ))}
                        </div>
                        <button
                          type="button"
                          className="dashboard-add-btn"
                          disabled={addLoading}
                          style={{ width: '100%', padding: '8px 12px' }}
                          onClick={async () => {
                            await addStudentsToClass(cls === 'Ohne Klasse' ? 'Standardklasse' : cls);
                            setInlineAddClass(null);
                          }}
                        >
                          {addLoading ? 'Erstelle...' : `+ ${count} Accounts anlegen`}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          /* Onboarding Guide for Teachers with 0 students */
          <div
            style={{
              background: 'linear-gradient(135deg, #f0f7eb 0%, #ffffff 100%)',
              border: '1.5px solid var(--green-primary)',
              borderRadius: 8,
              padding: '20px 24px',
              marginBottom: 22,
              boxShadow: '0 2px 8px rgba(46, 107, 14, 0.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: 18, margin: 0, color: 'var(--green-dark)' }}>
                Erste Schritte: So startest du in weniger als 1 Minute
              </h2>
              <span
                style={{
                  fontSize: 11,
                  background: 'var(--green-light)',
                  color: 'var(--green-dark)',
                  border: '1px solid var(--green-border)',
                  padding: '2px 8px',
                  borderRadius: 4,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.4px',
                }}
              >
                100 % DSGVO-konform
              </span>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-color)', marginBottom: 14, lineHeight: 1.5 }}>
              Du musst <strong>weder Schülernamen noch E-Mail-Adressen von Kindern eingeben</strong>. Die Schülerzugänge funktionieren vollständig anonym über zufällige 5-stellige Codes:
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 12,
                marginBottom: 14,
              }}
            >
              <div style={{ background: '#ffffff', border: '1px solid var(--green-border)', borderRadius: 6, padding: '12px 14px' }}>
                <div style={{ fontWeight: 700, color: 'var(--green-dark)', fontSize: 13, marginBottom: 4 }}>
                  1. Klasse &amp; Anzahl wählen
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  Gib unten deine Klasse ein (z. B. <strong>4A</strong>) und klicke auf die gewünschte Schüleranzahl (z. B. <strong>25</strong>).
                </div>
              </div>
              <div style={{ background: '#ffffff', border: '1px solid var(--green-border)', borderRadius: 6, padding: '12px 14px' }}>
                <div style={{ fontWeight: 700, color: 'var(--green-dark)', fontSize: 13, marginBottom: 4 }}>
                  2. Codes werden generiert
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  Jeder Schüler erhält automatisch einen eindeutigen 5-stelligen Code (z. B. <code style={{ background: '#f4f8ef', padding: '1px 5px', borderRadius: 3, fontWeight: 700, color: 'var(--green-dark)' }}>A7K2M</code>).
                </div>
              </div>
              <div style={{ background: '#ffffff', border: '1px solid var(--green-border)', borderRadius: 6, padding: '12px 14px' }}>
                <div style={{ fontWeight: 700, color: 'var(--green-dark)', fontSize: 13, marginBottom: 4 }}>
                  3. Liste drucken &amp; austeilen
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  Öffne die Schülerliste deiner Klasse und drucke sie als PDF oder Word aus. Schüler loggen sich direkt mit ihrem Code ein.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add new class / students section */}
        <section className="dashboard-section" id="add-students-section">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 4 }}>
            <h2 style={{ margin: 0, fontSize: 18 }}>Neue Klasse oder Schüleraccounts anlegen</h2>
            <span
              style={{
                fontSize: 12,
                background: '#f0f7eb',
                color: 'var(--green-dark)',
                border: '1px solid #c8e4b6',
                borderRadius: 4,
                padding: '3px 8px',
                fontWeight: 600,
              }}
            >
              ✓ Keine Schülernamen oder E-Mails erforderlich
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: 13.5, marginBottom: 14 }}>
            Trage eine neue oder bestehende Klasse ein (z. B. 4A, 3B oder Mathe-Gruppe) und wähle die gewünschte Anzahl an Schüler-Codes.
          </p>
          <form onSubmit={handleAddStudents} className="dashboard-add-form" style={{ alignItems: 'flex-end', gap: 12 }}>
            <div style={{ flex: '1 1 180px', minWidth: 140 }}>
              <label htmlFor="student-class" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-color)', marginBottom: 4 }}>
                Klasse / Gruppe
              </label>
              <input
                id="student-class"
                type="text"
                className="login-input"
                placeholder="z. B. 4A oder 3B"
                value={classNameInput}
                onChange={(e) => setClassNameInput(e.target.value)}
                style={{ width: '100%', maxWidth: 220 }}
                list="existing-classes-list"
              />
              <datalist id="existing-classes-list">
                {existingClasses.map((cls) => (
                  <option key={cls} value={cls} />
                ))}
              </datalist>
            </div>

            <div style={{ minWidth: 80 }}>
              <label htmlFor="student-count" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-color)', marginBottom: 4 }}>
                Anzahl (max. 30)
              </label>
              <input
                id="student-count"
                type="number"
                min={1}
                max={30}
                className="login-input"
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(30, parseInt(e.target.value, 10) || 1)))}
                style={{ width: 90, textAlign: 'center', fontWeight: 700, fontSize: 15 }}
              />
            </div>

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {[5, 10, 15, 20, 25, 30].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setCount(n)}
                  className="admin-action-btn"
                  style={{
                    padding: '8px 10px',
                    fontSize: 13,
                    background: count === n ? 'var(--green-primary)' : 'var(--green-light)',
                    color: count === n ? '#ffffff' : 'var(--green-dark)',
                    borderColor: count === n ? 'var(--green-primary)' : 'var(--green-border)',
                  }}
                >
                  {n}
                </button>
              ))}
            </div>

            <button type="submit" className="dashboard-add-btn" disabled={addLoading} style={{ padding: '9px 18px' }}>
              {addLoading ? 'Erstelle...' : `+ ${count} Accounts anlegen`}
            </button>
          </form>
          {error && <p className="login-error" style={{ marginTop: 12 }}>{error}</p>}
        </section>

        <div style={{ marginTop: 20 }}>
          <Link href="/" className="dashboard-back-link">&larr; Zurück zur Startseite</Link>
        </div>

        {/* Confirmation Modal Overlay */}
        <ConfirmModal
          isOpen={confirmModal.isOpen}
          title={confirmModal.title}
          message={confirmModal.message}
          confirmLabel={confirmModal.confirmLabel}
          confirmVariant="danger"
          loading={confirmModal.loading}
          onConfirm={confirmModal.onConfirm}
          onCancel={() => {
            if (!confirmModal.loading) {
              setConfirmModal((prev) => ({ ...prev, isOpen: false }));
            }
          }}
        />

        {/* Teacher Password Change Modal Overlay */}
        {showPasswordModal && (
          <div
            className="login-modal-overlay"
            onClick={() => {
              if (!passwordLoading) setShowPasswordModal(false);
            }}
            style={{ zIndex: 9999 }}
          >
            <div
              className="login-modal"
              style={{ maxWidth: 440 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <button
                className="login-modal-close"
                onClick={() => {
                  if (!passwordLoading) setShowPasswordModal(false);
                }}
                aria-label="Schließen"
                disabled={passwordLoading}
              >
                &times;
              </button>

              <div className="login-modal-body" style={{ padding: '28px 26px 24px' }}>
                <h2 className="login-modal-title" style={{ fontSize: 20, marginBottom: 6 }}>
                  Passwort ändern
                </h2>
                <p className="login-modal-subtitle" style={{ fontSize: 13, marginBottom: 20 }}>
                  Gib dein bisheriges Passwort und ein neues Passwort ein.
                </p>

                {passwordError && (
                  <p className="login-error" style={{ marginBottom: 14 }}>{passwordError}</p>
                )}

                <form onSubmit={handleChangePassword}>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-color)', marginBottom: 4 }}>
                      Aktuelles Passwort
                    </label>
                    <input
                      type="password"
                      className="login-input"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      autoFocus
                    />
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-color)', marginBottom: 4 }}>
                      Neues Passwort (mind. 6 Zeichen)
                    </label>
                    <input
                      type="password"
                      className="login-input"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-color)', marginBottom: 4 }}>
                      Neues Passwort wiederholen
                    </label>
                    <input
                      type="password"
                      className="login-input"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      className="admin-action-btn"
                      onClick={() => setShowPasswordModal(false)}
                      disabled={passwordLoading}
                      style={{ padding: '8px 16px', fontSize: 14 }}
                    >
                      Abbrechen
                    </button>
                    <button
                      type="submit"
                      className="dashboard-add-btn"
                      disabled={passwordLoading}
                      style={{ padding: '8px 18px', fontSize: 14 }}
                    >
                      {passwordLoading ? 'Wird gespeichert...' : 'Passwort speichern'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Rename Class Modal Overlay */}
        {showRenameModal && (
          <div
            className="login-modal-overlay"
            onClick={() => {
              if (!renameLoading) setShowRenameModal(false);
            }}
            style={{ zIndex: 9999 }}
          >
            <div
              className="login-modal"
              style={{ maxWidth: 440 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <button
                className="login-modal-close"
                onClick={() => {
                  if (!renameLoading) setShowRenameModal(false);
                }}
                aria-label="Schließen"
                disabled={renameLoading}
              >
                &times;
              </button>

              <div className="login-modal-body" style={{ padding: '28px 24px 22px' }}>
                <h2 className="login-modal-title" style={{ fontSize: 19, marginBottom: 4 }}>
                  Klasse umbenennen
                </h2>
                <p className="login-modal-subtitle" style={{ fontSize: 13, marginBottom: 16 }}>
                  Bisheriger Name: <strong style={{ color: 'var(--green-dark)' }}>{renameTargetClass}</strong>
                </p>

                {renameError && (
                  <p className="login-error" style={{ marginBottom: 14 }}>{renameError}</p>
                )}

                <form onSubmit={handleRenameClass}>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-color)', marginBottom: 6 }}>
                      Neuer Klassenname
                    </label>
                    <input
                      type="text"
                      className="login-input"
                      value={newClassNameInput}
                      onChange={(e) => setNewClassNameInput(e.target.value)}
                      placeholder="z. B. 4B oder Gruppe 2"
                      required
                      autoFocus
                    />
                    <span style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, display: 'block' }}>
                      Alle Schüleraccounts und zugewiesenen Übungen dieser Klasse werden automatisch aktualisiert.
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      className="admin-action-btn"
                      onClick={() => setShowRenameModal(false)}
                      disabled={renameLoading}
                      style={{ padding: '8px 16px', fontSize: 13 }}
                    >
                      Abbrechen
                    </button>
                    <button
                      type="submit"
                      className="dashboard-add-btn"
                      disabled={renameLoading}
                      style={{ padding: '8px 18px', fontSize: 13 }}
                    >
                      {renameLoading ? 'Wird gespeichert...' : 'Umbenennen'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Share Class (Team-Teaching) Modal Overlay */}
        {showShareModal && (
          <div
            className="login-modal-overlay"
            onClick={() => {
              if (!shareLoading) setShowShareModal(false);
            }}
            style={{ zIndex: 9999 }}
          >
            <div
              className="login-modal"
              style={{ maxWidth: 480 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <button
                className="login-modal-close"
                onClick={() => {
                  if (!shareLoading) setShowShareModal(false);
                }}
                aria-label="Schließen"
                disabled={shareLoading}
              >
                &times;
              </button>

              <div className="login-modal-body" style={{ padding: '28px 24px 22px' }}>
                <h2 className="login-modal-title" style={{ fontSize: 19, marginBottom: 4 }}>
                  Klasse „{shareTargetClass}“ teilen (Team-Teaching)
                </h2>
                <p className="login-modal-subtitle" style={{ fontSize: 13, marginBottom: 14 }}>
                  Gib die E-Mail-Adresse einer anderen registrierten Lehrperson ein. Sie erhält vollen Zugriff auf die Schüler, Übungszuweisungen und den Fortschritt dieser Klasse.
                </p>

                {shareOwnerEmail && shareOwnerEmail !== teacherEmail && (
                  <div style={{ fontSize: 12.5, background: '#f0f7eb', border: '1px solid #c8e4b6', borderRadius: 6, padding: '8px 10px', marginBottom: 12, color: 'var(--green-dark)' }}>
                    Erstellt von: <strong>{shareOwnerEmail}</strong>
                  </div>
                )}

                {shareError && (
                  <p className="login-error" style={{ marginBottom: 12 }}>{shareError}</p>
                )}

                <form onSubmit={handleAddShare} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                  <input
                    type="email"
                    className="login-input"
                    value={shareEmailInput}
                    onChange={(e) => setShareEmailInput(e.target.value)}
                    placeholder="E-Mail-Adresse der Lehrperson..."
                    required
                    style={{ flex: 1 }}
                  />
                  <button
                    type="submit"
                    className="dashboard-add-btn"
                    disabled={shareLoading}
                    style={{ padding: '8px 14px', fontSize: 13, whiteSpace: 'nowrap' }}
                  >
                    {shareLoading ? '...' : '+ Freigeben'}
                  </button>
                </form>

                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 12 }}>
                  <strong style={{ fontSize: 13, color: 'var(--text-color)', display: 'block', marginBottom: 8 }}>
                    Aktuell geteilt mit ({shareList.length}):
                  </strong>
                  {shareList.length === 0 ? (
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
                      Noch mit keiner anderen Lehrperson geteilt.
                    </p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {shareList.map((item) => (
                        <div
                          key={item.email}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '6px 10px',
                            background: '#fafcf8',
                            border: '1px solid var(--border-light)',
                            borderRadius: 6,
                            fontSize: 13,
                          }}
                        >
                          <span>{item.email}</span>
                          <button
                            type="button"
                            className="dashboard-delete-btn"
                            disabled={shareLoading}
                            onClick={() => handleRemoveShare(item.email)}
                            style={{ fontSize: 12, padding: '2px 8px' }}
                          >
                            Entfernen
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 18 }}>
                  <button
                    type="button"
                    className="admin-action-btn"
                    onClick={() => setShowShareModal(false)}
                    style={{ padding: '8px 16px', fontSize: 13 }}
                  >
                    Schließen
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<SiteLayout><div style={{ padding: 40, textAlign: 'center' }}>Lade Dashboard...</div></SiteLayout>}>
      <DashboardPageInner />
    </Suspense>
  );
}
