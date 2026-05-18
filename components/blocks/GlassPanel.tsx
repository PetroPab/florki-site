import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type GlassPanelProps = {
  blur?: 'sm' | 'md' | 'lg';
  className?: string;
  children: ReactNode;
};

const blurClasses = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
};

export default function GlassPanel({
  blur = 'md',
  className,
  children,
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        'glass rounded-2xl border border-white/20 bg-white/60 shadow-lg',
        blurClasses[blur],
        className
      )}
    >
      {children}
    </div>
  );
}
