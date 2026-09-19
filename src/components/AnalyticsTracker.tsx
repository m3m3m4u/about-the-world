'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  try {
    let sid = sessionStorage.getItem('atw_sid');
    if (!sid) {
      sid = 's_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
      sessionStorage.setItem('atw_sid', sid);
    }
    return sid;
  } catch {
    return 's_anon';
  }
}

function getDeviceType(): 'desktop' | 'mobile' | 'tablet' {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width <= 768) return 'mobile';
  if (width <= 1024) return 'tablet';
  return 'desktop';
}

function sendTrackEvent(data: Record<string, any>) {
  if (typeof window === 'undefined') return;
  const payload = JSON.stringify(data);

  // Try sendBeacon for reliability (especially on page unload)
  if (navigator.sendBeacon) {
    const blob = new Blob([payload], { type: 'application/json' });
    const ok = navigator.sendBeacon('/api/analytics/track', blob);
    if (ok) return;
  }

  // Fallback to fetch with keepalive
  fetch('/api/analytics/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
    keepalive: true,
  }).catch(() => {
    // Silently ignore analytics network errors
  });
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentViewIdRef = useRef<string>('');
  const startTimeRef = useRef<number>(0);
  const initialReferrerRef = useRef<string>('');

  // Capture initial referrer once on client mount
  useEffect(() => {
    if (typeof document !== 'undefined') {
      initialReferrerRef.current = document.referrer || '';
    }
  }, []);

  useEffect(() => {
    if (!pathname) return;

    // Flush duration for previous page if active
    if (currentViewIdRef.current && startTimeRef.current > 0) {
      const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
      if (duration > 0) {
        sendTrackEvent({
          type: 'duration',
          viewId: currentViewIdRef.current,
          duration,
        });
      }
    }

    const sessionId = getSessionId();
    const newViewId = 'v_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
    currentViewIdRef.current = newViewId;
    startTimeRef.current = Date.now();

    // Use document.referrer for initial page, empty for subsequent internal navigation
    const referrer = initialReferrerRef.current;
    initialReferrerRef.current = ''; // Clear so internal routing isn't counted as external referrer

    const device = getDeviceType();

    // Track pageview
    sendTrackEvent({
      type: 'pageview',
      viewId: newViewId,
      sessionId,
      path: pathname,
      referrer,
      device,
    });

    // Heartbeat interval every 15s to track active engagement
    const heartbeatInterval = setInterval(() => {
      if (!currentViewIdRef.current || startTimeRef.current <= 0) return;
      if (document.visibilityState === 'hidden') return; // Don't tick when tab is inactive

      const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
      sendTrackEvent({
        type: 'heartbeat',
        viewId: currentViewIdRef.current,
        duration,
      });
    }, 15000);

    // Track on visibility change (tab minimize/close)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && currentViewIdRef.current && startTimeRef.current > 0) {
        const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
        sendTrackEvent({
          type: 'duration',
          viewId: currentViewIdRef.current,
          duration,
        });
      }
    };

    // Track on page unload
    const handleUnload = () => {
      if (currentViewIdRef.current && startTimeRef.current > 0) {
        const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
        sendTrackEvent({
          type: 'duration',
          viewId: currentViewIdRef.current,
          duration,
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      clearInterval(heartbeatInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [pathname, searchParams]);

  return null;
}
