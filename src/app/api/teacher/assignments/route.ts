import { getSession } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { normalizeSections, type AssignmentSection } from '@/lib/assignment-sections';
import { findAccessibleStudent, resolveClassOwnerId } from '@/lib/class-sharing';

// GET /api/teacher/assignments?className=... oder ?studentId=... – Zugewiesene Übungen abrufen
export async function GET(request: Request) {
  const session = await getSession();
  if (!session || session.role !== 'teacher') {
    return Response.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const className = searchParams.get('className')?.trim();
  const studentId = searchParams.get('studentId')?.trim();

  const db = await getDatabase();
  const sessionTeacherId = new ObjectId(session.id);

  if (studentId) {
    if (!ObjectId.isValid(studentId)) {
      return Response.json({ error: 'Ungültige Schüler-ID.' }, { status: 400 });
    }
    const studentOid = new ObjectId(studentId);
    const student = await findAccessibleStudent(db, sessionTeacherId, studentOid);
    if (!student) {
      return Response.json({ error: 'Schüler nicht gefunden.' }, { status: 404 });
    }
    const ownerId = student.teacherId as ObjectId;
    const doc = await db.collection('student_assignments').findOne({
      teacherId: ownerId,
      studentId: studentOid,
    });
    const sections = normalizeSections(doc);
    return Response.json({
      studentId,
      h5pIds: sections.flatMap((s) => s.h5pIds),
      sections,
      updatedAt: doc?.updatedAt || null,
    });
  }

  if (!className) {
    return Response.json({ error: 'Klassenname ist erforderlich.' }, { status: 400 });
  }

  const { ownerId } = await resolveClassOwnerId(db, sessionTeacherId, className);
  const doc = await db.collection('class_assignments').findOne({ teacherId: ownerId, className });
  const sections = normalizeSections(doc);

  return Response.json({
    className,
    h5pIds: sections.flatMap((s) => s.h5pIds),
    sections,
    updatedAt: doc?.updatedAt || null,
  });
}

// POST /api/teacher/assignments – Übungsaufträge (geordnet, in Bereichen) für Klasse oder einzelnen Schüler speichern
export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.role !== 'teacher') {
    return Response.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const className = typeof body.className === 'string' ? body.className.trim() : '';
  const studentId = typeof body.studentId === 'string' ? body.studentId.trim() : '';

  const cleanIds = (arr: unknown): string[] =>
    Array.isArray(arr) ? arr.filter((id: unknown): id is string => typeof id === 'string' && id.trim().length > 0) : [];

  let sections: AssignmentSection[];
  if (Array.isArray(body.sections)) {
    const seen = new Set<string>();
    sections = (body.sections as Partial<AssignmentSection>[]).map((s, i) => ({
      id: typeof s.id === 'string' && s.id ? s.id : `sec-${i}`,
      title: typeof s.title === 'string' ? s.title.trim().slice(0, 80) : '',
      // Jede Übung nur einmal insgesamt
      h5pIds: cleanIds(s.h5pIds).filter((id) => (seen.has(id) ? false : (seen.add(id), true))),
    }));
  } else {
    sections = [{ id: 'general', title: '', h5pIds: cleanIds(body.h5pIds) }];
  }
  const h5pIds = sections.flatMap((s) => s.h5pIds);

  const db = await getDatabase();
  const sessionTeacherId = new ObjectId(session.id);
  const now = new Date();

  if (studentId) {
    if (!ObjectId.isValid(studentId)) {
      return Response.json({ error: 'Ungültige Schüler-ID.' }, { status: 400 });
    }
    const studentOid = new ObjectId(studentId);
    const student = await findAccessibleStudent(db, sessionTeacherId, studentOid);
    if (!student) {
      return Response.json({ error: 'Schüler nicht gefunden.' }, { status: 404 });
    }
    const ownerId = student.teacherId as ObjectId;
    await db.collection('student_assignments').updateOne(
      { teacherId: ownerId, studentId: studentOid },
      {
        $set: { teacherId: ownerId, studentId: studentOid, h5pIds, sections, updatedAt: now },
        $setOnInsert: { createdAt: now },
      },
      { upsert: true }
    );
    return Response.json({ ok: true, studentId, count: h5pIds.length, h5pIds, sections });
  }

  if (!className) {
    return Response.json({ error: 'Klassenname ist erforderlich.' }, { status: 400 });
  }

  const { ownerId } = await resolveClassOwnerId(db, sessionTeacherId, className);
  await db.collection('class_assignments').updateOne(
    { teacherId: ownerId, className },
    {
      $set: { teacherId: ownerId, className, h5pIds, sections, updatedAt: now },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true }
  );

  return Response.json({ ok: true, className, count: h5pIds.length, h5pIds, sections });
}
