import type { Metadata } from 'next';

const regionMetadata: Record<string, { title: string; desc: string }> = {
  nordosten: {
    title: 'Nordosten & Neuengland | US-Bundesstaaten',
    desc: 'Lerne die Bundesstaaten im Nordosten der USA kennen: New York, Massachusetts, Pennsylvania, Maine und weitere.',
  },
  suedosten: {
    title: 'Südosten | US-Bundesstaaten',
    desc: 'Florida, Georgia, North Carolina, Virginia und die Staaten des amerikanischen Südostens.',
  },
  midwest: {
    title: 'Mittlerer Westen (Midwest) | US-Bundesstaaten',
    desc: 'Illinois, Ohio, Michigan, Indiana, Wisconsin und die Staaten der Großen Seen und Agrarregionen.',
  },
  sueden: {
    title: 'Der Süden (Deep South & Texas) | US-Bundesstaaten',
    desc: 'Texas, Louisiana, Alabama, Tennessee und die Südstaaten im geographischen Porträt.',
  },
  plains_mountains: {
    title: 'Great Plains & Rocky Mountains | US-Bundesstaaten',
    desc: 'Colorado, Montana, Wyoming, Kansas, Nebraska und die Weiten der Prärien und Rocky Mountains.',
  },
  pazifik_uebersee: {
    title: 'Pazifik, Alaska & Hawaii | US-Bundesstaaten',
    desc: 'Kalifornien, Washington, Oregon sowie Alaska und Hawaii im interaktiven Überblick.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const key = (region || '').toLowerCase();
  const info = regionMetadata[key] || {
    title: 'US-Bundesstaaten Region | About the World',
    desc: 'Lerne die Bundesstaaten dieser Region auf About the World kennen.',
  };

  return {
    title: info.title,
    description: info.desc,
    alternates: {
      canonical: `/us-bundesstaaten/${key}`,
    },
    openGraph: {
      title: `${info.title} | About the World`,
      description: info.desc,
      url: `https://www.about-the-world.org/us-bundesstaaten/${key}`,
    },
  };
}

export default function RegionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
