import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Geographie lernen | Kontinente, Ozeane, Berge & Klimazonen',
  description:
    'Entdecke allgemeine Geographie: Kontinente, Ozeane, Plattentektonik, Vulkane, Wüsten, Flüsse, Zeitzonen und Metropolen mit interaktiven Übungen.',
  alternates: {
    canonical: '/geographie',
  },
  openGraph: {
    title: 'Geographie lernen | Kontinente, Ozeane, Berge & Klimazonen',
    description:
      'Interaktive Geographie-Lerneinheiten: Plattentektonik, Vulkane, Ozeane, Flüsse, Gebirge, Wüsten und Weltklima.',
    url: 'https://www.about-the-world.org/geographie',
  },
};

export default function GeographyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
