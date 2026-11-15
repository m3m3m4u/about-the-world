import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Der Nahostkonflikt | Geschichte, Hintergründe, Kriege & Friedenschancen',
  description:
    'Fundiertes und neutrales Bildungsdossier zum Nahostkonflikt: Geschichte Israels und Palästinas, Schlüsselkriege, Ursachen, Zivilbevölkerung, internationale Akteure und Lösungsansätze.',
  alternates: {
    canonical: '/der-nahostkonflikt',
  },
  openGraph: {
    title: 'Der Nahostkonflikt | Geschichte, Ursachen & Analysen',
    description:
      'Didaktisch aufbereitetes Dossier: Chronologie, Kriege, Hintergründe und Perspektiven für den Frieden im Nahen Osten.',
    url: 'https://www.about-the-world.org/der-nahostkonflikt',
  },
};

export default function NahostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
