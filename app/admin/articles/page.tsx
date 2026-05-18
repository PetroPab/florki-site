import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';
import matter from 'gray-matter';

import { listArticleSlugs, readArticleFile } from '@/lib/admin-content';
import { formatDate } from '@/lib/format';
import type { ArticleFrontmatter } from '@/types/article';
import { DeleteArticleButton } from './DeleteArticleButton';

export const dynamic = 'force-dynamic';

export default async function ArticlesPage() {
  const slugs = await listArticleSlugs();
  const articles = await Promise.all(
    slugs.map(async (slug) => {
      const raw = await readArticleFile(slug);
      const { data } = matter(raw);
      return { slug, ...(data as ArticleFrontmatter) };
    })
  );

  const sorted = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">
          Статьи
          <span className="ml-2 text-sm font-normal text-gray-400">
            {articles.length} материалов
          </span>
        </h1>
        <Link
          href="/admin/articles/new"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition"
        >
          <Plus size={16} />
          Написать статью
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-5 py-3 font-medium text-gray-500">
                Заголовок
              </th>
              <th className="text-left px-5 py-3 font-medium text-gray-500 hidden md:table-cell">
                Дата
              </th>
              <th className="text-left px-5 py-3 font-medium text-gray-500 hidden sm:table-cell">
                Черновик
              </th>
              <th className="px-5 py-3 w-20" />
            </tr>
          </thead>
          <tbody>
            {sorted.map((a) => (
              <tr
                key={a.slug}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
              >
                <td className="px-5 py-3.5">
                  <div className="font-medium text-gray-900">{a.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{a.slug}</div>
                </td>
                <td className="px-5 py-3.5 hidden md:table-cell text-gray-500">
                  {formatDate(a.date)}
                </td>
                <td className="px-5 py-3.5 hidden sm:table-cell">
                  {a.draft ? (
                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs bg-amber-50 text-amber-700 font-medium">
                      Черновик
                    </span>
                  ) : (
                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs bg-emerald-50 text-emerald-700 font-medium">
                      Опубликовано
                    </span>
                  )}
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/articles/${a.slug}`}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-accent hover:bg-accent/10 transition"
                      title="Редактировать"
                    >
                      <Pencil size={15} />
                    </Link>
                    <DeleteArticleButton slug={a.slug} title={a.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {articles.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">
            Статьи ещё не написаны
          </div>
        )}
      </div>
    </div>
  );
}
