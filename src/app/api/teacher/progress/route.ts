import { getSession } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET /api/teacher/progress — Fortschritt aller Schüler der Lehrperson
export async function GET() {
  const session = await getSession();
  if (!session || session.role !== 'teacher') {
    return Response.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const db = await getDatabase();

  // Get all students of this teacher
  const students = await db
    .collection('students')
    .find({ teacherId: new ObjectId(session.id) })
    .sort({ createdAt: 1 })
    .toArray();

  if (students.length === 0) {
    return Response.json({ students: [], progress: [] });
  }

  const studentIds = students.map((s) => s._id);

  // Get all progress entries for these students
  const progressEntries = await db
    .collection('h5p_progress')
    .find({ studentId: { $in: studentIds } })
    .toArray();

  return Response.json({
    students: students.map((s) => ({
      id: s._id.toString(),
      code: s.code,
      className: (s.className as string) || 'Ohne Klasse',
    })),
    progress: progressEntries.map((p) => ({
      studentId: p.studentId.toString(),
      h5pId: p.h5pId,
      h5pTitle: p.h5pTitle,
      score: p.score,
      updatedAt: p.updatedAt,
    })),
  });
}
