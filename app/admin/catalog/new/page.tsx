import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { ProductForm } from '../ProductForm';

export default function NewProductPage() {
  return (
    <div className="p-8">
      <Link
        href="/admin/catalog"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6 transition"
      >
        <ChevronLeft size={16} />
        Назад к каталогу
      </Link>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Новый товар</h1>
      <ProductForm isNew />
    </div>
  );
}
