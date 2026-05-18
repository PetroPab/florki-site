'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { formatDate } from '@/lib/format';
import Lightbox from '@/components/blocks/Lightbox';
import type { GalleryItem } from '@/types/gallery';

const INITIAL_ROWS = 4;
const LOAD_ROWS = 3;
const GAP = 8;

type Row = { items: GalleryItem[]; height: number };

function buildRows(
  items: GalleryItem[],
  containerWidth: number,
  targetHeight: number
): Row[] {
  const rows: Row[] = [];
  let rowItems: GalleryItem[] = [];
  let rowWidth = 0;

  for (const item of items) {
    const ar = item.width / item.height;
    const w = targetHeight * ar;
    const needed = rowWidth + (rowItems.length > 0 ? GAP : 0) + w;

    if (needed > containerWidth && rowItems.length > 0) {
      const totalAr = rowItems.reduce((s, it) => s + it.width / it.height, 0);
      const h = (containerWidth - GAP * (rowItems.length - 1)) / totalAr;
      rows.push({ items: rowItems, height: h });
      rowItems = [item];
      rowWidth = w;
    } else {
      rowItems.push(item);
      rowWidth = needed;
    }
  }

  if (rowItems.length > 0) {
    rows.push({ items: rowItems, height: targetHeight });
  }

  return rows;
}

function getTargetHeight() {
  return window.innerWidth < 640 ? 160 : window.innerWidth < 1024 ? 200 : 260;
}

type Props = { items: GalleryItem[] };

export default function GalleryGrid({ items }: Props) {
  // isClient: false на сервере и при первом клиентском рендере → совпадает с SSR
  const [isClient, setIsClient] = useState(false);
  const [allRows, setAllRows] = useState<Row[]>([]);
  const [visibleRowCount, setVisibleRowCount] = useState(INITIAL_ROWS);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const allRowsRef = useRef(allRows);
  const visibleRowCountRef = useRef(visibleRowCount);
  allRowsRef.current = allRows;
  visibleRowCountRef.current = visibleRowCount;

  const recalcRows = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const w = el.offsetWidth;
    const targetH = getTargetHeight();
    setAllRows(buildRows(items, w, targetH));
  }, [items]);

  // Первое монтирование — активируем клиентский рендер и считаем ряды
  useEffect(() => {
    setIsClient(true);
    recalcRows();
  }, [recalcRows]);

  // Пересчёт при ресайзе
  useEffect(() => {
    if (!isClient) return;
    const ro = new ResizeObserver(recalcRows);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [isClient, recalcRows]);

  // Infinite scroll — sentinel подгружает следующие LOAD_ROWS рядов
  useEffect(() => {
    if (!isClient) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          visibleRowCountRef.current < allRowsRef.current.length
        ) {
          setVisibleRowCount((c) =>
            Math.min(c + LOAD_ROWS, allRowsRef.current.length)
          );
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isClient]);

  // Reveal-анимация для новых рядов
  useEffect(() => {
    if (!isClient) return;
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const newRows = el.querySelectorAll<HTMLElement>(
      '[data-gallery-row]:not(.revealed)'
    );

    if (prefersReduced) {
      newRows.forEach((r) => r.classList.add('revealed'));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '-20px 0px' }
    );

    newRows.forEach((r) => revealObserver.observe(r));
    return () => revealObserver.disconnect();
  }, [isClient, visibleRowCount, allRows]);

  const visibleRows = allRows.slice(0, visibleRowCount);
  const hasMore = visibleRowCount < allRows.length;
  const visibleItems = visibleRows.flatMap((r) => r.items);
  const lightboxItems = visibleItems.map((item) => ({
    src: item.src,
    alt: item.alt,
    caption: item.caption,
  }));

  // ─── Скелетон: рендерится на сервере и при первом клиентском рендере ───
  if (!isClient) {
    return (
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-2">
        {items.slice(0, INITIAL_ROWS * 3).map((item) => (
          <div
            key={item.id}
            className="break-inside-avoid mb-2 rounded-xl bg-surface-2 animate-pulse"
            style={{ aspectRatio: `${item.width} / ${item.height}` }}
          />
        ))}
      </div>
    );
  }

  // ─── Justified grid: только на клиенте ───
  let flatIdx = 0;

  return (
    <>
      <div ref={containerRef} className="w-full">
        <div className="flex flex-col" style={{ gap: GAP }}>
          {visibleRows.map((row, ri) => {
            const rowStart = flatIdx;
            flatIdx += row.items.length;
            const h = Math.round(row.height);

            return (
              <div
                key={ri}
                data-gallery-row=""
                className="flex"
                style={{ gap: GAP, height: h }}
              >
                {row.items.map((item, ii) => {
                  const idx = rowStart + ii;
                  const ar = item.width / item.height;
                  const w = Math.round(h * ar);

                  return (
                    <button
                      key={item.id}
                      onClick={() => setLightboxIndex(idx)}
                      className="group relative overflow-hidden rounded-xl bg-surface-1 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 flex-shrink-0"
                      style={{ width: w, height: h }}
                      aria-label={`Открыть фото: ${item.caption ?? item.alt}`}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            '/images/placeholder.svg';
                        }}
                      />
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background:
                            'linear-gradient(to top, rgba(30,47,28,0.72) 0%, rgba(30,47,28,0.15) 45%, transparent 100%)',
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        {item.caption && (
                          <p className="text-white font-display text-sm font-medium leading-tight">
                            {item.caption}
                          </p>
                        )}
                        <p className="text-white/60 text-xs mt-0.5">
                          {formatDate(item.completedAt)}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div ref={sentinelRef} className="h-1 w-full" aria-hidden="true" />
      </div>

      {hasMore && (
        <div className="flex justify-center py-8" aria-hidden="true">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-accent/40 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          items={lightboxItems}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((i) =>
              i === null
                ? null
                : (i - 1 + visibleItems.length) % visibleItems.length
            )
          }
          onNext={() =>
            setLightboxIndex((i) =>
              i === null ? null : (i + 1) % visibleItems.length
            )
          }
        />
      )}
    </>
  );
}
