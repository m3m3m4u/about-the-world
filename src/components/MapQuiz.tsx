'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/types';
import {
  MAP_CONTINENTS,
  MAP_REGION_SETS,
  MAP_CITIES_DATA,
  MapQuizMode,
  MapQuestionType,
  MapQuizQuestion,
  calculateDistanceKm,
} from '@/data/map_quiz_data';
import {
  getTranslatedCountryName,
  getTranslatedRegionName,
  getMapQuizText,
} from '@/data/map_translations';
import {
  Map as MapIcon,
  Globe,
  Compass,
  Trophy,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Settings2,
  Award,
  Layers,
  HelpCircle,
  Check,
  Flame,
  Maximize2,
  Minimize2,
} from 'lucide-react';

const InteractiveMap = dynamic(
  () => import('@/components/InteractiveMap').then((mod) => mod.InteractiveMap),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: '520px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--green-light)',
          border: '1px solid var(--green-border)',
          borderRadius: 8,
          color: 'var(--green-dark)',
          fontWeight: 600,
        }}
      >
        <MapIcon style={{ width: 24, height: 24, marginRight: 8 }} />
        <span>Karte wird geladen...</span>
      </div>
    ),
  }
);

interface HighscoreItem {
  id?: string;
  name: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  mode: string;
  filter: string;
  timeSpentSeconds?: number;
  createdAt: string;
}

const LOCAL_STORAGE_HS_KEY = 'atw_mapquiz_highscores';
const LOCAL_STORAGE_NAME_KEY = 'atw_flagquiz_player_name';

export function MapQuiz() {
  const { language } = useLanguage();

  // -------------------------------------------------------------
  // Config State
  // -------------------------------------------------------------
  const [quizMode, setQuizMode] = useState<MapQuizMode>('countries');
  const [selectedContinent, setSelectedContinent] = useState<string>('europa');
  const [selectedRegionSetId, setSelectedRegionSetId] = useState<string>('de');
  const [questionType, setQuestionType] = useState<MapQuestionType>('find_on_map');
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(10);
  const [gameState, setGameState] = useState<'config' | 'playing' | 'result'>('config');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // -------------------------------------------------------------
  // Gameplay State
  // -------------------------------------------------------------
  const [questions, setQuestions] = useState<MapQuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [answeredFeatureId, setAnsweredFeatureId] = useState<string | null>(null);
  const [answeredFeatureName, setAnsweredFeatureName] = useState<string | null>(null);
  const [userGuessCoords, setUserGuessCoords] = useState<[number, number] | null>(null);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [lastEarnedPoints, setLastEarnedPoints] = useState<number>(0);
  const [lastDistanceRating, setLastDistanceRating] = useState<{ text: string; color: string } | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [questionResults, setQuestionResults] = useState<{
    targetName: string;
    correct: boolean;
    distance?: number;
    pointsGained?: number;
  }[]>([]);

  // -------------------------------------------------------------
  // Highscore State
  // -------------------------------------------------------------
  const [playerName, setPlayerName] = useState<string>('');
  const [highscores, setHighscores] = useState<HighscoreItem[]>([]);
  const [hsFilter, setHsFilter] = useState<string>('alle');
  const [isSavingHs, setIsSavingHs] = useState<boolean>(false);
  const [hasSavedHs, setHasSavedHs] = useState<boolean>(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_NAME_KEY);
      if (saved) setPlayerName(saved);
    } catch (e) {}
    fetchHighscores();
  }, []);

  const fetchHighscores = async () => {
    let apiScores: HighscoreItem[] = [];
    try {
      const res = await fetch('/api/kartenquiz/highscore');
      if (res.ok) {
        const data = await res.json();
        if (data.highscores && Array.isArray(data.highscores)) {
          apiScores = data.highscores;
        }
      }
    } catch (e) {
      console.warn('Highscore API unavailable, using localStorage');
    }

    let localScores: HighscoreItem[] = [];
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_HS_KEY);
      if (raw) localScores = JSON.parse(raw);
    } catch (e) {}

    const combined = [...apiScores];
    localScores.forEach((ls) => {
      if (!combined.some((c) => c.createdAt === ls.createdAt && c.name === ls.name && c.score === ls.score)) {
        combined.push(ls);
      }
    });

    combined.sort((a, b) => b.score - a.score || b.percentage - a.percentage);
    setHighscores(combined);
  };

  // -------------------------------------------------------------
  // Generate Questions Engine with 100% Localized Names
  // -------------------------------------------------------------
  const startQuiz = async () => {
    let generated: MapQuizQuestion[] = [];

    // 1. Countries Mode
    if (quizMode === 'countries') {
      const contConfig = MAP_CONTINENTS.find((c) => c.id === selectedContinent) || MAP_CONTINENTS[1];
      try {
        const res = await fetch(contConfig.geojsonFile);
        const geojson = await res.json();
        const features: any[] = geojson.features || [];

        const shuffled = [...features].sort(() => 0.5 - Math.random());
        const count = selectedQuestionCount === 0 ? shuffled.length : Math.min(selectedQuestionCount, shuffled.length);

        for (let i = 0; i < count; i++) {
          const target = shuffled[i];
          const targetId = String(target.id || target.properties.id);
          const rawName = target.properties.name || targetId;
          const flagCode = (target.properties.iso_a2 || targetId).toLowerCase();

          // Get 100% localized multilingual text (DE, EN, FR, ES, IT)
          const targetLocalized = getTranslatedCountryName(flagCode || targetId, rawName);

          const distractors = features
            .filter((f) => String(f.id || f.properties.id) !== targetId)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .map((d) => {
              const dId = String(d.id || d.properties.id);
              const dFlag = (d.properties.iso_a2 || dId).toLowerCase();
              const dName = d.properties.name || dId;
              return {
                id: dId,
                name: getTranslatedCountryName(dFlag || dId, dName),
                isCorrect: false,
              };
            });

          const correctOpt = {
            id: targetId,
            name: targetLocalized,
            isCorrect: true,
          };

          const options = [correctOpt, ...distractors].sort(() => 0.5 - Math.random());

          generated.push({
            id: `country_${targetId}_${i}`,
            mode: 'countries',
            targetId,
            targetName: targetLocalized,
            flagCode,
            center: contConfig.center,
            zoom: contConfig.zoom,
            questionType,
            geojsonFile: contConfig.geojsonFile,
            options,
          });
        }
      } catch (e) {
        console.error('Failed to load countries GeoJSON:', e);
      }
    }

    // 2. Regions Mode (DE, CH, AT, US, FR, ES, IT, CA, AU, etc.)
    else if (quizMode === 'regions') {
      const regSet = MAP_REGION_SETS.find((r) => r.id === selectedRegionSetId) || MAP_REGION_SETS[0];
      try {
        const res = await fetch(regSet.geojsonFile);
        const geojson = await res.json();
        const features: any[] = geojson.features || [];

        const shuffled = [...features].sort(() => 0.5 - Math.random());
        const count = selectedQuestionCount === 0 ? shuffled.length : Math.min(selectedQuestionCount, shuffled.length);

        for (let i = 0; i < count; i++) {
          const target = shuffled[i];
          const targetId = String(target.id || target.properties.id);
          const rawName = target.properties.name || targetId;

          // Get 100% localized multilingual text for regional subdivisions
          const targetLocalized = getTranslatedRegionName(regSet.countryCode, targetId, rawName);

          const distractors = features
            .filter((f) => String(f.id || f.properties.id) !== targetId)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .map((d) => {
              const dId = String(d.id || d.properties.id);
              const dName = d.properties.name || dId;
              return {
                id: dId,
                name: getTranslatedRegionName(regSet.countryCode, dId, dName),
                isCorrect: false,
              };
            });

          const correctOpt = {
            id: targetId,
            name: targetLocalized,
            isCorrect: true,
          };

          const options = [correctOpt, ...distractors].sort(() => 0.5 - Math.random());

          generated.push({
            id: `region_${targetId}_${i}`,
            mode: 'regions',
            targetId,
            targetName: targetLocalized,
            countryCode: regSet.countryCode,
            secondaryInfo: {
              de: `${regSet.name.de} (${regSet.subdivisionType.de})`,
              en: `${regSet.name.en} (${regSet.subdivisionType.en})`,
              fr: `${regSet.name.fr} (${regSet.subdivisionType.fr})`,
              es: `${regSet.name.es} (${regSet.subdivisionType.es})`,
              it: `${regSet.name.it} (${regSet.subdivisionType.it})`,
            },
            center: regSet.defaultCenter,
            zoom: regSet.defaultZoom,
            questionType,
            geojsonFile: regSet.geojsonFile,
            options,
          });
        }
      } catch (e) {
        console.error('Failed to load regions GeoJSON:', e);
      }
    }

    // 3. Cities Mode
    else if (quizMode === 'cities') {
      let filtered = [...MAP_CITIES_DATA];
      let overviewCenter: [number, number] = [25, 10];
      let overviewZoom = 2.8;

      if (selectedContinent !== 'alle') {
        filtered = filtered.filter((c) => c.continent === selectedContinent);
        const contCfg = MAP_CONTINENTS.find((c) => c.id === selectedContinent);
        if (contCfg) {
          overviewCenter = contCfg.center;
          overviewZoom = contCfg.zoom;
        }
      }

      const shuffled = filtered.sort(() => 0.5 - Math.random());
      const count = selectedQuestionCount === 0 ? shuffled.length : Math.min(selectedQuestionCount, shuffled.length);

      for (let i = 0; i < count; i++) {
        const target = shuffled[i];

        const distractors = filtered
          .filter((c) => c.id !== target.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map((d) => ({
            id: d.id,
            name: d.name,
            isCorrect: false,
          }));

        const correctOpt = {
          id: target.id,
          name: target.name,
          isCorrect: true,
        };

        const options = [correctOpt, ...distractors].sort(() => 0.5 - Math.random());

        generated.push({
          id: `city_${target.id}_${i}`,
          mode: 'cities',
          targetId: target.id,
          targetName: target.name,
          countryCode: target.countryCode,
          secondaryInfo: {
            de: `Land: ${target.country.de} • Einwohner: ${target.population || '-'}`,
            en: `Country: ${target.country.en} • Population: ${target.population || '-'}`,
            fr: `Pays : ${target.country.fr} • Population : ${target.population || '-'}`,
            es: `País: ${target.country.es} • Población: ${target.population || '-'}`,
            it: `Paese: ${target.country.it} • Popolazione: ${target.population || '-'}`,
          },
          coordinates: target.coordinates,
          center: questionType === 'satellite_detective' ? target.coordinates : overviewCenter,
          zoom: questionType === 'satellite_detective' ? 12 : overviewZoom,
          questionType,
          options,
        });
      }
    }

    if (generated.length === 0) {
      alert('Keine Fragen für diese Auswahl gefunden.');
      return;
    }

    setQuestions(generated);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setIsAnswered(false);
    setIsCorrect(false);
    setAnsweredFeatureId(null);
    setAnsweredFeatureName(null);
    setUserGuessCoords(null);
    setDistanceKm(null);
    setSelectedOptionId(null);
    setShowHint(false);
    setLastEarnedPoints(0);
    setLastDistanceRating(null);
    setQuestionResults([]);
    setStartTime(Date.now());
    setGameState('playing');
  };

  // -------------------------------------------------------------
  // Answer Evaluation
  // -------------------------------------------------------------
  const currentQ = questions[currentIndex];

  const handleFeatureClick = (featureId: string, featureName: string) => {
    if (isAnswered || !currentQ) return;

    setAnsweredFeatureId(featureId);
    let localizedName = featureName;
    if (currentQ.mode === 'countries') {
      localizedName = getTranslatedCountryName(featureId, featureName)[language] || featureName;
    } else if (currentQ.mode === 'regions') {
      localizedName = getTranslatedRegionName(currentQ.countryCode || 'de', featureId, featureName)[language] || featureName;
    }
    setAnsweredFeatureName(localizedName);
    setIsAnswered(true);

    const isMatch = String(featureId).toLowerCase() === String(currentQ.targetId).toLowerCase();
    evaluateAnswer(isMatch, localizedName);
  };

  // Helper: Distance-based scoring for cities (fine-grained scaling based on km)
  const calculateCityDistanceScore = useCallback((distKm: number, lang: Language) => {
    let basePoints = 0;
    if (distKm <= 20) {
      basePoints = 100;
    } else if (distKm <= 100) {
      basePoints = Math.round(100 - (distKm - 20) * 0.2); // 84 - 100 Pkt.
    } else if (distKm <= 300) {
      basePoints = Math.round(84 - (distKm - 100) * 0.15); // 54 - 84 Pkt.
    } else if (distKm <= 750) {
      basePoints = Math.round(54 - (distKm - 300) * 0.065); // 25 - 54 Pkt.
    } else if (distKm <= 1500) {
      basePoints = Math.round(25 - (distKm - 750) * 0.026); // 5 - 25 Pkt.
    } else if (distKm <= 2500) {
      basePoints = Math.round(5 - (distKm - 1500) * 0.005); // 1 - 5 Pkt.
    } else {
      basePoints = 0;
    }

    basePoints = Math.max(0, Math.min(100, basePoints));
    const isSuccess = distKm <= 250;

    const labels = {
      bullseye: { de: 'Volltreffer!', en: 'Bullseye!', fr: 'Dans le mille !', es: '¡Diana!', it: 'Centro perfetto!' },
      close: { de: 'Sehr nah!', en: 'Very close!', fr: 'Très proche !', es: '¡Muy cerca!', it: 'Molto vicino!' },
      good: { de: 'Gute Treffgenauigkeit', en: 'Good accuracy', fr: 'Bonne précision', es: 'Buena precisión', it: 'Buona precisione' },
      fair: { de: 'Recht nah dran', en: 'Fairly close', fr: 'Assez proche', es: 'Bastante cerca', it: 'Abbastanza vicino' },
      rough: { de: 'Grobe Richtung', en: 'Rough direction', fr: 'Direction approximative', es: 'Dirección aproximada', it: 'Direzione approssimativa' },
      far: { de: 'Zu weit entfernt', en: 'Too far away', fr: 'Trop éloigné', es: 'Demasiado lejos', it: 'Troppo lontano' },
    };

    let ratingText = labels.bullseye[lang] || labels.bullseye.de;
    let color = '#15803d';

    if (distKm > 20 && distKm <= 100) {
      ratingText = labels.close[lang] || labels.close.de;
      color = '#16a34a';
    } else if (distKm > 100 && distKm <= 300) {
      ratingText = labels.good[lang] || labels.good.de;
      color = '#65a30d';
    } else if (distKm > 300 && distKm <= 750) {
      ratingText = labels.fair[lang] || labels.fair.de;
      color = '#d97706';
    } else if (distKm > 750 && distKm <= 1800) {
      ratingText = labels.rough[lang] || labels.rough.de;
      color = '#ea580c';
    } else if (distKm > 1800) {
      ratingText = labels.far[lang] || labels.far.de;
      color = '#dc2626';
    }

    return { points: basePoints, isSuccess, ratingText, color };
  }, []);

  const handleMapClick = (lat: number, lng: number) => {
    if (isAnswered || !currentQ || currentQ.mode !== 'cities' || !currentQ.coordinates) return;

    setUserGuessCoords([lat, lng]);
    setIsAnswered(true);

    const [tLat, tLng] = currentQ.coordinates;
    const dist = calculateDistanceKm(lat, lng, tLat, tLng);
    setDistanceKm(dist);

    const result = calculateCityDistanceScore(dist, language);
    const points = result.points;
    const correct = result.isSuccess;

    setIsCorrect(correct);
    setLastEarnedPoints(points);
    setLastDistanceRating({ text: result.ratingText, color: result.color });

    if (correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      setScore((prev) => prev + points + newStreak * 5);
    } else {
      setStreak(0);
      setScore((prev) => prev + points);
    }

    setQuestionResults((prev) => [
      ...prev,
      {
        targetName: currentQ.targetName[language] || currentQ.targetName.de,
        correct,
        distance: dist,
        pointsGained: points,
      },
    ]);
  };

  const handleOptionClick = (optId: string, optIsCorrect: boolean) => {
    if (isAnswered || !currentQ) return;

    setSelectedOptionId(optId);
    setAnsweredFeatureId(optId);
    const chosenOpt = currentQ.options?.find((o) => o.id === optId);
    if (chosenOpt) {
      setAnsweredFeatureName(chosenOpt.name[language] || chosenOpt.name.de);
    }
    setIsAnswered(true);

    evaluateAnswer(optIsCorrect);
  };

  const evaluateAnswer = (correct: boolean, extraInfo?: string) => {
    setIsCorrect(correct);

    if (correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      setScore((prev) => prev + 100 + newStreak * 10);
    } else {
      setStreak(0);
    }

    setQuestionResults((prev) => [
      ...prev,
      {
        targetName: currentQ?.targetName[language] || currentQ?.targetName.de || '',
        correct,
      },
    ]);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setIsAnswered(false);
      setIsCorrect(false);
      setAnsweredFeatureId(null);
      setAnsweredFeatureName(null);
      setUserGuessCoords(null);
      setDistanceKm(null);
      setSelectedOptionId(null);
      setShowHint(false);
      setLastEarnedPoints(0);
      setLastDistanceRating(null);
    } else {
      const elapsed = Math.round((Date.now() - startTime) / 1000);
      setTotalTimeSpent(elapsed);
      setGameState('result');
      setIsFullscreen(false);
      setHasSavedHs(false);
      setSaveSuccessMsg(null);
    }
  };

  const handleSaveHighscore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim() || hasSavedHs || isSavingHs) return;

    setIsSavingHs(true);
    const cleanName = playerName.trim().substring(0, 30);

    try {
      localStorage.setItem(LOCAL_STORAGE_NAME_KEY, cleanName);
    } catch (err) {}

    const totalQ = questions.length || 1;
    const correctCount = questionResults.filter((r) => r.correct).length;
    const percentage = Math.round((correctCount / totalQ) * 100);

    const newScore: HighscoreItem = {
      name: cleanName,
      score,
      totalQuestions: totalQ,
      percentage,
      mode: quizMode,
      filter: quizMode === 'regions' ? selectedRegionSetId : selectedContinent,
      timeSpentSeconds: totalTimeSpent,
      createdAt: new Date().toISOString(),
    };

    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_HS_KEY);
      const existing: HighscoreItem[] = raw ? JSON.parse(raw) : [];
      existing.push(newScore);
      localStorage.setItem(LOCAL_STORAGE_HS_KEY, JSON.stringify(existing));
    } catch (err) {}

    try {
      await fetch('/api/kartenquiz/highscore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newScore),
      });
    } catch (err) {}

    setIsSavingHs(false);
    setHasSavedHs(true);
    setSaveSuccessMsg(getMapQuizText('saveSuccess', language));
    fetchHighscores();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const filteredHighscores = useMemo(() => {
    if (hsFilter === 'alle') return highscores;
    return highscores.filter((h) => h.mode === hsFilter);
  }, [highscores, hsFilter]);

  // =========================================================================
  // RENDER: Configuration Screen (100% Multilingual)
  // =========================================================================
  if (gameState === 'config') {
    return (
      <div className="mapquiz-container">
        {/* Header Hero Box */}
        <div className="info-box-section" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: 'var(--green-light)',
                border: '1.5px solid var(--green-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--green-dark)',
              }}
            >
              <Compass style={{ width: 24, height: 24 }} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 22 }}>{getMapQuizText('heroTitle', language)}</h2>
              <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-muted)' }}>
                {getMapQuizText('heroSubtitle', language)}
              </p>
            </div>
          </div>
        </div>

        {/* 3 Main Categories Selection */}
        <div className="mapquiz-config-card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Layers style={{ width: 18, height: 18 }} />
            <span>{getMapQuizText('chooseCategory', language)}</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginBottom: 24 }}>
            {/* Mode 1: Countries */}
            <button
              type="button"
              onClick={() => setQuizMode('countries')}
              className={`mapquiz-mode-card ${quizMode === 'countries' ? 'active' : ''}`}
            >
              <div className="mode-card-header">
                <Globe style={{ width: 22, height: 22 }} />
                <span className="mode-title">{getMapQuizText('modeCountries', language)}</span>
                {quizMode === 'countries' && <CheckCircle2 style={{ width: 18, height: 18, marginLeft: 'auto', color: 'var(--green-dark)' }} />}
              </div>
              <p className="mode-desc">
                {getMapQuizText('modeCountriesDesc', language)}
              </p>
            </button>

            {/* Mode 2: Regions & States */}
            <button
              type="button"
              onClick={() => setQuizMode('regions')}
              className={`mapquiz-mode-card ${quizMode === 'regions' ? 'active' : ''}`}
            >
              <div className="mode-card-header">
                <MapIcon style={{ width: 22, height: 22 }} />
                <span className="mode-title">{getMapQuizText('modeRegions', language)}</span>
                {quizMode === 'regions' && <CheckCircle2 style={{ width: 18, height: 18, marginLeft: 'auto', color: 'var(--green-dark)' }} />}
              </div>
              <p className="mode-desc">
                {getMapQuizText('modeRegionsDesc', language)}
              </p>
            </button>

            {/* Mode 3: Cities & Megacities */}
            <button
              type="button"
              onClick={() => setQuizMode('cities')}
              className={`mapquiz-mode-card ${quizMode === 'cities' ? 'active' : ''}`}
            >
              <div className="mode-card-header">
                <Compass style={{ width: 22, height: 22 }} />
                <span className="mode-title">{getMapQuizText('modeCities', language)}</span>
                {quizMode === 'cities' && <CheckCircle2 style={{ width: 18, height: 18, marginLeft: 'auto', color: 'var(--green-dark)' }} />}
              </div>
              <p className="mode-desc">
                {getMapQuizText('modeCitiesDesc', language)}
              </p>
            </button>
          </div>

          {/* Sub-Filters based on Mode */}
          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 20, marginBottom: 20 }}>
            <h4 style={{ marginBottom: 12, color: 'var(--green-dark)' }}>
              {quizMode === 'countries' && getMapQuizText('selectContinent', language)}
              {quizMode === 'regions' && getMapQuizText('selectRegionSet', language)}
              {quizMode === 'cities' && getMapQuizText('selectCityRegion', language)}
            </h4>

            {/* Continent buttons for Countries or Cities */}
            {(quizMode === 'countries' || quizMode === 'cities') && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {MAP_CONTINENTS.map((c) => {
                  const isSel = selectedContinent === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedContinent(c.id)}
                      className={`mapquiz-pill-btn ${isSel ? 'active' : ''}`}
                    >
                      {c.name[language] || c.name.de}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Country list for Regional Subdivisions (NO FLAGS) */}
            {quizMode === 'regions' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
                {MAP_REGION_SETS.map((r) => {
                  const isSel = selectedRegionSetId === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setSelectedRegionSetId(r.id)}
                      className={`mapquiz-pill-btn regional-pill ${isSel ? 'active' : ''}`}
                      style={{ textAlign: 'left', padding: '10px 14px', height: 'auto' }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{r.name[language] || r.name.de}</div>
                        <div style={{ fontSize: 11.5, opacity: 0.85 }}>{r.subdivisionType[language] || r.subdivisionType.de}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Question Type & Gameplay Settings */}
          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 20, marginBottom: 20 }}>
            <h4 style={{ marginBottom: 12, color: 'var(--green-dark)' }}>{getMapQuizText('gameplaySettings', language)}</h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10, marginBottom: 16 }}>
              <button
                type="button"
                onClick={() => setQuestionType('find_on_map')}
                className={`mapquiz-pill-btn ${questionType === 'find_on_map' ? 'active' : ''}`}
              >
                {getMapQuizText('typeFindOnMap', language)}
              </button>

              <button
                type="button"
                onClick={() => setQuestionType('spotlight')}
                className={`mapquiz-pill-btn ${questionType === 'spotlight' ? 'active' : ''}`}
              >
                {getMapQuizText('typeSpotlight', language)}
              </button>

              <button
                type="button"
                onClick={() => setQuestionType('satellite_detective')}
                className={`mapquiz-pill-btn ${questionType === 'satellite_detective' ? 'active' : ''}`}
              >
                {getMapQuizText('typeDetective', language)}
              </button>
            </div>

            {/* Question count selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)' }}>{getMapQuizText('questionCount', language)}</span>
              {[5, 10, 15, 20, 0].map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => setSelectedQuestionCount(cnt)}
                  className={`mapquiz-pill-btn ${selectedQuestionCount === cnt ? 'active' : ''}`}
                  style={{ minWidth: 44, padding: '6px 14px' }}
                >
                  {cnt === 0 ? getMapQuizText('allQuestions', language) : cnt}
                </button>
              ))}
            </div>
          </div>

          {/* Start Game Action */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-light)', paddingTop: 16 }}>
            <button type="button" onClick={startQuiz} className="flagquiz-primary-btn" style={{ cursor: 'pointer', padding: '12px 32px' }}>
              <Play style={{ width: 18, height: 18 }} />
              <span>{getMapQuizText('startQuizBtn', language)}</span>
            </button>
          </div>
        </div>

        {/* Highscore Leaderboard Table */}
        <div className="mapquiz-config-card" style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Trophy style={{ width: 18, height: 18, color: '#f59e0b' }} />
              <span>{getMapQuizText('leaderboardTitle', language)}</span>
            </h3>

            <div style={{ display: 'flex', gap: 6 }}>
              {[
                { id: 'alle', label: getMapQuizText('filterAllModes', language) },
                { id: 'countries', label: getMapQuizText('filterCountries', language) },
                { id: 'regions', label: getMapQuizText('filterRegions', language) },
                { id: 'cities', label: getMapQuizText('filterCities', language) },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setHsFilter(f.id)}
                  className={`flagquiz-secondary-btn ${hsFilter === f.id ? 'active' : ''}`}
                  style={{ fontSize: 12, padding: '4px 10px' }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {filteredHighscores.length === 0 ? (
            <p style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', padding: '24px 0' }}>
              {getMapQuizText('noHighscoresYet', language)}
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="mapquiz-table">
                <thead>
                  <tr>
                    <th style={{ width: 40 }}>{getMapQuizText('thRank', language)}</th>
                    <th>{getMapQuizText('thName', language)}</th>
                    <th>{getMapQuizText('thMode', language)}</th>
                    <th>{getMapQuizText('thScore', language)}</th>
                    <th>{getMapQuizText('thAccuracy', language)}</th>
                    <th>{getMapQuizText('thTime', language)}</th>
                    <th>{getMapQuizText('thDate', language)}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHighscores.slice(0, 15).map((h, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 700, color: idx < 3 ? 'var(--green-dark)' : 'inherit' }}>{idx + 1}</td>
                      <td style={{ fontWeight: 600 }}>{h.name}</td>
                      <td>
                        <span className="mapquiz-mode-tag">
                          {h.mode === 'countries' ? getMapQuizText('filterCountries', language) : h.mode === 'regions' ? getMapQuizText('filterRegions', language) : getMapQuizText('filterCities', language)}
                        </span>
                      </td>
                      <td style={{ fontWeight: 700, color: 'var(--green-dark)' }}>{h.score} {getMapQuizText('pointsUnit', language)}</td>
                      <td>{h.percentage}% ({h.totalQuestions})</td>
                      <td>{h.timeSpentSeconds ? formatTime(h.timeSpentSeconds) : '-'}</td>
                      <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                        {new Date(h.createdAt).toLocaleDateString(language === 'de' ? 'de-DE' : language === 'en' ? 'en-US' : language === 'fr' ? 'fr-FR' : language === 'es' ? 'es-ES' : 'it-IT')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // RENDER: Gameplay Screen (with integrated Fullscreen HUD inside the Map)
  // =========================================================================
  if (gameState === 'playing' && currentQ) {
    const isSpotlight = currentQ.questionType === 'spotlight' || currentQ.questionType === 'satellite_detective';

    // Question Prompt Content Block (NO FLAGS)
    const QuestionPromptNode = (
      <div className={`mapquiz-question-banner ${isFullscreen ? 'hud-floating' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 700, textTransform: 'uppercase', color: 'var(--green-dark)', letterSpacing: 0.5 }}>
              {currentQ.questionType === 'find_on_map' && getMapQuizText('taskFindOnMap', language)}
              {currentQ.questionType === 'spotlight' && getMapQuizText('taskSpotlight', language)}
              {currentQ.questionType === 'satellite_detective' && getMapQuizText('taskDetective', language)}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
              <h2 style={{ margin: 0, fontSize: 23, color: 'var(--text-color)' }}>
                {isSpotlight && !isAnswered ? '???' : currentQ.targetName[language] || currentQ.targetName.de}
              </h2>
            </div>

            {currentQ.secondaryInfo && (
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
                {currentQ.secondaryInfo[language] || currentQ.secondaryInfo.de}
              </div>
            )}
          </div>

          {!isAnswered && (
            <button
              type="button"
              onClick={() => setShowHint(true)}
              className="flagquiz-secondary-btn"
              style={{ fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <HelpCircle style={{ width: 14, height: 14 }} />
              <span>{getMapQuizText('hintBtn', language)}</span>
            </button>
          )}
        </div>

        {showHint && (
          <div style={{ marginTop: 8, padding: '6px 10px', background: 'var(--bg-white)', border: '1px solid var(--green-border)', borderRadius: 6, fontSize: 12.5 }}>
            <strong>{getMapQuizText('hintPrefix', language)}</strong> {getMapQuizText('centerCoords', language)} {currentQ.center[0].toFixed(2)}° N, {currentQ.center[1].toFixed(2)}° E.
          </div>
        )}
      </div>
    );

    // Options & Feedback Block
    const OptionsAndFeedbackNode = (
      <>
        {/* Multiple Choice Options */}
        {isSpotlight && currentQ.options && (
          <div className={`mapquiz-options-grid ${isFullscreen ? 'hud-floating-options' : ''}`}>
            {currentQ.options.map((opt, idx) => {
              let optClass = 'mapquiz-option-btn';
              if (isAnswered) {
                if (opt.isCorrect) optClass += ' correct';
                else if (selectedOptionId === opt.id) optClass += ' wrong';
                else optClass += ' disabled';
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleOptionClick(opt.id, opt.isCorrect)}
                  disabled={isAnswered}
                  className={optClass}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <span className="quiz-opt-key">{String.fromCharCode(65 + idx)}</span>
                    <span>{opt.name[language] || opt.name.de}</span>
                  </span>
                  {isAnswered && opt.isCorrect && <CheckCircle2 style={{ width: 18, height: 18, color: '#16a34a' }} />}
                  {isAnswered && !opt.isCorrect && selectedOptionId === opt.id && <XCircle style={{ width: 18, height: 18, color: '#dc2626' }} />}
                </button>
              );
            })}
          </div>
        )}

        {/* Answer Feedback Box */}
        {isAnswered && (
          <div className={`mapquiz-feedback-box ${isCorrect ? 'correct' : 'wrong'} ${isFullscreen ? 'hud-floating-feedback' : ''}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {isCorrect ? (
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0, boxShadow: '0 2px 8px rgba(34, 197, 94, 0.35)' }}>
                  <CheckCircle2 style={{ width: 22, height: 22 }} />
                </div>
              ) : (
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0, boxShadow: '0 2px 8px rgba(239, 68, 68, 0.35)' }}>
                  <XCircle style={{ width: 22, height: 22 }} />
                </div>
              )}

              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 15,
                    color: currentQ.mode === 'cities' && lastDistanceRating
                      ? lastDistanceRating.color
                      : isCorrect ? '#15803d' : '#b91c1c',
                  }}
                >
                  {currentQ.mode === 'cities' && distanceKm !== null ? (
                    <>
                      {lastDistanceRating?.text || (isCorrect ? getMapQuizText('solvedCorrectly', language) : getMapQuizText('solvedIncorrectly', language))}
                      <span style={{ marginLeft: 6, fontWeight: 800, color: 'var(--green-dark)' }}>
                        (+{lastEarnedPoints} {getMapQuizText('pointsUnit', language)})
                      </span>
                    </>
                  ) : (
                    isCorrect ? getMapQuizText('solvedCorrectly', language) : getMapQuizText('solvedIncorrectly', language)
                  )}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-color)', marginTop: 3 }}>
                  {!isCorrect && answeredFeatureName && (
                    <div style={{ color: '#b91c1c', marginBottom: 2 }}>
                      ✗ {language === 'en' ? 'Your choice: ' :
                         language === 'fr' ? 'Votre choix : ' :
                         language === 'es' ? 'Tu elección: ' :
                         language === 'it' ? 'La tua scelta: ' :
                         'Deine Wahl: '}
                      <strong>{answeredFeatureName}</strong>
                    </div>
                  )}
                  <div style={{ color: isCorrect ? 'var(--text-color)' : '#15803d' }}>
                    {isCorrect ? (
                      <>
                        {getMapQuizText('wasLookingFor', language)}{' '}
                        <strong>{currentQ.targetName[language] || currentQ.targetName.de}</strong>
                      </>
                    ) : (
                      <>
                        ✓ {language === 'en' ? 'Correct answer: ' :
                           language === 'fr' ? 'Bonne réponse : ' :
                           language === 'es' ? 'Respuesta correcta: ' :
                           language === 'it' ? 'Risposta corretta: ' :
                           'Richtig war: '}
                        <strong>{currentQ.targetName[language] || currentQ.targetName.de}</strong>
                      </>
                    )}
                    {distanceKm !== null && ` • ${getMapQuizText('measuredDistance', language)} ${Math.round(distanceKm).toLocaleString('de-DE')} km`}
                  </div>
                </div>
              </div>
            </div>

            <button type="button" onClick={handleNextQuestion} className="flagquiz-primary-btn" style={{ cursor: 'pointer', padding: '10px 22px' }}>
              <span>{currentIndex + 1 < questions.length ? getMapQuizText('btnNextQuestion', language) : getMapQuizText('btnShowResults', language)}</span>
              <ArrowRight style={{ width: 16, height: 16 }} />
            </button>
          </div>
        )}
      </>
    );

    // =========================================================================
    // FULLSCREEN PLAYING LAYOUT (HUD inside the Map)
    // =========================================================================
    if (isFullscreen) {
      return (
        <div className="mapquiz-fullscreen-wrapper">
          <InteractiveMap
            geojsonUrl={currentQ.geojsonFile}
            targetFeatureId={currentQ.targetId}
            targetName={currentQ.targetName[language] || currentQ.targetName.de}
            answeredFeatureId={answeredFeatureId}
            answeredName={answeredFeatureName || undefined}
            isAnswered={isAnswered}
            isCorrect={isCorrect}
            highlightCorrectId={currentQ.targetId}
            spotlightMode={isSpotlight}
            targetCoordinates={currentQ.coordinates}
            userPlacedCoordinates={userGuessCoords}
            distanceKm={distanceKm}
            center={currentQ.center}
            zoom={currentQ.zoom}
            onFeatureClick={handleFeatureClick}
            onMapClick={handleMapClick}
            disabled={isAnswered}
            isFullscreen={true}
            onToggleFullscreen={() => setIsFullscreen(false)}
          >
            {/* Top Floating HUD: Header Status Bar + Question Card */}
            <div className="fullscreen-top-hud">
              <div className="fullscreen-hud-bar">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--green-dark)' }}>
                    {language === 'en' ? `Question ${currentIndex + 1}/${questions.length}` :
                     language === 'fr' ? `Question ${currentIndex + 1}/${questions.length}` :
                     language === 'es' ? `Pregunta ${currentIndex + 1}/${questions.length}` :
                     language === 'it' ? `Domanda ${currentIndex + 1}/${questions.length}` :
                     `Frage ${currentIndex + 1}/${questions.length}`}
                  </span>
                  <span className="flagquiz-badge" style={{ padding: '3px 10px', fontSize: 12 }}>
                    <Award style={{ width: 13, height: 13 }} />
                    {score} {getMapQuizText('pointsUnit', language)}
                  </span>
                  {streak > 1 && (
                    <span className="flagquiz-badge flagquiz-streak-badge" style={{ padding: '3px 10px', fontSize: 12 }}>
                      <Flame style={{ width: 13, height: 13 }} />
                      {streak} {getMapQuizText('streakLabel', language)}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsFullscreen(false);
                      setGameState('config');
                    }}
                    className="flagquiz-secondary-btn"
                    style={{ padding: '4px 10px', fontSize: 12 }}
                  >
                    <Settings2 style={{ width: 13, height: 13 }} />
                    <span>{getMapQuizText('btnQuitShort', language)}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsFullscreen(false)}
                    className="flagquiz-secondary-btn"
                    style={{ padding: '4px 10px', fontSize: 12 }}
                    title="Vollbild verlassen"
                  >
                    <Minimize2 style={{ width: 13, height: 13 }} />
                    <span>{getMapQuizText('btnWindow', language)}</span>
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="flagquiz-progress-bar-container" style={{ margin: '6px 0 8px 0', height: 4 }}>
                <div
                  className="flagquiz-progress-bar-fill"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              {QuestionPromptNode}
            </div>

            {/* Bottom Floating HUD: Options & Feedback */}
            <div className="fullscreen-bottom-hud">
              {OptionsAndFeedbackNode}
            </div>
          </InteractiveMap>
        </div>
      );
    }

    // =========================================================================
    // STANDARD (NON-FULLSCREEN) PLAYING LAYOUT
    // =========================================================================
    return (
      <div className="mapquiz-container">
        {/* Top Header Status Bar */}
        <div className="flagquiz-status-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--green-dark)' }}>
              {language === 'en' ? `Question ${currentIndex + 1} of ${questions.length}` :
               language === 'fr' ? `Question ${currentIndex + 1} sur ${questions.length}` :
               language === 'es' ? `Pregunta ${currentIndex + 1} de ${questions.length}` :
               language === 'it' ? `Domanda ${currentIndex + 1} di ${questions.length}` :
               `Frage ${currentIndex + 1} von ${questions.length}`}
            </span>
            <span className="flagquiz-badge">
              <Award style={{ width: 14, height: 14 }} />
              {score} {getMapQuizText('pointsUnit', language)}
            </span>
            {streak > 1 && (
              <span className="flagquiz-badge flagquiz-streak-badge">
                <Flame style={{ width: 14, height: 14 }} />
                {streak} {getMapQuizText('streakLabel', language)}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="flagquiz-secondary-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <Maximize2 style={{ width: 14, height: 14 }} />
              <span>{getMapQuizText('btnFullscreen', language)}</span>
            </button>

            <button
              type="button"
              onClick={() => setGameState('config')}
              className="flagquiz-secondary-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <Settings2 style={{ width: 14, height: 14 }} />
              <span>{getMapQuizText('btnExitQuiz', language)}</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flagquiz-progress-bar-container">
          <div
            className="flagquiz-progress-bar-fill"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question Prompt Card */}
        {QuestionPromptNode}

        {/* Map Container */}
        <div style={{ margin: '16px 0' }}>
          <InteractiveMap
            geojsonUrl={currentQ.geojsonFile}
            targetFeatureId={currentQ.targetId}
            targetName={currentQ.targetName[language] || currentQ.targetName.de}
            answeredFeatureId={answeredFeatureId}
            answeredName={answeredFeatureName || undefined}
            isAnswered={isAnswered}
            isCorrect={isCorrect}
            highlightCorrectId={currentQ.targetId}
            spotlightMode={isSpotlight}
            targetCoordinates={currentQ.coordinates}
            userPlacedCoordinates={userGuessCoords}
            distanceKm={distanceKm}
            center={currentQ.center}
            zoom={currentQ.zoom}
            onFeatureClick={handleFeatureClick}
            onMapClick={handleMapClick}
            disabled={isAnswered}
            isFullscreen={false}
            onToggleFullscreen={() => setIsFullscreen(true)}
            height="520px"
          />
        </div>

        {/* Options & Feedback */}
        {OptionsAndFeedbackNode}
      </div>
    );
  }

  // =========================================================================
  // RENDER: Result Screen (100% Multilingual)
  // =========================================================================
  if (gameState === 'result') {
    const correctCount = questionResults.filter((r) => r.correct).length;
    const totalCount = questions.length || 1;
    const percentage = Math.round((correctCount / totalCount) * 100);

    return (
      <div className="mapquiz-container">
        <div className="mapquiz-config-card" style={{ textAlign: 'center', padding: '36px 20px' }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'var(--green-light)',
              border: '2px solid var(--green-border)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--green-dark)',
              marginBottom: 16,
            }}
          >
            <Trophy style={{ width: 32, height: 32, color: '#f59e0b' }} />
          </div>

          <h2 style={{ fontSize: 26, marginBottom: 8 }}>{getMapQuizText('quizFinishedTitle', language)}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 15, maxWidth: 500, margin: '0 auto 24px' }}>
            {getMapQuizText('quizFinishedDesc', language)}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12, maxWidth: 640, margin: '0 auto 28px' }}>
            <div className="result-stat-box">
              <div className="stat-value">{score}</div>
              <div className="stat-label">{getMapQuizText('statTotalScore', language)}</div>
            </div>
            <div className="result-stat-box">
              <div className="stat-value">{percentage}%</div>
              <div className="stat-label">
                {language === 'en' ? `${correctCount} of ${totalCount} hits` :
                 language === 'fr' ? `${correctCount} sur ${totalCount} réussis` :
                 language === 'es' ? `${correctCount} de ${totalCount} aciertos` :
                 language === 'it' ? `${correctCount} su ${totalCount} centri` :
                 `${correctCount} von ${totalCount} Treffer`}
              </div>
            </div>
            {quizMode === 'cities' && questionResults.some((r) => r.distance !== undefined) ? (
              <>
                <div className="result-stat-box">
                  <div className="stat-value">
                    {Math.round(
                      questionResults.reduce((acc, r) => acc + (r.distance || 0), 0) /
                        Math.max(1, questionResults.filter((r) => r.distance !== undefined).length)
                    ).toLocaleString('de-DE')} km
                  </div>
                  <div className="stat-label">{getMapQuizText('statAvgDistance', language)}</div>
                </div>
                <div className="result-stat-box">
                  <div className="stat-value">
                    {Math.round(
                      Math.min(...questionResults.map((r) => r.distance ?? 99999))
                    ).toLocaleString('de-DE')} km
                  </div>
                  <div className="stat-label">{getMapQuizText('statBestHit', language)}</div>
                </div>
              </>
            ) : (
              <div className="result-stat-box">
                <div className="stat-value">{maxStreak}</div>
                <div className="stat-label">{getMapQuizText('statMaxStreak', language)}</div>
              </div>
            )}
            <div className="result-stat-box">
              <div className="stat-value">{formatTime(totalTimeSpent)}</div>
              <div className="stat-label">{getMapQuizText('statTotalTime', language)}</div>
            </div>
          </div>

          <div style={{ maxWidth: 440, margin: '0 auto 28px', padding: 20, background: 'var(--green-light)', border: '1px solid var(--green-border)', borderRadius: 8 }}>
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--green-dark)' }}>{getMapQuizText('saveHighscoreTitle', language)}</h4>
            {!hasSavedHs ? (
              <form onSubmit={handleSaveHighscore} style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder={getMapQuizText('namePlaceholder', language)}
                  maxLength={30}
                  className="mapquiz-input"
                  required
                />
                <button type="submit" disabled={isSavingHs} className="flagquiz-primary-btn" style={{ padding: '8px 18px', fontSize: 14 }}>
                  {isSavingHs ? getMapQuizText('savingText', language) : getMapQuizText('btnSave', language)}
                </button>
              </form>
            ) : (
              <div style={{ color: 'var(--green-dark)', fontWeight: 600, fontSize: 14 }}>
                <Check style={{ width: 16, height: 16, display: 'inline', marginRight: 6 }} />
                {saveSuccessMsg}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <button type="button" onClick={startQuiz} className="flagquiz-primary-btn">
              <RotateCcw style={{ width: 18, height: 18 }} />
              <span>{getMapQuizText('btnPlayAgain', language)}</span>
            </button>

            <button type="button" onClick={() => setGameState('config')} className="flagquiz-secondary-btn" style={{ padding: '12px 24px', fontSize: 15 }}>
              <Settings2 style={{ width: 18, height: 18 }} />
              <span>{getMapQuizText('btnNewGame', language)}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
