import type { Metadata } from 'next';
import mappingData from '@/data/slug_and_id_map.json';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const rawSlug = resolvedParams.slug || '';
  const slug = rawSlug.toLowerCase();
  const siteUrl = 'https://www.about-the-world.org';

  // 1. Check topic alias
  const alias = (mappingData.topic_aliases as Record<string, any>)[slug];
  if (alias) {
    const topicTitles: Record<string, string> = {
      'middle-east': 'Der Nahostkonflikt | Interaktives Dossier & Geschichte',
      'countries': 'Länder der Erde | Interaktive Länderprofile & Übungen',
      'us-states': 'US-Bundesstaaten | Alle 50 Staaten der USA',
      'presidents': 'Präsidenten der USA | Geschichte & Porträts',
      'geography': 'Geographie lernen | Erde, Kontinente & Zonen',
    };

    const title = topicTitles[alias.topic] || `${slug.replace(/-/g, ' ')} | About the World`;
    return {
      title,
      description: `Lerne mehr über ${slug.replace(/-/g, ' ')} mit interaktiven Übungen, Karten und Videos auf About the World.`,
      alternates: {
        canonical: `/${slug}`,
      },
      openGraph: {
        title,
        description: `Lerne mehr über ${slug.replace(/-/g, ' ')} auf About the World.`,
        url: `${siteUrl}/${slug}`,
      },
    };
  }

  // 2. Check standalone post / page slug
  const pageInfo = (mappingData.slug_to_page as Record<string, any>)[slug];
  if (pageInfo && pageInfo.title) {
    const formattedTitle = pageInfo.title;
    return {
      title: `${formattedTitle} | Interaktive Übung & Fakten`,
      description: `Interaktive H5P-Lerneinheit und Erklärungen zu ${formattedTitle} auf About the World. Vertiefe dein Weltwissen mit Videos und Quiz-Übungen.`,
      alternates: {
        canonical: `/${slug}`,
      },
      openGraph: {
        title: `${formattedTitle} | About the World`,
        description: `Interaktive Lerneinheit zu ${formattedTitle} mit H5P-Übungen und multimedialen Inhalten.`,
        url: `${siteUrl}/${slug}`,
      },
    };
  }

  // 3. Fallback title based on slug
  const cleanTitle = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title: `${cleanTitle} | About the World`,
    description: `Interaktive Lerneinheiten und Wissensinhalte zu ${cleanTitle} auf About the World.`,
    alternates: {
      canonical: `/${slug}`,
    },
  };
}

export default function DynamicSlugLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
