'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewCard from '@/components/blocks/ReviewCard';
import type { Review, ReviewSource } from '@/types/review';

type FilterId = 'all' | ReviewSource;

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'yandex', label: 'Яндекс' },
  { id: 'avito', label: 'Авито' },
  { id: '2gis', label: '2ГИС' },
  { id: 'telegram', label: 'Telegram' },
  { id: 'vk', label: 'ВКонтакте' },
];

type Props = { reviews: Review[] };

export default function ReviewsPageClient({ reviews }: Props) {
  const [active, setActive] = useState<FilterId>('all');

  const availableSources = new Set(reviews.map((r) => r.source));
  const visibleFilters = FILTERS.filter(
    (f) => f.id === 'all' || availableSources.has(f.id as ReviewSource)
  );

  const filtered =
    active === 'all' ? reviews : reviews.filter((r) => r.source === active);

  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

  return (
    <div className="mt-8 md:mt-10">
      {/* Filter tabs */}
      <div
        className="flex flex-wrap gap-2 mb-8 md:mb-10"
        role="group"
        aria-label="Фильтр по площадкам"
      >
        {visibleFilters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActive(f.id)}
            className={`h-9 px-4 rounded-full text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
              active === f.id
                ? 'bg-accent text-white shadow-sm'
                : 'bg-surface-1 text-text-secondary border border-border hover:bg-surface-2'
            }`}
            aria-pressed={active === f.id}
          >
            {f.label}
            {f.id !== 'all' && (
              <span
                className={`ml-1.5 text-xs ${active === f.id ? 'text-white/70' : 'text-text-muted'}`}
              >
                {reviews.filter((r) => r.source === f.id).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        key={active}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease, delay: i * 0.04 }}
            >
              <ReviewCard
                source={review.source as ReviewSource}
                author={review.author}
                rating={review.rating as 1 | 2 | 3 | 4 | 5 | undefined}
                date={review.date}
                text={review.text}
                originalUrl={review.originalUrl}
                photos={review.photos}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-text-muted text-center py-16">
          Отзывов с этой площадки пока нет.
        </p>
      )}
    </div>
  );
}
