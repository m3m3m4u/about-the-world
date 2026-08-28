import { getSession } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';
import { generateSalt, hashPassword, verifyPassword } from '@/lib/auth';
import { ObjectId } from 'mongodb';

// POST /api/teacher/password — Lehrperson ändert eigenes Passwort
export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.role !== 'teacher') {
    return Response.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { currentPassword, newPassword } = body;

  if (!currentPassword || typeof currentPassword !== 'string') {
    return Response.json({ error: 'Bitte gib dein aktuelles Passwort ein.' }, { status: 400 });
  }

  if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
    return Response.json({ error: 'Das neue Passwort muss mindestens 6 Zeichen lang sein.' }, { status: 400 });
  }

  const db = await getDatabase();
  const teacherId = new ObjectId(session.id);
  const teacher = await db.collection('teachers').findOne({ _id: teacherId });

  if (!teacher) {
    return Response.json({ error: 'Lehrperson nicht gefunden.' }, { status: 404 });
  }

  // Verify current password
  const isMatch = verifyPassword(
    currentPassword,
    teacher.salt as string,
    teacher.passwordHash as string
  );

  if (!isMatch) {
    return Response.json({ error: 'Das aktuelle Passwort ist nicht korrekt.' }, { status: 400 });
  }

  // Generate new salt and hash
  const salt = generateSalt();
  const passwordHash = hashPassword(newPassword, salt);

  await db.collection('teachers').updateOne(
    { _id: teacherId },
    {
      $set: {
        passwordHash,
        salt,
        updatedAt: new Date(),
      },
    }
  );

  return Response.json({ ok: true, message: 'Passwort erfolgreich geändert.' });
}
