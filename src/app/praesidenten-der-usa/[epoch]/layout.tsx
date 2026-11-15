import type { Metadata } from 'next';

const epochMetadata: Record<string, { title: string; desc: string }> = {
  gruendervaeter: {
    title: 'Gründerväter & Frühe Republik | US-Präsidenten',
    desc: 'George Washington, John Adams, Thomas Jefferson, James Madison und James Monroe: Die Anfänge der USA und der Verfassung.',
  },
  expansion: {
    title: 'Expansion & Vorabend des Bürgerkriegs | US-Präsidenten',
    desc: 'Territoriale Ausdehnung nach Westen, Manifest Destiny und die wachsenden Spannungen vor dem Sezessionskrieg.',
  },
  buergerkrieg: {
    title: 'Bürgerkrieg & Gilded Age | US-Präsidenten',
    desc: 'Abraham Lincoln, die Abschaffung der Sklaverei, Wiederaufbau (Reconstruction) und der Aufstieg zur Industrienation.',
  },
  'progressive-aera': {
    title: 'Progressive Ära & Weltkriege | US-Präsidenten',
    desc: 'Theodore Roosevelt, Woodrow Wilson und Franklin D. Roosevelt: New Deal und die Rolle der USA im Ersten und Zweiten Weltkrieg.',
  },
  'kalter-krieg': {
    title: 'Kalter Krieg & Bürgerrechte | US-Präsidenten',
    desc: 'Truman, Eisenhower, JFK, LBJ, Nixon und Reagan: Konfrontation mit der Sowjetunion, Mondlandung und Bürgerrechtsbewegung.',
  },
  'moderne-aera': {
    title: 'Das moderne Amerika (21. Jahrhundert) | US-Präsidenten',
    desc: 'Clinton, Bush, Obama, Trump und Biden: Zeitgeschichte, Globalisierung und moderne Herausforderungen der US-Politik.',
  },
  wahlsystem: {
    title: 'US-Präsidentschaftswahlsystem | Electoral College & Primaries',
    desc: 'Wie funktioniert die Wahl des US-Präsidenten? Electoral College, Vorwahlen (Primaries & Caucuses), Swing States und Swing-Voter erklärt.',
  },
  'wichtigste-praesidenten': {
    title: 'Die wichtigsten US-Präsidenten | Historische Meilensteine',
    desc: 'Die prägendsten Staatsmänner der amerikanischen Geschichte und ihr bleibendes Erbe im Überblick.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ epoch: string }>;
}): Promise<Metadata> {
  const { epoch } = await params;
  const key = (epoch || '').toLowerCase();
  const info = epochMetadata[key] || {
    title: 'Präsidenten der USA | Epochen & Porträts',
    desc: 'US-Präsidenten im historischen Kontext auf About the World.',
  };

  return {
    title: info.title,
    description: info.desc,
    alternates: {
      canonical: `/praesidenten-der-usa/${key}`,
    },
    openGraph: {
      title: `${info.title} | About the World`,
      description: info.desc,
      url: `https://www.about-the-world.org/praesidenten-der-usa/${key}`,
    },
  };
}

export default function EpochLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
