'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  BiologieItem,
  BIOLOGIE_ITEMS,
  BIOLOGIE_CATEGORIES,
  ALL_ANIMALS,
  ALL_PLANTS,
  getBiologyImageUrl,
  getItemName,
  getCategoryName,
} from '@/data/biology_data';
import {
  Trophy,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Settings2,
  ArrowLeft,
  Flame,
} from 'lucide-react';

interface QuizQuestion {
  item: BiologieItem;
  options: BiologieItem[];
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

const LOCAL_STORAGE_HS_KEY = 'atw_biology_quiz_highscores';
const LOCAL_STORAGE_NAME_KEY = 'atw_flagquiz_player_name';
const REPEAT_INTERVAL = 3;

interface BiologyQuizProps {
  initialCategory?: string;
}

export function BiologyQuiz({ initialCategory = 'alle' }: BiologyQuizProps) {
  const { t, language } = useLanguage();

  // -------------------------------------------------------------
  // Game Setup State
  // -------------------------------------------------------------
  const allCategoryIds = useMemo(() => BIOLOGIE_CATEGORIES.map((c) => c.id), []);
  
  const getInitialCategories = () => {
    if (initialCategory === 'alle-tiere') return BIOLOGIE_CATEGORIES.filter((c) => c.group === 'tiere').map((c) => c.id);
    if (initialCategory === 'alle-pflanzen') return BIOLOGIE_CATEGORIES.filter((c) => c.group === 'pflanzen').map((c) => c.id);
    if (allCategoryIds.includes(initialCategory)) return [initialCategory];
    return allCategoryIds;
  };

  const [selectedCategories, setSelectedCategories] = useState<string[]>(getInitialCategories);
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(10);
  const [gameState, setGameState] = useState<'config' | 'playing' | 'result'>('config');

  // -------------------------------------------------------------
  // Game Play State
  // -------------------------------------------------------------
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
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
  const [hsFilter, setHsFilter] = useState<string>('alle');
  const [isSavingHs, setIsSavingHs] = useState<boolean>(false);
  const [hasSavedHs, setHasSavedHs] = useState<boolean>(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Pool of available items based on selected categories
  const activePool = useMemo(() => {
    return BIOLOGIE_ITEMS.filter((item) => selectedCategories.includes(item.kategorie));
  }, [selectedCategories]);

  // Load saved name on mount
  useEffect(() => {
    try {
      const savedName = localStorage.getItem(LOCAL_STORAGE_NAME_KEY);
      if (savedName) setPlayerName(savedName);
    } catch {}
    fetchHighscores();
  }, []);

  const fetchHighscores = async () => {
    try {
      const res = await fetch('/api/biologie/highscore');
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
    (forceItem?: BiologieItem): QuizQuestion | null => {
      if (activePool.length < 4) return null;

      const correct = forceItem || activePool[Math.floor(Math.random() * activePool.length)];

      const sameCatPool = activePool.filter((i) => i.kategorie === correct.kategorie && i.id !== correct.id);
      const otherPool = activePool.filter((i) => i.id !== correct.id);
      const optionPool = sameCatPool.length >= 3 ? sameCatPool : otherPool;

      const wrongOptions = [...optionPool].sort(() => Math.random() - 0.5).slice(0, 3);
      const allOptions = [correct, ...wrongOptions].sort(() => Math.random() - 0.5);

      return {
        item: correct,
        options: allOptions,
        isRepeat: !!forceItem,
      };
    },
    [activePool]
  );

  const startQuiz = () => {
    if (activePool.length < 4) return;
    const totalCount = selectedQuestionCount === 0 ? activePool.length : Math.min(selectedQuestionCount, activePool.length);
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

  const handleOptionClick = (option: BiologieItem) => {
    if (isAnswered || !currentQuestion) return;

    setSelectedOptionId(option.id);
    setIsAnswered(true);

    const isCorrect = option.id === currentQuestion.item.id;

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
      categories: selectedCategories,
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

  const toggleCategory = (catId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(catId)) {
        if (prev.length === 1) return prev;
        return prev.filter((id) => id !== catId);
      } else {
        return [...prev, catId];
      }
    });
  };

  const selectAllCategories = () => setSelectedCategories(allCategoryIds);
  const selectAnimalCategories = () => setSelectedCategories(BIOLOGIE_CATEGORIES.filter((c) => c.group === 'tiere').map((c) => c.id));
  const selectPlantCategories = () => setSelectedCategories(BIOLOGIE_CATEGORIES.filter((c) => c.group === 'pflanzen').map((c) => c.id));

  const getQuestionPrompt = (item: BiologieItem) => {
    if (item.kategorieGroup === 'tiere') return t.biologyQuestionAnimal;
    if (item.kategorieGroup === 'pflanzen') return t.biologyQuestionPlant;
    return t.biologyQuestionSpecies;
  };

  const filteredHighscores = useMemo(() => {
    if (hsFilter === 'alle') return highscores;
    return highscores.filter((h) => h.categories && h.categories.includes(hsFilter));
  }, [highscores, hsFilter]);

  // -------------------------------------------------------------
  // VIEW: CONFIG / SETUP
  // -------------------------------------------------------------
  if (gameState === 'config') {
    return (
      <div className="flagquiz-container" style={{ width: '100%' }}>
        {/* Intro Info Box */}
        <div className="info-box-section">
          <h2>{t.navBiologyQuiz}</h2>
          <p>{t.biologySubtitle}</p>
        </div>

        {/* Configuration Card (Full Width) */}
        <div className="flagquiz-card" style={{ width: '100%', boxSizing: 'border-box' }}>
          
          {/* Section 1: Kategorie-Auswahl */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
            <h3 className="flagquiz-section-title" style={{ margin: 0, border: 'none' }}>
              1. {t.biologySelectCategories}
            </h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={selectAllCategories}
                className="flagquiz-secondary-btn"
                style={{ fontSize: 12, padding: '4px 10px' }}
              >
                {language === 'de' ? 'Alle Kategorien' : 'All Categories'} ({BIOLOGIE_ITEMS.length})
              </button>
              <button
                type="button"
                onClick={selectAnimalCategories}
                className="flagquiz-secondary-btn"
                style={{ fontSize: 12, padding: '4px 10px' }}
              >
                {t.biologyAllAnimals} ({ALL_ANIMALS.length})
              </button>
              <button
                type="button"
                onClick={selectPlantCategories}
                className="flagquiz-secondary-btn"
                style={{ fontSize: 12, padding: '4px 10px' }}
              >
                {t.biologyAllPlants} ({ALL_PLANTS.length})
              </button>
            </div>
          </div>

          {/* Grid of category chips */}
          <div className="continent-select-grid" style={{ marginBottom: 20 }}>
            {BIOLOGIE_CATEGORIES.map((cat) => {
              const isSelected = selectedCategories.includes(cat.id);
              const count = BIOLOGIE_ITEMS.filter((i) => i.kategorie === cat.id).length;
              const name = cat.name[language] || cat.name.de;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  className={`continent-chip-btn ${isSelected ? 'selected' : ''}`}
                >
                  <div className="continent-chip-info">
                    <span style={{ fontSize: '14.5px', color: isSelected ? 'var(--green-dark)' : 'var(--text-color)' }}>
                      {name}
                    </span>
                  </div>
                  <span className="continent-chip-count">{count}</span>
                </button>
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
              {language === 'de' ? `Alle verfügbaren (${activePool.length})` : `All available (${activePool.length})`}
            </button>
          </div>

          {/* Actions row with Pool info and Start Button */}
          <div className="flagquiz-actions-row">
            <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              <span>{language === 'de' ? 'Ausgewählter Pool:' : 'Selected pool:'} </span>
              <strong style={{ color: 'var(--green-dark)' }}>{activePool.length} {t.biologySpeciesCount}</strong>
              {selectedCategories.length === 0 && (
                <span style={{ color: '#c62828', display: 'block', marginTop: 4 }}>
                  {language === 'de' ? 'Bitte mindestens eine Kategorie wählen!' : 'Please select at least one category!'}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={startQuiz}
              disabled={activePool.length < 4}
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
            <h2 style={{ margin: 0 }}>
              <span>{t.biologyHighscoresTitle}</span>
            </h2>

            {/* Filter Tabs */}
            <div className="highscore-filter-tabs" style={{ margin: 0 }}>
              <button
                type="button"
                onClick={() => setHsFilter('alle')}
                className={`highscore-filter-btn ${hsFilter === 'alle' ? 'active' : ''}`}
              >
                {language === 'de' ? 'Gesamt' : 'All'}
              </button>
              {BIOLOGIE_CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setHsFilter(c.id)}
                  className={`highscore-filter-btn ${hsFilter === c.id ? 'active' : ''}`}
                >
                  {c.name[language] || c.name.de}
                </button>
              ))}
            </div>
          </div>

          {filteredHighscores.length === 0 ? (
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
                    <th>{language === 'de' ? 'Kategorien' : 'Categories'}</th>
                    <th>{language === 'de' ? 'Datum' : 'Date'}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHighscores.slice(0, 15).map((entry, idx) => {
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
                          {entry.categories.includes('alle') || entry.categories.length === allCategoryIds.length
                            ? (language === 'de' ? 'Alle Kategorien' : 'All Categories')
                            : entry.categories.map((c) => getCategoryName(c, language)).join(', ')}
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
          <p>
            {selectedCategories.length === allCategoryIds.length
              ? (language === 'de' ? 'Gesamter Arten-Katalog' : 'Full species catalog')
              : selectedCategories.map((c) => getCategoryName(c, language)).join(', ')}
          </p>
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

          {/* Missed species list if any */}
          {missedItems.current.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: 8, color: 'var(--text-muted)' }}>
                {language === 'de' ? 'Wiederholte Arten:' : 'Reviewed species:'}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {missedItems.current.map((item) => (
                  <span
                    key={item.id}
                    style={{
                      background: '#fdf2f2',
                      border: '1px solid #f8b4b4',
                      color: '#9b1c1c',
                      fontSize: '12px',
                      padding: '4px 10px',
                      borderRadius: 4,
                      fontWeight: 600,
                    }}
                  >
                    {getItemName(item, language)}
                  </span>
                ))}
              </div>
            </div>
          )}

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

            <button
              type="button"
              onClick={() => setGameState('config')}
              className="nav-btn"
              style={{ padding: '10px 20px', fontSize: '14px' }}
            >
              <Settings2 style={{ width: 16, height: 16 }} />
              <span>{language === 'de' ? 'Kategorien anpassen' : 'Adjust Categories'}</span>
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

  const correctName = getItemName(currentQuestion.item, language);
  const catDisplayName = getCategoryName(currentQuestion.item.kategorie, language);

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
              {catDisplayName} • {currentIndex + 1} / {targetQuestionCount}
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
        <h2 style={{ fontSize: '20px', marginBottom: 16, color: 'var(--green-dark)', textAlign: 'center' }}>
          {getQuestionPrompt(currentQuestion.item)}
        </h2>

        {/* Species Photo Image Container (1:1 Native Square Ratio) */}
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
            alt="Biology Quiz Species"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 420px"
            priority
          />
        </div>

        {/* 4 Multiple Choice Options (2x2 Grid) */}
        <div className="quiz-options-grid">
          {currentQuestion.options.map((option, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const optName = getItemName(option, language);
            const isSelected = selectedOptionId === option.id;
            const isCorrectOption = option.id === currentQuestion.item.id;

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
                <span style={{ flex: 1, fontSize: '15px' }}>{optName}</span>
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
                color: selectedOptionId === currentQuestion.item.id ? 'var(--green-dark)' : '#9b1c1c',
              }}
            >
              {selectedOptionId === currentQuestion.item.id
                ? t.biologyCorrect
                : `${t.biologyWrong}${correctName}`}
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
