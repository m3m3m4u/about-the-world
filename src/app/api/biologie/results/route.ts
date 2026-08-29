import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Nicht angemeldet' }, { status: 401 });
    }

    const body = await req.json();
    const { kategorie, kategorieName, correctAnswers, wrongAnswers, totalQuestions, percentage, wrongItems } = body;

    const db = await getDatabase();
    const doc = {
      userId: session.id,
      role: session.role,
      kategorie: kategorie || 'alle',
      kategorieName: kategorieName || 'Biologie',
      correctAnswers: Number(correctAnswers) || 0,
      wrongAnswers: Number(wrongAnswers) || 0,
      totalQuestions: Number(totalQuestions) || 0,
      percentage: Number(percentage) || (totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0),
      wrongItems: Array.isArray(wrongItems) ? wrongItems : [],
      completedAt: new Date().toISOString(),
    };

    const result = await db.collection('biology_results').insertOne(doc);

    return NextResponse.json({
      success: true,
      resultId: result.insertedId.toString(),
    });
  } catch (error) {
    console.error('Error saving biology results:', error);
    return NextResponse.json({ success: false, error: 'Serverfehler' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Nicht angemeldet' }, { status: 401 });
    }

    const db = await getDatabase();
    let query: any = {};

    if (session.role === 'student') {
      query.userId = session.id;
    } else if (session.role === 'teacher') {
      // Find students belonging to this teacher
      const students = await db.collection('students').find({ teacherId: session.id }).toArray();
      const studentIds = students.map((s) => s._id.toString());
      query.userId = { $in: [session.id, ...studentIds] };
    }

    const results = await db
      .collection('biology_results')
      .find(query)
      .sort({ completedAt: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json({
      success: true,
      results: results.map((r) => ({
        id: r._id.toString(),
        kategorie: r.kategorie,
        kategorieName: r.kategorieName,
        correctAnswers: r.correctAnswers,
        wrongAnswers: r.wrongAnswers,
        totalQuestions: r.totalQuestions,
        percentage: r.percentage,
        wrongItems: r.wrongItems,
        completedAt: r.completedAt,
      })),
    });
  } catch (error) {
    console.error('Error fetching biology results:', error);
    return NextResponse.json({ success: false, error: 'Serverfehler' }, { status: 500 });
  }
}
