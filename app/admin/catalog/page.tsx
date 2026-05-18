import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';

import { readDataFile } from '@/lib/admin-content';
import { formatPrice } from '@/lib/format';
import type { Product } from '@/types/product';
import { DeleteProductButton } from './DeleteProductButton';

export const dynamic = 'force-dynamic';

const CATEGORY_LABELS: Record<string, string> = {
  florarium: 'Флорариум',
  composition: 'Композиция',
  gift: 'Подарок',
  custom: 'На заказ',
};

const STATUS_LABELS: Record<string, string> = {
  'in-stock': 'В наличии',
  'on-order': 'Под заказ',
};

export default async function CatalogPage() {
  const products = await readDataFile<Product[]>('products.json');

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">
          Каталог
          <span className="ml-2 text-sm font-normal text-gray-400">
            {products.length} товаров
          </span>
        </h1>
        <Link
          href="/admin/catalog/new"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition"
        >
          <Plus size={16} />
          Добавить товар
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-5 py-3 font-medium text-gray-500">
                Название
              </th>
              <th className="text-left px-5 py-3 font-medium text-gray-500 hidden sm:table-cell">
                Категория
              </th>
              <th className="text-left px-5 py-3 font-medium text-gray-500 hidden md:table-cell">
                Статус
              </th>
              <th className="text-right px-5 py-3 font-medium text-gray-500">
                Цена
              </th>
              <th className="px-5 py-3 w-20" />
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.slug}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
              >
                <td className="px-5 py-3.5">
                  <div className="font-medium text-gray-900">{p.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{p.slug}</div>
                </td>
                <td className="px-5 py-3.5 hidden sm:table-cell text-gray-600">
                  {CATEGORY_LABELS[p.category] ?? p.category}
                </td>
                <td className="px-5 py-3.5 hidden md:table-cell">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      p.status === 'in-stock'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {STATUS_LABELS[p.status]}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right tabular-nums text-gray-700">
                  {formatPrice(p.price, p.priceNote)}
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/catalog/${p.slug}`}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-accent hover:bg-accent/10 transition"
                      title="Редактировать"
                    >
                      <Pencil size={15} />
                    </Link>
                    <DeleteProductButton slug={p.slug} name={p.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">
            Товары ещё не добавлены
          </div>
        )}
      </div>
    </div>
  );
}
