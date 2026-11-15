import type { Metadata } from 'next';

const geoChapterMetadata: Record<string, { title: string; desc: string }> = {
  'vulkanismus-und-erdbeben': {
    title: 'Vulkanismus & Erdbeben | Plattentektonik & Naturphänomene',
    desc: 'Lerne alles über Vulkanausbrüche, Magmakammern, tektonische Erdbeben und Tsunamis mit interaktiven Darstellungen.',
  },
  'gebirge-und-gipfel': {
    title: 'Gebirge & Gipfel | Die höchsten Berge & Faltengebirge',
    desc: 'Entstehung von Hochgebirgen, die höchsten Gipfel der Kontinente, Gletscher und alpine Lebensräume im Überblick.',
  },
  'ozeane-und-fluesse': {
    title: 'Ozeane & Flüsse | Hydrosphäre, Meeresströmungen & Ströme',
    desc: 'Die Weltmeere, längsten Flusssysteme, Meeresströmungen und die Bedeutung des globalen Wasserkreislaufs.',
  },
  'wuesten-und-klima': {
    title: 'Wüsten & Klimazonen | Trockenräume & Globale Klimate',
    desc: 'Klimazonen der Erde von den Tropen bis zu den Polarzonen: Entstehung von Wüsten, Vegetation und Klimawandel.',
  },
  'metropolen-und-staedte': {
    title: 'Metropolen & Megacities | Urbane Zentren der Erde',
    desc: 'Die größten Ballungsräume und Millionenstädte weltweit: Urbanisierung, Infrastruktur und geographische Besonderheiten.',
  },
  'zeitzonen-und-nationalparks': {
    title: 'Zeitzonen & Nationalparks | Raum, Zeit & Naturschutz',
    desc: 'Erde im Gradnetz: Zeitzonen, Datumsgrenze, berühmte Schutzgebiete und globale Naturschutz-Reservate.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapter: string }>;
}): Promise<Metadata> {
  const { chapter } = await params;
  const key = (chapter || '').toLowerCase();
  const info = geoChapterMetadata[key] || {
    title: 'Geographie Thema | About the World',
    desc: 'Geographische Lerneinheit auf About the World.',
  };

  return {
    title: info.title,
    description: info.desc,
    alternates: {
      canonical: `/geographie/${key}`,
    },
    openGraph: {
      title: `${info.title} | About the World`,
      description: info.desc,
      url: `https://www.about-the-world.org/geographie/${key}`,
    },
  };
}

export default function GeographyChapterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
