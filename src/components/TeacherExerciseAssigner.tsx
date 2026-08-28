'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface TeacherExerciseAssignerProps {
  exerciseId: string;
  exerciseTitle?: string;
}

interface ClassItem {
  name: string;
  studentCount: number;
  assigned: boolean;
}

export default function TeacherExerciseAssigner({
  exerciseId,
  exerciseTitle,
}: TeacherExerciseAssignerProps) {
  const { t } = useLanguage();
  const [isTeacher, setIsTeacher] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<Set<string>>(new Set());
  const [assignedClassNames, setAssignedClassNames] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Extract clean ID (e.g. slug)
  const cleanId = exerciseId
    ? exerciseId.replace(/^\/h5p-content\//, '').replace(/^\//, '').trim()
    : '';

  // Check if current user is teacher
  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => {
        if (data.user && data.user.role === 'teacher') {
          setIsTeacher(true);
        } else {
          setIsTeacher(false);
        }
      })
      .catch(() => setIsTeacher(false))
      .finally(() => setLoadingAuth(false));
  }, []);

  const loadStatus = useCallback(async () => {
    if (!cleanId || !isTeacher) return;
    try {
      const res = await fetch(`/api/teacher/assign-exercise?exerciseId=${encodeURIComponent(cleanId)}`);
      if (res.ok) {
        const data = await res.json();
        setClasses(data.classes || []);
        const assigned: string[] = data.assignedClasses || [];
        setAssignedClassNames(assigned);
        setSelectedClasses(new Set(assigned));
      }
    } catch {
      // ignore
    }
  }, [cleanId, isTeacher]);

  useEffect(() => {
    if (isTeacher) {
      loadStatus();
    }
  }, [isTeacher, loadStatus]);

  const openModal = async () => {
    setModalOpen(true);
    setLoadingData(true);
    try {
      const res = await fetch(`/api/teacher/assign-exercise?exerciseId=${encodeURIComponent(cleanId)}`);
      if (res.ok) {
        const data = await res.json();
        setClasses(data.classes || []);
        const assigned: string[] = data.assignedClasses || [];
        setAssignedClassNames(assigned);
        setSelectedClasses(new Set(assigned));
      }
    } catch {
      // ignore
    } finally {
      setLoadingData(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccessMsg('');
    try {
      const classNames = Array.from(selectedClasses);
      const res = await fetch('/api/teacher/assign-exercise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exerciseId: cleanId,
          classNames,
        }),
      });
      if (res.ok) {
        setAssignedClassNames(classNames);
        setSuccessMsg(
          classNames.length > 0
            ? `${t.assignmentSavedSuccess} ${classNames.join(', ')}`
            : t.assignmentClearedSuccess
        );
        setTimeout(() => {
          setSuccessMsg('');
          setModalOpen(false);
        }, 1200);
      }
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  if (loadingAuth || !isTeacher || !cleanId) {
    return null;
  }

  return (
    <>
      <div
        style={{
          background: 'var(--bg-white, #ffffff)',
          border: '1.5px solid var(--green-primary, #0f766e)',
          borderRadius: 6,
          padding: '10px 16px',
          marginBottom: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 10,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              background: 'var(--green-light, #e6f4f1)',
              color: 'var(--green-dark, #0f766e)',
              border: '1px solid var(--green-border, #a7f3d0)',
              padding: '3px 8px',
              borderRadius: 4,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {t.teacherBadge}
          </span>
          <span style={{ fontSize: 13, color: 'var(--text-color, #1e293b)' }}>
            {assignedClassNames.length > 0 ? (
              <>
                {t.assignedTo}{' '}
                <strong style={{ color: 'var(--green-dark, #0f766e)' }}>
                  {assignedClassNames.join(', ')}
                </strong>
              </>
            ) : (
              <span style={{ color: 'var(--text-muted, #64748b)' }}>
                {t.notAssignedYet}
              </span>
            )}
          </span>
        </div>

        <button
          type="button"
          onClick={openModal}
          className="dashboard-add-btn"
          style={{
            fontSize: 13,
            padding: '6px 14px',
            background: 'var(--green-primary, #0f766e)',
            color: '#ffffff',
            borderRadius: 5,
            fontWeight: 600,
            cursor: 'pointer',
            border: 'none',
          }}
        >
          {t.btnAssignToStudents}
        </button>
      </div>

      {modalOpen && (
        <div
          className="login-modal-overlay"
          onClick={() => {
            if (!saving) setModalOpen(false);
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
                if (!saving) setModalOpen(false);
              }}
              aria-label={t.btnCancel}
              disabled={saving}
            >
              &times;
            </button>

            <div className="login-modal-body" style={{ padding: '24px 22px 20px' }}>
              <h2 className="login-modal-title" style={{ fontSize: 18, marginBottom: 4 }}>
                {t.assignModalTitle}
              </h2>
              <p className="login-modal-subtitle" style={{ fontSize: 13, marginBottom: 14 }}>
                {exerciseTitle ? <strong>{exerciseTitle}</strong> : `Übung ${cleanId}`}
              </p>

              {successMsg && (
                <div
                  style={{
                    background: '#f0f7eb',
                    border: '1px solid #c8e4b6',
                    color: 'var(--green-dark, #0f766e)',
                    padding: '8px 12px',
                    borderRadius: 4,
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 12,
                  }}
                >
                  {successMsg}
                </div>
              )}

              {loadingData ? (
                <p style={{ color: 'var(--text-muted, #64748b)', fontSize: 13, padding: '16px 0' }}>
                  {t.loading}
                </p>
              ) : classes.length === 0 ? (
                <div style={{ padding: '12px 0' }}>
                  <p style={{ color: 'var(--text-muted, #64748b)', fontSize: 13 }}>
                    {t.noClassesYet}
                  </p>
                  <a
                    href="/dashboard"
                    className="button-link"
                    style={{ fontSize: 12, marginTop: 6, display: 'inline-block' }}
                  >
                    {t.goToDashboardLink}
                  </a>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, fontSize: 12 }}>
                    <span style={{ color: 'var(--text-muted, #64748b)' }}>
                      {t.selectClassesPrompt}
                    </span>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        type="button"
                        className="admin-action-btn"
                        style={{ fontSize: 11, padding: '2px 6px' }}
                        onClick={() => setSelectedClasses(new Set(classes.map((c) => c.name)))}
                      >
                        {t.selectAll}
                      </button>
                      <button
                        type="button"
                        className="admin-action-btn"
                        style={{ fontSize: 11, padding: '2px 6px' }}
                        onClick={() => setSelectedClasses(new Set())}
                      >
                        {t.selectNone}
                      </button>
                    </div>
                  </div>

                  <div
                    style={{
                      maxHeight: 220,
                      overflowY: 'auto',
                      border: '1px solid var(--border-light, #e2e8f0)',
                      borderRadius: 6,
                      padding: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                      marginBottom: 16,
                    }}
                  >
                    {classes.map((c) => {
                      const isChecked = selectedClasses.has(c.name);
                      return (
                        <label
                          key={c.name}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 10px',
                            borderRadius: 4,
                            background: isChecked ? '#f0f7eb' : 'transparent',
                            cursor: 'pointer',
                            fontSize: 13,
                            userSelect: 'none',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                const next = new Set(selectedClasses);
                                if (e.target.checked) next.add(c.name);
                                else next.delete(c.name);
                                setSelectedClasses(next);
                              }}
                              style={{ width: 16, height: 16, cursor: 'pointer' }}
                            />
                            <span style={{ fontWeight: isChecked ? 700 : 500, color: isChecked ? 'var(--green-dark, #0f766e)' : 'inherit' }}>
                              {t.classItemLabel} {c.name}
                            </span>
                          </div>
                          <span style={{ fontSize: 12, color: 'var(--text-muted, #64748b)' }}>
                            {c.studentCount} {t.studentsCountLabel}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      className="admin-action-btn"
                      onClick={() => setModalOpen(false)}
                      disabled={saving}
                      style={{ padding: '7px 14px', fontSize: 13 }}
                    >
                      {t.btnCancel}
                    </button>
                    <button
                      type="button"
                      className="dashboard-add-btn"
                      onClick={handleSave}
                      disabled={saving}
                      style={{
                        padding: '7px 16px',
                        fontSize: 13,
                        background: 'var(--green-primary, #0f766e)',
                        color: '#ffffff',
                        borderRadius: 5,
                        fontWeight: 600,
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      {saving ? t.btnSaving : t.btnSaveAssignment}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
