import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flaggenquiz | Alle Länderflaggen der Welt spielerisch lernen',
  description:
    'Lerne die Flaggen aller 195 Staaten der Erde: Interaktives Flaggenquiz mit Kontinent-Filter, Streak-Counter, Trainingsmodus und globaler Rangliste.',
  alternates: {
    canonical: '/flaggenquiz',
  },
  openGraph: {
    title: 'Flaggenquiz | Alle Länderflaggen der Welt spielerisch lernen',
    description:
      'Trainiere dein Flaggenwissen für alle Kontinente: Europa, Asien, Afrika, Amerika und Ozeanien mit Streak-Zähler und Highscore.',
    url: 'https://www.about-the-world.org/flaggenquiz',
  },
};

export default function FlagQuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
