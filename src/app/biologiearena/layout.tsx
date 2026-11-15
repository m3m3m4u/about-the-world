import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Biologiearena | Die interaktive Natur- und Tier-Arena',
  description:
    'Fordere dich selbst heraus in der Biologiearena: Schnelligkeitsquiz, Highscores und Artenbestimmung zu Tieren und Pflanzen weltweit.',
  alternates: {
    canonical: '/biologiearena',
  },
  openGraph: {
    title: 'Biologiearena | Die interaktive Natur- und Tier-Arena',
    description:
      'Werde zum Artenkenner: Meistere knifflige biologische Bestimmungsaufgaben und erklimme die Rangliste.',
    url: 'https://www.about-the-world.org/biologiearena',
  },
};

export default function BiologiearenaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
