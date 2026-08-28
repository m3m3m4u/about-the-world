import { getSession } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET /api/student/progress — Eigener Fortschritt (inkl. H5P-Zustand/Lösungen)
export async function GET(request: Request) {
  const session = await getSession();
  if (!session || session.role !== 'student') {
    return Response.json({ progress: [] });
  }

  const url = new URL(request.url);
  const h5pId = url.searchParams.get('h5pId');
  const exerciseId = url.searchParams.get('exerciseId');

  const db = await getDatabase();
  const studentId = new ObjectId(session.id);

  if (h5pId) {
    // Look up either by courseId or by exerciseId
    const entry = await db.collection('h5p_progress').findOne({
      studentId,
      $or: [{ h5pId }, { [`exercises.${h5pId}`]: { $exists: true } }],
    });

    const exKey = exerciseId || h5pId;
    const exerciseState = entry?.exercises?.[exKey]?.state || entry?.state || null;

    return Response.json({
      entry: entry
        ? {
            h5pId: entry.h5pId,
            h5pTitle: entry.h5pTitle,
            score: entry.score,
            totalExercises: entry.totalExercises || 1,
            completedExercisesCount: entry.exercises ? Object.keys(entry.exercises).length : 1,
            state: exerciseState,
            updatedAt: entry.updatedAt,
          }
        : null,
    });
  }

  const entries = await db
    .collection('h5p_progress')
    .find({ studentId })
    .sort({ updatedAt: -1 })
    .toArray();

  return Response.json({
    progress: entries.map((p) => ({
      h5pId: p.h5pId,
      h5pTitle: p.h5pTitle,
      score: p.score,
      totalExercises: p.totalExercises || 1,
      completedExercisesCount: p.exercises ? Object.keys(p.exercises).length : 1,
      state: p.state || null,
      updatedAt: p.updatedAt,
    })),
  });
}

// POST /api/student/progress — Fortschritt berechnen und speichern (nach Kurs-Gesamtanzahl)
export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.role !== 'student') {
    return Response.json({ ok: false, reason: 'not-logged-in' });
  }

  try {
    const body = await request.json();
    const {
      courseId,
      courseTitle,
      totalExercises,
      exerciseId,
      score,
      state,
      h5pId,
      h5pTitle,
    } = body;

    const finalCourseId = courseId || h5pId;
    if (typeof finalCourseId !== 'string') {
      return Response.json({ ok: false, reason: 'invalid-data' }, { status: 400 });
    }

    const finalCourseTitle = courseTitle || h5pTitle || finalCourseId;
    const finalExerciseId = exerciseId || h5pId || 'default';
    const finalTotal = Math.max(1, parseInt(totalExercises, 10) || 1);

    const percentScore =
      typeof score === 'number'
        ? Math.round(Math.max(0, Math.min(100, score * 100)))
        : undefined;

    const db = await getDatabase();
    const studentId = new ObjectId(session.id);

    const existing = await db.collection('h5p_progress').findOne({ studentId, h5pId: finalCourseId });

    // Retrieve existing sub-exercise map
    const existingExercises: Record<string, { score?: number; state?: string; updatedAt?: Date }> =
      (existing?.exercises as Record<string, { score?: number; state?: string; updatedAt?: Date }>) || {};

    const currentEx = existingExercises[finalExerciseId] || {};

    if (percentScore !== undefined) {
      // Keep highest score for this specific exercise
      currentEx.score = Math.max(currentEx.score ?? 0, percentScore);
    }

    if (state !== undefined) {
      currentEx.state = state;
    }

    currentEx.updatedAt = new Date();
    existingExercises[finalExerciseId] = currentEx;

    // Calculate course overall score: sum of all best exercise scores / total number of exercises in course
    const totalCount = Math.max(finalTotal, Object.keys(existingExercises).length);
    const sumScores = Object.values(existingExercises).reduce((sum, ex) => sum + (ex.score || 0), 0);
    const overallCourseScore = Math.round(Math.min(100, sumScores / totalCount));

    const setFields: Record<string, unknown> = {
      studentId,
      h5pId: finalCourseId,
      h5pTitle: finalCourseTitle,
      totalExercises: totalCount,
      exercises: existingExercises,
      score: overallCourseScore,
      updatedAt: new Date(),
    };

    if (state !== undefined) {
      setFields.state = state;
    }

    await db.collection('h5p_progress').updateOne(
      { studentId, h5pId: finalCourseId },
      {
        $set: setFields,
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true }
    );

    return Response.json({
      ok: true,
      score: overallCourseScore,
      exerciseScore: currentEx.score,
      totalExercises: totalCount,
    });
  } catch (err) {
    console.error('Progress save error:', err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
