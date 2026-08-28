import { getDatabase } from '@/lib/mongodb';
import { generateSalt, hashPassword, createSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json({ error: 'E-Mail und Passwort erforderlich.' }, { status: 400 });
    }

    const emailLower = email.toLowerCase().trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLower)) {
      return Response.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 });
    }

    if (password.length < 6) {
      return Response.json({ error: 'Passwort muss mindestens 6 Zeichen haben.' }, { status: 400 });
    }

    const db = await getDatabase();
    const existing = await db.collection('teachers').findOne({ email: emailLower });
    if (existing) {
      return Response.json({ error: 'Diese E-Mail-Adresse ist bereits registriert.' }, { status: 409 });
    }

    const salt = generateSalt();
    const passwordHash = hashPassword(password, salt);

    const result = await db.collection('teachers').insertOne({
      email: emailLower,
      passwordHash,
      salt,
      createdAt: new Date(),
    });

    await createSession({
      id: result.insertedId.toString(),
      role: 'teacher',
      email: emailLower,
    });

    return Response.json({ ok: true, role: 'teacher', email: emailLower });
  } catch (err) {
    console.error('Register error:', err);
    return Response.json({ error: 'Serverfehler. Bitte erneut versuchen.' }, { status: 500 });
  }
}
