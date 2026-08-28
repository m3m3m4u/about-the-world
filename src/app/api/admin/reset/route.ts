import { getSession } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';
import { generateSalt, hashPassword, generateStudentCode } from '@/lib/auth';
import { ObjectId } from 'mongodb';

// POST /api/admin/reset — Passwort einer Lehrperson oder Code eines Schülers zurücksetzen
export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.role !== 'admin') {
    return Response.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const body = await request.json();
  const { type, id, newPassword } = body;

  const db = await getDatabase();

  // ── Reset teacher password ──────────────────────────────────────────────
  if (type === 'teacher-password') {
    if (!id || !newPassword) {
      return Response.json({ error: 'id und newPassword erforderlich.' }, { status: 400 });
    }
    if ((newPassword as string).length < 6) {
      return Response.json({ error: 'Passwort muss mindestens 6 Zeichen haben.' }, { status: 400 });
    }

    let oid: ObjectId;
    try { oid = new ObjectId(id); } catch {
      return Response.json({ error: 'Ungültige ID.' }, { status: 400 });
    }

    const salt = generateSalt();
    const passwordHash = hashPassword(newPassword, salt);

    const result = await db.collection('teachers').updateOne(
      { _id: oid },
      { $set: { passwordHash, salt } }
    );

    if (result.matchedCount === 0) {
      return Response.json({ error: 'Lehrperson nicht gefunden.' }, { status: 404 });
    }

    return Response.json({ ok: true, message: 'Passwort wurde zurückgesetzt.' });
  }

  // ── Reset student code ──────────────────────────────────────────────────
  if (type === 'student-code') {
    if (!id) {
      return Response.json({ error: 'id erforderlich.' }, { status: 400 });
    }

    let oid: ObjectId;
    try { oid = new ObjectId(id); } catch {
      return Response.json({ error: 'Ungültige ID.' }, { status: 400 });
    }

    // Generate unique code
    let code = '';
    for (let attempt = 0; attempt < 10; attempt++) {
      const candidate = generateStudentCode();
      const existing = await db.collection('students').findOne({ code: candidate });
      if (!existing) { code = candidate; break; }
    }
    if (!code) {
      return Response.json({ error: 'Konnte keinen eindeutigen Code generieren.' }, { status: 500 });
    }

    const result = await db.collection('students').updateOne(
      { _id: oid },
      { $set: { code } }
    );

    if (result.matchedCount === 0) {
      return Response.json({ error: 'Schüler:in nicht gefunden.' }, { status: 404 });
    }

    return Response.json({ ok: true, newCode: code });
  }

  return Response.json({ error: 'Unbekannter Reset-Typ.' }, { status: 400 });
}
