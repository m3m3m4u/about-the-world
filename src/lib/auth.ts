/**
 * Auth helpers: password hashing (HMAC-SHA256 + salt), session token generation/verification.
 * Uses only Node.js built-in crypto.
 */

import crypto from 'crypto';
import { cookies } from 'next/headers';
import { getDatabase } from './mongodb';
import { ObjectId } from 'mongodb';

const SESSION_COOKIE = 'atw_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 Tage

// ---------------------------------------------------------------------------
// Password helpers
// ---------------------------------------------------------------------------

export function generateSalt(): string {
  return crypto.randomBytes(16).toString('hex');
}

export function hashPassword(password: string, salt: string): string {
  return crypto
    .createHmac('sha256', salt)
    .update(password)
    .digest('hex');
}

export function verifyPassword(password: string, salt: string, hash: string): boolean {
  return hashPassword(password, salt) === hash;
}

// ---------------------------------------------------------------------------
// Student code helpers
// ---------------------------------------------------------------------------

const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789'; // no 0, O, I to avoid confusion

export function generateStudentCode(): string {
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return code;
}

export function normalizeCode(code: string): string {
  return code.toUpperCase().trim();
}

// ---------------------------------------------------------------------------
// Session token helpers (HMAC-signed, no external JWT library needed)
// ---------------------------------------------------------------------------

const AUTH_SECRET = process.env.AUTH_SECRET || 'atw-fallback-secret-change-me';

export interface SessionPayload {
  id: string;
  role: 'teacher' | 'student' | 'admin';
  email?: string;   // for teachers and admin
  code?: string;    // for students
  iat: number;
}

function createToken(payload: SessionPayload): string {
  const data = JSON.stringify(payload);
  const b64 = Buffer.from(data).toString('base64url');
  const sig = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(b64)
    .digest('base64url');
  return `${b64}.${sig}`;
}

function verifyToken(token: string): SessionPayload | null {
  try {
    const [b64, sig] = token.split('.');
    if (!b64 || !sig) return null;
    const expectedSig = crypto
      .createHmac('sha256', AUTH_SECRET)
      .update(b64)
      .digest('base64url');
    if (sig !== expectedSig) return null;
    const payload: SessionPayload = JSON.parse(Buffer.from(b64, 'base64url').toString('utf-8'));
    return payload;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Cookie-based session
// ---------------------------------------------------------------------------

export async function createSession(payload: Omit<SessionPayload, 'iat'>): Promise<void> {
  const fullPayload: SessionPayload = { ...payload, iat: Date.now() };
  const token = createToken(fullPayload);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

// ---------------------------------------------------------------------------
// DB helpers
// ---------------------------------------------------------------------------

export async function getTeacherById(id: string) {
  const db = await getDatabase();
  return db.collection('teachers').findOne({ _id: new ObjectId(id) });
}

export async function getStudentById(id: string) {
  const db = await getDatabase();
  return db.collection('students').findOne({ _id: new ObjectId(id) });
}
