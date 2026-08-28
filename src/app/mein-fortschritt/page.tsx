'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SiteLayout } from '@/components/SiteLayout';
import { useLanguage } from '@/context/LanguageContext';
import { Clock, BookOpen, Award, ArrowRight } from 'lucide-react';

interface ProgressEntry {
  h5pId: string;
  h5pTitle: string;
  score: number;
  updatedAt: string;
}

interface AssignedExercise {
  id: string;
  title: string;
  subject: string;
  subjectSlug: string;
  topicTitle: string;
  topicSlug: string;
  url: string;
  completed: boolean;
  score: number | null;
  updatedAt: string | null;
}

export default function MeinFortschrittPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [assignments, setAssignments] = useState<AssignedExercise[]>([]);
  const [className, setClassName] = useState('');
  const [loading, setLoading] = useState(true);
  const [studentCode, setStudentCode] = useState('');

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => {
        if (!data.user || data.user.role !== 'student') {
          router.replace('/');
        } else {
          setStudentCode(data.user.code || '');
        }
      })
      .catch(() => router.replace('/'));
  }, [router]);

  useEffect(() => {
    Promise.all([
      fetch('/api/student/progress').then((r) => r.json()),
      fetch('/api/student/assignments').then((r) => r.json()),
    ])
      .then(([progressData, assignmentsData]) => {
        setProgress(progressData.progress || []);
        setAssignments(assignmentsData.assignments || []);
        setClassName(assignmentsData.className || '');
      })
      .catch(() => {
        setProgress([]);
        setAssignments([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const completedAssignmentsCount = assignments.filter((a) => a.completed).length;
  const assignmentPercentage = assignments.length > 0
    ? Math.round((completedAssignmentsCount / assignments.length) * 100)
    : 0;

  const localeStr = language === 'en' ? 'en-US' : language === 'fr' ? 'fr-FR' : language === 'es' ? 'es-ES' : language === 'it' ? 'it-IT' : 'de-DE';

  const completedRatioText = t.completedOfTotalTasks
    .replace('{total}', String(assignments.length))
    .replace('{percent}', String(assignmentPercentage));

  return (
    <SiteLayout>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 20px', width: '100%' }}>
        
        {/* Title Header */}
        <div style={{ marginBottom: 24, borderBottom: '1px solid var(--border-light, #e2e8f0)', paddingBottom: 16 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--green-dark, #0f766e)', margin: '0 0 6px 0' }}>
            {t.myProgressTitle}
          </h1>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <p style={{ color: 'var(--text-muted, #64748b)', margin: 0, fontSize: 13.5 }}>
              {t.studentCodeLabel}{' '}
              <strong style={{ fontFamily: 'monospace', fontSize: 15, color: 'var(--green-dark, #0f766e)', background: 'var(--green-light, #e6f4f1)', padding: '2px 8px', borderRadius: 4 }}>
                {studentCode}
              </strong>
            </p>
            {className && (
              <span
                style={{
                  fontSize: 12,
                  background: 'var(--green-light, #e6f4f1)',
                  color: 'var(--green-dark, #0f766e)',
                  border: '1px solid var(--green-border, #a7f3d0)',
                  padding: '2px 8px',
                  borderRadius: 4,
                  fontWeight: 600,
                }}
              >
                {t.classLabel} {className}
              </span>
            )}
          </div>
        </div>

        {loading ? (
          <p style={{ color: 'var(--text-muted, #64748b)', padding: '20px 0' }}>{t.progressLoading}</p>
        ) : (
          <>
            {/* 1. Zugewiesene Übungen der Lehrperson */}
            <div className="h5p-player-card" style={{ marginBottom: 28, padding: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
                <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: 'var(--green-dark, #0f766e)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <BookOpen style={{ width: 18, height: 18 }} />
                  <span>{t.assignedTasksForClass} {className ? `(${className})` : ''}</span>
                </h2>
                {assignments.length > 0 && (
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: completedAssignmentsCount === assignments.length ? '#15803d' : 'var(--green-dark, #0f766e)',
                    }}
                  >
                    {completedAssignmentsCount} {completedRatioText}
                  </span>
                )}
              </div>

              {assignments.length > 0 && (
                <div
                  style={{
                    width: '100%',
                    height: 8,
                    background: '#e2e8f0',
                    borderRadius: 4,
                    overflow: 'hidden',
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      width: `${assignmentPercentage}%`,
                      height: '100%',
                      background: completedAssignmentsCount === assignments.length ? '#16a34a' : 'var(--green-primary, #0f766e)',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
              )}

              {assignments.length === 0 ? (
                <p style={{ color: 'var(--text-muted, #64748b)', fontSize: 13.5, margin: 0 }}>
                  {t.noAssignedTasksYet}
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {assignments.map((item, idx) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 12,
                        padding: '12px 16px',
                        background: item.completed ? '#f0fdf4' : '#ffffff',
                        border: `1.5px solid ${item.completed ? '#86efac' : 'var(--border-light, #e2e8f0)'}`,
                        borderRadius: 6,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0, flex: 1 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted, #64748b)', minWidth: 24 }}>
                          #{idx + 1}
                        </span>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 2 }}>
                            <span
                              style={{
                                fontSize: 11,
                                background: 'var(--green-light, #e6f4f1)',
                                color: 'var(--green-dark, #0f766e)',
                                padding: '1px 6px',
                                borderRadius: 3,
                                fontWeight: 700,
                              }}
                            >
                              {item.subject}
                            </span>
                            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--green-dark, #0f766e)' }}>
                              {item.title}
                            </span>
                          </div>
                          {item.topicTitle && (
                            <div style={{ fontSize: 12, color: 'var(--text-muted, #64748b)' }}>
                              {item.topicTitle}
                            </div>
                          )}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                        {item.completed ? (
                          <span
                            style={{
                              background: (item.score ?? 0) >= 80 ? '#dcfce7' : (item.score ?? 0) >= 50 ? '#fef3c7' : '#fee2e2',
                              color: (item.score ?? 0) >= 80 ? '#166534' : (item.score ?? 0) >= 50 ? '#92400e' : '#991b1b',
                              fontSize: 12,
                              fontWeight: 700,
                              padding: '3px 8px',
                              borderRadius: 4,
                            }}
                          >
                            {t.alreadyCompleted} {item.score} %
                          </span>
                        ) : (
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 600,
                              color: '#64748b',
                              background: '#f1f5f9',
                              padding: '3px 8px',
                              borderRadius: 4,
                            }}
                          >
                            {t.openTask}
                          </span>
                        )}

                        <Link
                          href={item.url}
                          style={{
                            fontSize: 13,
                            padding: '6px 14px',
                            background: item.completed ? 'var(--green-light, #e6f4f1)' : 'var(--green-primary, #0f766e)',
                            color: item.completed ? 'var(--green-dark, #0f766e)' : '#ffffff',
                            borderRadius: 5,
                            textDecoration: 'none',
                            fontWeight: 600,
                          }}
                        >
                          {item.completed ? t.practiceAgain : t.startExercise}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Alle bisher bearbeiteten Übungen */}
            <div className="h5p-player-card" style={{ padding: 22 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--green-dark, #0f766e)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Award style={{ width: 18, height: 18 }} />
                <span>{t.allPracticedExercises} ({progress.length})</span>
              </h2>

              {progress.length === 0 ? (
                <div>
                  <p style={{ color: 'var(--text-muted, #64748b)', fontSize: 13.5 }}>
                    {t.noPracticedExercisesYet}
                  </p>
                  <Link href="/" style={{ color: 'var(--green-dark, #0f766e)', marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: 13.5 }}>
                    <span>{t.allTopicsLink}</span>
                    <ArrowRight style={{ width: 14, height: 14 }} />
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {progress.map((p) => {
                    const dateStr = p.updatedAt
                      ? new Date(p.updatedAt).toLocaleDateString(localeStr, {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : '';

                    return (
                      <div
                        key={p.h5pId}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: 10,
                          padding: '10px 14px',
                          border: '1px solid var(--border-light, #e2e8f0)',
                          borderRadius: 6,
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--green-dark, #0f766e)' }}>
                            {p.h5pTitle || p.h5pId}
                          </div>
                          {dateStr && (
                            <div style={{ fontSize: 12, color: 'var(--text-muted, #64748b)', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                              <Clock style={{ width: 12, height: 12 }} />
                              <span>{t.lastWorkedOn} {dateStr}</span>
                            </div>
                          )}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span
                            style={{
                              background: p.score >= 80 ? '#dcfce7' : p.score >= 50 ? '#fef3c7' : '#fee2e2',
                              color: p.score >= 80 ? '#166534' : p.score >= 50 ? '#92400e' : '#991b1b',
                              fontSize: 12,
                              fontWeight: 700,
                              padding: '3px 8px',
                              borderRadius: 4,
                            }}
                          >
                            {p.score} %
                          </span>

                          <Link
                            href={`/${p.h5pId}`}
                            style={{
                              fontSize: 12.5,
                              padding: '5px 12px',
                              background: 'var(--green-light, #e6f4f1)',
                              color: 'var(--green-dark, #0f766e)',
                              borderRadius: 4,
                              textDecoration: 'none',
                              fontWeight: 600,
                            }}
                          >
                            {t.btnOpen}
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </SiteLayout>
  );
}
