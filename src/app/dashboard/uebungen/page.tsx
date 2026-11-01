'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { SiteLayout } from '@/components/SiteLayout';
import type { AssignmentSection } from '@/lib/assignment-sections';

interface CatalogItem {
  id: string;
  title: string;
  subject: string;
  subjectSlug: string;
  topicTitle: string;
  topicSlug: string;
  url: string;
}

type DragPayload =
  | { type: 'catalog'; exerciseId: string }
  | { type: 'exercise'; exerciseId: string; fromSecIdx: number; fromItemIdx: number }
  | { type: 'section'; fromSecIdx: number };

function UebungenPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const classNameParam = searchParams.get('className') || '';
  const studentIdParam = searchParams.get('studentId') || '';
  const studentCodeParam = searchParams.get('studentCode') || '';

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [sections, setSections] = useState<AssignmentSection[]>([{ id: 'general', title: '', h5pIds: [] }]);
  const [activeSectionId, setActiveSectionId] = useState<string>('general');

  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');

  const [dragPayload, setDragPayload] = useState<DragPayload | null>(null);
  const [dropTargetSecIdx, setDropTargetSecIdx] = useState<number | null>(null);
  const [dropTargetItemKey, setDropTargetItemKey] = useState<string | null>(null);

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

  useEffect(() => {
    if (!classNameParam && !studentIdParam) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    async function load() {
      setLoading(true);
      setError('');
      try {
        const assignUrl = studentIdParam
          ? `/api/teacher/assignments?studentId=${encodeURIComponent(studentIdParam)}`
          : `/api/teacher/assignments?className=${encodeURIComponent(classNameParam)}`;

        const [catRes, assignRes] = await Promise.all([
          fetch('/api/h5p/catalog'),
          fetch(assignUrl),
        ]);
        const catData = await catRes.json();
        const assignData = await assignRes.json();

        if (cancelled) return;

        setCatalog(catData.exercises || []);
        const loaded: AssignmentSection[] =
          Array.isArray(assignData.sections) && assignData.sections.length > 0
            ? assignData.sections
            : [{ id: 'general', title: '', h5pIds: assignData.h5pIds || [] }];
        setSections(loaded);
        setActiveSectionId(loaded[0]?.id || 'general');
      } catch {
        if (!cancelled) setError('Fehler beim Laden der Übungen.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [classNameParam, studentIdParam]);

  const catalogMap = useMemo(() => new Map(catalog.map((c) => [c.id, c])), [catalog]);
  const selectedIds = useMemo(() => new Set(sections.flatMap((s) => s.h5pIds)), [sections]);
  const subjects = useMemo(() => Array.from(new Set(catalog.map((c) => c.subject))).sort(), [catalog]);

  const filteredCatalog = useMemo(
    () =>
      catalog.filter((c) => {
        const q = search.trim().toLowerCase();
        const matchesSearch =
          !q ||
          c.title.toLowerCase().includes(q) ||
          c.subject.toLowerCase().includes(q) ||
          c.topicTitle.toLowerCase().includes(q);
        const matchesSubject = subjectFilter === 'all' || c.subject === subjectFilter;
        return matchesSearch && matchesSubject;
      }),
    [catalog, search, subjectFilter]
  );

  const toggleExercise = (id: string) => {
    setSections((prev) => {
      const exists = prev.some((s) => s.h5pIds.includes(id));
      if (exists) {
        return prev.map((s) => ({ ...s, h5pIds: s.h5pIds.filter((x) => x !== id) }));
      }
      const targetId = prev.some((s) => s.id === activeSectionId) ? activeSectionId : prev[0].id;
      return prev.map((s) => (s.id === targetId ? { ...s, h5pIds: [...s.h5pIds, id] } : s));
    });
  };

  const addFilteredExercises = () => {
    setSections((prev) => {
      const have = new Set(prev.flatMap((s) => s.h5pIds));
      const toAdd = filteredCatalog.map((c) => c.id).filter((id) => !have.has(id));
      if (toAdd.length === 0) return prev;
      const targetId = prev.some((s) => s.id === activeSectionId) ? activeSectionId : prev[0].id;
      return prev.map((s) => (s.id === targetId ? { ...s, h5pIds: [...s.h5pIds, ...toAdd] } : s));
    });
  };

  const clearAllExercises = () => {
    setSections((prev) => prev.map((s) => ({ ...s, h5pIds: [] })));
  };

  const addSection = () => {
    const newId = `sec-${Date.now()}`;
    setSections((prev) => [...prev, { id: newId, title: `Bereich ${prev.length}`, h5pIds: [] }]);
    setActiveSectionId(newId);
  };

  const removeSection = (secIdx: number) => {
    setSections((prev) => {
      if (secIdx <= 0 || secIdx >= prev.length) return prev;
      const removed = prev[secIdx];
      const next = prev.filter((_, i) => i !== secIdx);
      next[0] = { ...next[0], h5pIds: [...next[0].h5pIds, ...removed.h5pIds] };
      if (activeSectionId === removed.id) setActiveSectionId(next[0].id);
      return next;
    });
  };

  const moveSection = (index: number, dir: -1 | 1) => {
    setSections((prev) => {
      const target = index + dir;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const moveExercise = (secIdx: number, itemIdx: number, dir: -1 | 1) => {
    setSections((prev) => {
      const next = prev.map((s) => ({ ...s, h5pIds: [...s.h5pIds] }));
      const id = next[secIdx].h5pIds[itemIdx];
      const targetIdx = itemIdx + dir;
      if (targetIdx >= 0 && targetIdx < next[secIdx].h5pIds.length) {
        [next[secIdx].h5pIds[itemIdx], next[secIdx].h5pIds[targetIdx]] = [next[secIdx].h5pIds[targetIdx], id];
      } else {
        const neighbor = secIdx + dir;
        if (neighbor < 0 || neighbor >= next.length) return prev;
        next[secIdx].h5pIds.splice(itemIdx, 1);
        if (dir === 1) next[neighbor].h5pIds.unshift(id);
        else next[neighbor].h5pIds.push(id);
      }
      return next;
    });
  };

  // Drag & Drop handlers
  const handleDropOnSection = (targetSecIdx: number, targetItemIdx?: number) => {
    if (!dragPayload) return;

    setSections((prev) => {
      const next = prev.map((s) => ({ ...s, h5pIds: [...s.h5pIds] }));

      if (dragPayload.type === 'section') {
        const from = dragPayload.fromSecIdx;
        if (from === targetSecIdx || from < 0 || from >= next.length) return prev;
        const [movedSec] = next.splice(from, 1);
        next.splice(targetSecIdx, 0, movedSec);
        return next;
      }

      const exId = dragPayload.exerciseId;
      for (const s of next) {
        s.h5pIds = s.h5pIds.filter((id) => id !== exId);
      }

      const targetList = next[targetSecIdx].h5pIds;
      if (targetItemIdx === undefined || targetItemIdx < 0 || targetItemIdx > targetList.length) {
        targetList.push(exId);
      } else {
        targetList.splice(targetItemIdx, 0, exId);
      }
      return next;
    });

    setDragPayload(null);
    setDropTargetSecIdx(null);
    setDropTargetItemKey(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccessMsg('');
    try {
      const cleaned = sections.map((s) => ({ ...s, title: s.title.trim() }));
      const ids = cleaned.flatMap((s) => s.h5pIds);
      const res = await fetch('/api/teacher/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          studentIdParam
            ? { studentId: studentIdParam, sections: cleaned }
            : { className: classNameParam, sections: cleaned }
        ),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Fehler beim Speichern.');
      } else {
        setSuccessMsg(`Zuordnung gespeichert (${ids.length} ${ids.length === 1 ? 'Übung' : 'Übungen'}).`);
        setTimeout(() => setSuccessMsg(''), 4000);
      }
    } catch {
      setError('Netzwerkfehler beim Speichern.');
    } finally {
      setSaving(false);
    }
  };

  if (!classNameParam && !studentIdParam) {
    return (
      <SiteLayout>
        <div style={{ padding: '32px 24px', maxWidth: 1100, margin: '0 auto', width: '100%' }}>
          <p>Keine Klasse oder kein Schüler ausgewählt.</p>
          <Link href="/dashboard" className="admin-action-btn">← Zurück zum Lehrerbereich</Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div style={{ padding: '28px 24px 48px', maxWidth: 1240, margin: '0 auto', width: '100%' }}>
        {/* Kopfbereich */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
          <div>
            <Link href="/dashboard" style={{ fontSize: 13, color: 'var(--green-dark)', textDecoration: 'none', fontWeight: 600 }}>
              ← Zurück zum Lehrerbereich
            </Link>
            <h1 style={{ margin: '4px 0 2px', fontSize: 24, color: 'var(--green-dark)' }}>
              {studentIdParam ? (
                <>Übungen verwalten für Schüler <span style={{ fontFamily: 'monospace', background: '#f0f7eb', padding: '2px 8px', borderRadius: 4 }}>{studentCodeParam || studentIdParam}</span></>
              ) : (
                <>Übungen verwalten für Klasse „{classNameParam}“</>
              )}
            </h1>
            <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-muted)' }}>
              {studentIdParam
                ? 'Diese Übungen erhält nur dieser Schüler zusätzlich zu den Übungen seiner Klasse.'
                : 'Wähle links Übungen aus und ordne sie rechts per Drag & Drop in Bereiche (Ordner) ein.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Link href="/dashboard" className="admin-action-btn" style={{ padding: '9px 16px', fontSize: 13, textDecoration: 'none' }}>
              Abbrechen
            </Link>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || loading}
              className="dashboard-add-btn"
              style={{ padding: '9px 20px', fontSize: 14 }}
            >
              {saving ? 'Wird gespeichert...' : `Zuordnung speichern (${selectedIds.size})`}
            </button>
          </div>
        </div>

        {/* Kurzer Erklärungshinweis */}
        <div
          style={{
            background: '#f4f8ef',
            border: '1px solid #c8e4b6',
            borderRadius: 8,
            padding: '10px 14px',
            fontSize: 13,
            lineHeight: 1.5,
            marginBottom: 18,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px 18px',
          }}
        >
          <strong>So funktioniert’s:</strong>
          <span>1. Links Übung anhaken oder direkt nach rechts in einen Bereich ziehen.</span>
          <span>2. Rechts Bereiche (Ordner) anlegen und benennen, z. B. „Woche 1“ oder „Pflichtaufgaben“.</span>
          <span>3. Übungen und ganze Bereiche am Griff <strong>⠿</strong> packen und per Drag &amp; Drop umsortieren.</span>
        </div>

        {error && <p className="login-error" style={{ marginBottom: 14 }}>{error}</p>}
        {successMsg && (
          <div style={{ background: '#e6f4d7', border: '1px solid #a3d977', color: '#2e6b0e', padding: '10px 14px', borderRadius: 6, marginBottom: 14, fontWeight: 600, fontSize: 14 }}>
            ✓ {successMsg}
          </div>
        )}

        {loading ? (
          <p style={{ color: 'var(--text-muted)', padding: '32px 0' }}>Übungen werden geladen...</p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: 20,
              alignItems: 'start',
            }}
          >
            {/* LINKE SPALTE: Übungskatalog */}
            <section className="dashboard-section" style={{ margin: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                <h2 style={{ margin: 0, fontSize: 17 }}>1. Übungskatalog ({filteredCatalog.length})</h2>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button type="button" className="admin-action-btn" style={{ fontSize: 12, padding: '4px 9px' }} onClick={addFilteredExercises}>
                    Gefilterte hinzufügen
                  </button>
                  <button type="button" className="admin-action-btn" style={{ fontSize: 12, padding: '4px 9px' }} onClick={clearAllExercises}>
                    Alle abwählen
                  </button>
                </div>
              </div>

              {sections.length > 1 && (
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                  <span>Klick fügt hinzu zu:</span>
                  <select
                    className="login-input"
                    value={activeSectionId}
                    onChange={(e) => setActiveSectionId(e.target.value)}
                    style={{ width: 'auto', padding: '3px 8px', fontSize: 12 }}
                  >
                    {sections.map((s, idx) => (
                      <option key={s.id} value={s.id}>
                        {s.title || (idx === 0 ? 'Ohne Bereich' : `Bereich ${idx}`)}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                <input
                  type="text"
                  className="login-input"
                  placeholder="Übung oder Thema suchen..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ flex: 1, minWidth: 160 }}
                />
                <select
                  className="login-input"
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  style={{ width: 'auto', minWidth: 140 }}
                >
                  <option value="all">Alle Fächer</option>
                  {subjects.map((subj) => (
                    <option key={subj} value={subj}>{subj}</option>
                  ))}
                </select>
              </div>

              <div
                style={{
                  maxHeight: '64vh',
                  overflowY: 'auto',
                  border: '1px solid var(--border-light)',
                  borderRadius: 6,
                  padding: 6,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  background: 'var(--bg-white)',
                }}
              >
                {filteredCatalog.map((ex) => {
                  const isChecked = selectedIds.has(ex.id);
                  return (
                    <div
                      key={ex.id}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.effectAllowed = 'copyMove';
                        setDragPayload({ type: 'catalog', exerciseId: ex.id });
                      }}
                      onDragEnd={() => {
                        setDragPayload(null);
                        setDropTargetSecIdx(null);
                        setDropTargetItemKey(null);
                      }}
                      onClick={() => toggleExercise(ex.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '7px 10px',
                        borderRadius: 5,
                        background: isChecked ? '#f0f7eb' : 'transparent',
                        border: `1px solid ${isChecked ? '#c8e4b6' : 'transparent'}`,
                        cursor: 'grab',
                        fontSize: 13,
                        userSelect: 'none',
                      }}
                      title="Klicken zum Auswählen oder nach rechts in einen Bereich ziehen"
                    >
                      <span style={{ color: 'var(--text-muted)', fontSize: 14, cursor: 'grab' }} aria-hidden>⠿</span>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        style={{ cursor: 'pointer', width: 15, height: 15, pointerEvents: 'none' }}
                      />
                      <span
                        style={{
                          fontSize: 11,
                          background: 'var(--green-light)',
                          color: 'var(--green-dark)',
                          padding: '1px 6px',
                          borderRadius: 3,
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {ex.subject}
                      </span>
                      <span style={{ fontWeight: isChecked ? 600 : 400, flex: 1, color: isChecked ? 'var(--green-dark)' : 'inherit' }}>
                        {ex.title}
                      </span>
                      {ex.topicTitle && (
                        <span style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                          {ex.topicTitle}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* RECHTE SPALTE: Bereiche & Reihenfolge (Drag & Drop) */}
            <section className="dashboard-section" style={{ margin: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                <h2 style={{ margin: 0, fontSize: 17 }}>
                  2. Reihenfolge &amp; Bereiche ({selectedIds.size} {selectedIds.size === 1 ? 'Übung' : 'Übungen'})
                </h2>
                <button
                  type="button"
                  onClick={addSection}
                  className="admin-action-btn"
                  style={{ fontSize: 13, fontWeight: 600, padding: '5px 12px' }}
                >
                  + Neuer Bereich (Ordner)
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {sections.map((sec, si) => {
                  const isDropSec = dropTargetSecIdx === si && dropTargetItemKey === null;
                  return (
                    <div
                      key={sec.id}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDropTargetSecIdx(si);
                      }}
                      onDragLeave={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                          setDropTargetSecIdx((prev) => (prev === si ? null : prev));
                        }
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        handleDropOnSection(si);
                      }}
                      style={{
                        border: `2px ${isDropSec ? 'dashed var(--green-primary)' : 'solid var(--border-light)'}`,
                        borderRadius: 8,
                        background: isDropSec ? '#f0f7eb' : '#fafcf8',
                        transition: 'border-color 0.12s, background 0.12s',
                      }}
                    >
                      {/* Bereichs-Kopfzeile (selbst ziehbar zum Umsortieren ganzer Ordner) */}
                      <div
                        draggable
                        onDragStart={(e) => {
                          e.stopPropagation();
                          e.dataTransfer.effectAllowed = 'move';
                          setDragPayload({ type: 'section', fromSecIdx: si });
                        }}
                        onDragEnd={() => {
                          setDragPayload(null);
                          setDropTargetSecIdx(null);
                          setDropTargetItemKey(null);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '8px 10px',
                          borderBottom: '1px solid var(--border-light)',
                          background: '#ffffff',
                          borderRadius: '6px 6px 0 0',
                          cursor: 'grab',
                        }}
                      >
                        <span style={{ color: 'var(--text-muted)', fontSize: 15, cursor: 'grab' }} title="Bereich ziehen zum Verschieben">⠿</span>
                        <input
                          type="text"
                          className="login-input"
                          value={sec.title}
                          placeholder={si === 0 ? 'Ohne Bereich (allgemeine Liste) – oder Ordnernamen tippen' : 'Name des Bereichs (z. B. Woche 1)'}
                          onChange={(e) =>
                            setSections((prev) => prev.map((s, i) => (i === si ? { ...s, title: e.target.value } : s)))
                          }
                          style={{ flex: 1, padding: '5px 8px', fontSize: 13, fontWeight: 600 }}
                        />
                        <button type="button" className="admin-action-btn" style={{ fontSize: 11, padding: '2px 7px' }} disabled={si === 0} onClick={() => moveSection(si, -1)} title="Bereich nach oben">▲</button>
                        <button type="button" className="admin-action-btn" style={{ fontSize: 11, padding: '2px 7px' }} disabled={si === sections.length - 1} onClick={() => moveSection(si, 1)} title="Bereich nach unten">▼</button>
                        {si > 0 && (
                          <button
                            type="button"
                            className="dashboard-delete-btn"
                            style={{ fontSize: 12, padding: '2px 8px' }}
                            onClick={() => removeSection(si)}
                            title="Bereich löschen (Übungen bleiben im ersten Bereich erhalten)"
                          >
                            ×
                          </button>
                        )}
                      </div>

                      {/* Übungen im Bereich */}
                      <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 6, minHeight: 46 }}>
                        {sec.h5pIds.length === 0 ? (
                          <div style={{ padding: '10px 8px', fontSize: 12.5, color: 'var(--text-muted)', textAlign: 'center', border: '1px dashed var(--border-light)', borderRadius: 6 }}>
                            Ziehe Übungen von links oder aus einem anderen Bereich hierher.
                          </div>
                        ) : (
                          sec.h5pIds.map((id, ii) => {
                            const meta = catalogMap.get(id);
                            const itemKey = `${si}-${ii}`;
                            const isDropHere = dropTargetItemKey === itemKey && dragPayload?.type !== 'section';
                            return (
                              <div
                                key={id}
                                draggable
                                onDragStart={(e) => {
                                  e.stopPropagation();
                                  e.dataTransfer.effectAllowed = 'move';
                                  setDragPayload({ type: 'exercise', exerciseId: id, fromSecIdx: si, fromItemIdx: ii });
                                }}
                                onDragEnd={() => {
                                  setDragPayload(null);
                                  setDropTargetSecIdx(null);
                                  setDropTargetItemKey(null);
                                }}
                                onDragOver={(e) => {
                                  if (dragPayload?.type === 'section') return;
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setDropTargetSecIdx(si);
                                  setDropTargetItemKey(itemKey);
                                }}
                                onDrop={(e) => {
                                  if (dragPayload?.type === 'section') return;
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleDropOnSection(si, ii);
                                }}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 8,
                                  padding: '7px 10px',
                                  background: '#ffffff',
                                  border: `1px solid ${isDropHere ? 'var(--green-primary)' : 'var(--border-light)'}`,
                                  borderTop: isDropHere ? '3px solid var(--green-primary)' : undefined,
                                  borderRadius: 6,
                                  fontSize: 13,
                                  cursor: 'grab',
                                }}
                              >
                                <span style={{ color: 'var(--text-muted)', fontSize: 14, cursor: 'grab' }} title="Ziehen zum Verschieben">⠿</span>
                                <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, minWidth: 20 }}>
                                  {ii + 1}.
                                </span>
                                {meta?.subject && (
                                  <span style={{ fontSize: 10.5, background: 'var(--green-light)', color: 'var(--green-dark)', padding: '1px 5px', borderRadius: 3, fontWeight: 600 }}>
                                    {meta.subject}
                                  </span>
                                )}
                                <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }} title={meta?.title || id}>
                                  {meta?.title || `Übung ${id}`}
                                </span>
                                <button type="button" className="admin-action-btn" style={{ fontSize: 11, padding: '1px 6px' }} disabled={si === 0 && ii === 0} onClick={() => moveExercise(si, ii, -1)} title="Nach oben">▲</button>
                                <button type="button" className="admin-action-btn" style={{ fontSize: 11, padding: '1px 6px' }} disabled={si === sections.length - 1 && ii === sec.h5pIds.length - 1} onClick={() => moveExercise(si, ii, 1)} title="Nach unten">▼</button>
                                <button
                                  type="button"
                                  className="dashboard-delete-btn"
                                  style={{ fontSize: 12, padding: '1px 7px' }}
                                  onClick={() => toggleExercise(id)}
                                  title="Übung entfernen"
                                >
                                  ×
                                </button>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}

export default function UebungenVerwaltenPage() {
  return (
    <Suspense fallback={<SiteLayout><div style={{ padding: 32, textAlign: 'center' }}>Lädt...</div></SiteLayout>}>
      <UebungenPageInner />
    </Suspense>
  );
}
