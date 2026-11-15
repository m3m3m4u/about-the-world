import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quiz-Übersicht | Flaggen-, Karten-, Geographie- & Biologie-Quiz',
  description:
    'Alle interaktiven Quizze von About the World im Überblick: Teste dein Wissen in Geographie, Flaggen aller Länder, Landkarten, Biologie und Weltrekorden.',
  alternates: {
    canonical: '/quiz',
  },
  openGraph: {
    title: 'Quiz-Übersicht | Interaktive Wissensspiele von About the World',
    description:
      'Trainiere Allgemeinbildung, Erdkunde und Naturkunde mit spannenden Quiz-Formaten und Bestenlisten.',
    url: 'https://www.about-the-world.org/quiz',
  },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
