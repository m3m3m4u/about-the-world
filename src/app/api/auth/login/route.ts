import { getDatabase } from '@/lib/mongodb';
import { verifyPassword, normalizeCode, createSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { role, email, password, code } = body;

    const db = await getDatabase();

    if (role === 'teacher') {
      if (!email || !password) {
        return Response.json({ error: 'E-Mail und Passwort erforderlich.' }, { status: 400 });
      }

      const emailLower = email.toLowerCase().trim();

      // Admin-Check (Zugangsdaten aus .env.local oder Standard 'Kopernikus' / '12345')
      const envAdminEmail = (process.env.ADMIN_EMAIL || '').toLowerCase();
      const envAdminPassword = process.env.ADMIN_PASSWORD || '';
      const isEnvAdmin = !!(envAdminEmail && envAdminPassword && emailLower === envAdminEmail && password === envAdminPassword);
      const isDefaultAdmin = emailLower === 'kopernikus' && password === '12345';

      if (isEnvAdmin || isDefaultAdmin) {
        const effectiveEmail = isEnvAdmin ? process.env.ADMIN_EMAIL! : 'Kopernikus';
        await createSession({ id: 'admin', role: 'admin', email: effectiveEmail });
        return Response.json({ ok: true, role: 'admin', email: effectiveEmail });
      }

      const teacher = await db.collection('teachers').findOne({ email: emailLower });
      if (!teacher) {
        return Response.json({ error: 'Ungültige E-Mail oder Passwort.' }, { status: 401 });
      }

      if (!verifyPassword(password, teacher.salt as string, teacher.passwordHash as string)) {
        return Response.json({ error: 'Ungültige E-Mail oder Passwort.' }, { status: 401 });
      }

      await createSession({
        id: teacher._id.toString(),
        role: 'teacher',
        email: teacher.email as string,
      });

      return Response.json({ ok: true, role: 'teacher', email: teacher.email });

    } else if (role === 'student') {
      if (!code) {
        return Response.json({ error: 'Schüler-Code erforderlich.' }, { status: 400 });
      }

      const normalizedCode = normalizeCode(code);
      const student = await db.collection('students').findOne({ code: normalizedCode });
      if (!student) {
        return Response.json({ error: 'Unbekannter Code. Bitte überprüfen.' }, { status: 401 });
      }

      await createSession({
        id: student._id.toString(),
        role: 'student',
        code: normalizedCode,
      });

      return Response.json({ ok: true, role: 'student', code: normalizedCode, name: student.name || null });

    } else {
      return Response.json({ error: 'Ungültige Rolle.' }, { status: 400 });
    }
  } catch (err) {
    console.error('Login error:', err);
    return Response.json({ error: 'Serverfehler. Bitte erneut versuchen.' }, { status: 500 });
  }
}
