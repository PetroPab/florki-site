import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { ArticleEditor } from '../ArticleEditor';

export default function NewArticlePage() {
  return (
    <div className="p-8">
      <Link
        href="/admin/articles"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6 transition"
      >
        <ChevronLeft size={16} />
        Назад к статьям
      </Link>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Новая статья</h1>
      <ArticleEditor isNew />
    </div>
  );
}
