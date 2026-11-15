import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'About the World | Interaktives Weltwissen & Geographie',
    short_name: 'AboutTheWorld',
    description:
      'Interaktive Bildungsplattform für Geographie, Länder der Erde, Flaggen, Landkarten, Biologie und Geschichte mit multimedialen H5P-Übungen.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f0fdf4',
    theme_color: '#084f3c',
    lang: 'de',
    icons: [
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/ATW_Logo.png',
        sizes: '800x600',
        type: 'image/png',
      },
    ],
  };
}
