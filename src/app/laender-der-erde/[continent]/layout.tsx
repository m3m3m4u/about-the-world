import type { Metadata } from 'next';

const continentMetadata: Record<string, { title: string; desc: string }> = {
  europa: {
    title: 'Europa | Alle Länder, Hauptstädte & Übungen',
    desc: 'Lerne alle Staaten Europas kennen: Hauptstädte, Flaggen, Bevölkerung, Geographie und interaktive H5P-Übungen zu jedem Land.',
  },
  asien: {
    title: 'Asien | Alle Länder, Geographie & Interaktive Module',
    desc: 'Erkunde Asiens vielfältige Staaten: Von Ostasien bis zum Nahen Osten mit Erklärungen, Karten und interaktiven Übungen.',
  },
  afrika: {
    title: 'Afrika | Alle Staaten des afrikanischen Kontinents',
    desc: 'Entdecke die Länder Afrikas: Nordafrika, West-, Zentral-, Ost- und das südliche Afrika mit multimedialen Lernmodulen.',
  },
  nordamerika: {
    title: 'Nordamerika | USA, Kanada, Mexiko & Karibik',
    desc: 'Länder und Territorien Nordamerikas und der Karibik: Geographie, Hauptstädte und interaktive Lerneinheiten.',
  },
  suedamerika: {
    title: 'Südamerika | Alle Staaten von den Anden bis zum Amazonas',
    desc: 'Südamerikas Länder im Detail: Brasilien, Argentinien, Kolumbien, Peru und mehr mit Videos, Flaggen und Quizzen.',
  },
  ozeanien: {
    title: 'Ozeanien & Australien | Inselstaaten & Geographie',
    desc: 'Australien, Neuseeland, Melanesien, Mikronesien und Polynesien: Interaktive Profile und Übungen.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ continent: string }>;
}): Promise<Metadata> {
  const { continent } = await params;
  const key = (continent || '').toLowerCase();
  const info = continentMetadata[key] || {
    title: `${continent.charAt(0).toUpperCase() + continent.slice(1)} | Länder der Erde`,
    desc: `Lerne die Länder von ${continent} kennen mit interaktiven Lerneinheiten auf About the World.`,
  };

  return {
    title: info.title,
    description: info.desc,
    alternates: {
      canonical: `/laender-der-erde/${key}`,
    },
    openGraph: {
      title: `${info.title} | About the World`,
      description: info.desc,
      url: `https://www.about-the-world.org/laender-der-erde/${key}`,
    },
  };
}

export default function ContinentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
