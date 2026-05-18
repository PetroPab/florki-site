import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';
type HeadingSize = 'display' | 'h1' | 'h2' | 'h3' | 'h4';

type HeadingProps = {
  as: HeadingLevel;
  size?: HeadingSize;
  className?: string;
  children: ReactNode;
};

const sizeClasses: Record<HeadingSize, string> = {
  display: 'text-display-1 leading-[1.05] tracking-[-0.02em]',
  h1: 'text-display-2 leading-[1.05] tracking-[-0.02em]',
  h2: 'text-h2 leading-[1.15] tracking-[-0.015em]',
  h3: 'text-h3 leading-[1.25] tracking-[-0.005em]',
  h4: 'text-h4 leading-[1.3] tracking-[-0.005em]',
};

export default function Heading({
  as: Tag,
  size,
  className,
  children,
}: HeadingProps) {
  const resolvedSize: HeadingSize = size ?? (Tag as HeadingSize);

  return (
    <Tag
      className={cn(
        'font-display text-text-primary',
        sizeClasses[resolvedSize],
        className
      )}
    >
      {children}
    </Tag>
  );
}
