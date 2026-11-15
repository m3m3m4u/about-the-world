import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | About the World',
  description:
    'Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO auf About the World (Matthias Gmeiner e.U.).',
  alternates: {
    canonical: '/datenschutz',
  },
  openGraph: {
    title: 'Datenschutzerklärung | About the World',
    description:
      'Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO auf About the World (Matthias Gmeiner e.U.).',
    url: 'https://www.about-the-world.org/datenschutz',
    siteName: 'About the World',
    type: 'website',
  },
};

export default function DatenschutzLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
