import { getSession } from '@/lib/auth';
import { getAnalyticsReport, Timeframe } from '@/lib/analytics';

export async function GET(request: Request) {
  const session = await getSession();
  if (!session || session.role !== 'admin') {
    return Response.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const rawTimeframe = searchParams.get('timeframe') || '7d';
    const validTimeframes: Timeframe[] = ['today', '7d', '30d', 'all'];
    const timeframe: Timeframe = validTimeframes.includes(rawTimeframe as Timeframe)
      ? (rawTimeframe as Timeframe)
      : '7d';

    const report = await getAnalyticsReport(timeframe);
    return Response.json(report);
  } catch (error) {
    console.error('Failed to fetch admin analytics report:', error);
    return Response.json({ error: 'Fehler beim Laden der Analytics-Daten.' }, { status: 500 });
  }
}
