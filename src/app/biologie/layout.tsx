import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Biologie & Artenvielfalt | Tiere, Pflanzen & Naturkunde interaktiv',
  description:
    'Lerne die Artenvielfalt unserer Erde kennen: Bestimme Säugetiere, Vögel, Reptilien, Amphibien, Insekten und Pflanzen anhand detaillierter Bildkarten und Quizfragen.',
  alternates: {
    canonical: '/biologie',
  },
  openGraph: {
    title: 'Biologie & Artenvielfalt | Tiere, Pflanzen & Naturkunde interaktiv',
    description:
      'Artenbestimmung leicht gemacht: Säugetiere, Vögel, Insekten und Pflanzen mit Foto-Karten und Lernmodulen erforschen.',
    url: 'https://www.about-the-world.org/biologie',
  },
};

export default function BiologieLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
