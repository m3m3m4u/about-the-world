import { getSession } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET /api/admin/users — alle Lehrpersonen mit Anzahl Schüler und erledigten Aufgaben
export async function GET() {
  const session = await getSession();
  if (!session || session.role !== 'admin') {
    return Response.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const db = await getDatabase();

  const teachers = await db
    .collection('teachers')
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  const teacherIds = teachers.map((t) => t._id);

  const students = teacherIds.length > 0
    ? await db
        .collection('students')
        .find({ teacherId: { $in: teacherIds } }, { projection: { _id: 1, teacherId: 1 } })
        .toArray()
    : [];

  const studentCountByTeacher: Record<string, number> = {};
  const studentTeacherMap: Record<string, string> = {};
  const allStudentIds: ObjectId[] = [];

  for (const s of students) {
    const tid = s.teacherId.toString();
    studentCountByTeacher[tid] = (studentCountByTeacher[tid] || 0) + 1;
    studentTeacherMap[s._id.toString()] = tid;
    allStudentIds.push(s._id);
  }

  // Count completed tasks (H5P progress entries) by teacher
  const completedTasksByTeacher: Record<string, number> = {};
  if (allStudentIds.length > 0) {
    const progressList = await db
      .collection('h5p_progress')
      .find({ studentId: { $in: allStudentIds } }, { projection: { studentId: 1 } })
      .toArray();

    for (const p of progressList) {
      const tid = studentTeacherMap[p.studentId.toString()];
      if (tid) {
        completedTasksByTeacher[tid] = (completedTasksByTeacher[tid] || 0) + 1;
      }
    }
  }

  const teacherList = teachers.map((t) => {
    const tid = t._id.toString();
    return {
      id: tid,
      email: t.email as string,
      createdAt: t.createdAt,
      studentCount: studentCountByTeacher[tid] || 0,
      completedTasksCount: completedTasksByTeacher[tid] || 0,
    };
  });

  const totalStudents = students.length;
  const totalCompletedTasks = Object.values(completedTasksByTeacher).reduce((a, b) => a + b, 0);

  return Response.json({
    teachers: teacherList,
    totalStudents,
    totalCompletedTasks,
  });
}

// DELETE /api/admin/users — Lehrperson + alle ihre Schüler + Fortschritt löschen
export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session || session.role !== 'admin') {
    return Response.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const { teacherId } = await request.json();
  if (!teacherId) {
    return Response.json({ error: 'teacherId fehlt.' }, { status: 400 });
  }

  let oid: ObjectId;
  try { oid = new ObjectId(teacherId); } catch {
    return Response.json({ error: 'Ungültige ID.' }, { status: 400 });
  }

  const db = await getDatabase();

  // Find all students of this teacher
  const students = await db.collection('students').find({ teacherId: oid }).toArray();
  const studentIds = students.map((s) => s._id);

  // Delete progress, students, teacher
  if (studentIds.length > 0) {
    await db.collection('h5p_progress').deleteMany({ studentId: { $in: studentIds } });
  }
  await db.collection('students').deleteMany({ teacherId: oid });
  await db.collection('teachers').deleteOne({ _id: oid });

  return Response.json({ ok: true });
}
