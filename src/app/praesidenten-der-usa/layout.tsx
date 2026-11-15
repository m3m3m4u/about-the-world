import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Präsidenten der USA | Alle US-Präsidenten, Epochen & Wahlsystem',
  description:
    'Lerne alle Präsidenten der Vereinigten Staaten von Amerika kennen: Von George Washington bis heute, unterteilt in Epochen, mit Wahlsystem-Erklärungen und interaktiven Tests.',
  alternates: {
    canonical: '/praesidenten-der-usa',
  },
  openGraph: {
    title: 'Präsidenten der USA | Epochen, Biographien & Wahlsystem',
    description:
      'Amerikanische Geschichte interaktiv: Gründerväter, Bürgerkrieg, Kalter Krieg und modernes 21. Jahrhundert.',
    url: 'https://www.about-the-world.org/praesidenten-der-usa',
  },
};

export default function PresidentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
