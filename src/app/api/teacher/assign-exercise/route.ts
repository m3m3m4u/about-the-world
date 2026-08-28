import { getSession } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET /api/teacher/assign-exercise?exerciseId=... — Klassen und Zuweisungsstatus für eine Übung abrufen
export async function GET(request: Request) {
  const session = await getSession();
  if (!session || session.role !== 'teacher') {
    return Response.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const exerciseId = searchParams.get('exerciseId')?.trim();

  if (!exerciseId) {
    return Response.json({ error: 'exerciseId ist erforderlich.' }, { status: 400 });
  }

  const db = await getDatabase();
  const teacherId = new ObjectId(session.id);

  // 1. Alle Klassen der Lehrperson mit Schüleranzahl ermitteln
  const students = await db
    .collection('students')
    .find({ teacherId })
    .toArray();

  const classCounts: Record<string, number> = {};
  for (const s of students) {
    const cls = (s.className as string) || 'Ohne Klasse';
    classCounts[cls] = (classCounts[cls] || 0) + 1;
  }

  const classNames = Object.keys(classCounts).sort();

  // 2. Alle Zuweisungen für diesen Teacher abrufen
  const assignments = await db
    .collection('class_assignments')
    .find({ teacherId })
    .toArray();

  const assignedMap = new Map<string, Set<string>>();
  for (const a of assignments) {
    const cls = (a.className as string) || '';
    const h5pIds = Array.isArray(a.h5pIds) ? a.h5pIds : [];
    assignedMap.set(cls, new Set(h5pIds));
  }

  // Normalisierter Abgleich (ID oder h5p-folder)
  const matchId = (set: Set<string>, id: string) => {
    if (set.has(id)) return true;
    const numMatch = id.match(/(\d+)(?:\/?$)/);
    if (numMatch && set.has(numMatch[1])) return true;
    for (const item of set) {
      if (item.includes(id) || id.includes(item)) return true;
    }
    return false;
  };

  const classes = classNames.map((name) => {
    const set = assignedMap.get(name) || new Set();
    const assigned = matchId(set, exerciseId);
    return {
      name,
      studentCount: classCounts[name] || 0,
      assigned,
    };
  });

  const assignedClasses = classes.filter((c) => c.assigned).map((c) => c.name);

  return Response.json({
    exerciseId,
    classes,
    assignedClasses,
  });
}

// POST /api/teacher/assign-exercise — Übung Klassen zuweisen oder Zuweisung aufheben
export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.role !== 'teacher') {
    return Response.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const exerciseId = typeof body.exerciseId === 'string' ? body.exerciseId.trim() : '';
  const selectedClasses: string[] = Array.isArray(body.classNames)
    ? body.classNames.filter((c: unknown): c is string => typeof c === 'string' && c.trim().length > 0)
    : [];

  if (!exerciseId) {
    return Response.json({ error: 'exerciseId ist erforderlich.' }, { status: 400 });
  }

  const db = await getDatabase();
  const teacherId = new ObjectId(session.id);
  const now = new Date();

  // Alle bekannten Klassen der Lehrperson
  const students = await db
    .collection('students')
    .find({ teacherId })
    .toArray();

  const allTeacherClasses = Array.from(
    new Set(students.map((s) => (s.className as string) || 'Ohne Klasse'))
  );

  // Für jede Klasse die Zuweisung aktualisieren
  for (const cls of allTeacherClasses) {
    const shouldAssign = selectedClasses.includes(cls);
    const existing = await db.collection('class_assignments').findOne({ teacherId, className: cls });
    let currentH5pIds: string[] = Array.isArray(existing?.h5pIds) ? existing.h5pIds : [];

    // Filter normalisiert
    const numMatch = exerciseId.match(/(\d+)(?:\/?$)/);
    const pureId = numMatch ? numMatch[1] : exerciseId;

    if (shouldAssign) {
      if (!currentH5pIds.includes(pureId) && !currentH5pIds.includes(exerciseId)) {
        currentH5pIds.push(pureId);
      }
    } else {
      currentH5pIds = currentH5pIds.filter((id) => id !== pureId && id !== exerciseId);
    }

    await db.collection('class_assignments').updateOne(
      { teacherId, className: cls },
      {
        $set: {
          teacherId,
          className: cls,
          h5pIds: currentH5pIds,
          updatedAt: now,
        },
        $setOnInsert: {
          createdAt: now,
        },
      },
      { upsert: true }
    );
  }

  return Response.json({
    ok: true,
    exerciseId,
    assignedClasses: selectedClasses,
  });
}
