import { Db, ObjectId } from 'mongodb';

export interface ClassShareDoc {
  ownerId: ObjectId;
  className: string;
  sharedWithId: ObjectId;
  sharedWithEmail: string;
  createdAt: Date;
}

export function classNameMatchQuery(className: string) {
  return className === 'Ohne Klasse'
    ? { $in: ['', null, 'Ohne Klasse'] }
    : className;
}

/**
 * Liefert die `ownerId` einer Klasse für eine Lehrperson (`teacherId`).
 * Ist die Klasse für diese Lehrperson freigegeben (Team-Teaching), wird die `ownerId`
 * der ursprünglichen Lehrperson zurückgegeben; sonst `teacherId` selbst.
 */
export async function resolveClassOwnerId(
  db: Db,
  teacherId: ObjectId,
  className: string
): Promise<{ ownerId: ObjectId; isShared: boolean }> {
  const share = await db.collection('class_shares').findOne({
    sharedWithId: teacherId,
    className,
  });
  if (share && share.ownerId) {
    return { ownerId: share.ownerId as ObjectId, isShared: true };
  }
  return { ownerId: teacherId, isShared: false };
}

/**
 * Baut einen Mongo-Query-Filter für die `students`-Collection, der sowohl eigene
 * Schüler:innen als auch über Team-Teaching geteilte Klassen einschließt.
 */
export async function buildAccessibleStudentsQuery(db: Db, teacherId: ObjectId) {
  const shares = await db
    .collection('class_shares')
    .find({ sharedWithId: teacherId })
    .toArray();

  if (shares.length === 0) {
    return { teacherId };
  }

  return {
    $or: [
      { teacherId },
      ...shares.map((s) => ({
        teacherId: s.ownerId as ObjectId,
        className: classNameMatchQuery((s.className as string) || 'Ohne Klasse'),
      })),
    ],
  };
}

/**
 * Prüft, ob eine Lehrperson Zugriff auf einen bestimmten Schüler hat (eigen oder geteilte Klasse).
 */
export async function findAccessibleStudent(
  db: Db,
  teacherId: ObjectId,
  studentId: ObjectId
) {
  const student = await db.collection('students').findOne({ _id: studentId });
  if (!student) return null;

  const studentOwner = student.teacherId as ObjectId;
  if (studentOwner.equals(teacherId)) {
    return student;
  }

  const cls = (student.className as string) || 'Ohne Klasse';
  const share = await db.collection('class_shares').findOne({
    ownerId: studentOwner,
    sharedWithId: teacherId,
    className: cls,
  });

  return share ? student : null;
}
