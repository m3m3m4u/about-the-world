import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const typeFilter = searchParams.get('type') || '';
    const limit = parseInt(searchParams.get('limit') || '30', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const skip = (page - 1) * limit;

    const db = await getDatabase();
    
    // Build query
    const matchQuery: any = {};
    if (search) {
      matchQuery.$or = [
        { title: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } },
      ];
    }

    const totalCount = await db.collection('h5p_contents').countDocuments(matchQuery);

    const pipeline: any[] = [
      { $match: matchQuery },
      { $sort: { h5p_id: 1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: 'h5p_libraries',
          localField: 'library_id',
          foreignField: 'lib_id',
          as: 'libDetails',
        },
      },
      {
        $unwind: {
          path: '$libDetails',
          preserveNullAndEmptyArrays: true,
        },
      },
    ];

    const rawItems = await db.collection('h5p_contents').aggregate(pipeline).toArray();

    // Stats
    const totalLibs = await db.collection('h5p_libraries').countDocuments();
    const totalTree = await db.collection('learning_tree').countDocuments();

    return NextResponse.json({
      success: true,
      total: totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
      stats: {
        totalContents: totalCount,
        totalLibraries: totalLibs,
        totalTreeItems: totalTree,
      },
      items: rawItems.map((doc: any) => {
        const libName = doc.libDetails?.name || doc.library_name || 'H5P Content';
        const libTitle = doc.libDetails?.title || doc.library_title || 'Interaktives Lernmodul';
        const libVersion = doc.libDetails?.version || doc.library_version || '1.0';

        let type: 'CoursePresentation' | 'InteractiveVideo' | 'QuestionSet' | 'Flashcards' = 'CoursePresentation';
        if (libName.includes('Video')) type = 'InteractiveVideo';
        else if (libName.includes('Question') || libName.includes('Blanks') || libName.includes('Choice')) type = 'QuestionSet';
        else if (libName.includes('Dialogcards') || libName.includes('Flashcard')) type = 'Flashcards';
        else if (libName.includes('CoursePresentation') || libName.includes('Presentation')) type = 'CoursePresentation';

        return {
          id: `h5p-${doc.h5p_id}`,
          h5p_id: doc.h5p_id,
          slug: doc.slug,
          title: {
            de: doc.title,
            en: doc.title,
          },
          description: {
            de: `${libTitle} (${libName}) • Version ${libVersion}`,
            en: `${libTitle} (${libName}) • Version ${libVersion}`,
          },
          type,
          library_name: libName,
          library_title: libTitle,
          duration: '15 Min',
          status: 'not_started',
        };
      }),
    });
  } catch (error: any) {
    console.error('API /api/modules error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
