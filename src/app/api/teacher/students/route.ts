import { getSession } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';
import { generateStudentCode } from '@/lib/auth';
import { ObjectId } from 'mongodb';

// GET /api/teacher/students — Liste aller Schüler der eingeloggten Lehrperson
export async function GET() {
  const session = await getSession();
  if (!session || session.role !== 'teacher') {
    return Response.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const db = await getDatabase();
  const students = await db
    .collection('students')
    .find({ teacherId: new ObjectId(session.id) })
    .sort({ className: 1, createdAt: 1 })
    .toArray();

  return Response.json({
    students: students.map((s) => ({
      id: s._id.toString(),
      code: s.code,
      className: (s.className as string) || 'Ohne Klasse',
      createdAt: s.createdAt,
    })),
  });
}

// POST /api/teacher/students — Schüleraccounts anlegen (nach Anzahl bis zu 30 & Klasse)
export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.role !== 'teacher') {
    return Response.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const db = await getDatabase();
  const body = await request.json().catch(() => ({}));
  const count = Math.min(30, Math.max(1, parseInt(body.count, 10) || 1));
  const rawClass = typeof body.className === 'string' ? body.className.trim() : '';
  const className = rawClass || 'Standardklasse';

  const teacherId = new ObjectId(session.id);
  const now = new Date();
  const newStudents: { code: string; className: string; teacherId: ObjectId; createdAt: Date }[] = [];

  for (let i = 0; i < count; i++) {
    let code = '';
    for (let attempt = 0; attempt < 15; attempt++) {
      const candidate = generateStudentCode();
      const alreadyGenerated = newStudents.some((s) => s.code === candidate);
      if (!alreadyGenerated) {
        const existing = await db.collection('students').findOne({ code: candidate });
        if (!existing) {
          code = candidate;
          break;
        }
      }
    }

    if (!code) {
      return Response.json(
        { error: 'Konnte nicht genügend eindeutige Codes generieren.' },
        { status: 500 }
      );
    }

    newStudents.push({
      code,
      className,
      teacherId,
      createdAt: now,
    });
  }

  const result = await db.collection('students').insertMany(newStudents);

  return Response.json({
    ok: true,
    count: result.insertedCount,
    className,
    students: newStudents.map((s, idx) => ({
      id: result.insertedIds[idx].toString(),
      code: s.code,
      className: s.className,
    })),
  });
}
