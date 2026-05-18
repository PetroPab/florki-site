import { NextRequest, NextResponse } from 'next/server';

import { readDataFile, writeDataFile } from '@/lib/admin-content';
import type { GalleryItem } from '@/types/gallery';

export async function GET() {
  const items = await readDataFile<GalleryItem[]>('gallery.json');
  return NextResponse.json(items);
}

export async function PUT(req: NextRequest) {
  try {
    const body = (await req.json()) as { items: GalleryItem[] };
    await writeDataFile('gallery.json', body.items);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
