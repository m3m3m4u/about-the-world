import type { Metadata } from 'next';

const chapterMetadata: Record<string, { title: string; desc: string }> = {
  'geschichte-israels-und-palaestinas': {
    title: 'Geschichte Israels und Palästinas | Nahostkonflikt Dossier',
    desc: 'Die historischen Wurzeln des Nahostkonflikts von der Antike über die Balfour-Deklaration und das UN-Teilungsabkommen bis 1948.',
  },
  'kriege-und-krisen': {
    title: 'Kriege und Krisen im Nahostkonflikt | Chronologie & Fakten',
    desc: 'Vom Unabhängigkeitskrieg 1948, Sechstagekrieg 1967 und Jom-Kippur-Krieg 1973 bis zu den Libanonkriegen und jüngeren Eskalationen.',
  },
  'gruende-fuer-konflikt': {
    title: 'Gründe für den Nahostkonflikt | Land, Grenzen & Religion',
    desc: 'Die Kernstreitpunkte: Status von Jerusalem, Grenzziehungen, Siedlungsbau, Wasserressourcen und Sicherheitsinteressen.',
  },
  'lage-der-bevoelkerung': {
    title: 'Lage der Bevölkerung | Alltag, Flüchtlinge & Humanitäre Lage',
    desc: 'Einblick in die Lebensrealität der Zivilbevölkerung: Palästinensische Flüchtlingslager, Gazastreifen, Westjordanland und israelische Zivilgesellschaft.',
  },
  'die-rolle-von-aussenstehenden-parteien': {
    title: 'Internationale Akteure im Nahostkonflikt | USA, UN & Region',
    desc: 'Die geopolitische Dimension: Rollen der USA, EU, Vereinten Nationen, Irans und der arabischen Nachbarstaaten.',
  },
  'chancen-fuer-den-frieden': {
    title: 'Chancen für den Frieden | Abkommen & Zukunftsperspektiven',
    desc: 'Von den Camp-David-Abkommen und Osloer Verträgen bis zu modernen Friedensinitiativen und der Zwei-Staaten-Lösung.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapter: string }>;
}): Promise<Metadata> {
  const { chapter } = await params;
  const key = (chapter || '').toLowerCase();
  const info = chapterMetadata[key] || {
    title: 'Der Nahostkonflikt | Kapitelübersicht',
    desc: 'Dossierkapitel zum Nahostkonflikt auf About the World.',
  };

  return {
    title: info.title,
    description: info.desc,
    alternates: {
      canonical: `/der-nahostkonflikt/${key}`,
    },
    openGraph: {
      title: `${info.title} | About the World`,
      description: info.desc,
      url: `https://www.about-the-world.org/der-nahostkonflikt/${key}`,
    },
  };
}

export default function NahostChapterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
