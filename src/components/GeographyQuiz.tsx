'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/types';
import {
  GEOGRAPHY_QUIZ_QUESTIONS,
  CATEGORIES_INFO,
  GeographyQuizQuestion,
  QuizMultilingualText,
} from '@/data/geography_quiz_data';
import { FlagIcon } from '@/components/FlagIcon';
import {
  Trophy,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Settings2,
  Landmark,
  Waves,
  Mountain,
  Compass,
  Award,
  BookOpen,
  Languages,
} from 'lucide-react';

interface QuizOption {
  raw: QuizMultilingualText;
  isCorrect: boolean;
  optId: string;
}

interface ActiveQuestion {
  raw: GeographyQuizQuestion;
  options: QuizOption[];
  correctOptId: string;
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

const LOCAL_STORAGE_HS_KEY = 'atw_geography_quiz_highscores';
const LOCAL_STORAGE_NAME_KEY = 'atw_flagquiz_player_name';

const LANGUAGE_OPTIONS: { code: Language; label: string }[] = [
  { code: 'de', label: 'Deutsch' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  { code: 'it', label: 'Italiano' },
];

export function GeographyQuiz() {
  const { language, setLanguage } = useLanguage();

  // -------------------------------------------------------------
  // Game Setup State
  // -------------------------------------------------------------
  const allCategoryIds = useMemo(() => CATEGORIES_INFO.map((c) => c.id), []);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(allCategoryIds);
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(10);
  const [gameState, setGameState] = useState<'config' | 'playing' | 'result'>('config');

  // -------------------------------------------------------------
  // Game Play State
  // -------------------------------------------------------------
  const [questions, setQuestions] = useState<ActiveQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState<number>(0);

  // -------------------------------------------------------------
  // Highscore State
  // -------------------------------------------------------------
  const [playerName, setPlayerName] = useState<string>('');
  const [highscores, setHighscores] = useState<HighscoreItem[]>([]);
  const [hsFilter, setHsFilter] = useState<string>('alle');
  const [isSavingHs, setIsSavingHs] = useState<boolean>(false);
  const [hasSavedHs, setHasSavedHs] = useState<boolean>(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Load saved name & highscores on mount
  useEffect(() => {
    try {
      const savedName = localStorage.getItem(LOCAL_STORAGE_NAME_KEY);
      if (savedName) {
        setPlayerName(savedName);
      }
    } catch (e) {}

    fetchHighscores();
  }, []);

  const fetchHighscores = async () => {
    let apiScores: HighscoreItem[] = [];
    try {
      const res = await fetch('/api/geographie-quiz/highscore');
      if (res.ok) {
        const data = await res.json();
        if (data.highscores && Array.isArray(data.highscores)) {
          apiScores = data.highscores;
        }
      }
    } catch (e) {
      console.warn('Could not fetch highscores from API, falling back to localStorage');
    }

    let localScores: HighscoreItem[] = [];
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_HS_KEY);
      if (raw) {
        localScores = JSON.parse(raw);
      }
    } catch (e) {}

    const combined = [...apiScores];
    localScores.forEach((ls) => {
      if (!combined.some((c) => c.createdAt === ls.createdAt && c.name === ls.name && c.score === ls.score)) {
        combined.push(ls);
      }
    });

    combined.sort((a, b) => b.score - a.score || b.percentage - a.percentage || (a.timeSpentSeconds || 0) - (b.timeSpentSeconds || 0));
    setHighscores(combined);
  };

  // -------------------------------------------------------------
  // Filtered Question Pool
  // -------------------------------------------------------------
  const availableQuestions = useMemo(() => {
    if (selectedCategories.length === 0) return [];
    return GEOGRAPHY_QUIZ_QUESTIONS.filter((q) => selectedCategories.includes(q.category));
  }, [selectedCategories]);

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(id)) {
        return prev.filter((c) => c !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const selectAllCategories = () => setSelectedCategories(allCategoryIds);
  const deselectAllCategories = () => setSelectedCategories([]);

  // -------------------------------------------------------------
  // Start Quiz
  // -------------------------------------------------------------
  const startQuiz = useCallback(() => {
    if (availableQuestions.length === 0) return;

    // Shuffle pool
    const pool = [...availableQuestions].sort(() => 0.5 - Math.random());
    const count = Math.min(selectedQuestionCount, pool.length);
    const selected = pool.slice(0, count);

    const generatedQuestions: ActiveQuestion[] = selected.map((q) => {
      const opts: QuizOption[] = [
        { raw: q.correctAnswer, isCorrect: true, optId: 'correct' },
        { raw: q.wrongAnswers[0], isCorrect: false, optId: 'w1' },
        { raw: q.wrongAnswers[1], isCorrect: false, optId: 'w2' },
        { raw: q.wrongAnswers[2], isCorrect: false, optId: 'w3' },
      ].sort(() => 0.5 - Math.random());

      return {
        raw: q,
        options: opts,
        correctOptId: 'correct',
      };
    });

    setQuestions(generatedQuestions);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setHasSavedHs(false);
    setSaveSuccessMsg(null);
    setStartTime(Date.now());
    setGameState('playing');
  }, [availableQuestions, selectedQuestionCount]);

  // -------------------------------------------------------------
  // Answer Handling
  // -------------------------------------------------------------
  const handleSelectOption = (opt: QuizOption) => {
    if (isAnswered || !currentQuestion) return;

    setSelectedOptionId(opt.optId);
    setIsAnswered(true);

    if (opt.isCorrect) {
      const newScore = score + 1;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      if (newStreak > maxStreak) {
        setMaxStreak(newStreak);
      }
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
    } else {
      const timeSpentSec = Math.max(1, Math.round((Date.now() - startTime) / 1000));
      setTotalTimeSpent(timeSpentSec);
      setGameState('result');
      fetchHighscores();
    }
  };

  // Keyboard navigation (1-4 and Enter)
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isAnswered) {
        if (['1', '2', '3', '4'].includes(e.key)) {
          const optIdx = parseInt(e.key, 10) - 1;
          if (questions[currentIndex]?.options[optIdx]) {
            handleSelectOption(questions[currentIndex].options[optIdx]);
          }
        }
      } else {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNextQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, isAnswered, currentIndex, questions]);

  // -------------------------------------------------------------
  // Save Highscore
  // -------------------------------------------------------------
  const handleSaveHighscore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hasSavedHs || isSavingHs) return;

    const finalName = playerName.trim() || (language === 'de' ? 'Anonymer Geograph' : 'Anonymous Geographer');
    setIsSavingHs(true);

    try {
      localStorage.setItem(LOCAL_STORAGE_NAME_KEY, finalName);
    } catch (e) {}

    const newHsEntry: HighscoreItem = {
      name: finalName,
      score,
      totalQuestions: questions.length,
      percentage: Math.round((score / questions.length) * 100),
      categories: selectedCategories.length === allCategoryIds.length ? ['alle'] : selectedCategories,
      timeSpentSeconds: totalTimeSpent,
      createdAt: new Date().toISOString(),
    };

    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_HS_KEY);
      const existing: HighscoreItem[] = raw ? JSON.parse(raw) : [];
      existing.push(newHsEntry);
      localStorage.setItem(LOCAL_STORAGE_HS_KEY, JSON.stringify(existing));
    } catch (e) {}

    try {
      await fetch('/api/geographie-quiz/highscore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newHsEntry),
      });
    } catch (e) {
      console.warn('API save error, preserved in localStorage:', e);
    }

    setIsSavingHs(false);
    setHasSavedHs(true);
    setSaveSuccessMsg(language === 'de' ? 'Erfolgreich in Bestenliste eingetragen!' : 'Successfully saved to leaderboard!');
    fetchHighscores();
  };

  const currentQuestion = questions[currentIndex];

  const getCategoryTitle = (catId: string): string => {
    const found = CATEGORIES_INFO.find((c) => c.id === catId);
    return found ? (found.name[language] || found.name.de) : catId;
  };

  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Landmark':
        return <Landmark style={{ width: 16, height: 16, color: 'var(--green-dark)' }} />;
      case 'Waves':
        return <Waves style={{ width: 16, height: 16, color: 'var(--green-dark)' }} />;
      case 'Mountain':
        return <Mountain style={{ width: 16, height: 16, color: 'var(--green-dark)' }} />;
      case 'Compass':
      default:
        return <Compass style={{ width: 16, height: 16, color: 'var(--green-dark)' }} />;
    }
  };

  const filteredHighscores = useMemo(() => {
    if (hsFilter === 'alle') return highscores;
    return highscores.filter((h) => h.categories.includes(hsFilter) || h.categories.includes('alle'));
  }, [highscores, hsFilter]);

  // =============================================================
  // RENDER: CONFIGURATION SCREEN
  // =============================================================
  if (gameState === 'config') {
    return (
      <div className="flagquiz-container">
        
        {/* Intro Info-Box */}
        <div className="info-box-section">
          <h2>
            {language === 'de' && 'Geographie- & Weltwissen-Quiz'}
            {language === 'en' && 'Geography & World Knowledge Quiz'}
            {language === 'fr' && 'Quiz de Géographie & Connaissances Mondiales'}
            {language === 'es' && 'Quiz de Geografía y Conocimiento Mundial'}
            {language === 'it' && 'Quiz di Geografia e Conoscenza del Mondo'}
          </h2>
          <p style={{ fontSize: '14px', lineHeight: 1.6, marginTop: 8 }}>
            {language === 'de' && 'Teste dein geographisches Fachwissen mit über 500 Fragen zu Hauptstädten, Flüssen, Gebirgen, Inseln und Weltrekorden – vollständig verfügbar in 5 Sprachen (Deutsch, Englisch, Französisch, Spanisch, Italienisch). Wähle unten deine Sprache, Themengebiete und Fragenanzahl!'}
            {language === 'en' && 'Test your geographical knowledge with over 500 questions covering capitals, rivers, mountains, islands, and world records – available in 5 languages (German, English, French, Spanish, Italian). Select your language, categories, and question count below!'}
            {language === 'fr' && 'Testez vos connaissances géographiques avec plus de 500 questions disponibles en 5 langues (allemand, anglais, français, espagnol, italien).'}
            {language === 'es' && 'Pon a prueba tus conocimientos geográficos con más de 500 preguntas disponibles en 5 idiomas (alemán, inglés, francés, español, italiano).'}
            {language === 'it' && 'Metti alla prova le tue conoscenze geografiche con oltre 500 domande disponibili in 5 lingue (tedesco, inglese, francese, spagnolo, italiano).'}
          </p>
        </div>

        {/* Configuration Card */}
        <div className="flagquiz-card">
          
          {/* Section 0: Sprachauswahl (Quiz-Sprache) */}
          <div style={{ marginBottom: 24, paddingBottom: 18, borderBottom: '1px solid var(--border-light)' }}>
            <h3 className="flagquiz-section-title" style={{ border: 'none', padding: 0, marginBottom: 12 }}>
              {language === 'de' && 'Sprache des Quiz'}
              {language === 'en' && 'Quiz Language'}
              {language === 'fr' && 'Langue du Quiz'}
              {language === 'es' && 'Idioma del Quiz'}
              {language === 'it' && 'Lingua del Quiz'}
            </h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {LANGUAGE_OPTIONS.map((langOpt) => {
                const isActive = language === langOpt.code;
                return (
                  <button
                    key={langOpt.code}
                    type="button"
                    onClick={() => setLanguage(langOpt.code)}
                    className={`flagquiz-count-btn ${isActive ? 'selected' : ''}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px' }}
                  >
                    <FlagIcon lang={langOpt.code} width={20} height={14} />
                    <span>{langOpt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 1: Kategorie-Auswahl */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 className="flagquiz-section-title" style={{ margin: 0, border: 'none' }}>
              1. {language === 'de' && 'Themenbereiche auswählen'}
              {language === 'en' && 'Select Categories'}
              {language === 'fr' && 'Sélectionnez les catégories'}
              {language === 'es' && 'Seleccionar categorías'}
              {language === 'it' && 'Seleziona le categorie'}
            </h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                onClick={selectAllCategories}
                className="flagquiz-secondary-btn"
                style={{ fontSize: 12, padding: '4px 10px' }}
              >
                {language === 'de' ? 'Alle auswählen' : 'Select All'}
              </button>
              <button
                type="button"
                onClick={deselectAllCategories}
                className="flagquiz-secondary-btn"
                style={{ fontSize: 12, padding: '4px 10px', background: 'transparent' }}
              >
                {language === 'de' ? 'Zurücksetzen' : 'Reset'}
              </button>
            </div>
          </div>

          <div className="continent-select-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {CATEGORIES_INFO.map((cat) => {
              const isSelected = selectedCategories.includes(cat.id);
              const count = GEOGRAPHY_QUIZ_QUESTIONS.filter((q) => q.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  className={`continent-chip-btn ${isSelected ? 'selected' : ''}`}
                >
                  <div className="continent-chip-info">
                    <span style={{ fontSize: '15px', color: isSelected ? 'var(--green-dark)' : 'var(--text-color)' }}>
                      {cat.name[language] || cat.name.de}
                    </span>
                  </div>
                  <span className="continent-chip-count">{count} {language === 'de' ? 'Fragen' : 'Q'}</span>
                </button>
              );
            })}
          </div>

          {/* Section 2: Fragenanzahl */}
          <h3 className="flagquiz-section-title">
            2. {language === 'de' && 'Anzahl der Fragen'}
            {language === 'en' && 'Number of Questions'}
            {language === 'fr' && 'Nombre de questions'}
            {language === 'es' && 'Número de preguntas'}
            {language === 'it' && 'Numero di domande'}
          </h3>

          <div className="flagquiz-count-row">
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
              onClick={() => setSelectedQuestionCount(availableQuestions.length || 100)}
              className={`flagquiz-count-btn ${selectedQuestionCount >= (availableQuestions.length || 100) ? 'selected' : ''}`}
            >
              {language === 'de' ? `Alle (${availableQuestions.length})` : `All (${availableQuestions.length})`}
            </button>
          </div>

          {/* Pool Summary & Start Action */}
          <div className="flagquiz-actions-row">
            <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              <span>{language === 'de' ? 'Ausgewählter Fragenpool:' : 'Selected question pool:'} </span>
              <strong style={{ color: 'var(--green-dark)' }}>{availableQuestions.length} {language === 'de' ? 'Fragen' : 'questions'}</strong>
              {selectedCategories.length === 0 && (
                <span style={{ color: '#c62828', display: 'block', marginTop: 4 }}>
                  {language === 'de' ? 'Bitte mindestens eine Kategorie wählen!' : 'Please select at least one category!'}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={startQuiz}
              disabled={availableQuestions.length === 0}
              className="flagquiz-primary-btn"
            >
              <Play style={{ width: 18, height: 18 }} />
              <span>
                {language === 'de' && 'Quiz starten'}
                {language === 'en' && 'Start Quiz'}
                {language === 'fr' && 'Démarrer le quiz'}
                {language === 'es' && 'Iniciar Quiz'}
                {language === 'it' && 'Avvia Quiz'}
              </span>
            </button>
          </div>

        </div>

        {/* Highscore Leaderboard Preview on Start Screen */}
        <div className="dashboard-section" style={{ marginTop: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
            <h2 style={{ margin: 0 }}>
              <span>{language === 'de' ? 'Aktuelle Bestenliste (Highscore)' : 'Leaderboard (Highscores)'}</span>
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
              {CATEGORIES_INFO.map((c) => (
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
                    <th>{language === 'de' ? 'Themen' : 'Topics'}</th>
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
                          {entry.categories.includes('alle')
                            ? (language === 'de' ? 'Alle Themen' : 'All Topics')
                            : entry.categories.map((c) => getCategoryTitle(c)).join(', ')}
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

  // =============================================================
  // RENDER: PLAYING SCREEN
  // =============================================================
  if (gameState === 'playing' && currentQuestion) {
    const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

    const questionTitle = currentQuestion.raw.question[language] || currentQuestion.raw.question.de;
    const explanationTitle = currentQuestion.raw.explanation[language] || currentQuestion.raw.explanation.de;
    const correctOptionText = currentQuestion.raw.correctAnswer[language] || currentQuestion.raw.correctAnswer.de;

    return (
      <div className="flagquiz-container">
        
        {/* Top Status & Controls Bar */}
        <div className="flagquiz-card" style={{ padding: '20px 24px' }}>
          
          <div className="flagquiz-status-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--green-dark)' }}>
                {language === 'de' ? 'Frage' : 'Question'} {currentIndex + 1} / {questions.length}
              </span>
              <span className="flagquiz-badge" style={{ fontSize: '11px', padding: '2px 8px' }}>
                {getCategoryTitle(currentQuestion.raw.category)}
              </span>
            </div>

            <div className="flagquiz-stats-badges">
              {streak >= 2 && (
                <span className="flagquiz-badge" style={{ background: 'var(--green-light)', color: 'var(--green-dark)' }}>
                  <Award style={{ width: 15, height: 15 }} />
                  <span>{streak}er Serie</span>
                </span>
              )}

              <span className="flagquiz-badge">
                <CheckCircle2 style={{ width: 15, height: 15, color: '#16a34a' }} />
                <span>{score} {language === 'de' ? 'Punkte' : 'Points'}</span>
              </span>

              <button
                type="button"
                onClick={() => setGameState('config')}
                className="flagquiz-secondary-btn"
                style={{ fontSize: 12, padding: '4px 10px' }}
                title="Quiz beenden"
              >
                <Settings2 style={{ width: 14, height: 14 }} />
                <span>{language === 'de' ? 'Abbrechen' : 'Exit'}</span>
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flagquiz-progress-bar-container">
            <div
              className="flagquiz-progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Question Text Box */}
          <div 
            style={{ 
              background: 'var(--bg-body)', 
              border: '1.5px solid var(--green-border)', 
              borderRadius: 8, 
              padding: '24px 20px', 
              marginBottom: 24,
              textAlign: 'center' 
            }}
          >
            <h2 style={{ fontSize: '20px', color: 'var(--green-dark)', lineHeight: 1.4, margin: 0, fontWeight: 700 }}>
              {questionTitle}
            </h2>
          </div>

          {/* 4 Multiple Choice Options */}
          <div className="quiz-options-grid">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedOptionId === opt.optId;
              const isCorrect = opt.isCorrect;
              const optText = opt.raw[language] || opt.raw.de;

              let btnClass = '';
              if (isAnswered) {
                if (isCorrect) {
                  btnClass = 'correct';
                } else if (isSelected) {
                  btnClass = 'wrong';
                }
              }

              return (
                <button
                  key={opt.optId}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(opt)}
                  className={`quiz-option-btn ${btnClass}`}
                  style={{ minHeight: 60 }}
                >
                  <span className="quiz-option-key">{idx + 1}</span>
                  <span style={{ flex: 1, fontSize: '15px' }}>{optText}</span>
                  {isAnswered && isCorrect && (
                    <CheckCircle2 style={{ width: 18, height: 18, color: '#16a34a', flexShrink: 0 }} />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle style={{ width: 18, height: 18, color: '#dc2626', flexShrink: 0 }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Feedback & Detailed Explanation Box */}
          {isAnswered && (
            <div
              className={`quiz-feedback-box ${
                selectedOptionId === currentQuestion.correctOptId
                  ? 'feedback-correct'
                  : 'feedback-wrong'
              }`}
              style={{ flexDirection: 'column', alignItems: 'stretch', gap: 14 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '16px', marginBottom: 2 }}>
                    {selectedOptionId === currentQuestion.correctOptId
                      ? (language === 'de' ? 'Richtig!' : 'Correct!')
                      : (language === 'de' ? 'Falsch!' : 'Incorrect!')}
                  </strong>
                  <span style={{ fontSize: '14px' }}>
                    {language === 'de' ? 'Richtige Antwort:' : 'Correct answer:'}{' '}
                    <strong>{correctOptionText}</strong>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="flagquiz-primary-btn"
                  style={{ padding: '8px 20px', fontSize: '14px' }}
                  autoFocus
                >
                  <span>
                    {currentIndex + 1 < questions.length
                      ? (language === 'de' ? 'Nächste Frage' : 'Next Question')
                      : (language === 'de' ? 'Zur Auswertung' : 'View Results')}
                  </span>
                  <ArrowRight style={{ width: 15, height: 15 }} />
                </button>
              </div>

              {/* Facherklärung */}
              {explanationTitle && (
                <div 
                  style={{ 
                    borderTop: '1px solid rgba(0,0,0,0.1)', 
                    paddingTop: 10, 
                    marginTop: 2,
                    fontSize: '13.5px',
                    lineHeight: 1.55 
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, marginBottom: 4 }}>
                    <BookOpen style={{ width: 14, height: 14 }} />
                    <span>{language === 'de' ? 'Erklärung & Hintergrund:' : 'Explanation & Context:'}</span>
                  </div>
                  <p style={{ margin: 0 }}>{explanationTitle}</p>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    );
  }

  // =============================================================
  // RENDER: RESULT & HIGHSCORE SCREEN
  // =============================================================
  const finalPercentage = Math.round((score / Math.max(1, questions.length)) * 100);

  let resultTitle = language === 'de' ? 'Gut gemacht!' : 'Well done!';
  let resultSubtitle = language === 'de' ? 'Du hast die Runde erfolgreich beendet.' : 'You have completed the round.';
  if (finalPercentage === 100) {
    resultTitle = language === 'de' ? 'Perfekt! Volle Punktzahl!' : 'Perfect! Full Score!';
    resultSubtitle = language === 'de' ? 'Alle Fragen fehlerfrei beantwortet!' : 'You answered all questions with 100% accuracy!';
  } else if (finalPercentage >= 80) {
    resultTitle = language === 'de' ? 'Ausgezeichnet!' : 'Excellent!';
    resultSubtitle = language === 'de' ? 'Hervorragendes geographisches Wissen!' : 'Outstanding geographical knowledge!';
  } else if (finalPercentage >= 50) {
    resultTitle = language === 'de' ? 'Guter Versuch!' : 'Good job!';
    resultSubtitle = language === 'de' ? 'Übe weiter, um dein Wissen noch weiter auszubauen!' : 'Keep practicing to expand your knowledge even further!';
  }

  return (
    <div className="flagquiz-container">
      
      {/* Result Card */}
      <div className="flagquiz-card" style={{ textAlign: 'center' }}>
        
        <div className="highscore-result-header">
          <div className="highscore-score-circle">
            <span className="highscore-score-val">{score}/{questions.length}</span>
            <span className="highscore-score-label">{finalPercentage}%</span>
          </div>

          <h2 style={{ fontSize: '24px', color: 'var(--green-dark)', marginBottom: 6 }}>
            {resultTitle}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: 500, margin: '0 auto 20px auto' }}>
            {resultSubtitle}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
            <span className="flagquiz-badge" style={{ fontSize: '14px', padding: '6px 14px' }}>
              <Clock style={{ width: 16, height: 16 }} />
              <span>{totalTimeSpent} {language === 'de' ? 'Sekunden' : 'seconds'}</span>
            </span>

            {maxStreak >= 2 && (
              <span className="flagquiz-badge" style={{ fontSize: '14px', padding: '6px 14px', background: 'var(--green-light)', color: 'var(--green-dark)' }}>
                <Award style={{ width: 16, height: 16 }} />
                <span>{language === 'de' ? 'Beste Serie:' : 'Best streak:'} {maxStreak}</span>
              </span>
            )}
          </div>
        </div>

        {/* Highscore Name Entry Box */}
        <div className="highscore-name-entry-box" style={{ textAlign: 'left' }}>
          <h3 style={{ fontSize: '16px', color: 'var(--green-dark)', marginBottom: 4 }}>
            {language === 'de' ? 'In die Bestenliste eintragen' : 'Enter into the Leaderboard'}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
            {language === 'de'
              ? 'Trage deinen Wunschnamen ein, um deinen Highscore dauerhaft zu sichern:'
              : 'Enter your custom name to save your score to the leaderboard:'}
          </p>

          <form onSubmit={handleSaveHighscore} className="highscore-name-form">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder={language === 'de' ? 'Dein Name oder Spitzname' : 'Your name or nickname'}
              maxLength={30}
              disabled={hasSavedHs || isSavingHs}
              className="login-input"
              style={{ flex: 1 }}
              required
            />

            <button
              type="submit"
              disabled={hasSavedHs || isSavingHs}
              className="flagquiz-primary-btn"
              style={{ whiteSpace: 'nowrap', padding: '10px 20px' }}
            >
              {isSavingHs ? (
                <span>{language === 'de' ? 'Speichert...' : 'Saving...'}</span>
              ) : hasSavedHs ? (
                <>
                  <CheckCircle2 style={{ width: 16, height: 16 }} />
                  <span>{language === 'de' ? 'Eingetragen!' : 'Saved!'}</span>
                </>
              ) : (
                <span>{language === 'de' ? 'Score speichern' : 'Save Score'}</span>
              )}
            </button>
          </form>

          {saveSuccessMsg && (
            <p style={{ color: '#16a34a', fontSize: '13px', fontWeight: 600, marginTop: 8, marginBottom: 0 }}>
              {saveSuccessMsg}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={startQuiz}
            className="flagquiz-primary-btn"
          >
            <RotateCcw style={{ width: 16, height: 16 }} />
            <span>{language === 'de' ? 'Nochmals spielen' : 'Play Again'}</span>
          </button>

          <button
            type="button"
            onClick={() => setGameState('config')}
            className="flagquiz-secondary-btn"
            style={{ padding: '12px 20px', fontSize: '15px' }}
          >
            <Settings2 style={{ width: 16, height: 16 }} />
            <span>{language === 'de' ? 'Einstellungen ändern' : 'Change Settings'}</span>
          </button>
        </div>

      </div>

      {/* Highscore Leaderboard Table */}
      <div className="dashboard-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
          <h2 style={{ margin: 0 }}>
            <span>{language === 'de' ? 'Bestenliste (Highscores)' : 'Leaderboard (Highscores)'}</span>
          </h2>

          <div className="highscore-filter-tabs" style={{ margin: 0 }}>
            <button
              type="button"
              onClick={() => setHsFilter('alle')}
              className={`highscore-filter-btn ${hsFilter === 'alle' ? 'active' : ''}`}
            >
              {language === 'de' ? 'Gesamt' : 'All'}
            </button>
            {CATEGORIES_INFO.map((c) => (
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
            {language === 'de' ? 'Noch keine Highscores vorhanden.' : 'No highscores recorded yet.'}
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
                  <th>{language === 'de' ? 'Themen' : 'Topics'}</th>
                  <th>{language === 'de' ? 'Datum' : 'Date'}</th>
                </tr>
              </thead>
              <tbody>
                {filteredHighscores.slice(0, 25).map((entry, idx) => {
                  const rank = idx + 1;
                  const isCurrent = hasSavedHs && entry.name === (playerName.trim() || 'Anonym') && entry.score === score;
                  return (
                    <tr
                      key={entry.id || `${entry.name}-${idx}`}
                      style={isCurrent ? { background: 'var(--green-light)' } : undefined}
                    >
                      <td style={{ textAlign: 'center', fontWeight: 700, color: rank <= 3 ? 'var(--green-dark)' : 'var(--text-muted)' }}>
                        {rank}.
                      </td>
                      <td className="dashboard-table-student" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>
                        {entry.name} {isCurrent && <span style={{ fontSize: '11px', color: 'var(--green-primary)' }}>({language === 'de' ? 'Du' : 'You'})</span>}
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
                        {entry.categories.includes('alle')
                          ? (language === 'de' ? 'Alle Themen' : 'All Topics')
                          : entry.categories.map((c) => getCategoryTitle(c)).join(', ')}
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
