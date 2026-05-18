import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import matter from 'gray-matter';

import { readArticleFile, listArticleSlugs } from '@/lib/admin-content';
import type { ArticleFrontmatter } from '@/types/article';
import { ArticleEditor } from '../ArticleEditor';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string }> };

export default async function EditArticlePage({ params }: Props) {
  const { slug } = await params;
  const slugs = await listArticleSlugs();
  if (!slugs.includes(slug)) notFound();

  const raw = await readArticleFile(slug);
  const { data, content } = matter(raw);

  return (
    <div className="p-8">
      <Link
        href="/admin/articles"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6 transition"
      >
        <ChevronLeft size={16} />
        Назад к статьям
      </Link>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">
        Редактировать: {(data as ArticleFrontmatter).title}
      </h1>
      <ArticleEditor
        initialSlug={slug}
        initialFrontmatter={data as ArticleFrontmatter}
        initialContent={content.trim()}
      />
    </div>
  );
}
