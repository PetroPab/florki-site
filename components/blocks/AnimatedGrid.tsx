'use client';

import { Children, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

type AnimatedGridProps = {
  children: ReactNode[];
  className?: string;
};

export default function AnimatedGrid({
  children,
  className,
}: AnimatedGridProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const els = container.querySelectorAll<HTMLElement>('[data-reveal]');

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
      { rootMargin: '-60px 0px' }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {Children.toArray(children).map((child, i) => (
        <div
          key={(child as { key?: string | null }).key ?? i}
          data-reveal
          style={
            { '--reveal-delay': `${(i % 3) * 80}ms` } as React.CSSProperties
          }
        >
          {child}
        </div>
      ))}
    </div>
  );
}
