import { getDatabase } from './mongodb';

export type Timeframe = 'today' | '7d' | '30d' | 'all';

export interface PageViewEvent {
  viewId: string;
  sessionId: string;
  path: string;
  referrer?: string;
  device?: 'desktop' | 'mobile' | 'tablet';
  duration?: number;
}

export interface ReferrerInfo {
  host: string;
  category: 'direct' | 'search' | 'education' | 'social' | 'other';
  label: string;
}

// ---------------------------------------------------------------------------
// Referrer Classification & Extraction
// ---------------------------------------------------------------------------

const SEARCH_ENGINES = [
  'google.', 'bing.', 'duckduckgo.', 'ecosia.', 'yahoo.', 'qwant.', 'startpage.', 'yandex.'
];

const EDUCATION_SITES = [
  'eduki.com', 'schule.at', 'lms.at', 'moodle', 'lehrerweb.at', 'tsn.at',
  'eeducation.at', 'bildung.gv.at', 'antolin.de', 'lehrplan.ch', 'padlet.com',
  'anton.app', 'schaukasten.at', 'schulportal.', 'edugroup.at', 'eduvidual.at',
  'erklaerung-und-mehr.org'
];

const SOCIAL_NETWORKS = [
  'youtube.com', 'youtu.be', 'instagram.com', 'tiktok.com', 'facebook.com',
  'fb.com', 'pinterest.com', 'twitter.com', 'x.com', 'linkedin.com', 'reddit.com',
  'whatsapp.com', 't.me', 'telegram.me'
];

export function parseReferrer(rawReferrer?: string): ReferrerInfo {
  if (!rawReferrer || rawReferrer.trim() === '' || rawReferrer === 'direct') {
    return { host: 'Direkt / Lesezeichen', category: 'direct', label: 'Direkter Aufruf' };
  }

  try {
    const url = new URL(rawReferrer);
    const host = url.hostname.toLowerCase().replace(/^www\./, '');

    // Internal navigation
    if (
      host.includes('localhost') ||
      host.includes('about-the-world') ||
      host.includes('atw-') ||
      host.includes('atw.') ||
      host.includes('arenaneu')
    ) {
      return { host: 'Direkt / Intern', category: 'direct', label: 'Direkter Aufruf' };
    }

    // Search engines
    if (SEARCH_ENGINES.some((se) => host.includes(se))) {
      return { host, category: 'search', label: 'Suchmaschine' };
    }

    // Educational platforms & school portals
    if (EDUCATION_SITES.some((edu) => host.includes(edu))) {
      return { host, category: 'education', label: 'Schul- & Bildungsportal' };
    }

    // Social Media / Video platforms
    if (SOCIAL_NETWORKS.some((soc) => host.includes(soc))) {
      return { host, category: 'social', label: 'Social Media / Video' };
    }

    // Other external websites
    return { host, category: 'other', label: 'Externe Webseite' };
  } catch {
    return { host: 'Direkt / Lesezeichen', category: 'direct', label: 'Direkter Aufruf' };
  }
}

// ---------------------------------------------------------------------------
// Time & Date Helpers (Europe/Vienna Timezone)
// ---------------------------------------------------------------------------

export function getLocalTimeInfo(date = new Date()) {
  // Use Central European Time (Vienna / Berlin)
  const hourStr = new Intl.DateTimeFormat('de-AT', {
    hour: 'numeric',
    hour12: false,
    timeZone: 'Europe/Vienna',
  }).format(date);
  const hour = parseInt(hourStr, 10) % 24;

  const dateStr = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Europe/Vienna',
  }).format(date); // YYYY-MM-DD

  const dayOfWeekStr = new Intl.DateTimeFormat('de-AT', {
    weekday: 'short',
    timeZone: 'Europe/Vienna',
  }).format(date);

  return { hour, dateStr, dayOfWeekStr };
}

export function getTimeframeFilter(timeframe: Timeframe): { $gte: Date } | Record<string, never> {
  const now = new Date();
  if (timeframe === 'today') {
    // Start of today in local timezone
    const { dateStr } = getLocalTimeInfo(now);
    const startOfToday = new Date(`${dateStr}T00:00:00+01:00`);
    return { $gte: startOfToday };
  }
  if (timeframe === '7d') {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return { $gte: d };
  }
  if (timeframe === '30d') {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return { $gte: d };
  }
  return {};
}

// ---------------------------------------------------------------------------
// Formatting Helpers
// ---------------------------------------------------------------------------

export function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return '0 Sek.';
  const s = Math.round(seconds);
  if (s < 60) return `${s} Sek.`;
  const mins = Math.floor(s / 60);
  const remSecs = s % 60;
  if (mins < 60) {
    return remSecs > 0 ? `${mins} Min. ${remSecs} Sek.` : `${mins} Min.`;
  }
  const hours = Math.floor(mins / 60);
  const remMins = mins % 60;
  return `${hours} Std. ${remMins} Min.`;
}

const KNOWN_PAGES: Record<string, string> = {
  '/': 'Startseite',
  '/laender-der-erde': 'Länder der Erde',
  '/praesidenten-der-usa': 'Präsidenten der USA',
  '/der-nahostkonflikt': 'Der Nahostkonflikt',
  '/us-bundesstaaten': 'US-Bundesstaaten',
  '/flaggenquiz': 'Flaggenquiz',
  '/landkarten-quiz': 'Landkarten-Quiz',
  '/geographie-quiz': 'Geographie-Quiz',
  '/geographie': 'Geographie',
  '/biologie': 'Biologie',
  '/biologiearena': 'Biologiearena',
  '/biologie-quiz': 'Biologie-Quiz',
  '/kartenquiz': 'Kartenquiz',
  '/quiz': 'Quiz-Übersicht',
  '/medien': 'Medien',
  '/mein-fortschritt': 'Mein Lernfortschritt',
  '/dashboard': 'Lehrpersonen-Dashboard',
  '/admin': 'Admin-Bereich',
};

// Format clean page title / category from path
export function getPageDisplayName(path: string): string {
  const clean = path.split('?')[0].split('#')[0].replace(/\/$/, '') || '/';
  if (KNOWN_PAGES[clean]) return KNOWN_PAGES[clean];

  const subClean = clean.replace(/^\//, '');
  const parts = subClean.split('/');
  return parts
    .map((p) =>
      p
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    )
    .join(' › ');
}

// ---------------------------------------------------------------------------
// Track Page View / Heartbeat in DB
// ---------------------------------------------------------------------------

export async function recordPageView(data: PageViewEvent) {
  const db = await getDatabase();
  const collection = db.collection('analytics_views');

  const { viewId, sessionId, path, referrer, device = 'desktop' } = data;
  if (!viewId || !sessionId || !path) return;

  // Clean path (strip hash and query for aggregation, exclude /admin from main stats)
  const cleanPath = path.split('?')[0].split('#')[0] || '/';
  const isAdmin = cleanPath.startsWith('/admin') || cleanPath.startsWith('/api');

  const refInfo = parseReferrer(referrer);
  const now = new Date();
  const { hour, dateStr, dayOfWeekStr } = getLocalTimeInfo(now);

  await collection.updateOne(
    { viewId },
    {
      $setOnInsert: {
        viewId,
        sessionId,
        path: cleanPath,
        rawReferrer: referrer || '',
        referrerHost: refInfo.host,
        referrerCategory: refInfo.category,
        referrerLabel: refInfo.label,
        device,
        isAdmin,
        hour,
        dateStr,
        dayOfWeekStr,
        createdAt: now,
      },
      $set: {
        updatedAt: now,
      },
    },
    { upsert: true }
  );
}

export async function updatePageDuration(viewId: string, durationSeconds: number) {
  if (!viewId || durationSeconds == null) return;
  // Cap duration at 30 minutes (1800s) to prevent idle tab skew
  const cappedDuration = Math.min(Math.max(0, Math.round(durationSeconds)), 1800);

  const db = await getDatabase();
  const collection = db.collection('analytics_views');

  await collection.updateOne(
    { viewId },
    {
      $set: {
        durationSeconds: cappedDuration,
        updatedAt: new Date(),
      },
    }
  );
}

// ---------------------------------------------------------------------------
// Admin Analytics Aggregation
// ---------------------------------------------------------------------------

export interface AnalyticsReport {
  timeframe: Timeframe;
  activeNow: number;
  summary: {
    totalViews: number;
    uniqueVisitors: number;
    avgDurationSeconds: number;
    avgDurationFormatted: string;
    totalDurationSeconds: number;
    peakHour: { hour: number; label: string; views: number };
  };
  pages: {
    path: string;
    name: string;
    views: number;
    uniqueVisitors: number;
    avgDurationSeconds: number;
    avgDurationFormatted: string;
    percentage: number;
  }[];
  sources: {
    categories: {
      key: string;
      label: string;
      count: number;
      percentage: number;
    }[];
    topReferrers: {
      host: string;
      category: string;
      count: number;
      percentage: number;
    }[];
  };
  durations: {
    buckets: {
      key: string;
      label: string;
      range: string;
      count: number;
      percentage: number;
    }[];
  };
  hourly: {
    hour: number;
    label: string;
    views: number;
    percentage: number;
  }[];
  daySegments: {
    name: string;
    timeRange: string;
    count: number;
    percentage: number;
    badge: string;
  }[];
  devices: {
    device: string;
    label: string;
    count: number;
    percentage: number;
  }[];
}

export async function getAnalyticsReport(timeframe: Timeframe = '7d'): Promise<AnalyticsReport> {
  const db = await getDatabase();
  const collection = db.collection('analytics_views');

  const timeFilter = getTimeframeFilter(timeframe);
  const matchFilter: Record<string, any> = {
    isAdmin: { $ne: true }, // Exclude admin views from stats
  };
  if (timeFilter.$gte) {
    matchFilter.createdAt = timeFilter;
  }

  // 1. Live active visitors (views updated within last 5 minutes)
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  const activeNowAgg = await collection.aggregate([
    {
      $match: {
        isAdmin: { $ne: true },
        updatedAt: { $gte: fiveMinutesAgo },
      },
    },
    {
      $group: {
        _id: '$sessionId',
      },
    },
  ]).toArray();
  const activeNow = activeNowAgg.length;

  // 2. Summary stats (Total Views, Unique Visitors, Avg Duration)
  const summaryAgg = await collection.aggregate([
    { $match: matchFilter },
    {
      $group: {
        _id: null,
        totalViews: { $sum: 1 },
        uniqueSessions: { $addToSet: '$sessionId' },
        avgDuration: { $avg: '$durationSeconds' },
        totalDuration: { $sum: { $ifNull: ['$durationSeconds', 0] } },
      },
    },
    {
      $project: {
        totalViews: 1,
        uniqueVisitors: { $size: '$uniqueSessions' },
        avgDuration: { $ifNull: ['$avgDuration', 0] },
        totalDuration: 1,
      },
    },
  ]).toArray();

  const totalViews = summaryAgg[0]?.totalViews || 0;
  const uniqueVisitors = summaryAgg[0]?.uniqueVisitors || 0;
  const avgDurationSeconds = Math.round(summaryAgg[0]?.avgDuration || 0);
  const totalDurationSeconds = Math.round(summaryAgg[0]?.totalDuration || 0);

  // 3. Top Pages
  const pagesAgg = await collection.aggregate([
    { $match: matchFilter },
    {
      $group: {
        _id: '$path',
        views: { $sum: 1 },
        uniqueSessions: { $addToSet: '$sessionId' },
        avgDuration: { $avg: '$durationSeconds' },
      },
    },
    {
      $project: {
        path: '$_id',
        views: 1,
        uniqueVisitors: { $size: '$uniqueSessions' },
        avgDurationSeconds: { $round: [{ $ifNull: ['$avgDuration', 0] }, 0] },
      },
    },
    { $sort: { views: -1 } },
    { $limit: 25 },
  ]).toArray();

  const pages = pagesAgg.map((p) => ({
    path: p.path,
    name: getPageDisplayName(p.path),
    views: p.views,
    uniqueVisitors: p.uniqueVisitors,
    avgDurationSeconds: p.avgDurationSeconds,
    avgDurationFormatted: formatDuration(p.avgDurationSeconds),
    percentage: totalViews > 0 ? Math.round((p.views / totalViews) * 1000) / 10 : 0,
  }));

  // 4. Traffic Sources / Referrers
  const sourceCatAgg = await collection.aggregate([
    { $match: matchFilter },
    {
      $group: {
        _id: '$referrerCategory',
        count: { $sum: 1 },
      },
    },
  ]).toArray();

  const categoryMap: Record<string, { label: string; count: number }> = {
    direct: { label: 'Direkt / Lesezeichen', count: 0 },
    search: { label: 'Suchmaschinen (Google etc.)', count: 0 },
    education: { label: 'Schul- & Bildungsportale (Eduki, LMS...)', count: 0 },
    social: { label: 'Social Media & Videos', count: 0 },
    other: { label: 'Sonstige externe Webseiten', count: 0 },
  };

  sourceCatAgg.forEach((item) => {
    const key = item._id || 'direct';
    if (categoryMap[key]) {
      categoryMap[key].count = item.count;
    } else {
      categoryMap.other.count += item.count;
    }
  });

  const categories = Object.entries(categoryMap).map(([key, data]) => ({
    key,
    label: data.label,
    count: data.count,
    percentage: totalViews > 0 ? Math.round((data.count / totalViews) * 1000) / 10 : 0,
  }));

  const topReferrersAgg = await collection.aggregate([
    { $match: matchFilter },
    {
      $group: {
        _id: { host: '$referrerHost', category: '$referrerCategory' },
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ]).toArray();

  const topReferrers = topReferrersAgg.map((r) => ({
    host: r._id.host || 'Direkt',
    category: r._id.category || 'direct',
    count: r.count,
    percentage: totalViews > 0 ? Math.round((r.count / totalViews) * 1000) / 10 : 0,
  }));

  // 5. Duration Buckets
  const durationBucketsAgg = await collection.aggregate([
    { $match: matchFilter },
    {
      $bucket: {
        groupBy: { $ifNull: ['$durationSeconds', 0] },
        boundaries: [0, 30, 120, 300, 900, 100000],
        default: 'other',
        output: { count: { $sum: 1 } },
      },
    },
  ]).toArray();

  const bucketLabels = [
    { key: '0', label: '< 30 Sek.', range: '0–30s', boundary: 0 },
    { key: '30', label: '30 Sek. – 2 Min.', range: '30s–2m', boundary: 30 },
    { key: '120', label: '2 – 5 Min.', range: '2m–5m', boundary: 120 },
    { key: '300', label: '5 – 15 Min.', range: '5m–15m', boundary: 300 },
    { key: '900', label: '> 15 Min.', range: '>15m', boundary: 900 },
  ];

  const buckets = bucketLabels.map((b) => {
    const found = durationBucketsAgg.find((item) => item._id === b.boundary);
    const count = found?.count || 0;
    return {
      key: b.key,
      label: b.label,
      range: b.range,
      count,
      percentage: totalViews > 0 ? Math.round((count / totalViews) * 1000) / 10 : 0,
    };
  });

  // 6. 24-Hour Distribution (0..23)
  const hourlyAgg = await collection.aggregate([
    { $match: matchFilter },
    {
      $group: {
        _id: '$hour',
        views: { $sum: 1 },
      },
    },
  ]).toArray();

  const hourlyMap: Record<number, number> = {};
  hourlyAgg.forEach((h) => {
    if (typeof h._id === 'number') {
      hourlyMap[h._id] = h.views;
    }
  });

  let maxViews = 0;
  let peakHourNum = 10;

  const hourly = Array.from({ length: 24 }, (_, i) => {
    const views = hourlyMap[i] || 0;
    if (views > maxViews) {
      maxViews = views;
      peakHourNum = i;
    }
    return {
      hour: i,
      label: `${i.toString().padStart(2, '0')}:00`,
      views,
      percentage: totalViews > 0 ? Math.round((views / totalViews) * 1000) / 10 : 0,
    };
  });

  const peakHour = {
    hour: peakHourNum,
    label: `${peakHourNum.toString().padStart(2, '0')}:00 – ${(peakHourNum + 1).toString().padStart(2, '0')}:00 Uhr`,
    views: maxViews,
  };

  // Day segments: School time (08-13), Afternoon/Homework (13-18), Evening (18-23), Night (23-08)
  const schoolCount = hourly.filter((h) => h.hour >= 8 && h.hour < 13).reduce((acc, h) => acc + h.views, 0);
  const afternoonCount = hourly.filter((h) => h.hour >= 13 && h.hour < 18).reduce((acc, h) => acc + h.views, 0);
  const eveningCount = hourly.filter((h) => h.hour >= 18 && h.hour < 23).reduce((acc, h) => acc + h.views, 0);
  const nightCount = hourly.filter((h) => h.hour >= 23 || h.hour < 8).reduce((acc, h) => acc + h.views, 0);

  const daySegments = [
    {
      name: 'Vormittag',
      timeRange: '08:00 – 13:00 Uhr',
      count: schoolCount,
      percentage: totalViews > 0 ? Math.round((schoolCount / totalViews) * 1000) / 10 : 0,
      badge: 'Schulunterricht',
    },
    {
      name: 'Nachmittag',
      timeRange: '13:00 – 18:00 Uhr',
      count: afternoonCount,
      percentage: totalViews > 0 ? Math.round((afternoonCount / totalViews) * 1000) / 10 : 0,
      badge: 'Hausaufgaben & Lernen',
    },
    {
      name: 'Abend',
      timeRange: '18:00 – 23:00 Uhr',
      count: eveningCount,
      percentage: totalViews > 0 ? Math.round((eveningCount / totalViews) * 1000) / 10 : 0,
      badge: 'Freizeit & Wiederholung',
    },
    {
      name: 'Nacht',
      timeRange: '23:00 – 08:00 Uhr',
      count: nightCount,
      percentage: totalViews > 0 ? Math.round((nightCount / totalViews) * 1000) / 10 : 0,
      badge: 'Ruhezeit',
    },
  ];

  // 7. Devices
  const devicesAgg = await collection.aggregate([
    { $match: matchFilter },
    {
      $group: {
        _id: '$device',
        count: { $sum: 1 },
      },
    },
  ]).toArray();

  const deviceLabels: Record<string, string> = {
    desktop: 'PC / Laptop',
    mobile: 'Smartphone',
    tablet: 'Tablet / iPad',
  };

  const devices = devicesAgg.map((d) => {
    const key = d._id || 'desktop';
    return {
      device: key,
      label: deviceLabels[key] || 'Andere Geräte',
      count: d.count,
      percentage: totalViews > 0 ? Math.round((d.count / totalViews) * 1000) / 10 : 0,
    };
  });

  return {
    timeframe,
    activeNow,
    summary: {
      totalViews,
      uniqueVisitors,
      avgDurationSeconds,
      avgDurationFormatted: formatDuration(avgDurationSeconds),
      totalDurationSeconds,
      peakHour,
    },
    pages,
    sources: {
      categories,
      topReferrers,
    },
    durations: {
      buckets,
    },
    hourly,
    daySegments,
    devices,
  };
}
