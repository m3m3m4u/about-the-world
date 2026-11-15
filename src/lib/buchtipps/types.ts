import { Language } from '@/types';

export type BuchCategory =
  | 'geographie-weltwissen'
  | 'geopolitik-geschichte'
  | 'usa-politik'
  | 'biologie-natur'
  | 'didaktik-schule';

export interface CategoryInfo {
  id: BuchCategory;
  label: Record<Language, string>;
  description: Record<Language, string>;
}

export const BUCH_CATEGORIES: CategoryInfo[] = [
  {
    id: 'geographie-weltwissen',
    label: {
      de: 'Geographie & Weltwissen',
      en: 'Geography & World Knowledge',
      fr: 'Géographie & Monde',
      es: 'Geografía y Mundo',
      it: 'Geografia e Mondo',
    },
    description: {
      de: 'Länder, Kontinente, Menschheitsgeschichte und globale Zusammenhänge verständlich erklärt.',
      en: 'Countries, continents, human history, and global patterns clearly explained.',
      fr: 'Pays, continents, histoire de l’humanité et dynamiques mondiales expliqués clairement.',
      es: 'Países, continentes, historia humana y dinámicas globales explicadas con claridad.',
      it: 'Paesi, continenti, storia umana e dinamiche globali spiegati con chiarezza.',
    },
  },
  {
    id: 'geopolitik-geschichte',
    label: {
      de: 'Geopolitik & Nahost',
      en: 'Geopolitics & Middle East',
      fr: 'Géopolitique & Proche-Orient',
      es: 'Geopolítica y Oriente Medio',
      it: 'Geopolitica e Medio Oriente',
    },
    description: {
      de: 'Hintergründe zu Weltregionen, Grenzen, historischen Konflikten und dem Nahen Osten.',
      en: 'Background on world regions, borders, historical conflicts, and the Middle East.',
      fr: 'Comprendre les régions du monde, les frontières et le conflit israélo-palestinien.',
      es: 'Claves sobre fronteras, conflictos históricos, geopolítica y Oriente Medio.',
      it: 'Approfondimenti su confini, conflitti storici, geopolitica e Medio Oriente.',
    },
  },
  {
    id: 'usa-politik',
    label: {
      de: 'USA, Präsidenten & Staaten',
      en: 'USA, Presidents & States',
      fr: 'États-Unis & Présidents',
      es: 'EE. UU. y Presidentes',
      it: 'USA, Presidenti e Stati',
    },
    description: {
      de: 'Amerikanische Geschichte, das Wahlsystem, Bundesstaaten und bedeutende Präsidenten.',
      en: 'American history, political institutions, states, and influential presidents.',
      fr: 'L’histoire américaine, la démocratie, les États et les grands présidents.',
      es: 'Historia de los Estados Unidos, instituciones y figuras presidenciales clave.',
      it: 'Storia degli Stati Uniti, sistema politico e presidenti fondamentali.',
    },
  },
  {
    id: 'biologie-natur',
    label: {
      de: 'Biologie & Natur',
      en: 'Biology & Nature',
      fr: 'Biologie & Nature',
      es: 'Biología y Naturaleza',
      it: 'Biologia e Natura',
    },
    description: {
      de: 'Artenvielfalt, Ökosysteme, Pflanzenwelt und faszinierende Einblicke in die Natur.',
      en: 'Biodiversity, ecosystems, flora, fauna, and the science of our living planet.',
      fr: 'Biodiversité, écosystèmes, monde végétal et vie secrète de la nature.',
      es: 'Biodiversidad, ecosistemas, botánica y divulgación naturalista.',
      it: 'Biodiversità, ecosistemi, mondo vegetale e scienze naturali.',
    },
  },
  {
    id: 'didaktik-schule',
    label: {
      de: 'Schule, KI & Lernen',
      en: 'Education, AI & Learning',
      fr: 'Éducation, IA & Pédagogie',
      es: 'Educación, IA y Pedagogía',
      it: 'Scuola, IA e Didattica',
    },
    description: {
      de: 'Zeitgemäße Mediendidaktik, KI im Klassenzimmer und digitale Lernkultur.',
      en: 'Modern pedagogy, AI in the classroom, and healthy digital learning.',
      fr: 'Pédagogie moderne, neurosciences de l’apprentissage et défis numériques.',
      es: 'Neuroeducación, innovación pedagógica y aprendizaje significativo.',
      it: 'Didattica moderna, scienze dell’apprendimento e sfide digitali.',
    },
  },
];

export interface BuchTipp {
  id: string;
  lang: Language;
  title: string;
  subtitle?: string;
  authorName: string;
  isbn: string; // ISBN-13
  publishYear?: number;
  pages?: number;
  publisher?: string;
  category: BuchCategory;
  summary: string;
  whyRecommended: string;
  targetAudience: string;
  topics: string[];
  coverId?: number;
}
