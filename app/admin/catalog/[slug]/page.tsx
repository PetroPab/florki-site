import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

import { readDataFile } from '@/lib/admin-content';
import type { Product } from '@/types/product';
import { ProductForm } from '../ProductForm';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string }> };

export default async function EditProductPage({ params }: Props) {
  const { slug } = await params;
  const products = await readDataFile<Product[]>('products.json');
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

  return (
    <div className="p-8">
      <Link
        href="/admin/catalog"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6 transition"
      >
        <ChevronLeft size={16} />
        Назад к каталогу
      </Link>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">
        Редактировать: {product.name}
      </h1>
      <ProductForm initial={product} />
    </div>
  );
}
