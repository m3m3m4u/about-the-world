import { getAllExercises } from '@/lib/exercise-catalog';

// GET /api/h5p/catalog — Katalog aller verfügbaren H5P-Übungen
export async function GET() {
  const exercises = await getAllExercises();
  return Response.json({
    exercises,
    total: exercises.length,
  });
}
