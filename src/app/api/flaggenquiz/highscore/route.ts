import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export interface HighscoreEntry {
  id?: string;
  name: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  continents: string[];
  timeSpentSeconds?: number;
  createdAt: string;
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const continent = url.searchParams.get('continent');

    let query: any = {};
    if (continent && continent !== 'alle') {
      query.continents = continent;
    }

    const db = await getDatabase();
    const scores = await db
      .collection('flagquiz_highscores')
      .find(query)
      .sort({ score: -1, percentage: -1, timeSpentSeconds: 1, createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json({
      highscores: scores.map((s) => ({
        id: s._id.toString(),
        name: s.name || 'Anonym',
        score: s.score,
        totalQuestions: s.totalQuestions,
        percentage: s.percentage,
        continents: s.continents || ['alle'],
        timeSpentSeconds: s.timeSpentSeconds || 0,
        createdAt: s.createdAt,
      })),
      success: true,
    });
  } catch (error) {
    console.warn('Flag quiz highscore DB unavailable, returning empty list for local fallback:', error);
    return NextResponse.json({
      highscores: [],
      success: false,
      isOffline: true,
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, score, totalQuestions, percentage, continents, timeSpentSeconds } = body;

    const cleanName = (typeof name === 'string' && name.trim().length > 0)
      ? name.trim().substring(0, 30)
      : 'Anonym';

    const safeScore = Math.max(0, parseInt(score, 10) || 0);
    const safeTotal = Math.max(1, parseInt(totalQuestions, 10) || 10);
    const safePercentage = Math.round((safeScore / safeTotal) * 100);
    const safeContinents = Array.isArray(continents) && continents.length > 0 ? continents : ['alle'];
    const safeTime = Math.max(0, parseInt(timeSpentSeconds, 10) || 0);

    const newEntry = {
      name: cleanName,
      score: safeScore,
      totalQuestions: safeTotal,
      percentage: safePercentage,
      continents: safeContinents,
      timeSpentSeconds: safeTime,
      createdAt: new Date().toISOString(),
    };

    const db = await getDatabase();
    const result = await db.collection('flagquiz_highscores').insertOne(newEntry);

    return NextResponse.json({
      entry: {
        id: result.insertedId.toString(),
        ...newEntry,
      },
      success: true,
    });
  } catch (error) {
    console.warn('Flag quiz highscore DB save failed, fallback will handle client-side:', error);
    return NextResponse.json({
      success: false,
      isOffline: true,
      message: 'Saved locally',
    });
  }
}
