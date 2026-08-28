import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

const openSans = Open_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'About the World | Geographie, Länder der Erde & Interaktive Übungen',
  description: 'Lerne alles über die Länder und Kulturen dieser Erde mit interaktiven Übungen und Erklärungen.',
  icons: {
    icon: '/ATW_Logo.png',
    shortcut: '/ATW_Logo.png',
    apple: '/ATW_Logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={openSans.variable}>
      <head>
        <link rel="icon" href="/ATW_Logo.png" type="image/png" />
      </head>
      <body className={openSans.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
