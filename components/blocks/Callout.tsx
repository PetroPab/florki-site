import type { ReactNode } from 'react';
import { Info, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

type CalloutProps = {
  type: 'info' | 'tip' | 'warning';
  children: ReactNode;
};

const config = {
  info: {
    icon: Info,
    className: 'bg-blue-50 border-blue-200 text-blue-900',
    iconClass: 'text-blue-500',
  },
  tip: {
    icon: Lightbulb,
    className: 'bg-accent-soft border-accent/30 text-text-primary',
    iconClass: 'text-accent',
  },
  warning: {
    icon: AlertTriangle,
    className: 'bg-warm-soft border-warm/30 text-text-primary',
    iconClass: 'text-warm',
  },
};

export default function Callout({ type, children }: CalloutProps) {
  const { icon: Icon, className, iconClass } = config[type];
  return (
    <div
      className={cn('flex gap-3 rounded-xl border p-4', className)}
      role="note"
    >
      <Icon
        size={20}
        strokeWidth={1.5}
        className={cn('mt-0.5 shrink-0', iconClass)}
        aria-hidden="true"
      />
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
