import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kartenquiz & Satellitenquiz | Länder, Staaten & Städte auf der Weltkarte',
  description:
    'Finde Länder, Bundesländer, Kantone und Metropolen auf interaktiven Karten und Satellitenbildern. Mit Timer, Punktestand und Genauigkeitsauswertung.',
  alternates: {
    canonical: '/kartenquiz',
  },
  openGraph: {
    title: 'Kartenquiz & Satellitenquiz | Interaktive Landkarten weltweit',
    description:
      'Interaktives Karten- & Satellitenquiz: Trainiere deine geographische Orientierung auf detaillierten Weltkarten.',
    url: 'https://www.about-the-world.org/kartenquiz',
  },
};

export default function KartenquizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
