import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'glass' | 'elevated';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

type CardProps = {
  variant?: CardVariant;
  padding?: CardPadding;
  hover?: boolean;
  className?: string;
  children: ReactNode;
};

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-bg-elevated border border-border shadow-md',
  glass: 'glass',
  elevated: 'bg-bg-elevated shadow-lg',
};

const paddingClasses: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6 md:p-7',
  lg: 'p-8 md:p-10',
};

export default function Card({
  variant = 'default',
  padding = 'md',
  hover = false,
  className,
  children,
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl overflow-hidden',
        variantClasses[variant],
        paddingClasses[padding],
        hover &&
          'transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}
