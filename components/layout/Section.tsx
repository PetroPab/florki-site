import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import Container from '@/components/ui/Container';

type SectionSpacing = 'sm' | 'md' | 'lg';
type SectionBackground = 'default' | 'muted' | 'accent';

type SectionProps = {
  spacing?: SectionSpacing;
  background?: SectionBackground;
  containerSize?: 'narrow' | 'default' | 'wide';
  className?: string;
  children: ReactNode;
};

const spacingClasses: Record<SectionSpacing, string> = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-20 lg:py-24',
  lg: 'py-20 md:py-24 lg:py-32',
};

const backgroundClasses: Record<SectionBackground, string> = {
  default: 'glass-section',
  muted: 'glass-section-dense',
  accent: 'bg-accent-soft',
};

export default function Section({
  spacing = 'md',
  background = 'default',
  containerSize = 'default',
  className,
  children,
}: SectionProps) {
  return (
    <section
      className={cn(
        spacingClasses[spacing],
        backgroundClasses[background],
        className
      )}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}
