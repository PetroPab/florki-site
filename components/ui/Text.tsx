import type { ReactNode, ElementType } from 'react';
import { cn } from '@/lib/utils';

type TextSize = 'lg' | 'md' | 'sm' | 'xs';

type TextProps = {
  size?: TextSize;
  muted?: boolean;
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

const sizeClasses: Record<TextSize, string> = {
  lg: 'text-lg leading-[1.6]',
  md: 'text-base leading-[1.7]',
  sm: 'text-sm leading-[1.5]',
  xs: 'text-xs leading-[1.4]',
};

export default function Text({
  size = 'md',
  muted = false,
  as: Tag = 'p',
  className,
  children,
}: TextProps) {
  return (
    <Tag
      className={cn(
        'font-body',
        sizeClasses[size],
        muted ? 'text-text-muted' : 'text-text-secondary',
        className
      )}
    >
      {children}
    </Tag>
  );
}
