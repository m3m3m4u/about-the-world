import { getSession } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET /api/teacher/assignments?className=... — Zugewiesene Übungen für eine Klasse abrufen
export async function GET(request: Request) {
  const session = await getSession();
  if (!session || session.role !== 'teacher') {
    return Response.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const className = searchParams.get('className')?.trim();

  if (!className) {
    return Response.json({ error: 'Klassenname ist erforderlich.' }, { status: 400 });
  }

  const db = await getDatabase();
  const teacherId = new ObjectId(session.id);

  const doc = await db.collection('class_assignments').findOne({
    teacherId,
    className,
  });

  return Response.json({
    className,
    h5pIds: (doc?.h5pIds as string[]) || [],
    updatedAt: doc?.updatedAt || null,
  });
}

// POST /api/teacher/assignments — Übungsaufträge für eine Klasse speichern
export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.role !== 'teacher') {
    return Response.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const className = typeof body.className === 'string' ? body.className.trim() : '';
  const h5pIds = Array.isArray(body.h5pIds)
    ? body.h5pIds.filter((id: unknown): id is string => typeof id === 'string' && id.trim().length > 0)
    : [];

  if (!className) {
    return Response.json({ error: 'Klassenname ist erforderlich.' }, { status: 400 });
  }

  const db = await getDatabase();
  const teacherId = new ObjectId(session.id);
  const now = new Date();

  await db.collection('class_assignments').updateOne(
    { teacherId, className },
    {
      $set: {
        teacherId,
        className,
        h5pIds,
        updatedAt: now,
      },
      $setOnInsert: {
        createdAt: now,
      },
    },
    { upsert: true }
  );

  return Response.json({
    ok: true,
    className,
    count: h5pIds.length,
    h5pIds,
  });
}
