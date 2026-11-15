import { getDatabase } from '@/lib/mongodb';
import { verifyPassword, normalizeCode, createSession } from '@/lib/auth';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rateCheck = checkRateLimit(`login:${ip}`, 10, 60 * 1000); // Max 10 attempts per minute
    if (!rateCheck.allowed) {
      return Response.json(
        { error: `Zu viele Anmeldeversuche. Bitte warte ${rateCheck.resetInSec} Sekunden.` },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { role, email, password, code } = body;

    const db = await getDatabase();

    if (role === 'teacher') {
      if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
        return Response.json({ error: 'E-Mail und Passwort erforderlich.' }, { status: 400 });
      }

      const emailLower = email.toLowerCase().trim();

      // Admin-Check (Zugangsdaten aus .env.local)
      const envAdminEmail = (process.env.ADMIN_EMAIL || '').toLowerCase().trim();
      const envAdminPassword = process.env.ADMIN_PASSWORD || '';
      const isEnvAdmin = !!(envAdminEmail && envAdminPassword && emailLower === envAdminEmail && password === envAdminPassword);

      // In non-production only, allow fallback Kopernikus / 12345 if env is unset
      const isDefaultAdmin = process.env.NODE_ENV !== 'production' && !envAdminEmail && emailLower === 'kopernikus' && password === '12345';

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
      if (!code || typeof code !== 'string') {
        return Response.json({ error: 'Schüler-Code erforderlich.' }, { status: 400 });
      }

      const normalizedCode = normalizeCode(code);
      if (!normalizedCode || normalizedCode.length !== 5) {
        return Response.json({ error: 'Ungültiges Code-Format.' }, { status: 400 });
      }

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
