import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  loading?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-white hover:bg-accent-hover shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
  secondary:
    'bg-bg-elevated text-text-primary border border-border hover:bg-surface-1 hover:-translate-y-0.5 active:translate-y-0',
  ghost:
    'bg-transparent text-text-secondary hover:bg-surface-1 hover:text-text-primary active:scale-[0.98]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm gap-1.5',
  md: 'h-11 px-6 text-base gap-2',
  lg: 'h-14 px-8 text-lg gap-2.5',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  loading = false,
  icon: Icon,
  iconPosition = 'right',
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const classes = cn(
    'inline-flex items-center justify-center font-medium rounded-full',
    'transition-all duration-200 ease-out',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    className
  );

  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 20 : 18;

  const content = (
    <>
      {loading && (
        <Loader2
          size={iconSize}
          strokeWidth={1.5}
          className="animate-spin"
          aria-hidden="true"
        />
      )}
      {!loading && Icon && iconPosition === 'left' && (
        <Icon size={iconSize} strokeWidth={1.5} aria-hidden="true" />
      )}
      {children}
      {!loading && Icon && iconPosition === 'right' && (
        <Icon size={iconSize} strokeWidth={1.5} aria-hidden="true" />
      )}
    </>
  );

  if (href && !isDisabled) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button {...props} disabled={isDisabled} className={classes}>
      {content}
    </button>
  );
}
