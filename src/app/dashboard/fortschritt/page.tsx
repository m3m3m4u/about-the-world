'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { SiteLayout } from '@/components/SiteLayout';

interface StudentItem {
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

function TeacherProgressInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialClass = searchParams.get('className') || 'all';

  const [students, setStudents] = useState<StudentItem[]>([]);
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>(initialClass);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const authRes = await fetch('/api/auth/me');
      const authData = await authRes.json();
      if (!authData.user || authData.user.role !== 'teacher') {
        router.replace('/');
        return;
      }

      const [studRes, progRes] = await Promise.all([
        fetch('/api/teacher/students'),
        fetch('/api/teacher/progress'),
      ]);
      const studData = await studRes.json();
      const progData = await progRes.json();
      if (studData.students) setStudents(studData.students);
      if (progData.progress) setProgress(progData.progress);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const cls = searchParams.get('className');
    if (cls) {
      setSelectedClassFilter(cls);
    }
  }, [searchParams]);

  const existingClasses = Array.from(
    new Set(students.map((s) => s.className || 'Ohne Klasse'))
  ).sort();

  const filteredStudents =
    selectedClassFilter === 'all'
      ? students
      : students.filter((s) => (s.className || 'Ohne Klasse') === selectedClassFilter);

  const currentClassLabel =
    selectedClassFilter === 'all' ? 'Alle Klassen' : `Klasse ${selectedClassFilter}`;
  const currentDateStr = new Date().toLocaleDateString('de-AT');

  // Progress lookups
  const progressMap: Record<string, Record<string, number>> = {};
  for (const p of progress) {
    if (!progressMap[p.studentId]) progressMap[p.studentId] = {};
    progressMap[p.studentId][p.h5pId] = p.score;
  }

  const filteredStudentIds = new Set(filteredStudents.map((s) => s.id));
  const relevantProgress = progress.filter((p) => filteredStudentIds.has(p.studentId));

  const h5pMap: Record<string, string> = {};
  for (const p of relevantProgress) {
    h5pMap[p.h5pId] = p.h5pTitle || p.h5pId;
  }
  const h5pIds = Object.keys(h5pMap);

  const handlePrintProgress = () => {
    if (filteredStudents.length === 0 || h5pIds.length === 0) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const ths = h5pIds.map((id) => `<th style="text-align:center; font-size:11px;">${h5pMap[id]}</th>`).join('');

    const trs = filteredStudents
      .map((s, idx) => {
        const scoreCells = h5pIds
          .map((id) => {
            const sc = progressMap[s.id]?.[id];
            const display = sc !== undefined ? `${sc} %` : '-';
            const bg = sc !== undefined ? (sc >= 80 ? '#e6f4d7' : sc >= 50 ? '#fff8e1' : '#fdecea') : 'transparent';
            const col = sc !== undefined ? (sc >= 80 ? '#4a7c2e' : sc >= 50 ? '#8a6000' : '#c62828') : '#999';
            return `<td style="text-align:center; font-size:11px; background:${bg}; color:${col}; font-weight:bold;">${display}</td>`;
          })
          .join('');

        return `
          <tr>
            <td style="text-align:center; width:35px; font-size:11px;">${idx + 1}</td>
            <td style="font-family:monospace; font-weight:bold; font-size:12px; text-align:center;">${s.code}</td>
            <td style="text-align:center; font-size:11px;">${s.className || 'Ohne Klasse'}</td>
            <td style="border-bottom:1px solid #777; min-width:120px;">&nbsp;</td>
            ${scoreCells}
          </tr>`;
      })
      .join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="de">
      <head>
        <meta charset="utf-8">
        <title>Ergebnisliste</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; color: #111; }
          h1 { font-size: 18px; color: #2e6b0e; margin-bottom: 4px; }
          .meta { font-size: 12px; color: #555; margin-bottom: 16px; border-bottom: 2px solid #2e6b0e; padding-bottom: 6px; }
          table { width: 100%; border-collapse: collapse; margin-top: 8px; }
          th, td { border: 1px solid #bbb; padding: 6px 8px; font-size: 11px; }
          th { background: #f0f7eb; font-weight: bold; }
          @media print {
            body { padding: 0; }
            @page { size: landscape; margin: 1cm; }
          }
        </style>
      </head>
      <body>
        <h1>Ergebnis- & Fortschrittsübersicht</h1>
        <div class="meta">
          <strong>Auswahl:</strong> ${currentClassLabel} &nbsp;|&nbsp;
          <strong>Schüleranzahl:</strong> ${filteredStudents.length} &nbsp;|&nbsp;
          <strong>Datum:</strong> ${currentDateStr}
        </div>
        <table>
          <thead>
            <tr>
              <th style="width:35px; text-align:center;">Nr.</th>
              <th style="width:80px; text-align:center;">Code</th>
              <th style="width:70px; text-align:center;">Klasse</th>
              <th style="text-align:left; min-width:120px;">Name</th>
              ${ths}
            </tr>
          </thead>
          <tbody>
            ${trs}
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

  const handleExportProgressExcel = () => {
    if (filteredStudents.length === 0 || h5pIds.length === 0) return;
    const headerCols = [
      'Nr.',
      'Schüler-Code',
      'Klasse',
      'Name (handschriftlich)',
      ...h5pIds.map((id) => `"${h5pMap[id].replace(/"/g, '""')}"`),
    ];
    let csv = '\uFEFF' + headerCols.join(';') + '\r\n';

    filteredStudents.forEach((s, idx) => {
      const scores = h5pIds.map((id) => {
        const sc = progressMap[s.id]?.[id];
        return sc !== undefined ? `${sc}%` : '';
      });
      csv += [idx + 1, s.code, s.className || 'Ohne Klasse', '', ...scores].join(';') + '\r\n';
    });

    const filename = `Ergebnisliste_${selectedClassFilter === 'all' ? 'Alle_Klassen' : selectedClassFilter}_${new Date().toISOString().slice(0, 10)}.csv`;
    downloadBlob(csv, filename, 'text/csv;charset=utf-8;');
  };

  const handleExportProgressWord = () => {
    if (filteredStudents.length === 0 || h5pIds.length === 0) return;
    const ths = h5pIds
      .map((id) => `<th style="border:1px solid #999; background:#f0f7eb; padding:6px; font-size:9pt;">${h5pMap[id]}</th>`)
      .join('');

    const trs = filteredStudents
      .map((s, idx) => {
        const scoreCells = h5pIds
          .map((id) => {
            const sc = progressMap[s.id]?.[id];
            const display = sc !== undefined ? `${sc} %` : '-';
            return `<td style="border:1px solid #999; text-align:center; padding:5px; font-size:9pt;">${display}</td>`;
          })
          .join('');

        return `
          <tr>
            <td style="border:1px solid #999; text-align:center; padding:5px; font-size:9pt;">${idx + 1}</td>
            <td style="border:1px solid #999; font-family:monospace; font-weight:bold; text-align:center; padding:5px; font-size:10pt;">${s.code}</td>
            <td style="border:1px solid #999; text-align:center; padding:5px; font-size:9pt;">${s.className || 'Ohne Klasse'}</td>
            <td style="border:1px solid #999; border-bottom:1.5pt solid #333; min-width:100px;">&nbsp;</td>
            ${scoreCells}
          </tr>`;
      })
      .join('');

    const html = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Ergebnisliste</title>
        <style>
          body { font-family: Arial, sans-serif; font-size: 10pt; color: #222; }
          h1 { font-size: 14pt; color: #2e6b0e; }
          p { font-size: 9pt; color: #555; }
          table { border-collapse: collapse; width: 100%; margin-top: 10px; }
        </style>
      </head>
      <body>
        <h1>Ergebnis- & Fortschrittsübersicht</h1>
        <p><strong>Auswahl:</strong> ${currentClassLabel} | <strong>Datum:</strong> ${currentDateStr}</p>
        <table>
          <thead>
            <tr>
              <th style="border:1px solid #999; background:#f0f7eb; width:30px; font-size:9pt;">Nr.</th>
              <th style="border:1px solid #999; background:#f0f7eb; width:80px; font-size:9pt;">Code</th>
              <th style="border:1px solid #999; background:#f0f7eb; width:60px; font-size:9pt;">Klasse</th>
              <th style="border:1px solid #999; background:#f0f7eb; text-align:left; font-size:9pt;">Name</th>
              ${ths}
            </tr>
          </thead>
          <tbody>
            ${trs}
          </tbody>
        </table>
      </body>
      </html>
    `;
    const filename = `Ergebnisliste_${selectedClassFilter === 'all' ? 'Alle_Klassen' : selectedClassFilter}_${new Date().toISOString().slice(0, 10)}.doc`;
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
              Fortschrittsübersicht {selectedClassFilter !== 'all' ? `– Klasse ${selectedClassFilter}` : '– Alle Klassen'}
            </h1>
            <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-muted)' }}>
              Ergebnisse der Schülerinnen und Schüler einsehen, drucken oder als Word/Excel exportieren.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link
              href={selectedClassFilter !== 'all' ? `/dashboard/schueler?className=${encodeURIComponent(selectedClassFilter)}` : '/dashboard/schueler'}
              className="admin-action-btn"
              style={{ fontSize: 13, padding: '8px 14px', textDecoration: 'none', fontWeight: 600 }}
            >
              Schüler-Codes
            </Link>
            {selectedClassFilter !== 'all' && (
              <Link
                href={`/dashboard/uebungen?className=${encodeURIComponent(selectedClassFilter)}`}
                className="admin-action-btn"
                style={{ fontSize: 13, padding: '8px 14px', textDecoration: 'none', fontWeight: 600 }}
              >
                Übungen der Klasse
              </Link>
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

        <section className="dashboard-section">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
            <h2 style={{ margin: 0 }}>
              Ergebnisse {selectedClassFilter !== 'all' ? `(Klasse ${selectedClassFilter})` : '(Alle Klassen)'}
            </h2>
            {h5pIds.length > 0 && filteredStudents.length > 0 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handlePrintProgress}
                  className="admin-action-btn"
                  style={{ fontSize: 13 }}
                  title="Ergebnisliste drucken oder als PDF speichern"
                >
                  PDF / Drucken
                </button>
                <button
                  type="button"
                  onClick={handleExportProgressWord}
                  className="admin-action-btn"
                  style={{ fontSize: 13 }}
                  title="Ergebnisliste als Word-Dokument"
                >
                  Word (.doc)
                </button>
                <button
                  type="button"
                  onClick={handleExportProgressExcel}
                  className="admin-action-btn"
                  style={{ fontSize: 13 }}
                  title="Ergebnisliste als Excel-Tabelle"
                >
                  Excel (.csv)
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <p style={{ color: 'var(--text-muted)' }}>Lade...</p>
          ) : filteredStudents.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>
              Noch keine Schüleraccounts in dieser Auswahl vorhanden.
            </p>
          ) : h5pIds.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>
              Noch kein H5P-Fortschritt für diese Schüleraccounts vorhanden. Sobald Schülerinnen und Schüler angemeldet H5P-Übungen abschließen, erscheinen hier die Ergebnisse.
            </p>
          ) : (
            <div style={{ overflowX: 'auto', marginTop: 12 }}>
              <table className="dashboard-progress-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Schüler-Code</th>
                    {selectedClassFilter === 'all' && <th>Klasse</th>}
                    {h5pIds.map((id) => {
                      const match = id.match(/(\d+)(?:\/?$)/);
                      const idTarget = match ? match[1] : id.replace(/^\/h5p-content\//, '').replace(/^\//, '');
                      return (
                        <th key={id} title={id}>
                          <Link
                            href={`/${idTarget}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'inherit', textDecoration: 'underline' }}
                          >
                            {h5pMap[id]}
                          </Link>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((s, idx) => (
                    <tr key={s.id}>
                      <td className="dashboard-table-student">
                        <span style={{ fontSize: 11, color: 'var(--text-muted)', marginRight: 6 }}>#{idx + 1}</span>
                        <span className="dashboard-student-code" style={{ fontSize: 13 }}>{s.code}</span>
                      </td>
                      {selectedClassFilter === 'all' && (
                        <td style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)' }}>
                          {s.className}
                        </td>
                      )}
                      {h5pIds.map((hId) => {
                        const score = progressMap[s.id]?.[hId];
                        return (
                          <td key={hId} className="dashboard-score-cell">
                            {score !== undefined ? (
                              <span
                                className="dashboard-score-badge"
                                style={{
                                  background: score >= 80 ? '#e6f4d7' : score >= 50 ? '#fff8e1' : '#fdecea',
                                  color: score >= 80 ? '#4a7c2e' : score >= 50 ? '#8a6000' : '#c62828',
                                }}
                              >
                                {score} %
                              </span>
                            ) : (
                              <span className="dashboard-score-empty">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </SiteLayout>
  );
}

export default function TeacherProgressPage() {
  return (
    <Suspense fallback={<SiteLayout><div style={{ padding: 32, textAlign: 'center' }}>Lade...</div></SiteLayout>}>
      <TeacherProgressInner />
    </Suspense>
  );
}
