'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  COUNTRIES_FLAG_DATA,
  CONTINENTS_INFO,
  CountryFlagItem,
  ContinentInfo,
  getFlagUrl,
} from '@/data/flag_quiz_data';
import {
  Trophy,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Settings2,
  Globe,
  Award,
} from 'lucide-react';

interface QuizQuestion {
  country: CountryFlagItem;
  options: CountryFlagItem[];
  correctCode: string;
}

interface HighscoreItem {
  id?: string;
  name: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  continents: string[];
  timeSpentSeconds?: number;
  createdAt: string;
}

const LOCAL_STORAGE_HS_KEY = 'atw_flagquiz_highscores';
const LOCAL_STORAGE_NAME_KEY = 'atw_flagquiz_player_name';

export function FlagQuiz() {
  const { language } = useLanguage();

  // -------------------------------------------------------------
  // Game Setup State
  // -------------------------------------------------------------
  const allContinentIds = useMemo(() => CONTINENTS_INFO.map((c) => c.id), []);
  const [selectedContinents, setSelectedContinents] = useState<string[]>(allContinentIds);
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(10);
  const [gameState, setGameState] = useState<'config' | 'playing' | 'result'>('config');

  // -------------------------------------------------------------
  // Game Play State
  // -------------------------------------------------------------
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionCode, setSelectedOptionCode] = useState<string | null>(null);
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

  // Load saved player name & highscores on mount
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
      const res = await fetch('/api/flaggenquiz/highscore');
      if (res.ok) {
        const data = await res.json();
        if (data.highscores && Array.isArray(data.highscores)) {
          apiScores = data.highscores;
        }
      }
    } catch (e) {
      console.warn('Could not fetch highscores from API, falling back to localStorage');
    }

    // Merge with LocalStorage
    let localScores: HighscoreItem[] = [];
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_HS_KEY);
      if (raw) {
        localScores = JSON.parse(raw);
      }
    } catch (e) {}

    // Combine & deduplicate / sort
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
  // Filtered Country Pool
  // -------------------------------------------------------------
  const availableCountries = useMemo(() => {
    if (selectedContinents.length === 0) return [];
    return COUNTRIES_FLAG_DATA.filter((c) => selectedContinents.includes(c.continent));
  }, [selectedContinents]);

  const toggleContinent = (id: string) => {
    setSelectedContinents((prev) => {
      if (prev.includes(id)) {
        return prev.filter((c) => c !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const selectAllContinents = () => setSelectedContinents(allContinentIds);
  const deselectAllContinents = () => setSelectedContinents([]);

  // -------------------------------------------------------------
  // Start Quiz
  // -------------------------------------------------------------
  const startQuiz = useCallback(() => {
    if (availableCountries.length < 4) return;

    // Shuffle country pool
    const pool = [...availableCountries].sort(() => 0.5 - Math.random());
    const count = Math.min(selectedQuestionCount, pool.length);
    const selectedCountries = pool.slice(0, count);

    const generatedQuestions: QuizQuestion[] = selectedCountries.map((correctCountry) => {
      // Pick 3 wrong options: prefer same continent if possible, otherwise global pool
      const sameContinentPool = availableCountries.filter(
        (c) => c.continent === correctCountry.continent && c.code !== correctCountry.code
      );
      const otherPool = COUNTRIES_FLAG_DATA.filter((c) => c.code !== correctCountry.code);

      const wrongOptions: CountryFlagItem[] = [];
      const shuffledSame = [...sameContinentPool].sort(() => 0.5 - Math.random());
      for (const item of shuffledSame) {
        if (wrongOptions.length < 3) wrongOptions.push(item);
      }

      if (wrongOptions.length < 3) {
        const shuffledOther = [...otherPool].sort(() => 0.5 - Math.random());
        for (const item of shuffledOther) {
          if (wrongOptions.length < 3 && !wrongOptions.some((w) => w.code === item.code)) {
            wrongOptions.push(item);
          }
        }
      }

      const allOptions = [correctCountry, ...wrongOptions].sort(() => 0.5 - Math.random());

      return {
        country: correctCountry,
        options: allOptions,
        correctCode: correctCountry.code,
      };
    });

    setQuestions(generatedQuestions);
    setCurrentIndex(0);
    setSelectedOptionCode(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setHasSavedHs(false);
    setSaveSuccessMsg(null);
    setStartTime(Date.now());
    setGameState('playing');
  }, [availableCountries, selectedQuestionCount]);

  // -------------------------------------------------------------
  // Answer Handling
  // -------------------------------------------------------------
  const handleSelectOption = (code: string) => {
    if (isAnswered || !currentQuestion) return;

    setSelectedOptionCode(code);
    setIsAnswered(true);

    const isCorrect = code === currentQuestion.correctCode;
    if (isCorrect) {
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
      setSelectedOptionCode(null);
      setIsAnswered(false);
    } else {
      // Quiz Finished!
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
            handleSelectOption(questions[currentIndex].options[optIdx].code);
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

    const finalName = playerName.trim() || (language === 'de' ? 'Anonymer Entdecker' : 'Anonymous Explorer');
    setIsSavingHs(true);

    try {
      localStorage.setItem(LOCAL_STORAGE_NAME_KEY, finalName);
    } catch (e) {}

    const newHsEntry: HighscoreItem = {
      name: finalName,
      score,
      totalQuestions: questions.length,
      percentage: Math.round((score / questions.length) * 100),
      continents: selectedContinents.length === allContinentIds.length ? ['alle'] : selectedContinents,
      timeSpentSeconds: totalTimeSpent,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_HS_KEY);
      const existing: HighscoreItem[] = raw ? JSON.parse(raw) : [];
      existing.push(newHsEntry);
      localStorage.setItem(LOCAL_STORAGE_HS_KEY, JSON.stringify(existing));
    } catch (e) {}

    // Save to API
    try {
      await fetch('/api/flaggenquiz/highscore', {
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

  const getCountryTitle = (country: CountryFlagItem): string => {
    return country.name[language] || country.name.de;
  };

  const getCountryCapital = (country: CountryFlagItem): string => {
    return country.capital[language] || country.capital.de;
  };

  const getContinentTitle = (contId: string): string => {
    const found = CONTINENTS_INFO.find((c) => c.id === contId);
    return found ? (found.name[language] || found.name.de) : contId;
  };

  const filteredHighscores = useMemo(() => {
    if (hsFilter === 'alle') return highscores;
    return highscores.filter((h) => h.continents.includes(hsFilter) || h.continents.includes('alle'));
  }, [highscores, hsFilter]);

  // =============================================================
  // RENDER: CONFIGURATION SCREEN
  // =============================================================
  if (gameState === 'config') {
    return (
      <div className="flagquiz-container">
        
        {/* Intro Info-Box matching global.css */}
        <div className="info-box-section">
          <h2>
            {language === 'de' && 'Flaggenquiz – Teste dein Weltwissen!'}
            {language === 'en' && 'Flag Quiz – Test your World Knowledge!'}
            {language === 'fr' && 'Quiz des Drapeaux – Testez vos connaissances !'}
            {language === 'es' && 'Quiz de Banderas – ¡Pon a prueba tus conocimientos!'}
            {language === 'it' && 'Quiz sulle Bandiere – Metti alla prova le tue conoscenze!'}
          </h2>
          <p style={{ fontSize: '14px', lineHeight: 1.6, marginTop: 8 }}>
            {language === 'de' && 'Erkenne die Nationalflaggen der Staaten dieser Erde. Wähle unten deine gewünschten Kontinente und die Anzahl der Fragen aus, starte das Quiz und sichere dir einen Platz in der Bestenliste!'}
            {language === 'en' && 'Recognize the national flags of the countries of the world. Select your preferred continents and question count below, start the quiz, and claim your place on the leaderboard!'}
            {language === 'fr' && 'Reconnaissez les drapeaux nationaux des pays du monde. Choisissez vos continents et lancez le quiz !'}
            {language === 'es' && 'Reconoce las banderas nacionales del mundo. ¡Selecciona tus continentes y comienza el quiz!'}
            {language === 'it' && 'Riconosci le bandiere nazionali del mondo. Seleziona i tuoi continenti e avvia il quiz!'}
          </p>
        </div>

        {/* Configuration Card */}
        <div className="flagquiz-card">
          
          {/* Section 1: Kontinent-Auswahl */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 className="flagquiz-section-title" style={{ margin: 0, border: 'none' }}>
              1. {language === 'de' && 'Kontinente auswählen'}
              {language === 'en' && 'Select Continents'}
              {language === 'fr' && 'Sélectionnez les continents'}
              {language === 'es' && 'Seleccionar continentes'}
              {language === 'it' && 'Seleziona i continenti'}
            </h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                onClick={selectAllContinents}
                className="flagquiz-secondary-btn"
                style={{ fontSize: 12, padding: '4px 10px' }}
              >
                {language === 'de' ? 'Alle auswählen' : 'Select All'}
              </button>
              <button
                type="button"
                onClick={deselectAllContinents}
                className="flagquiz-secondary-btn"
                style={{ fontSize: 12, padding: '4px 10px', background: 'transparent' }}
              >
                {language === 'de' ? 'Zurücksetzen' : 'Reset'}
              </button>
            </div>
          </div>

          <div className="continent-select-grid">
            {CONTINENTS_INFO.map((cont) => {
              const isSelected = selectedContinents.includes(cont.id);
              const count = COUNTRIES_FLAG_DATA.filter((c) => c.continent === cont.id).length;
              return (
                <button
                  key={cont.id}
                  type="button"
                  onClick={() => toggleContinent(cont.id)}
                  className={`continent-chip-btn ${isSelected ? 'selected' : ''}`}
                >
                  <div className="continent-chip-info">
                    <span style={{ fontSize: '15px', color: isSelected ? 'var(--green-dark)' : 'var(--text-color)' }}>
                      {cont.name[language] || cont.name.de}
                    </span>
                  </div>
                  <span className="continent-chip-count">{count}</span>
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
              onClick={() => setSelectedQuestionCount(availableCountries.length || 100)}
              className={`flagquiz-count-btn ${selectedQuestionCount >= (availableCountries.length || 100) ? 'selected' : ''}`}
            >
              {language === 'de' ? `Alle (${availableCountries.length})` : `All (${availableCountries.length})`}
            </button>
          </div>

          {/* Pool Summary & Start Action */}
          <div className="flagquiz-actions-row">
            <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              <span>{language === 'de' ? 'Ausgewählter Pool:' : 'Selected pool:'} </span>
              <strong style={{ color: 'var(--green-dark)' }}>{availableCountries.length} {language === 'de' ? 'Länder' : 'countries'}</strong>
              {selectedContinents.length === 0 && (
                <span style={{ color: '#c62828', display: 'block', marginTop: 4 }}>
                  {language === 'de' ? 'Bitte mindestens einen Kontinent wählen!' : 'Please select at least one continent!'}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={startQuiz}
              disabled={availableCountries.length < 4}
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
              {CONTINENTS_INFO.map((c) => (
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
                    <th>{language === 'de' ? 'Kontinente' : 'Continents'}</th>
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
                          {entry.continents.includes('alle')
                            ? (language === 'de' ? 'Alle' : 'All')
                            : entry.continents.map((c) => getContinentTitle(c)).join(', ')}
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

    return (
      <div className="flagquiz-container">
        
        {/* Top Status & Controls Bar */}
        <div className="flagquiz-card" style={{ padding: '20px 24px' }}>
          
          <div className="flagquiz-status-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--green-dark)' }}>
                {language === 'de' ? 'Frage' : 'Question'} {currentIndex + 1} / {questions.length}
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

          {/* Flag Image Card */}
          <div className="flag-display-card">
            <div className="flag-image-wrapper">
              <img
                src={getFlagUrl(currentQuestion.country.code, 'w320')}
                alt="National Flag"
                className="flag-image"
                loading="eager"
              />
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: 18 }}>
            <h3 style={{ fontSize: '17px', color: 'var(--green-dark)', fontWeight: 600 }}>
              {language === 'de' && 'Zu welchem Land gehört diese Flagge?'}
              {language === 'en' && 'Which country does this flag belong to?'}
              {language === 'fr' && 'À quel pays appartient ce drapeau ?'}
              {language === 'es' && '¿A qué país pertenece esta bandera?'}
              {language === 'it' && 'A quale paese appartiene questa bandiera?'}
            </h3>
          </div>

          {/* 4 Multiple Choice Options */}
          <div className="quiz-options-grid">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedOptionCode === opt.code;
              const isCorrect = opt.code === currentQuestion.correctCode;

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
                  key={opt.code}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(opt.code)}
                  className={`quiz-option-btn ${btnClass}`}
                >
                  <span className="quiz-option-key">{idx + 1}</span>
                  <span style={{ flex: 1 }}>{getCountryTitle(opt)}</span>
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

          {/* Answer Feedback Box & Next Button */}
          {isAnswered && (
            <div
              className={`quiz-feedback-box ${
                selectedOptionCode === currentQuestion.correctCode
                  ? 'feedback-correct'
                  : 'feedback-wrong'
              }`}
            >
              <div>
                <strong style={{ display: 'block', fontSize: '15px', marginBottom: 2 }}>
                  {selectedOptionCode === currentQuestion.correctCode
                    ? (language === 'de' ? 'Richtig!' : 'Correct!')
                    : (language === 'de' ? 'Falsch!' : 'Incorrect!')}
                </strong>
                <span style={{ fontSize: '13.5px' }}>
                  {language === 'de' ? 'Richtiges Land:' : 'Correct Country:'}{' '}
                  <strong>{getCountryTitle(currentQuestion.country)}</strong>
                  {' • '}
                  {language === 'de' ? 'Hauptstadt:' : 'Capital:'}{' '}
                  <strong>{getCountryCapital(currentQuestion.country)}</strong>
                  {' • '}
                  {language === 'de' ? 'Kontinent:' : 'Continent:'}{' '}
                  <span>{getContinentTitle(currentQuestion.country.continent)}</span>
                </span>
              </div>

              <button
                type="button"
                onClick={handleNextQuestion}
                className="flagquiz-primary-btn"
                style={{ padding: '8px 18px', fontSize: '14px' }}
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
    resultSubtitle = language === 'de' ? 'Alle Flaggen fehlerfrei erkannt!' : 'You recognized all flags with 100% accuracy!';
  } else if (finalPercentage >= 80) {
    resultTitle = language === 'de' ? 'Ausgezeichnet!' : 'Excellent!';
    resultSubtitle = language === 'de' ? 'Hervorragendes geographisches Wissen!' : 'Outstanding world knowledge!';
  } else if (finalPercentage >= 50) {
    resultTitle = language === 'de' ? 'Guter Versuch!' : 'Good job!';
    resultSubtitle = language === 'de' ? 'Übe weiter, um noch mehr Flaggen zu meistern!' : 'Keep practicing to master even more flags!';
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
              <span className="flagquiz-badge" style={{ fontSize: '14px', padding: '6px 14px' }}>
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
            {CONTINENTS_INFO.map((c) => (
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
                  <th>{language === 'de' ? 'Kontinente' : 'Continents'}</th>
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
                        {entry.continents.includes('alle')
                          ? (language === 'de' ? 'Alle' : 'All')
                          : entry.continents.map((c) => getContinentTitle(c)).join(', ')}
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
