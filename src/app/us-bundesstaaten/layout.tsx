import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'US-Bundesstaaten | Alle 50 Bundesstaaten der USA im Überblick',
  description:
    'Lerne alle 50 Bundesstaaten der USA nach Regionen sortiert: Hauptstädte, Flaggen, geographische Lage, Wirtschaft und Geschichte mit interaktiven Übungen.',
  alternates: {
    canonical: '/us-bundesstaaten',
  },
  openGraph: {
    title: 'US-Bundesstaaten | Alle 50 Bundesstaaten der USA im Überblick',
    description:
      'Interaktive Lernmodule zu den Regionen der USA: Nordosten, Südosten, Mittlerer Westen, Süden, Plains & Mountains und Pazifik.',
    url: 'https://www.about-the-world.org/us-bundesstaaten',
  },
};

export default function USStatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
