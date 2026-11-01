import { getSession } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { resolveClassOwnerId } from '@/lib/class-sharing';

// GET /api/teacher/classes/share?className=... – Alle Team-Teaching-Freigaben (optional für eine bestimmte Klasse)
export async function GET(request: Request) {
  const session = await getSession();
  if (!session || session.role !== 'teacher') {
    return Response.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const className = searchParams.get('className')?.trim();

  const db = await getDatabase();
  const teacherId = new ObjectId(session.id);

  if (className) {
    const { ownerId, isShared } = await resolveClassOwnerId(db, teacherId, className);
    const [shares, ownerDoc] = await Promise.all([
      db.collection('class_shares').find({ ownerId, className }).sort({ createdAt: 1 }).toArray(),
      db.collection('teachers').findOne({ _id: ownerId }),
    ]);

    return Response.json({
      className,
      isOwner: !isShared,
      ownerEmail: (ownerDoc?.email as string) || '',
      sharedWith: shares.map((s) => ({
        email: s.sharedWithEmail as string,
        teacherId: (s.sharedWithId as ObjectId).toString(),
        createdAt: s.createdAt,
      })),
    });
  }

  // Überblick über alle eigenen und geteilten Klassen
  const [myShares, sharedWithMe] = await Promise.all([
    db.collection('class_shares').find({ ownerId: teacherId }).toArray(),
    db.collection('class_shares').find({ sharedWithId: teacherId }).toArray(),
  ]);

  const ownerIds = Array.from(new Set(sharedWithMe.map((s) => (s.ownerId as ObjectId).toString()))).map(
    (id) => new ObjectId(id)
  );
  const owners = ownerIds.length > 0
    ? await db.collection('teachers').find({ _id: { $in: ownerIds } }).toArray()
    : [];
  const ownerEmailMap = new Map(owners.map((o) => [o._id.toString(), o.email as string]));

  return Response.json({
    myShares: myShares.map((s) => ({
      className: s.className as string,
      email: s.sharedWithEmail as string,
    })),
    sharedWithMe: sharedWithMe.map((s) => ({
      className: s.className as string,
      ownerEmail: ownerEmailMap.get((s.ownerId as ObjectId).toString()) || '',
    })),
  });
}

// POST /api/teacher/classes/share – Klasse mit einer anderen Lehrperson (per E-Mail) teilen
export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.role !== 'teacher') {
    return Response.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const className = typeof body.className === 'string' ? body.className.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

  if (!className || !email) {
    return Response.json({ error: 'Klassenname und E-Mail-Adresse sind erforderlich.' }, { status: 400 });
  }

  const db = await getDatabase();
  const teacherId = new ObjectId(session.id);

  // Prüfen, ob die aktuelle Lehrperson Zugriff auf diese Klasse hat (Eigentümer oder Team-Teacher)
  const { ownerId } = await resolveClassOwnerId(db, teacherId, className);

  const targetTeacher = await db.collection('teachers').findOne({ email });
  if (!targetTeacher) {
    return Response.json(
      { error: `Keine registrierte Lehrperson mit der E-Mail „${email}“ gefunden.` },
      { status: 404 }
    );
  }

  if (targetTeacher._id.equals(ownerId) || targetTeacher._id.equals(teacherId)) {
    return Response.json(
      { error: 'Du kannst eine Klasse nicht mit dir selbst oder der Eigentümer-Lehrperson teilen.' },
      { status: 400 }
    );
  }

  const now = new Date();
  await db.collection('class_shares').updateOne(
    { ownerId, className, sharedWithId: targetTeacher._id },
    {
      $set: {
        ownerId,
        className,
        sharedWithId: targetTeacher._id,
        sharedWithEmail: email,
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
    sharedWithEmail: email,
  });
}

// DELETE /api/teacher/classes/share – Team-Teaching-Freigabe entfernen
export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session || session.role !== 'teacher') {
    return Response.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const className = typeof body.className === 'string' ? body.className.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

  if (!className || !email) {
    return Response.json({ error: 'Klassenname und E-Mail-Adresse sind erforderlich.' }, { status: 400 });
  }

  const db = await getDatabase();
  const teacherId = new ObjectId(session.id);
  const { ownerId } = await resolveClassOwnerId(db, teacherId, className);

  await db.collection('class_shares').deleteOne({
    ownerId,
    className,
    sharedWithEmail: email,
  });

  return Response.json({ ok: true, className, removedEmail: email });
}
