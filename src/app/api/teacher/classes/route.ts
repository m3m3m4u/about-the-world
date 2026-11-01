import { getSession } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { resolveClassOwnerId } from '@/lib/class-sharing';

// PATCH /api/teacher/classes – Benennt eine Klasse für alle zugehörigen Schüler und Zuweisungen um
export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session || session.role !== 'teacher') {
    return Response.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const oldClassName = typeof body.oldClassName === 'string' ? body.oldClassName.trim() : '';
  const newClassName = typeof body.newClassName === 'string' ? body.newClassName.trim() : '';

  if (!oldClassName || !newClassName) {
    return Response.json({ error: 'Bisheriger und neuer Klassenname sind erforderlich.' }, { status: 400 });
  }

  if (oldClassName === newClassName) {
    return Response.json({ error: 'Der neue Klassenname muss sich vom bisherigen unterscheiden.' }, { status: 400 });
  }

  const sessionTeacherId = new ObjectId(session.id);
  const db = await getDatabase();
  const { ownerId: teacherId } = await resolveClassOwnerId(db, sessionTeacherId, oldClassName);

  const classQuery = oldClassName === 'Ohne Klasse'
    ? { teacherId, className: { $in: ['', null, 'Ohne Klasse'] } }
    : { teacherId, className: oldClassName };

  // Update all students of this teacher
  const studentResult = await db.collection('students').updateMany(
    classQuery,
    { $set: { className: newClassName } }
  );

  // Update class_assignments if exist
  await db.collection('class_assignments').updateMany(
    { teacherId, className: oldClassName },
    { $set: { className: newClassName, updatedAt: new Date() } }
  );

  // Update class_shares if exist
  await db.collection('class_shares').updateMany(
    { ownerId: teacherId, className: oldClassName },
    { $set: { className: newClassName, updatedAt: new Date() } }
  );

  return Response.json({
    ok: true,
    oldClassName,
    newClassName,
    modifiedStudentsCount: studentResult.modifiedCount,
  });
}

// DELETE /api/teacher/classes – Löscht eine gesamte Klasse mit allen Schüleraccounts und deren Fortschrittsdaten
export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session || session.role !== 'teacher') {
    return Response.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const className = typeof body.className === 'string' ? body.className.trim() : '';

  if (!className) {
    return Response.json({ error: 'Klassenname ist erforderlich.' }, { status: 400 });
  }

  const sessionTeacherId = new ObjectId(session.id);
  const db = await getDatabase();
  const { ownerId: teacherId } = await resolveClassOwnerId(db, sessionTeacherId, className);

  // Find all students belonging to this class
  const students = await db
    .collection('students')
    .find({
      teacherId,
      className: className === 'Ohne Klasse' ? { $in: ['', null, 'Ohne Klasse'] } : className,
    })
    .toArray();

  if (students.length === 0) {
    return Response.json({ error: 'Keine Schüleraccounts in dieser Klasse gefunden.' }, { status: 404 });
  }

  const studentIds = students.map((s) => s._id);

  // Delete all H5P progress records for these students
  await db.collection('h5p_progress').deleteMany({
    studentId: { $in: studentIds },
  });

  // Delete all class assignments and shares for this class
  await db.collection('class_assignments').deleteMany({
    teacherId,
    className,
  });
  await db.collection('class_shares').deleteMany({
    ownerId: teacherId,
    className,
  });

  // Delete all students in this class
  const result = await db.collection('students').deleteMany({
    _id: { $in: studentIds },
  });

  return Response.json({
    ok: true,
    className,
    deletedCount: result.deletedCount,
  });
}
