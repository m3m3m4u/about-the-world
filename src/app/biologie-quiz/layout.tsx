import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Biologie-Quiz | Tierarten, Klassen & Pflanzen erkennen',
  description:
    'Teste dein Wissen über Flora und Fauna: Welches Tier gehört zu welcher Ordnung? Bestimme Arten, Lebensräume und biologische Besonderheiten.',
  alternates: {
    canonical: '/biologie-quiz',
  },
  openGraph: {
    title: 'Biologie-Quiz | Tierarten, Klassen & Pflanzen erkennen',
    description:
      'Interaktives Biologie-Quiz: Bestimme Tierarten und Ordnungen anhand von Fotos und Merkmalen.',
    url: 'https://www.about-the-world.org/biologie-quiz',
  },
};

export default function BiologieQuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
