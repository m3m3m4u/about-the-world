import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Landkarten-Quiz | Interaktive Weltkarten & Satellitenbilder',
  description:
    'Finde Länder, Bundesländer, Kantone und Städte auf der interaktiven Landkarte. Geographisches Suchspiel mit Satellitenansicht und Highscore.',
  alternates: {
    canonical: '/landkarten-quiz',
  },
  openGraph: {
    title: 'Landkarten-Quiz | Interaktive Weltkarten & Satellitenbilder',
    description:
      'Trainiere deine Kartenkunde: Länder, Hauptstädte und Regionen auf der Weltkarte orten.',
    url: 'https://www.about-the-world.org/landkarten-quiz',
  },
};

export default function LandkartenQuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
