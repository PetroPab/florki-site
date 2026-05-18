import type { ReactNode } from 'react';
import NextLink from 'next/link';
import { cn } from '@/lib/utils';

type LinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  external?: boolean;
};

export default function Link({
  href,
  className,
  children,
  external,
}: LinkProps) {
  const isExternal =
    external ?? (href.startsWith('http') || href.startsWith('//'));

  const classes = cn(
    'text-accent underline-offset-4 transition-colors duration-150',
    'hover:text-accent-hover hover:underline',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm',
    className
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={classes}>
      {children}
    </NextLink>
  );
}
