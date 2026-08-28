import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const lang = searchParams.get('lang') || 'de';
    const parentId = searchParams.get('parent_id');

    const db = await getDatabase();

    if (slug) {
      const page = await db.collection('pages').findOne({ slug });
      if (!page) {
        return NextResponse.json({ success: false, error: 'Page not found' }, { status: 404 });
      }

      // Parse H5P shortcodes: [h5p id="123"]
      const h5pIds = (page.content?.match(/\[h5p id="(\d+)"\]/g) || []).map((m: string) => {
        const match = m.match(/\d+/);
        return match ? parseInt(match[0], 10) : null;
      }).filter(Boolean);

      // Find matching H5P contents from MongoDB
      let h5pList: any[] = [];
      let matchingFolder = '';

      if (h5pIds.length > 0) {
        h5pList = await db.collection('h5p_contents').find({ id: { $in: h5pIds } }).toArray();
        if (h5pList.length > 0 && h5pList[0].slug) {
          matchingFolder = h5pList[0].slug;
        }
      }

      // Fallback lookup by slug in h5p_contents
      if (!matchingFolder && slug) {
        const h5pRecord = await db.collection('h5p_contents').findOne({ slug });
        if (h5pRecord && h5pRecord.slug) {
          matchingFolder = h5pRecord.slug;
        }
      }

      return NextResponse.json({ 
        success: true, 
        page,
        h5p_ids: h5pIds,
        h5p_modules: h5pList,
        h5p_folder: matchingFolder
      });
    }

    const query: any = {};
    if (parentId !== null && parentId !== undefined) {
      query.parent_id = parseInt(parentId, 10);
    }
    if (lang) {
      query.lang = lang;
    }

    const pages = await db.collection('pages').find(query).sort({ menu_order: 1, post_id: 1 }).toArray();
    return NextResponse.json({ success: true, count: pages.length, pages });
  } catch (error: any) {
    console.error('API /api/pages error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
