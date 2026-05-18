'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/format';
import type { ReviewSource } from '@/types/review';

type ReviewCardProps = {
  source: ReviewSource;
  author: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  date: string;
  text: string;
  originalUrl?: string;
  photos?: { src: string; alt: string }[];
  workPhoto?: { src: string; alt: string };
};

const SOURCE_LABELS: Record<ReviewSource, string> = {
  yandex: 'Яндекс',
  avito: 'Авито',
  '2gis': '2ГИС',
  telegram: 'Telegram',
  vk: 'ВКонтакте',
};

const TRUNCATE_LENGTH = 220;

export default function ReviewCard({
  source,
  author,
  rating,
  date,
  text,
  originalUrl,
  photos,
  workPhoto,
}: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > TRUNCATE_LENGTH;
  const displayText =
    isLong && !expanded ? text.slice(0, TRUNCATE_LENGTH).trimEnd() + '…' : text;

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden border border-white/20 shadow-sm h-full">
      {workPhoto && (
        <div className="relative aspect-[4/3] w-full bg-surface-1 shrink-0">
          <Image
            src={workPhoto.src}
            alt={workPhoto.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="glass flex flex-col gap-3 bg-white/70 p-5 backdrop-blur-md flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-[0.06em]">
              {SOURCE_LABELS[source]}
            </span>
            {rating && (
              <div
                className="flex items-center gap-0.5"
                aria-label={`Оценка ${rating} из 5`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={cn(
                      i < rating
                        ? 'fill-warm text-warm'
                        : 'fill-border text-border'
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
            )}
          </div>
          <time dateTime={date} className="text-xs text-text-muted shrink-0">
            {formatDate(date)}
          </time>
        </div>

        <p className="font-medium text-text-primary text-sm">{author}</p>

        <div className="text-sm text-text-secondary leading-relaxed">
          <p>{displayText}</p>
          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1 text-accent hover:underline text-sm font-medium focus:outline-none focus-visible:underline"
            >
              {expanded ? 'Свернуть' : 'Показать полностью'}
            </button>
          )}
        </div>

        {/* Small photos from client */}
        {photos && photos.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {photos.map((photo, i) => (
              <div
                key={i}
                className="relative w-16 h-16 rounded-lg overflow-hidden bg-surface-1 shrink-0"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            ))}
          </div>
        )}

        {originalUrl && (
          <a
            href={originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto flex items-center gap-1 text-xs text-text-muted hover:text-accent transition-colors"
          >
            <ExternalLink size={12} aria-hidden="true" />
            Открыть оригинал
          </a>
        )}
      </div>
    </div>
  );
}
