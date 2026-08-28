import { getSession, getTeacherById, getStudentById } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return Response.json({ user: null });
  }

  try {
    if (session.role === 'admin') {
      return Response.json({
        user: {
          id: 'admin',
          role: 'admin',
          email: session.email || 'Kopernikus',
        },
      });
    }

    if (session.role === 'teacher') {
      const teacher = await getTeacherById(session.id);
      if (!teacher) return Response.json({ user: null });
      return Response.json({
        user: {
          id: teacher._id.toString(),
          role: 'teacher',
          email: teacher.email,
        },
      });
    }

    if (session.role === 'student') {
      const student = await getStudentById(session.id);
      if (!student) return Response.json({ user: null });

      // Fetch teacher email for context
      const db = await getDatabase();
      const teacher = await db.collection('teachers').findOne({ _id: student.teacherId });

      return Response.json({
        user: {
          id: student._id.toString(),
          role: 'student',
          code: student.code,
          name: student.name || null,
          teacherEmail: teacher?.email || null,
        },
      });
    }
  } catch {
    return Response.json({ user: null });
  }

  return Response.json({ user: null });
}
