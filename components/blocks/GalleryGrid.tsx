'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { formatDate } from '@/lib/format';
import Lightbox from '@/components/blocks/Lightbox';
import type { GalleryItem } from '@/types/gallery';

type GalleryGridProps = {
  items: GalleryItem[];
};

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const els = grid.querySelectorAll<HTMLElement>('[data-reveal]');

    if (prefersReduced) {
      els.forEach((el) => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '-40px 0px' }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const lightboxItems = items.map((item) => ({
    src: item.src,
    alt: item.alt,
    caption: item.caption,
  }));

  function handlePrev() {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + items.length) % items.length
    );
  }

  function handleNext() {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % items.length));
  }

  return (
    <>
      <div
        ref={gridRef}
        className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5"
      >
        {items.map((item, i) => (
          <div
            key={item.id}
            data-reveal
            style={
              { '--reveal-delay': `${(i % 3) * 60}ms` } as React.CSSProperties
            }
            className="break-inside-avoid mb-4 md:mb-5"
          >
            <button
              onClick={() => setLightboxIndex(i)}
              className="group relative block w-full rounded-2xl overflow-hidden bg-surface-1 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              aria-label={`Открыть фото: ${item.caption ?? item.alt}`}
            >
              <div
                className="relative w-full"
                style={{
                  paddingBottom: `${(item.height / item.width) * 100}%`,
                }}
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
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
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
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={lightboxItems}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </>
  );
}
