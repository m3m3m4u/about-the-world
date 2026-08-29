import { getDatabase } from './mongodb';

export interface CatalogExercise {
  id: string;
  title: string;
  subject: string;
  subjectSlug: string;
  topicTitle: string;
  topicSlug: string;
  url: string;
}

let cachedExercises: CatalogExercise[] | null = null;
let cacheTime = 0;
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

export async function getAllExercises(): Promise<CatalogExercise[]> {
  const now = Date.now();
  if (cachedExercises && now - cacheTime < CACHE_TTL) {
    return cachedExercises;
  }

  try {
    const db = await getDatabase();
    const contents = await db.collection('h5p_contents').find({}).toArray();

    const list: CatalogExercise[] = contents.map((doc: any) => {
      const slug = doc.slug || `h5p-${doc.h5p_id}`;
      const title = doc.title || slug;
      let subject = 'Allgemein';
      let subjectSlug = 'allgemein';

      if (slug.includes('geographie') || slug.includes('erde') || slug.includes('kontinent')) {
        subject = 'Geographie';
        subjectSlug = 'geographie';
      } else if (slug.includes('nahost') || slug.includes('israel') || slug.includes('palaestina')) {
        subject = 'Der Nahostkonflikt';
        subjectSlug = 'der-nahostkonflikt';
      } else if (slug.includes('bundesstaat') || slug.includes('usa')) {
        subject = 'US-Bundesstaaten';
        subjectSlug = 'us-bundesstaaten';
      } else if (slug.includes('praesident')) {
        subject = 'US-Präsidenten';
        subjectSlug = 'praesidenten-der-usa';
      } else if (slug.includes('laender') || slug.includes('land')) {
        subject = 'Länder der Erde';
        subjectSlug = 'laender-der-erde';
      } else if (slug.includes('bio') || slug.includes('tier') || slug.includes('pflanze')) {
        subject = 'Biologie';
        subjectSlug = 'biologie';
      }

      return {
        id: slug,
        title,
        subject,
        subjectSlug,
        topicTitle: subject,
        topicSlug: subjectSlug,
        url: `/${slug}`,
      };
    });

    // Add standalone Tiere- und Pflanzenquiz
    list.push(
      {
        id: 'biologie-quiz',
        title: 'Tiere- und Pflanzenquiz (Artenbestimmung)',
        subject: 'Tiere- und Pflanzenquiz',
        subjectSlug: 'biologie',
        topicTitle: 'Tiere- und Pflanzenquiz',
        topicSlug: 'biologie',
        url: '/biologie/quiz',
      },
      {
        id: 'biologie-tierart-quiz',
        title: 'Tierart-Klassifikation (Säugetier, Vogel, Fisch, Reptil, Amphibie, Wirbellose)',
        subject: 'Tiere- und Pflanzenquiz',
        subjectSlug: 'biologie',
        topicTitle: 'Tiere- und Pflanzenquiz',
        topicSlug: 'biologie',
        url: '/biologie/tierart-quiz',
      }
    );

    list.sort((a, b) => a.subject.localeCompare(b.subject, 'de') || a.title.localeCompare(b.title, 'de'));
    cachedExercises = list;
    cacheTime = now;
    return list;
  } catch (err) {
    console.error('Failed to get exercises from DB:', err);
    return cachedExercises || [];
  }
}

export async function getExerciseById(id: string): Promise<CatalogExercise | null> {
  const all = await getAllExercises();
  return all.find((e) => e.id === id || e.id.endsWith(`-${id}`)) || null;
}
