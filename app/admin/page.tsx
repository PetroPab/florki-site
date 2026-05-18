import Link from 'next/link';
import { Leaf, Images, BookOpen, ArrowRight } from 'lucide-react';

import { readDataFile, listArticleSlugs } from '@/lib/admin-content';
import type { Product } from '@/types/product';
import type { GalleryItem } from '@/types/gallery';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [products, gallery, articleSlugs] = await Promise.all([
    readDataFile<Product[]>('products.json'),
    readDataFile<GalleryItem[]>('gallery.json'),
    listArticleSlugs(),
  ]);

  const inStock = products.filter((p) => p.status === 'in-stock').length;

  const stats = [
    {
      label: 'Товаров в каталоге',
      value: products.length,
      sub: `${inStock} в наличии`,
      href: '/admin/catalog',
      icon: Leaf,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      label: 'Работ в галерее',
      value: gallery.length,
      sub: 'фотографий',
      href: '/admin/gallery',
      icon: Images,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      label: 'Статей в блоге',
      value: articleSlugs.length,
      sub: 'в разделе Полезное',
      href: '/admin/articles',
      icon: BookOpen,
      color: 'text-orange-600 bg-orange-50',
    },
  ];

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Дашборд</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(({ label, value, sub, href, icon: Icon, color }) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-sm transition group"
          >
            <div className={`inline-flex p-2.5 rounded-xl mb-3 ${color}`}>
              <Icon size={18} />
            </div>
            <div className="text-3xl font-bold text-gray-900 tabular-nums">
              {value}
            </div>
            <div className="text-sm font-medium text-gray-700 mt-0.5">
              {label}
            </div>
            <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
            <div className="flex items-center gap-1 text-xs text-accent mt-3 opacity-0 group-hover:opacity-100 transition">
              Открыть <ArrowRight size={12} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
