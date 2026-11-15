import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum | About the World',
  description:
    'Impressum und rechtliche Angaben gemäß § 5 ECG, § 14 UGB und § 25 Mediengesetz von About the World (Matthias Gmeiner e.U.).',
  alternates: {
    canonical: '/impressum',
  },
  openGraph: {
    title: 'Impressum | About the World',
    description:
      'Impressum und rechtliche Angaben gemäß § 5 ECG, § 14 UGB und § 25 Mediengesetz von About the World (Matthias Gmeiner e.U.).',
    url: 'https://www.about-the-world.org/impressum',
    siteName: 'About the World',
    type: 'website',
  },
};

export default function ImpressumLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
