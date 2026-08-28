import { getSession } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// DELETE /api/teacher/students/[studentId]
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ studentId: string }> }
) {
  const session = await getSession();
  if (!session || session.role !== 'teacher') {
    return Response.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const { studentId } = await params;

  let studentObjectId: ObjectId;
  try {
    studentObjectId = new ObjectId(studentId);
  } catch {
    return Response.json({ error: 'Ungültige Schüler-ID.' }, { status: 400 });
  }

  const db = await getDatabase();

  // Make sure the student belongs to this teacher
  const student = await db.collection('students').findOne({
    _id: studentObjectId,
    teacherId: new ObjectId(session.id),
  });

  if (!student) {
    return Response.json({ error: 'Schüler nicht gefunden.' }, { status: 404 });
  }

  // Delete student and their progress
  await db.collection('students').deleteOne({ _id: studentObjectId });
  await db.collection('h5p_progress').deleteMany({ studentId: studentObjectId });

  return Response.json({ ok: true });
}
