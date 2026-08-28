'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ModuleItem } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import TeacherExerciseAssigner from './TeacherExerciseAssigner';
import { 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle,
  Award
} from 'lucide-react';

interface H5PPlayerProps {
  module: ModuleItem;
  showTitle?: boolean;
  onComplete?: () => void;
}

interface SavedResult {
  raw: number;
  max: number;
  scaled?: number;
  completed: boolean;
  success?: boolean;
  timestamp: string;
}

export function H5PPlayer({ module, showTitle = false, onComplete }: H5PPlayerProps) {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [showResetModal, setShowResetModal] = useState(false);
  const [h5pStatus, setH5pStatus] = useState<'loading' | 'ready' | 'waiting_package'>('loading');
  const [hasRestoredNotice, setHasRestoredNotice] = useState(false);
  const [savedResult, setSavedResult] = useState<SavedResult | null>(null);

  const storageKey = `atw_h5p_state_${module.slug || module.id}`;
  const resultStorageKey = `atw_h5p_result_${module.slug || module.id}`;

  // Load any previously saved result on mount (localStorage + server)
  useEffect(() => {
    try {
      const storedRes = localStorage.getItem(resultStorageKey);
      if (storedRes) {
        setSavedResult(JSON.parse(storedRes));
      }
    } catch (e) {}

    // Check server progress for student
    fetch(`/api/student/progress?h5pId=${encodeURIComponent(module.slug || module.id)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.entry?.score !== undefined) {
          setSavedResult((prev) => ({
            raw: data.entry.score,
            max: 100,
            completed: true,
            timestamp: data.entry.updatedAt || new Date().toISOString(),
            ...prev,
          }));
        }
      })
      .catch(() => {});
  }, [module.slug, module.id, resultStorageKey]);

  // Initialize H5P Standalone Player with PDF manual specifications
  useEffect(() => {
    let isMounted = true;
    let saveInterval: NodeJS.Timeout | null = null;

    async function initH5P() {
      if (!containerRef.current) return;
      setH5pStatus('loading');
      
      try {
        const { H5P } = await import('h5p-standalone');
        const h5pPath = `/h5p-content/${module.slug}`;
        
        // Verify that h5p.json exists
        const checkRes = await fetch(`${h5pPath}/h5p.json`);
        if (checkRes.ok && isMounted && containerRef.current) {
          containerRef.current.innerHTML = '';
          
          let savedProgress: any = null;
          try {
            const stored = localStorage.getItem(storageKey);
            if (stored) {
              savedProgress = JSON.parse(stored);
            }
          } catch (e) {}

          // Fallback to server-saved state for logged-in students if no local storage
          if (!savedProgress) {
            try {
              const apiRes = await fetch(`/api/student/progress?h5pId=${encodeURIComponent(module.slug || module.id)}`);
              if (apiRes.ok) {
                const apiData = await apiRes.json();
                if (apiData.entry?.state) {
                  savedProgress = typeof apiData.entry.state === 'string'
                    ? JSON.parse(apiData.entry.state)
                    : apiData.entry.state;
                  localStorage.setItem(storageKey, JSON.stringify(savedProgress));
                }
              }
            } catch (e) {}
          }

          if (savedProgress && isMounted) {
            setHasRestoredNotice(true);
            setTimeout(() => {
              if (isMounted) setHasRestoredNotice(false);
            }, 3500);
          }

          // Options according to PDF Entwickler-Handbuch (Kapitel 5 & 7)
          const options = {
            h5pJsonPath: h5pPath,
            librariesPath: '/h5p-libraries',
            frameJs: '/h5p-core/frame.bundle.js',
            frameCss: '/h5p-core/styles/h5p.css',
            saveFreq: 1, // Wichtig: Aktiviert Zustandsverwaltung im H5P-Kern!
            contentUserData: savedProgress ? [{ state: JSON.stringify(savedProgress) }] : undefined,
          };
          
          await new H5P(containerRef.current, options);
          
          if (!isMounted) return;
          setH5pStatus('ready');

          // PDF Handbuch Schritt 3: Nach Laden von altem Zustand automatisch 'Überprüfen' klicken
          if (savedProgress) {
            setTimeout(() => {
              try {
                const iframe = containerRef.current?.querySelector('iframe');
                const doc = iframe?.contentDocument || (iframe?.contentWindow as any)?.document;
                doc?.querySelectorAll('.h5p-question-check-answer, button').forEach((b: any) => {
                  if (
                    b.textContent?.toLowerCase().includes('überprüfen') || 
                    b.textContent?.toLowerCase().includes('check') ||
                    b.classList?.contains('h5p-question-check-answer')
                  ) {
                    b.click();
                  }
                });
              } catch (e) {}
            }, 400);
          }

          // Attach xAPI and state tracking listeners
          const attachListeners = () => {
            try {
              const iframe = containerRef.current?.querySelector('iframe');
              const iframeWin = iframe?.contentWindow as any;

              if (iframeWin && iframeWin.H5P && iframeWin.H5P.externalDispatcher) {
                iframeWin.H5P.externalDispatcher.on('xAPI', (event: any) => {
                  // 1. Save state to localStorage & API
                  let stateToSave: any = null;
                  if (iframeWin.H5P.instances && iframeWin.H5P.instances[0]) {
                    try {
                      const state = iframeWin.H5P.instances[0].getCurrentState();
                      if (state !== undefined && state !== null) {
                        stateToSave = state;
                        localStorage.setItem(storageKey, JSON.stringify(state));
                      }
                    } catch (err) {}
                  }

                  // 2. Track score & completion results (Ergebnisverfolgung)
                  const verb = event.getVerb ? event.getVerb() : event.data?.statement?.verb?.id;
                  const result = event.data?.statement?.result;

                  if (result && result.score) {
                    const resultData: SavedResult = {
                      raw: result.score.raw ?? 0,
                      max: result.score.max ?? 0,
                      scaled: result.score.scaled,
                      completed: verb === 'completed' || verb?.includes('completed') || result.completion === true,
                      success: result.success,
                      timestamp: new Date().toISOString()
                    };
                    try {
                      localStorage.setItem(resultStorageKey, JSON.stringify(resultData));
                      if (isMounted) setSavedResult(resultData);
                    } catch (e) {}

                    // Post to student progress API
                    fetch('/api/student/progress', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        courseId: module.slug || module.id,
                        courseTitle: module.title?.de || module.title?.en || module.slug,
                        totalExercises: 1,
                        exerciseId: module.slug || module.id,
                        h5pId: module.slug || module.id,
                        h5pTitle: module.title?.de || module.title?.en || module.slug,
                        score: typeof result.score.scaled === 'number' ? result.score.scaled : (result.score.max ? result.score.raw / result.score.max : undefined),
                        state: stateToSave ? JSON.stringify(stateToSave) : undefined,
                      }),
                    }).catch(() => {});

                    if (onComplete && (resultData.completed || resultData.success)) {
                      onComplete();
                    }
                  }
                });
              }
            } catch (e) {}
          };

          setTimeout(attachListeners, 500);
          setTimeout(attachListeners, 1500);

          // Periodic state-saver to ensure progress is never lost during interaction
          saveInterval = setInterval(() => {
            try {
              const iframe = containerRef.current?.querySelector('iframe');
              const iframeWin = iframe?.contentWindow as any;
              if (iframeWin?.H5P?.instances?.[0]) {
                const state = iframeWin.H5P.instances[0].getCurrentState();
                if (state !== undefined && state !== null) {
                  localStorage.setItem(storageKey, JSON.stringify(state));
                }
              }
            } catch (e) {}
          }, 2000);

        } else {
          if (isMounted) setH5pStatus('waiting_package');
        }
      } catch (err) {
        console.error('H5P initialization error:', err);
        if (isMounted) setH5pStatus('waiting_package');
      }
    }

    initH5P();

    return () => {
      isMounted = false;
      if (saveInterval) clearInterval(saveInterval);
    };
  }, [module.slug, storageKey, resultStorageKey, onComplete]);

  // Reset Progress according to PDF Checklist item 5
  const handleReset = () => {
    try {
      localStorage.removeItem(storageKey);
      localStorage.removeItem(resultStorageKey);
    } catch (e) {}
    setSavedResult(null);
    setShowResetModal(false);
    
    // Reload player instance
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      window.location.reload();
    }
  };

  const currentTitle = module.title[language] || module.title.de || 'Lerneinheit';

  return (
    <div 
      className="h5p-player-card"
      style={{
        background: 'var(--bg-white)',
        border: '1px solid var(--border-light)',
        borderRadius: '6px',
        padding: '20px',
        margin: '16px 0',
        position: 'relative'
      }}
    >
      {/* Teacher Exercise Assigner bar (only shown if logged in as teacher) */}
      <TeacherExerciseAssigner
        exerciseId={module.slug || module.id}
        exerciseTitle={currentTitle}
      />
      
      {/* State Restored Toast Notification */}
      {hasRestoredNotice && (
        <div style={{
          marginBottom: 14,
          padding: '10px 14px',
          background: 'var(--green-light)',
          border: '1px solid var(--green-border)',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: '13px',
          color: 'var(--green-dark)',
          fontWeight: 600
        }}>
          <CheckCircle2 style={{ width: 16, height: 16, flexShrink: 0 }} />
          <span>{t.stateSavedNotice || 'Ihr bisheriger Bearbeitungsstand wurde geladen.'}</span>
        </div>
      )}

      {/* Header Controls */}
      {showTitle ? (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 10,
          marginBottom: 14,
          paddingBottom: 10,
          borderBottom: '1px solid var(--border-light)'
        }}>
          <h3 style={{
            fontSize: '17px',
            color: 'var(--green-dark)',
            margin: 0,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            <span>{currentTitle}</span>
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Ergebnisverfolgung Badge */}
            {savedResult && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                background: 'var(--green-light)',
                color: 'var(--green-dark)',
                border: '1px solid var(--green-border)',
                borderRadius: 4,
                padding: '4px 8px',
                fontSize: '12px',
                fontWeight: 600
              }}>
                <Award style={{ width: 14, height: 14 }} />
                <span>
                  {t.scoreLabel || 'Ergebnis:'} {savedResult.raw} / {savedResult.max} {t.scorePoints || 'Punkte'}
                  {savedResult.completed && ` (${t.scoreCompleted || 'Abgeschlossen'})`}
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'var(--bg-white)',
                color: 'var(--text-color)',
                border: '1px solid var(--border-light)',
                borderRadius: 4,
                padding: '6px 12px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              title="Übungsstand zurücksetzen"
            >
              <RotateCcw style={{ width: 14, height: 14, color: 'var(--green-dark)', flexShrink: 0 }} />
              <span>{t.btnRestart || 'Neu starten'}</span>
            </button>
          </div>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10
        }}>
          {/* Ergebnisverfolgung Badge */}
          {savedResult ? (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              background: 'var(--green-light)',
              color: 'var(--green-dark)',
              border: '1px solid var(--green-border)',
              borderRadius: 4,
              padding: '3px 8px',
              fontSize: '12px',
              fontWeight: 600
            }}>
              <Award style={{ width: 13, height: 13 }} />
              <span>
                {t.scoreLabel || 'Ergebnis:'} {savedResult.raw} / {savedResult.max} {t.scorePoints || 'Punkte'}
              </span>
            </div>
          ) : <div />}

          <button
            type="button"
            onClick={() => setShowResetModal(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'var(--bg-white)',
              color: 'var(--text-color)',
              border: '1px solid var(--border-light)',
              borderRadius: 4,
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            title="Übungsstand zurücksetzen"
          >
            <RotateCcw style={{ width: 13, height: 13, color: 'var(--green-dark)', flexShrink: 0 }} />
            <span>{t.btnRestart || 'Neu starten'}</span>
          </button>
        </div>
      )}

      {/* Loading State Skeleton */}
      {h5pStatus === 'loading' && (
        <div style={{
          padding: '40px 20px',
          textAlign: 'center',
          color: 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12
        }}>
          <div style={{
            width: 36,
            height: 36,
            border: '3px solid var(--border-light)',
            borderTopColor: 'var(--green-dark)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <span style={{ fontSize: '14px', fontWeight: 500 }}>
            {t.loading || 'Interaktive H5P-Lerneinheit wird vorbereitet...'}
          </span>
        </div>
      )}

      {/* Package Waiting State */}
      {h5pStatus === 'waiting_package' && (
        <div style={{
          padding: '30px 20px',
          textAlign: 'center',
          background: 'var(--bg-body)',
          borderRadius: 6,
          border: '1px dashed var(--border-light)',
          color: 'var(--text-muted)'
        }}>
          <AlertCircle style={{ width: 32, height: 32, margin: '0 auto 10px auto', color: 'var(--green-dark)' }} />
          <h4 style={{ fontSize: '15px', color: 'var(--text-color)', margin: '0 0 6px 0', fontWeight: 600 }}>
            Lernmodul bereit
          </h4>
          <p style={{ fontSize: '13px', margin: 0, color: 'var(--text-muted)' }}>
            Die interaktive H5P-Komponente für „{currentTitle}“ ist verknüpft.
          </p>
        </div>
      )}

      {/* H5P Container Frame */}
      <div 
        ref={containerRef} 
        className="h5p-standalone-container"
        style={{
          width: '100%',
          minHeight: h5pStatus === 'ready' ? '400px' : '0px',
          display: h5pStatus === 'ready' ? 'block' : 'none'
        }}
      />

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '16px'
          }}
          role="dialog"
          aria-modal="true"
        >
          <div style={{
            background: 'var(--bg-white)',
            borderRadius: 8,
            padding: '24px',
            maxWidth: '420px',
            width: '100%',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ fontSize: '17px', color: 'var(--text-color)', margin: '0 0 10px 0', fontWeight: 700 }}>
              {t.resetModalTitle || 'Bearbeitungsstand zurücksetzen?'}
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: 1.5, margin: '0 0 20px 0' }}>
              {t.resetModalDesc || 'Möchten Sie Ihren bisherigen Lernfortschritt für dieses Modul wirklich löschen und von vorne beginnen?'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="nav-btn"
                style={{ cursor: 'pointer', padding: '8px 14px', borderRadius: 4 }}
              >
                {t.btnCancel || 'Abbrechen'}
              </button>
              <button
                type="button"
                onClick={handleReset}
                style={{
                  background: 'var(--green-dark)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4,
                  padding: '8px 16px',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                {t.btnConfirmReset || 'Ja, zurücksetzen'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
