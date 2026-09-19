import { recordPageView, updatePageDuration } from '@/lib/analytics';

export async function POST(request: Request) {
  try {
    let body: any = null;

    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      body = await request.json();
    } else {
      // In case navigator.sendBeacon sends text/plain
      const text = await request.text();
      try {
        body = JSON.parse(text);
      } catch {
        body = null;
      }
    }

    if (!body || !body.viewId) {
      return Response.json({ error: 'Ungültige Daten' }, { status: 400 });
    }

    if (body.type === 'pageview') {
      await recordPageView({
        viewId: body.viewId,
        sessionId: body.sessionId,
        path: body.path || '/',
        referrer: body.referrer || '',
        device: body.device || 'desktop',
      });
      return Response.json({ ok: true });
    }

    if (body.type === 'heartbeat' || body.type === 'duration') {
      await updatePageDuration(body.viewId, Number(body.duration || 0));
      return Response.json({ ok: true });
    }

    return Response.json({ ok: true });
  } catch (err) {
    // Non-blocking for client, return 500 silently
    console.error('Analytics tracking error:', err);
    return Response.json({ ok: false, error: 'Tracking-Fehler' }, { status: 500 });
  }
}
