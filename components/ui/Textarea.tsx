'use client';

import type { TextareaHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type TextareaProps = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  required?: boolean;
  rows?: number;
  className?: string;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name' | 'rows'>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { label, name, error, hint, required, rows = 4, className, ...props },
    ref
  ) {
    const id = `textarea-${name}`;
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
        <textarea
          ref={ref}
          id={id}
          name={name}
          required={required}
          rows={rows}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={
            [errorId, hintId].filter(Boolean).join(' ') || undefined
          }
          className={cn(
            'w-full rounded-lg px-4 py-3',
            'bg-bg-elevated border text-text-primary text-base',
            'placeholder:text-text-muted',
            'resize-y min-h-[120px]',
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
          <p
            id={errorId}
            role="alert"
            className="text-xs text-error font-medium"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

export default Textarea;
