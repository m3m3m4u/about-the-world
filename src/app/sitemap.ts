import type { MetadataRoute } from 'next';
import mappingData from '@/data/slug_and_id_map.json';
import { getAllBuchTipps } from '@/lib/buchtipps/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.about-the-world.org';
  const now = new Date();

  // 1. Core static hub pages
  const staticHubs: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
    { path: '', priority: 1.0, changeFrequency: 'daily' },
    { path: '/geographie', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/geographie-quiz', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/laender-der-erde', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/flaggenquiz', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/kartenquiz', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/landkarten-quiz', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/biologie', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/biologie-quiz', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/biologiearena', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/biologie/quiz', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/biologie/tierart-quiz', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/der-nahostkonflikt', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/praesidenten-der-usa', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/us-bundesstaaten', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/buchtipps', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/quiz', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/impressum', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/datenschutz', priority: 0.4, changeFrequency: 'yearly' },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticHubs.map((item) => ({
    url: `${baseUrl}${item.path}`,
    lastModified: now,
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  // 2. Continents
  const continents = ['europa', 'asien', 'afrika', 'nordamerika', 'suedamerika', 'ozeanien'];
  for (const continent of continents) {
    sitemapEntries.push({
      url: `${baseUrl}/laender-der-erde/${continent}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    });
  }

  // 3. Geography chapters
  const geoChapters = [
    'vulkanismus-und-erdbeben',
    'gebirge-und-gipfel',
    'ozeane-und-fluesse',
    'wuesten-und-klima',
    'metropolen-und-staedte',
    'zeitzonen-und-nationalparks',
  ];
  for (const chapter of geoChapters) {
    sitemapEntries.push({
      url: `${baseUrl}/geographie/${chapter}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    });
  }

  // 4. Middle East chapters
  const nahostChapters = [
    'geschichte-israels-und-palaestinas',
    'kriege-und-krisen',
    'gruende-fuer-konflikt',
    'lage-der-bevoelkerung',
    'die-rolle-von-aussenstehenden-parteien',
    'chancen-fuer-den-frieden',
  ];
  for (const chapter of nahostChapters) {
    sitemapEntries.push({
      url: `${baseUrl}/der-nahostkonflikt/${chapter}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    });
  }

  // 5. US Presidents epochs & topics
  const presidentsEpochs = [
    'gruendervaeter',
    'expansion',
    'buergerkrieg',
    'progressive-aera',
    'kalter-krieg',
    'moderne-aera',
    'wahlsystem',
    'wichtigste-praesidenten',
    'demokraten',
    'republikaner',
  ];
  for (const epoch of presidentsEpochs) {
    sitemapEntries.push({
      url: `${baseUrl}/praesidenten-der-usa/${epoch}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // 6. US States regions
  const usRegions = [
    'nordosten',
    'suedosten',
    'midwest',
    'sueden',
    'plains_mountains',
    'pazifik_uebersee',
  ];
  for (const region of usRegions) {
    sitemapEntries.push({
      url: `${baseUrl}/us-bundesstaaten/${region}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // 7. Topic aliases & country pages from slug_to_page
  const seenSlugs = new Set<string>();
  const slugToPage = (mappingData.slug_to_page || {}) as Record<string, { title?: string; h5p_slugs?: string[] }>;

  for (const [slug, info] of Object.entries(slugToPage)) {
    // Only index meaningful content slugs that aren't system/auth pages or duplicates
    if (!slug || seenSlugs.has(slug) || slug.includes('/') || slug.includes('.')) continue;
    if (info && info.h5p_slugs && info.h5p_slugs.length > 0) {
      seenSlugs.add(slug);
      sitemapEntries.push({
        url: `${baseUrl}/${encodeURIComponent(slug)}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  // 8. Multilingual Buchtipps detail pages
  const allBooks = getAllBuchTipps();
  for (const book of allBooks) {
    sitemapEntries.push({
      url: `${baseUrl}/buchtipps/${book.id}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    });
  }

  return sitemapEntries;
}
