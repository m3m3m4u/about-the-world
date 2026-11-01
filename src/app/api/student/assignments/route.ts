import { getSession } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';
import { getAllExercises } from '@/lib/exercise-catalog';
import { ObjectId } from 'mongodb';
import { normalizeSections } from '@/lib/assignment-sections';

// GET /api/student/assignments — Zugewiesene Übungen für den eingeloggten Schüler
export async function GET() {
  const session = await getSession();
  if (!session || session.role !== 'student') {
    return Response.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const db = await getDatabase();
  const student = await db.collection('students').findOne({ _id: new ObjectId(session.id) });

  if (!student) {
    return Response.json({ error: 'Schüler nicht gefunden.' }, { status: 404 });
  }

  const className = (student.className as string) || 'Ohne Klasse';
  const teacherId = student.teacherId as ObjectId;

  // Fetch class assignments set by this teacher for this class
  const assignmentDoc = await db.collection('class_assignments').findOne({
    teacherId,
    className,
  });
  const personalDoc = await db.collection('student_assignments').findOne({
    teacherId,
    studentId: new ObjectId(session.id),
  });

  // Klassenbereiche in Lehrer-Reihenfolge, danach persönliche Aufgaben (Duplikate entfallen)
  const orderedEntries: { id: string; sectionTitle: string; personal: boolean }[] = [];
  const seenIds = new Set<string>();
  for (const sec of normalizeSections(assignmentDoc)) {
    for (const id of sec.h5pIds) {
      if (seenIds.has(id)) continue;
      seenIds.add(id);
      orderedEntries.push({ id, sectionTitle: sec.title, personal: false });
    }
  }
  for (const sec of normalizeSections(personalDoc)) {
    for (const id of sec.h5pIds) {
      if (seenIds.has(id)) continue;
      seenIds.add(id);
      orderedEntries.push({ id, sectionTitle: sec.title || 'Nur für dich', personal: true });
    }
  }

  // Fetch student's progress for completed exercises
  const progressList = await db
    .collection('h5p_progress')
    .find({ studentId: new ObjectId(session.id) })
    .toArray();

  const progressMap = new Map<string, { score: number; updatedAt: string }>();
  for (const p of progressList) {
    const rawId = p.h5pId || '';
    const match = rawId.match(/(\d+)(?:\/?$)/);
    const numId = match ? match[1] : rawId.replace(/^\/h5p-content\//, '').replace(/^\//, '');
    progressMap.set(numId, {
      score: p.score,
      updatedAt: p.updatedAt,
    });
    progressMap.set(rawId, {
      score: p.score,
      updatedAt: p.updatedAt,
    });
  }

  const allExercises = await getAllExercises();
  const catalogMap = new Map(allExercises.map((e) => [e.id, e]));

  const assignments = orderedEntries.map(({ id, sectionTitle, personal }) => {
    const meta = catalogMap.get(id);
    const prog = progressMap.get(id);

    return {
      id,
      sectionTitle,
      personal,
      title: meta?.title || `Übung ${id}`,
      subject: meta?.subject || 'Allgemein',
      subjectSlug: meta?.subjectSlug || '',
      topicTitle: meta?.topicTitle || '',
      topicSlug: meta?.topicSlug || '',
      url: meta?.url || `/${id}`,
      completed: prog !== undefined,
      score: prog?.score ?? null,
      updatedAt: prog?.updatedAt ?? null,
    };
  });

  const completedCount = assignments.filter((a) => a.completed).length;

  return Response.json({
    className,
    assignments,
    totalAssigned: assignments.length,
    completedCount,
  });
}
