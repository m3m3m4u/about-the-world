'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  BiologieItem,
  ALL_ANIMALS,
  ANIMAL_CLASSES,
  AnimalClassInfo,
  getBiologyImageUrl,
  getItemName,
} from '@/data/biology_data';
import {
  Trophy,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  Flame,
} from 'lucide-react';

interface ClassificationQuestion {
  item: BiologieItem;
  options: AnimalClassInfo[];
  correctClass: AnimalClassInfo;
  isRepeat?: boolean;
}

interface HighscoreItem {
  id?: string;
  name: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  categories: string[];
  timeSpentSeconds?: number;
  createdAt: string;
}

const LOCAL_STORAGE_HS_KEY = 'atw_biology_classification_highscores';
const LOCAL_STORAGE_NAME_KEY = 'atw_flagquiz_player_name';
const REPEAT_INTERVAL = 3;

export function BiologyClassificationQuiz() {
  const { t, language } = useLanguage();

  // -------------------------------------------------------------
  // Game Setup State
  // -------------------------------------------------------------
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(10);
  const [gameState, setGameState] = useState<'config' | 'playing' | 'result'>('config');

  // -------------------------------------------------------------
  // Game Play State
  // -------------------------------------------------------------
  const [currentQuestion, setCurrentQuestion] = useState<ClassificationQuestion | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [targetQuestionCount, setTargetQuestionCount] = useState<number>(10);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [wrongCount, setWrongCount] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState<number>(0);

  const wrongQueue = useRef<BiologieItem[]>([]);
  const missedItems = useRef<BiologieItem[]>([]);
  const questionsSinceRepeat = useRef<number>(0);

  // -------------------------------------------------------------
  // Highscore State
  // -------------------------------------------------------------
  const [playerName, setPlayerName] = useState<string>('');
  const [highscores, setHighscores] = useState<HighscoreItem[]>([]);
  const [isSavingHs, setIsSavingHs] = useState<boolean>(false);
  const [hasSavedHs, setHasSavedHs] = useState<boolean>(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Load saved player name
  useEffect(() => {
    try {
      const savedName = localStorage.getItem(LOCAL_STORAGE_NAME_KEY);
      if (savedName) setPlayerName(savedName);
    } catch {}
    fetchHighscores();
  }, []);

  const fetchHighscores = async () => {
    try {
      const res = await fetch('/api/biologie/highscore?category=tierart-quiz');
      if (res.ok) {
        const data = await res.json();
        if (data.highscores && Array.isArray(data.highscores)) {
          setHighscores(data.highscores);
          return;
        }
      }
    } catch {}

    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_HS_KEY);
      if (raw) setHighscores(JSON.parse(raw));
    } catch {}
  };

  const generateQuestion = useCallback(
    (forceItem?: BiologieItem): ClassificationQuestion | null => {
      if (ALL_ANIMALS.length < 4) return null;

      const correct = forceItem || ALL_ANIMALS[Math.floor(Math.random() * ALL_ANIMALS.length)];
      const correctClass = ANIMAL_CLASSES.find((c) => c.categoryKey === correct.kategorie) || ANIMAL_CLASSES[0];

      const wrongClasses = ANIMAL_CLASSES.filter((c) => c.id !== correctClass.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      const allOptions = [correctClass, ...wrongClasses].sort(() => Math.random() - 0.5);

      return {
        item: correct,
        options: allOptions,
        correctClass,
        isRepeat: !!forceItem,
      };
    },
    []
  );

  const startQuiz = () => {
    const totalCount = selectedQuestionCount === 0 ? ALL_ANIMALS.length : Math.min(selectedQuestionCount, ALL_ANIMALS.length);
    setTargetQuestionCount(totalCount);
    setCurrentIndex(0);
    setScore(0);
    setWrongCount(0);
    setStreak(0);
    setMaxStreak(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    wrongQueue.current = [];
    missedItems.current = [];
    questionsSinceRepeat.current = 0;
    setHasSavedHs(false);
    setSaveSuccessMsg(null);
    setStartTime(Date.now());

    const firstQ = generateQuestion();
    setCurrentQuestion(firstQ);
    setGameState('playing');
  };

  const handleOptionClick = (option: AnimalClassInfo) => {
    if (isAnswered || !currentQuestion) return;

    setSelectedOptionId(option.id);
    setIsAnswered(true);

    const isCorrect = option.id === currentQuestion.correctClass.id;

    if (isCorrect) {
      const nextScore = score + 1;
      const nextStreak = streak + 1;
      setScore(nextScore);
      setStreak(nextStreak);
      if (nextStreak > maxStreak) setMaxStreak(nextStreak);
    } else {
      setWrongCount((prev) => prev + 1);
      setStreak(0);

      if (!currentQuestion.isRepeat) {
        wrongQueue.current.push(currentQuestion.item);
        if (!missedItems.current.some((m) => m.id === currentQuestion.item.id)) {
          missedItems.current.push(currentQuestion.item);
        }
      }
    }
  };

  const nextQuestion = () => {
    const nextIdx = currentIndex + 1;

    if (nextIdx >= targetQuestionCount && wrongQueue.current.length === 0) {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      setTotalTimeSpent(timeSpent);
      setGameState('result');
      fetchHighscores();
      return;
    }

    setSelectedOptionId(null);
    setIsAnswered(false);
    setCurrentIndex(nextIdx);

    questionsSinceRepeat.current++;

    if (wrongQueue.current.length > 0 && questionsSinceRepeat.current >= REPEAT_INTERVAL) {
      const itemToRepeat = wrongQueue.current.shift()!;
      questionsSinceRepeat.current = 0;
      setCurrentQuestion(generateQuestion(itemToRepeat));
    } else {
      setCurrentQuestion(generateQuestion());
    }
  };

  const handleSaveHighscore = async () => {
    if (hasSavedHs || isSavingHs) return;

    const trimmedName = playerName.trim() || 'Anonym';
    try {
      localStorage.setItem(LOCAL_STORAGE_NAME_KEY, trimmedName);
    } catch {}

    setIsSavingHs(true);
    const percentage = targetQuestionCount > 0 ? Math.round((score / targetQuestionCount) * 100) : 0;

    const newEntry: HighscoreItem = {
      name: trimmedName,
      score,
      totalQuestions: targetQuestionCount,
      percentage,
      categories: ['tierart-quiz'],
      timeSpentSeconds: totalTimeSpent,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/biologie/highscore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.entry) {
          setHighscores((prev) => [data.entry, ...prev.filter((p) => p.id !== data.entry.id)].slice(0, 50));
        }
      }
    } catch {}

    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_HS_KEY);
      const list: HighscoreItem[] = raw ? JSON.parse(raw) : [];
      list.unshift(newEntry);
      list.sort((a, b) => b.score - a.score || b.percentage - a.percentage);
      localStorage.setItem(LOCAL_STORAGE_HS_KEY, JSON.stringify(list.slice(0, 50)));
      setHighscores(list.slice(0, 50));
    } catch {}

    setIsSavingHs(false);
    setHasSavedHs(true);
    setSaveSuccessMsg(language === 'de' ? 'Ergebnis erfolgreich gespeichert!' : 'Score saved successfully!');
  };

  // -------------------------------------------------------------
  // VIEW: CONFIG / SETUP
  // -------------------------------------------------------------
  if (gameState === 'config') {
    return (
      <div className="flagquiz-container" style={{ width: '100%' }}>
        {/* Intro Info Box */}
        <div className="info-box-section">
          <h2>{t.navAnimalClassificationQuiz}</h2>
          <p>{t.biologyClassificationQuizDesc}</p>
        </div>

        {/* Configuration Card (Full Width) */}
        <div className="flagquiz-card" style={{ width: '100%', boxSizing: 'border-box' }}>
          
          {/* Section 1: Tierklassen */}
          <h3 className="flagquiz-section-title" style={{ marginTop: 0 }}>
            1. {language === 'de' ? 'Enthaltene Tierklassen (6 Gruppen)' : 'Included Animal Classes (6 groups)'}
          </h3>

          <div className="continent-select-grid" style={{ marginBottom: 20 }}>
            {ANIMAL_CLASSES.map((cls) => {
              const count = ALL_ANIMALS.filter((a) => a.kategorie === cls.categoryKey).length;
              return (
                <div
                  key={cls.id}
                  className="continent-chip-btn selected"
                  style={{ cursor: 'default' }}
                >
                  <div className="continent-chip-info">
                    <span style={{ fontSize: '14.5px', color: 'var(--green-dark)' }}>
                      {cls.name[language] || cls.name.de}
                    </span>
                  </div>
                  <span className="continent-chip-count">{count}</span>
                </div>
              );
            })}
          </div>

          {/* Section 2: Fragenanzahl */}
          <h3 className="flagquiz-section-title">
            2. {t.biologyQuestionCount}
          </h3>

          <div className="flagquiz-count-row" style={{ marginBottom: 20 }}>
            {[10, 20, 50].map((num) => {
              const isSelected = selectedQuestionCount === num;
              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => setSelectedQuestionCount(num)}
                  className={`flagquiz-count-btn ${isSelected ? 'selected' : ''}`}
                >
                  {num} {language === 'de' ? 'Fragen' : 'Questions'}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setSelectedQuestionCount(0)}
              className={`flagquiz-count-btn ${selectedQuestionCount === 0 ? 'selected' : ''}`}
            >
              {language === 'de' ? `Alle verfügbaren (${ALL_ANIMALS.length})` : `All available (${ALL_ANIMALS.length})`}
            </button>
          </div>

          {/* Start Action */}
          <div className="flagquiz-actions-row">
            <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              <span>{language === 'de' ? 'Verfügbarer Pool:' : 'Available pool:'} </span>
              <strong style={{ color: 'var(--green-dark)' }}>{ALL_ANIMALS.length} {t.biologySpeciesCount}</strong>
            </div>

            <button
              type="button"
              onClick={startQuiz}
              className="flagquiz-primary-btn"
              style={{ padding: '12px 32px', fontSize: '15px' }}
            >
              <Play style={{ width: 18, height: 18 }} />
              <span>{t.biologyStartQuiz}</span>
            </button>
          </div>
        </div>

        {/* Highscore Leaderboard on Config Screen (Full Width) */}
        <div className="dashboard-section" style={{ marginTop: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ margin: 0 }}>
              <span>{t.biologyHighscoresTitle}</span>
            </h2>
          </div>

          {highscores.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '24px 0' }}>
              {language === 'de' ? 'Noch keine Highscores vorhanden. Sei der Erste auf der Bestenliste!' : 'No highscores recorded yet. Be the first on the leaderboard!'}
            </p>
          ) : (
            <div className="highscore-table-wrapper">
              <table className="dashboard-progress-table">
                <thead>
                  <tr>
                    <th style={{ width: 60 }}>{language === 'de' ? 'Rang' : 'Rank'}</th>
                    <th style={{ textAlign: 'left' }}>{language === 'de' ? 'Spielername' : 'Player Name'}</th>
                    <th>{language === 'de' ? 'Punkte' : 'Score'}</th>
                    <th>{language === 'de' ? 'Quote' : 'Accuracy'}</th>
                    <th>{language === 'de' ? 'Thema' : 'Topic'}</th>
                    <th>{language === 'de' ? 'Datum' : 'Date'}</th>
                  </tr>
                </thead>
                <tbody>
                  {highscores.slice(0, 15).map((entry, idx) => {
                    const rank = idx + 1;
                    return (
                      <tr key={entry.id || `${entry.name}-${idx}`}>
                        <td style={{ textAlign: 'center', fontWeight: 700, color: rank <= 3 ? 'var(--green-dark)' : 'var(--text-muted)' }}>
                          {rank}.
                        </td>
                        <td className="dashboard-table-student" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>
                          {entry.name}
                        </td>
                        <td className="dashboard-score-cell">
                          <span className="dashboard-score-badge" style={{ background: 'var(--green-light)', color: 'var(--green-dark)' }}>
                            {entry.score} / {entry.totalQuestions}
                          </span>
                        </td>
                        <td className="dashboard-score-cell">
                          <strong>{entry.percentage}%</strong>
                        </td>
                        <td style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
                          {t.navAnimalClassificationQuiz}
                        </td>
                        <td style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
                          {entry.createdAt ? new Date(entry.createdAt).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US') : '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW: RESULT / SUMMARY
  // -------------------------------------------------------------
  if (gameState === 'result') {
    const percentage = targetQuestionCount > 0 ? Math.round((score / targetQuestionCount) * 100) : 0;

    return (
      <div className="flagquiz-container" style={{ width: '100%' }}>
        <div className="info-box-section">
          <h2>{t.biologyQuizFinished}</h2>
          <p>{t.navAnimalClassificationQuiz}</p>
        </div>

        <div className="flagquiz-card" style={{ width: '100%', boxSizing: 'border-box' }}>
          {/* KPI Stats Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 24 }}>
            <div className="result-stat-box">
              <div className="stat-value">{score} / {targetQuestionCount}</div>
              <div className="stat-label">{t.biologyCorrectCount}</div>
            </div>

            <div className="result-stat-box" style={{ background: '#fdf2f2', borderColor: '#f8b4b4' }}>
              <div className="stat-value" style={{ color: '#9b1c1c' }}>{wrongCount}</div>
              <div className="stat-label" style={{ color: '#9b1c1c' }}>{t.biologyWrongCount}</div>
            </div>

            <div className="result-stat-box" style={{ background: 'var(--bg-body)', borderColor: 'var(--border-light)' }}>
              <div className="stat-value" style={{ color: 'var(--text-color)' }}>{percentage}%</div>
              <div className="stat-label">{t.biologyAccuracy}</div>
            </div>

            {totalTimeSpent > 0 && (
              <div className="result-stat-box" style={{ background: 'var(--bg-body)', borderColor: 'var(--border-light)' }}>
                <div className="stat-value" style={{ color: 'var(--text-color)' }}>{totalTimeSpent}s</div>
                <div className="stat-label">{language === 'de' ? 'Zeit' : 'Time'}</div>
              </div>
            )}
          </div>

          {/* Highscore Save Section */}
          <div
            style={{
              background: 'var(--bg-body)',
              border: '1px solid var(--border-light)',
              borderRadius: 8,
              padding: 18,
              marginBottom: 24,
            }}
          >
            <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: 10, color: 'var(--green-dark)' }}>
              {t.biologySaveScore}
            </h3>

            {saveSuccessMsg ? (
              <div style={{ color: 'var(--green-dark)', fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle2 style={{ width: 18, height: 18 }} />
                <span>{saveSuccessMsg}</span>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder={language === 'de' ? 'Dein Name für die Bestenliste...' : 'Your name for the leaderboard...'}
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  style={{
                    flex: '1 1 240px',
                    padding: '10px 14px',
                    borderRadius: 6,
                    border: '1px solid var(--border-light)',
                    fontSize: '14px',
                    outline: 'none',
                    background: 'var(--bg-white)',
                  }}
                />
                <button
                  type="button"
                  onClick={handleSaveHighscore}
                  disabled={isSavingHs}
                  className="flagquiz-primary-btn"
                  style={{ padding: '10px 20px', fontSize: '14px' }}
                >
                  {isSavingHs ? (language === 'de' ? 'Speichern...' : 'Saving...') : (language === 'de' ? 'Speichern' : 'Save')}
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'flex-start' }}>
            <button
              type="button"
              onClick={startQuiz}
              className="flagquiz-primary-btn"
              style={{ padding: '10px 24px', fontSize: '14px' }}
            >
              <RotateCcw style={{ width: 16, height: 16 }} />
              <span>{t.biologyPlayAgain}</span>
            </button>

            <Link
              href="/biologie"
              className="nav-btn"
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <ArrowLeft style={{ width: 16, height: 16 }} />
              <span>{t.biologyBackToHub}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW: PLAYING
  // -------------------------------------------------------------
  if (!currentQuestion) return null;

  const animalName = getItemName(currentQuestion.item, language);
  const correctClassName = currentQuestion.correctClass.name[language] || currentQuestion.correctClass.name.de;

  return (
    <div className="flagquiz-container" style={{ width: '100%' }}>
      {/* Top Status & Controls Bar */}
      <div className="flagquiz-card" style={{ padding: '14px 20px', width: '100%', boxSizing: 'border-box' }}>
        <div className="flagquiz-status-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setGameState('config')}
              className="flagquiz-secondary-btn"
              style={{ fontSize: '12px', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', gap: 4 }}
            >
              <ArrowLeft style={{ width: 13, height: 13 }} />
              <span>{language === 'de' ? 'Beenden' : 'Quit'}</span>
            </button>

            <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--green-dark)' }}>
              {t.navAnimalClassificationQuiz} • {currentIndex + 1} / {targetQuestionCount}
            </span>

            {currentQuestion.isRepeat && (
              <span
                style={{
                  background: '#fff8eb',
                  border: '1px solid #f9d8a6',
                  color: '#b45309',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 10,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <RotateCcw style={{ width: 11, height: 11 }} />
                {t.biologyRepeatQuestion}
              </span>
            )}
          </div>

          <div className="flagquiz-stats-badges">
            {streak > 1 && (
              <span
                style={{
                  background: '#fff8eb',
                  border: '1px solid #f9d8a6',
                  color: '#b45309',
                  padding: '4px 10px',
                  borderRadius: 6,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: '13px',
                  fontWeight: 700,
                }}
              >
                <Flame style={{ width: 15, height: 15 }} />
                <span>Streak: {streak}</span>
              </span>
            )}

            <span className="flagquiz-badge" style={{ fontSize: '13px', padding: '4px 10px' }}>
              <span style={{ color: 'var(--green-dark)' }}>{score}</span>
              <span style={{ opacity: 0.5 }}>/</span>
              <span style={{ color: '#9b1c1c' }}>{wrongCount}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Question Card (Full Width) */}
      <div className="flagquiz-card" style={{ width: '100%', boxSizing: 'border-box', marginTop: 16 }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: '20px', marginBottom: 4, color: 'var(--green-dark)' }}>
            {t.biologyQuestionClassification}
          </h2>
          <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-color)' }}>
            {animalName}
          </span>
        </div>

        {/* Animal Photo (1:1 Native Square Ratio) */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 420,
            aspectRatio: '1 / 1',
            borderRadius: 8,
            overflow: 'hidden',
            background: 'var(--bg-body)',
            border: '1px solid var(--green-border)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
            margin: '0 auto 20px auto',
          }}
        >
          <Image
            src={getBiologyImageUrl(currentQuestion.item.file)}
            alt={animalName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 420px"
            priority
          />
        </div>

        {/* 4 Classification Options (2x2 Grid) */}
        <div className="quiz-options-grid">
          {currentQuestion.options.map((option, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const classNameText = option.name[language] || option.name.de;
            const isSelected = selectedOptionId === option.id;
            const isCorrectOption = option.id === currentQuestion.correctClass.id;

            let btnClass = '';
            if (isAnswered) {
              if (isCorrectOption) {
                btnClass = 'correct';
              } else if (isSelected) {
                btnClass = 'wrong';
              }
            }

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleOptionClick(option)}
                disabled={isAnswered}
                className={`quiz-option-btn ${btnClass}`}
                style={{ minHeight: 56 }}
              >
                <span className="quiz-option-key">{letter}</span>
                <span style={{ flex: 1, fontSize: '15px' }}>{classNameText}</span>
                {isAnswered && isCorrectOption && (
                  <CheckCircle2 style={{ width: 18, height: 18, color: '#16a34a', flexShrink: 0 }} />
                )}
                {isAnswered && isSelected && !isCorrectOption && (
                  <XCircle style={{ width: 18, height: 18, color: '#dc2626', flexShrink: 0 }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback & Next Button */}
        {isAnswered && (
          <div
            style={{
              marginTop: 24,
              paddingTop: 18,
              borderTop: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: selectedOptionId === currentQuestion.correctClass.id ? 'var(--green-dark)' : '#9b1c1c',
              }}
            >
              {selectedOptionId === currentQuestion.correctClass.id
                ? t.biologyCorrect
                : `${t.biologyWrong}${correctClassName}`}
            </div>

            <button
              type="button"
              onClick={nextQuestion}
              className="flagquiz-primary-btn"
              style={{
                padding: '10px 24px',
                fontSize: '14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>{t.biologyNextQuestion}</span>
              <ArrowRight style={{ width: 16, height: 16 }} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
