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
  createdAt: string;
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

function SchuelerPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialClass = searchParams.get('className') || 'all';

  const [students, setStudents] = useState<Student[]>([]);
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>(initialClass);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const [count, setCount] = useState<number>(5);
  const [addLoading, setAddLoading] = useState(false);

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

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => {
        if (!data.user || data.user.role !== 'teacher') {
          router.replace('/');
        }
      })
      .catch(() => router.replace('/'));
  }, [router]);

  const loadStudents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/teacher/students');
      const data = await res.json();
      setStudents(data.students || []);
    } catch {
      setError('Fehler beim Laden der Schülerdaten.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const existingClasses = Array.from(
    new Set(students.map((s) => s.className || 'Ohne Klasse'))
  ).sort();

  const filteredStudents =
    selectedClassFilter === 'all'
      ? students
      : students.filter((s) => (s.className || 'Ohne Klasse') === selectedClassFilter);

  const currentClassLabel = selectedClassFilter === 'all' ? 'Alle Klassen' : `Klasse ${selectedClassFilter}`;
  const currentDateStr = new Date().toLocaleDateString('de-AT');

  const handleAddMore = async () => {
    if (selectedClassFilter === 'all') return;
    const targetClass = selectedClassFilter === 'Ohne Klasse' ? 'Standardklasse' : selectedClassFilter;
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
        setSuccessMsg(`${finalCount} Schüleraccounts für „${targetClass}“ ergänzt.`);
        setTimeout(() => setSuccessMsg(''), 4000);
        await loadStudents();
      }
    } catch {
      setError('Netzwerkfehler.');
    } finally {
      setAddLoading(false);
    }
  };

  const promptDeleteStudent = (student: Student) => {
    setError('');
    setConfirmModal({
      isOpen: true,
      title: 'Schüleraccount löschen?',
      message: (
        <>
          Möchtest du den Schüleraccount mit Code{' '}
          <strong style={{ fontFamily: 'monospace', fontSize: 15, background: '#f0f7eb', padding: '2px 6px', borderRadius: 4 }}>
            {student.code}
          </strong>{' '}
          {student.className ? `(Klasse ${student.className})` : ''} und alle zugehörigen Fortschrittsdaten wirklich löschen?
        </>
      ),
      confirmLabel: 'Account löschen',
      loading: false,
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, loading: true }));
        try {
          const res = await fetch(`/api/teacher/students/${student.id}`, { method: 'DELETE' });
          if (!res.ok) {
            const d = await res.json();
            setError(d.error || 'Fehler beim Löschen.');
          } else {
            setSuccessMsg(`Schüleraccount ${student.code} wurde gelöscht.`);
            setTimeout(() => setSuccessMsg(''), 4000);
            await loadStudents();
          }
        } catch {
          setError('Fehler beim Löschen.');
        } finally {
          setConfirmModal((prev) => ({ ...prev, isOpen: false, loading: false }));
        }
      },
    });
  };

  const handleCopyCodes = () => {
    if (filteredStudents.length === 0) return;
    const text =
      `Schülercodes (${currentClassLabel}):\n` +
      filteredStudents.map((s, idx) => `${idx + 1}. ${s.code} (${s.className})`).join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handlePrintCodes = () => {
    if (filteredStudents.length === 0) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const rowsHtml = filteredStudents
      .map(
        (s, idx) => `
        <tr>
          <td style="text-align:center; width:40px;">${idx + 1}</td>
          <td style="font-family:monospace; font-weight:bold; font-size:15px; width:130px; text-align:center; letter-spacing:1px;">${s.code}</td>
          <td style="width:100px; text-align:center;">${s.className}</td>
          <td style="border-bottom: 1px solid #777; min-width:220px;">&nbsp;</td>
        </tr>`
      )
      .join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="de">
      <head>
        <meta charset="utf-8">
        <title>Schülerliste - Zugangs-Codes</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 24px; color: #111; }
          h1 { font-size: 20px; color: #2e6b0e; margin-bottom: 4px; }
          .meta { font-size: 13px; color: #555; margin-bottom: 20px; border-bottom: 2px solid #2e6b0e; padding-bottom: 8px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #aaa; padding: 8px 12px; font-size: 13px; }
          th { background: #f0f7eb; font-weight: bold; text-align: left; }
          @media print {
            body { padding: 0; }
            @page { margin: 1.5cm; }
          }
        </style>
      </head>
      <body>
        <h1>Schülerliste – Zugangs-Codes</h1>
        <div class="meta">
          <strong>Auswahl:</strong> ${currentClassLabel} &nbsp;|&nbsp;
          <strong>Anzahl Schüler:</strong> ${filteredStudents.length} &nbsp;|&nbsp;
          <strong>Datum:</strong> ${currentDateStr}
        </div>
        <table>
          <thead>
            <tr>
              <th style="text-align:center; width:40px;">Nr.</th>
              <th style="width:130px; text-align:center;">Schüler-Code</th>
              <th style="width:100px; text-align:center;">Klasse</th>
              <th>Name der Schülerin / des Schülers (handschriftlich)</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  const handleExportCodesExcel = () => {
    if (filteredStudents.length === 0) return;
    let csv = '\uFEFFNr.;Schüler-Code;Klasse;Name (handschriftlich)\r\n';
    filteredStudents.forEach((s, idx) => {
      csv += `${idx + 1};${s.code};${s.className};\r\n`;
    });
    const filename = `Schuelerliste_Codes_${selectedClassFilter === 'all' ? 'Alle_Klassen' : selectedClassFilter}_${new Date().toISOString().slice(0, 10)}.csv`;
    downloadBlob(csv, filename, 'text/csv;charset=utf-8;');
  };

  const handleExportCodesWord = () => {
    if (filteredStudents.length === 0) return;
    const rowsHtml = filteredStudents
      .map(
        (s, idx) => `
        <tr>
          <td style="border:1px solid #999; padding:6px 10px; text-align:center;">${idx + 1}</td>
          <td style="border:1px solid #999; padding:6px 10px; font-family:monospace; font-weight:bold; font-size:12pt; text-align:center;">${s.code}</td>
          <td style="border:1px solid #999; padding:6px 10px; text-align:center;">${s.className}</td>
          <td style="border:1px solid #999; border-bottom:1.5pt solid #333; min-width:200px;">&nbsp;</td>
        </tr>`
      )
      .join('');

    const html = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Schülerliste - Codes</title>
        <style>
          body { font-family: Arial, sans-serif; font-size: 11pt; color: #222; }
          h1 { font-size: 16pt; color: #2e6b0e; }
          p { font-size: 10pt; color: #555; }
          table { border-collapse: collapse; width: 100%; margin-top: 15px; }
          th { border: 1px solid #999; background: #f0f7eb; font-weight: bold; padding: 8px 10px; }
        </style>
      </head>
      <body>
        <h1>Schülerliste – Zugangs-Codes</h1>
        <p><strong>Auswahl:</strong> ${currentClassLabel} | <strong>Anzahl:</strong> ${filteredStudents.length} | <strong>Datum:</strong> ${currentDateStr}</p>
        <table>
          <thead>
            <tr>
              <th style="width:40px; text-align:center;">Nr.</th>
              <th style="width:130px; text-align:center;">Schüler-Code</th>
              <th style="width:100px; text-align:center;">Klasse</th>
              <th style="text-align:left;">Name der Schülerin / des Schülers</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </body>
      </html>
    `;
    const filename = `Schuelerliste_Codes_${selectedClassFilter === 'all' ? 'Alle_Klassen' : selectedClassFilter}_${new Date().toISOString().slice(0, 10)}.doc`;
    downloadBlob(html, filename, 'application/msword;charset=utf-8');
  };

  return (
    <SiteLayout>
      <div style={{ padding: '28px 24px 48px', maxWidth: 1100, margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
          <div>
            <Link href="/dashboard" style={{ fontSize: 13, color: 'var(--green-dark)', textDecoration: 'none', fontWeight: 600 }}>
              ← Zurück zum Lehrerbereich
            </Link>
            <h1 style={{ margin: '4px 0 2px', fontSize: 24, color: 'var(--green-dark)' }}>
              Schülerübersicht {selectedClassFilter !== 'all' ? `– Klasse ${selectedClassFilter}` : '– Alle Klassen'}
            </h1>
            <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-muted)' }}>
              Zugangs-Codes drucken, exportieren, einzelne Schüler verwalten oder persönliche Übungen zuweisen.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {selectedClassFilter !== 'all' && (
              <>
                <Link
                  href={`/dashboard/uebungen?className=${encodeURIComponent(selectedClassFilter)}`}
                  className="admin-action-btn"
                  style={{ fontSize: 13, padding: '8px 14px', textDecoration: 'none', fontWeight: 600 }}
                >
                  Übungen der Klasse
                </Link>
                <Link
                  href={`/dashboard/fortschritt?className=${encodeURIComponent(selectedClassFilter)}`}
                  className="admin-action-btn"
                  style={{ fontSize: 13, padding: '8px 14px', textDecoration: 'none', fontWeight: 600 }}
                >
                  Fortschritt der Klasse
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Klassen-Filter-Tabs */}
        {existingClasses.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-color)', marginRight: 4 }}>
              Klasse wählen:
            </span>
            <button
              type="button"
              onClick={() => setSelectedClassFilter('all')}
              className="admin-action-btn"
              style={{
                fontSize: 13,
                background: selectedClassFilter === 'all' ? 'var(--green-primary)' : 'var(--green-light)',
                color: selectedClassFilter === 'all' ? '#ffffff' : 'var(--green-dark)',
                borderColor: selectedClassFilter === 'all' ? 'var(--green-primary)' : 'var(--green-border)',
              }}
            >
              Alle Klassen ({students.length})
            </button>
            {existingClasses.map((cls) => {
              const classCount = students.filter((s) => (s.className || 'Ohne Klasse') === cls).length;
              return (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setSelectedClassFilter(cls)}
                  className="admin-action-btn"
                  style={{
                    fontSize: 13,
                    background: selectedClassFilter === cls ? 'var(--green-primary)' : 'var(--green-light)',
                    color: selectedClassFilter === cls ? '#ffffff' : 'var(--green-dark)',
                    borderColor: selectedClassFilter === cls ? 'var(--green-primary)' : 'var(--green-border)',
                  }}
                >
                  {cls} ({classCount})
                </button>
              );
            })}
          </div>
        )}

        {/* Schüler für die gewählte Klasse ergänzen */}
        {selectedClassFilter !== 'all' && (
          <section className="dashboard-section" style={{ marginBottom: 18, padding: '14px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <strong style={{ fontSize: 14, color: 'var(--green-dark)' }}>
                  Weitere Schüler zu „{selectedClassFilter}“ hinzufügen
                </strong>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                  Wähle die Anzahl (max. 30), um neue 5-stellige Schüler-Codes für diese Klasse zu ergänzen.
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                <input
                  type="number"
                  min={1}
                  max={30}
                  className="login-input"
                  value={count}
                  onChange={(e) => setCount(Math.max(1, Math.min(30, parseInt(e.target.value, 10) || 1)))}
                  style={{ width: 70, textAlign: 'center', fontWeight: 700 }}
                />
                {[5, 10, 15, 20, 25, 30].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setCount(n)}
                    className="admin-action-btn"
                    style={{
                      fontSize: 12,
                      padding: '5px 8px',
                      background: count === n ? 'var(--green-primary)' : 'var(--green-light)',
                      color: count === n ? '#ffffff' : 'var(--green-dark)',
                    }}
                  >
                    {n}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleAddMore}
                  disabled={addLoading}
                  className="dashboard-add-btn"
                  style={{ padding: '7px 14px', fontSize: 13 }}
                >
                  {addLoading ? 'Erstelle...' : `+ ${count} Accounts anlegen`}
                </button>
              </div>
            </div>
          </section>
        )}

        {error && <p className="login-error" style={{ marginBottom: 14 }}>{error}</p>}
        {successMsg && (
          <div style={{ background: '#e6f4d7', border: '1px solid #a3d977', color: '#2e6b0e', padding: '10px 14px', borderRadius: 6, marginBottom: 14, fontWeight: 600, fontSize: 14 }}>
            ✓ {successMsg}
          </div>
        )}

        <section className="dashboard-section">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
            <h2 style={{ margin: 0 }}>
              Schüler-Codes ({filteredStudents.length})
            </h2>
            {filteredStudents.length > 0 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button type="button" onClick={handlePrintCodes} className="admin-action-btn" style={{ fontSize: 13 }}>
                  PDF / Drucken
                </button>
                <button type="button" onClick={handleExportCodesWord} className="admin-action-btn" style={{ fontSize: 13 }}>
                  Word (.doc)
                </button>
                <button type="button" onClick={handleExportCodesExcel} className="admin-action-btn" style={{ fontSize: 13 }}>
                  Excel (.csv)
                </button>
                <button type="button" onClick={handleCopyCodes} className="admin-action-btn" style={{ fontSize: 13 }}>
                  {copied ? 'Codes kopiert' : 'Codes kopieren'}
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <p style={{ color: 'var(--text-muted)' }}>Lädt...</p>
          ) : filteredStudents.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>Keine Schüleraccounts für diesen Filter vorhanden.</p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: 10,
              }}
            >
              {filteredStudents.map((s, idx) => (
                <div
                  key={s.id}
                  className="dashboard-student-card"
                  style={{
                    padding: '9px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 8,
                    minWidth: 0,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0, flex: 1, overflow: 'hidden' }}>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)', minWidth: 22, flexShrink: 0 }}>#{idx + 1}</span>
                    <span className="dashboard-student-code" style={{ fontSize: 14, flexShrink: 0 }}>{s.code}</span>
                    {selectedClassFilter === 'all' && (
                      <span
                        style={{
                          fontSize: 11,
                          color: 'var(--text-muted)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          flexShrink: 1,
                        }}
                        title={s.className}
                      >
                        ({s.className})
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/dashboard/uebungen?studentId=${encodeURIComponent(s.id)}&studentCode=${encodeURIComponent(s.code)}`}
                    className="admin-action-btn"
                    title="Übungen nur für diesen Schüler zuweisen"
                    style={{ fontSize: 12, padding: '3px 7px', flexShrink: 0, whiteSpace: 'nowrap', textDecoration: 'none' }}
                  >
                    Übungen
                  </Link>
                  <button
                    className="dashboard-delete-btn"
                    onClick={() => promptDeleteStudent(s)}
                    title="Account löschen"
                    style={{ fontSize: 12, padding: '3px 7px', flexShrink: 0, whiteSpace: 'nowrap' }}
                  >
                    Löschen
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <ConfirmModal
          isOpen={confirmModal.isOpen}
          title={confirmModal.title}
          message={confirmModal.message}
          confirmLabel={confirmModal.confirmLabel}
          loading={confirmModal.loading}
          onConfirm={confirmModal.onConfirm}
          onCancel={() => {
            if (!confirmModal.loading) {
              setConfirmModal((prev) => ({ ...prev, isOpen: false }));
            }
          }}
        />
      </div>
    </SiteLayout>
  );
}

export default function SchuelerUebersichtPage() {
  return (
    <Suspense fallback={<SiteLayout><div style={{ padding: 32, textAlign: 'center' }}>Lädt...</div></SiteLayout>}>
      <SchuelerPageInner />
    </Suspense>
  );
}
