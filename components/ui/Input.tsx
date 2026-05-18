'use client';

import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type InputProps = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  required?: boolean;
  type?: 'text' | 'email' | 'tel';
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'name'>;

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, name, error, hint, required, type = 'text', className, ...props },
  ref
) {
  const id = `input-${name}`;
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-medium text-text-primary">
        {label}
        {required && (
          <span className="ml-1 text-error" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={
          [errorId, hintId].filter(Boolean).join(' ') || undefined
        }
        className={cn(
          'h-12 w-full rounded-lg px-4',
          'bg-bg-elevated border text-text-primary text-base',
          'placeholder:text-text-muted',
          'transition-colors duration-150',
          error
            ? 'border-error focus:border-error focus-visible:ring-error'
            : 'border-border focus:border-accent focus-visible:ring-accent',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-0',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
        {...props}
      />
      {hint && !error && (
        <p id={hintId} className="text-xs text-text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-xs text-error font-medium">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
