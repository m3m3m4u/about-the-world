import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function b64(str: string) {
  try {
    const g: any = globalThis as any;
    if (g.Buffer && typeof g.Buffer.from === 'function') return g.Buffer.from(str).toString('base64');
    if (typeof g.btoa === 'function') return g.btoa(unescape(encodeURIComponent(str)));
  } catch {}
  return str;
}

function conf() {
  const baseURL = process.env.WEBDAV_BASEURL;
  const username = process.env.WEBDAV_USERNAME;
  const password = process.env.WEBDAV_PASSWORD;
  if (!baseURL || !username || !password) return null;
  const url = baseURL.replace(/\/$/, '');
  const auth = 'Basic ' + b64(`${username}:${password}`);
  return { url, auth };
}

function safeNormalize(str: string, form: 'NFC' | 'NFD' | 'NFKC' | 'NFKD') {
  try {
    return str.normalize(form);
  } catch {
    return str;
  }
}

function transliterateDe(s: string) {
  return s
    .replace(/Ä/g, 'Ae')
    .replace(/Ö/g, 'Oe')
    .replace(/Ü/g, 'Ue')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss');
}

function reverseTransliterateDe(s: string) {
  return s
    .replace(/Ae/g, 'Ä')
    .replace(/Oe/g, 'Ö')
    .replace(/Ue/g, 'Ü')
    .replace(/ae/g, 'ä')
    .replace(/oe/g, 'ö')
    .replace(/ue/g, 'ü')
    .replace(/ss/g, 'ß');
}

function nameVariants(filename: string): string[] {
  const set = new Set<string>();
  const add = (v: string) => {
    if (v && !set.has(v)) set.add(v);
  };
  const dot = filename.lastIndexOf('.');
  const base = dot >= 0 ? filename.slice(0, dot) : filename;
  const ext = dot >= 0 ? filename.slice(dot + 1) : '';
  const withExt = (b: string, e: string) => (dot >= 0 ? `${b}.${e}` : b);
  const bases = new Set<string>();
  const addBase = (b: string) => {
    if (b && !bases.has(b)) {
      bases.add(b);
    }
  };
  addBase(base);
  addBase(safeNormalize(base, 'NFC'));
  addBase(safeNormalize(base, 'NFD'));
  const tr = transliterateDe(base);
  addBase(tr);
  addBase(safeNormalize(tr, 'NFC'));
  addBase(safeNormalize(tr, 'NFD'));
  const rev = reverseTransliterateDe(base);
  addBase(rev);
  addBase(safeNormalize(rev, 'NFC'));
  addBase(safeNormalize(rev, 'NFD'));
  const cap = base.charAt(0).toUpperCase() + base.slice(1);
  addBase(cap);
  const capTr = tr.charAt(0).toUpperCase() + tr.slice(1);
  addBase(capTr);
  const capRev = rev.charAt(0).toUpperCase() + rev.slice(1);
  addBase(capRev);
  const exts = new Set<string>();
  if (ext) {
    exts.add(ext);
    exts.add(ext.toLowerCase());
    exts.add(ext.toUpperCase());
  } else {
    exts.add('');
  }
  for (const b of bases) {
    for (const e of exts) {
      add(withExt(b, e));
      add(withExt(b.toLowerCase(), e));
    }
  }
  return [filename, ...Array.from(set).filter((v) => v !== filename)];
}

function guessContentType(fname: string) {
  const n = fname.toLowerCase();
  if (n.endsWith('.jpg') || n.endsWith('.jpeg')) return 'image/jpeg';
  if (n.endsWith('.png')) return 'image/png';
  if (n.endsWith('.gif')) return 'image/gif';
  if (n.endsWith('.webp')) return 'image/webp';
  if (n.endsWith('.svg')) return 'image/svg+xml';
  if (n.endsWith('.mp3')) return 'audio/mpeg';
  if (n.endsWith('.wav')) return 'audio/wav';
  if (n.endsWith('.ogg')) return 'audio/ogg';
  if (n.endsWith('.m4a')) return 'audio/mp4';
  if (n.endsWith('.pdf')) return 'application/pdf';
  return 'application/octet-stream';
}

export async function GET(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path: pathParts = [] } = (await ctx.params.catch?.(() => ({ path: [] as string[] }))) ?? (ctx as any).params;
  const key = pathParts.join('/');
  const c = conf();
  if (!c) {
    return new NextResponse('WebDAV nicht konfiguriert', { status: 503 });
  }
  const baseUrl = c.url.replace(/\/$/, '');
  const dir = key.includes('/') ? key.slice(0, key.lastIndexOf('/') + 1) : '';
  const file = key.split('/').pop() || key;
  const candidates = nameVariants(file).map((f) => dir + f);

  let upstream: Response | null = null;
  for (const cand of candidates) {
    const url = `${baseUrl}/${encodeURIComponent(cand).replace(/%2F/g, '/')}`;
    upstream = await fetch(url, { headers: { Authorization: c.auth } });
    if (upstream.ok) break;
  }
  if (!upstream || !upstream.ok) {
    return new NextResponse('Nicht gefunden', { status: 404 });
  }

  const body = upstream.body;
  const headers = new Headers();
  let ct = upstream.headers.get('content-type');
  if (!ct || ct === 'application/octet-stream') {
    ct = guessContentType(file);
  }
  headers.set('Content-Type', ct);
  const cd = upstream.headers.get('content-disposition');
  if (cd) headers.set('Content-Disposition', cd);
  headers.set('Cache-Control', 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800');
  headers.set('X-Robots-Tag', 'noindex, nofollow');

  return new NextResponse(body, { status: 200, headers });
}

export async function HEAD(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path: pathParts = [] } = (await ctx.params.catch?.(() => ({ path: [] as string[] }))) ?? (ctx as any).params;
  const key = pathParts.join('/');
  const c = conf();
  if (!c) {
    return new NextResponse(null, { status: 503 });
  }
  const url = `${c.url}/${encodeURIComponent(key).replace(/%2F/g, '/')}`;
  const upstream = await fetch(url, { method: 'HEAD', headers: { Authorization: c.auth } });
  const headers = new Headers();
  const ct = upstream.headers.get('content-type') || guessContentType(key);
  headers.set('Content-Type', ct);
  const cl = upstream.headers.get('content-length');
  if (cl) headers.set('Content-Length', cl);
  headers.set('Cache-Control', 'public, max-age=86400, s-maxage=86400');
  headers.set('X-Robots-Tag', 'noindex, nofollow');
  return new NextResponse(null, { status: upstream.status, headers });
}
