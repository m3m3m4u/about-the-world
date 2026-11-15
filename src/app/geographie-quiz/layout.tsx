import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Geographie-Quiz | Über 500 Fragen zu Hauptstädten, Flüssen & Rekorden',
  description:
    'Großes interaktives Geographie-Quiz mit über 500 Fragen zu Hauptstädten, Gebirgen, Flüssen, Ozeanen und Weltrekorden inklusive Highscore-Bestenliste.',
  alternates: {
    canonical: '/geographie-quiz',
  },
  openGraph: {
    title: 'Geographie-Quiz | Über 500 Fragen zu Hauptstädten, Flüssen & Rekorden',
    description:
      'Teste dein weltweites Erdkundewissen mit über 500 Multiple-Choice-Fragen und messe dich auf der Bestenliste.',
    url: 'https://www.about-the-world.org/geographie-quiz',
  },
};

export default function GeographyQuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
