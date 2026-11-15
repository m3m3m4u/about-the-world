import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Länder der Erde | Alle Staaten & Kontinente im interaktiven Überblick',
  description:
    'Umfassende Profile aller Länder der Welt nach Kontinenten: Europa, Asien, Afrika, Nord- & Südamerika, Ozeanien mit Lehrvideos, Fakten und H5P-Übungen.',
  alternates: {
    canonical: '/laender-der-erde',
  },
  openGraph: {
    title: 'Länder der Erde | Alle Staaten & Kontinente im interaktiven Überblick',
    description:
      'Erkunde jeden Staat der Welt: Hauptstädte, Bevölkerung, Geographie, Flaggen und interaktive Lerneinheiten.',
    url: 'https://www.about-the-world.org/laender-der-erde',
  },
};

export default function LaenderDerErdeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
