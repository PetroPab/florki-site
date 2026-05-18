import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'in-stock' | 'on-order' | 'neutral';

type BadgeProps = {
  variant: BadgeVariant;
  className?: string;
  children: ReactNode;
};

const variantClasses: Record<BadgeVariant, string> = {
  'in-stock': 'bg-white/80 text-accent backdrop-blur-sm border border-white/60',
  'on-order':
    'bg-white/80 text-text-secondary backdrop-blur-sm border border-white/60',
  neutral: 'bg-surface-2 text-text-muted',
};

export default function Badge({ variant, className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center h-5 px-2',
        'rounded-full text-xs font-medium',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
