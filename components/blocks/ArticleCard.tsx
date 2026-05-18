import Link from 'next/link';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { formatDate, formatReadTime } from '@/lib/format';
import type { ArticleTag } from '@/types/article';

const TAG_LABELS: Record<ArticleTag, string> = {
  uhod: 'Уход',
  osnovy: 'Основы',
  idei: 'Идеи',
  process: 'Процесс',
};

type ArticleCardProps = {
  slug: string;
  title: string;
  description: string;
  cover: string;
  coverAlt: string;
  date: string;
  readTime: number;
  tags: ArticleTag[];
};

export default function ArticleCard({
  slug,
  title,
  description,
  cover,
  coverAlt,
  date,
  readTime,
  tags,
}: ArticleCardProps) {
  return (
    <Link
      href={`/poleznoe/${slug}`}
      className="group block rounded-2xl bg-bg-elevated border border-border overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-1">
        <ImageWithFallback
          src={cover}
          alt={coverAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>

      <div className="p-5">
        <h3 className="font-display text-h4 text-text-primary leading-snug mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-text-muted leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <time dateTime={date}>{formatDate(date)}</time>
            <span aria-hidden="true">·</span>
            <span>{formatReadTime(readTime)}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full bg-accent-soft text-accent text-xs font-medium"
              >
                {TAG_LABELS[tag]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
