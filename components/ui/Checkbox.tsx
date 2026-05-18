'use client';

import type { ReactNode, InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type CheckboxProps = {
  label: ReactNode;
  name: string;
  error?: string;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'name'>;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, name, error, className, ...props },
  ref
) {
  const id = `checkbox-${name}`;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label
        htmlFor={id}
        className="flex items-start gap-3 cursor-pointer group"
      >
        <span className="relative mt-0.5 flex-shrink-0">
          <input
            ref={ref}
            id={id}
            name={name}
            type="checkbox"
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={errorId}
            className="peer sr-only"
            {...props}
          />
          <span
            className={cn(
              'flex items-center justify-center w-5 h-5 rounded border-2 transition-all duration-150',
              'border-border bg-bg-elevated',
              'peer-checked:bg-accent peer-checked:border-accent',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg',
              error && 'border-error'
            )}
            aria-hidden="true"
          >
            <Check
              size={12}
              strokeWidth={2.5}
              className="text-white opacity-0 peer-checked:opacity-100 transition-opacity"
            />
          </span>
        </span>
        <span className="text-sm text-text-secondary leading-relaxed">
          {label}
        </span>
      </label>
      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs text-error font-medium ml-8"
        >
          {error}
        </p>
      )}
    </div>
  );
});

export default Checkbox;
