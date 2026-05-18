import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get('file') as File | null;
  const folder = (form.get('folder') as string | null) ?? 'uploads';

  if (!file) {
    return NextResponse.json({ error: 'Файл не передан' }, { status: 400 });
  }

  const ext = file.name.split('.').pop() ?? 'jpg';
  const name = `${Date.now()}.${ext}`;

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'BLOB_READ_WRITE_TOKEN не задан в .env.local' },
      { status: 500 }
    );
  }

  const blob = await put(`${folder}/${name}`, file, {
    access: 'public',
    contentType: file.type,
  });

  return NextResponse.json({ url: blob.url });
}
