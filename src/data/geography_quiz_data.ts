import { Language } from '@/types';
import rawQuestions from './geography_quiz_data.json';

export interface QuizMultilingualText {
  de: string;
  en: string;
  fr: string;
  es: string;
  it: string;
}

export interface GeographyQuizQuestion {
  id: string;
  category: 'laender_hauptstaedte' | 'gewaesser' | 'berge_vulkane' | 'natur_landschaften';
  question: QuizMultilingualText;
  correctAnswer: QuizMultilingualText;
  wrongAnswers: [QuizMultilingualText, QuizMultilingualText, QuizMultilingualText];
  explanation: QuizMultilingualText;
}

export interface CategoryInfo {
  id: 'laender_hauptstaedte' | 'gewaesser' | 'berge_vulkane' | 'natur_landschaften';
  name: Record<Language, string>;
  iconName: 'Landmark' | 'Waves' | 'Mountain' | 'Compass';
}

export const CATEGORIES_INFO: CategoryInfo[] = [
  {
    id: 'laender_hauptstaedte',
    name: {
      de: 'Länder & Hauptstädte',
      en: 'Countries & Capitals',
      fr: 'Pays & Capitales',
      es: 'Países y Capitales',
      it: 'Paesi e Capitali',
    },
    iconName: 'Landmark',
  },
  {
    id: 'gewaesser',
    name: {
      de: 'Flüsse, Seen & Meere',
      en: 'Rivers, Lakes & Seas',
      fr: 'Fleuves, Lacs & Mers',
      es: 'Ríos, Lagos y Mares',
      it: 'Fiumi, Laghi e Mari',
    },
    iconName: 'Waves',
  },
  {
    id: 'berge_vulkane',
    name: {
      de: 'Berge & Gebirge',
      en: 'Mountains & Ranges',
      fr: 'Montagnes & Chaînes',
      es: 'Montañas y Cordilleras',
      it: 'Montagne e Catene',
    },
    iconName: 'Mountain',
  },
  {
    id: 'natur_landschaften',
    name: {
      de: 'Inseln, Wüsten & Natur',
      en: 'Islands, Deserts & Nature',
      fr: 'Îles, Déserts & Nature',
      es: 'Islas, Desiertos y Naturaleza',
      it: 'Isole, Deserti e Natura',
    },
    iconName: 'Compass',
  },
];

// Normalize and map categories to the 4 main clusters
function mapCategory(cat: string): 'laender_hauptstaedte' | 'gewaesser' | 'berge_vulkane' | 'natur_landschaften' {
  if (cat === 'gewaesser') return 'gewaesser';
  if (cat === 'berge_vulkane') return 'berge_vulkane';
  if (cat === 'inseln_wuesten' || cat === 'landschaften_inseln') return 'natur_landschaften';
  return 'laender_hauptstaedte';
}

export const GEOGRAPHY_QUIZ_QUESTIONS: GeographyQuizQuestion[] = (rawQuestions as any[]).map((q, idx) => ({
  id: q.id || `geo-q-${idx + 1}`,
  category: mapCategory(q.category || 'laender_hauptstaedte'),
  question: q.question,
  correctAnswer: q.correctAnswer,
  wrongAnswers: q.wrongAnswers as [QuizMultilingualText, QuizMultilingualText, QuizMultilingualText],
  explanation: q.explanation,
}));
