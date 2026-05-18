import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ContainerSize = 'narrow' | 'default' | 'wide';

type ContainerProps = {
  size?: ContainerSize;
  className?: string;
  children: ReactNode;
};

const sizeClasses: Record<ContainerSize, string> = {
  narrow: 'max-w-container-narrow',
  default: 'max-w-container',
  wide: 'max-w-container-wide',
};

export default function Container({
  size = 'default',
  className,
  children,
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-5 md:px-8 lg:px-12',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
}
