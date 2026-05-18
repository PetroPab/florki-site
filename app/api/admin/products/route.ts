import { NextRequest, NextResponse } from 'next/server';

import { readDataFile, writeDataFile } from '@/lib/admin-content';
import type { Product } from '@/types/product';

export async function GET() {
  const products = await readDataFile<Product[]>('products.json');
  return NextResponse.json(products);
}

export async function PUT(req: NextRequest) {
  try {
    const body = (await req.json()) as { products: Product[] };
    await writeDataFile('products.json', body.products);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
