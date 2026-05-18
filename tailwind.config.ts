import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      /* ─── Цвета (через CSS-переменные, поддержка opacity) ─── */
      colors: {
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        'bg-elevated': 'rgb(var(--color-bg-elevated) / <alpha-value>)',
        'surface-1': 'rgb(var(--color-surface-1) / <alpha-value>)',
        'surface-2': 'rgb(var(--color-surface-2) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        'border-strong': 'rgb(var(--color-border-strong) / <alpha-value>)',
        'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
        'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'accent-hover': 'rgb(var(--color-accent-hover) / <alpha-value>)',
        'accent-soft': 'rgb(var(--color-accent-soft) / <alpha-value>)',
        warm: 'rgb(var(--color-warm) / <alpha-value>)',
        'warm-soft': 'rgb(var(--color-warm-soft) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        error: 'rgb(var(--color-error) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
      },

      /* ─── Шрифты ─── */
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },

      /* ─── Type scale (clamp для адаптива) ─── */
      fontSize: {
        'display-1': [
          'clamp(3rem, 5vw + 1rem, 5.5rem)',
          { lineHeight: '1.05', letterSpacing: '-0.02em' },
        ],
        'display-2': [
          'clamp(2.5rem, 4vw + 1rem, 4rem)',
          { lineHeight: '1.05', letterSpacing: '-0.02em' },
        ],
        h1: [
          'clamp(2rem, 3vw + 0.5rem, 3rem)',
          { lineHeight: '1.15', letterSpacing: '-0.015em' },
        ],
        h2: [
          'clamp(1.625rem, 2vw + 0.5rem, 2.25rem)',
          { lineHeight: '1.15', letterSpacing: '-0.015em' },
        ],
        h3: [
          'clamp(1.375rem, 1.5vw + 0.5rem, 1.75rem)',
          { lineHeight: '1.25', letterSpacing: '-0.005em' },
        ],
        h4: ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.005em' }],
        lg: ['1.125rem', { lineHeight: '1.6' }],
        base: ['1rem', { lineHeight: '1.7' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        xs: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
      },

      /* ─── Spacing (базис 4px) ─── */
      spacing: {
        '0.5': '0.125rem',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
        '11': '2.75rem',
        '12': '3rem',
        '14': '3.5rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '28': '7rem',
        '32': '8rem',
        '36': '9rem',
        '40': '10rem',
        '44': '11rem',
        '48': '12rem',
        '56': '14rem',
        '64': '16rem',
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
      },

      /* ─── Border radius ─── */
      borderRadius: {
        none: '0',
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        full: '9999px',
      },

      /* ─── Тени ─── */
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        glass: 'var(--shadow-glass)',
        none: 'none',
      },

      /* ─── Z-index ─── */
      zIndex: {
        base: '0',
        dropdown: '100',
        sticky: '200',
        fixed: '300',
        overlay: '400',
        modal: '500',
        popover: '600',
        toast: '700',
        tooltip: '800',
      },

      /* ─── Анимация ─── */
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
      },

      /* ─── Контейнер ─── */
      maxWidth: {
        container: '1280px',
        'container-wide': '1440px',
        'container-narrow': '720px',
      },

      /* ─── Prose (статьи) ─── */
      typography: {
        florki: {
          css: {
            '--tw-prose-body': 'rgb(92 95 82)',
            '--tw-prose-headings': 'rgb(31 36 25)',
            '--tw-prose-links': 'rgb(63 93 58)',
            '--tw-prose-bold': 'rgb(31 36 25)',
            '--tw-prose-counters': 'rgb(138 140 127)',
            '--tw-prose-bullets': 'rgb(63 93 58)',
            '--tw-prose-hr': 'rgb(224 217 204)',
            '--tw-prose-quotes': 'rgb(92 95 82)',
            '--tw-prose-quote-borders': 'rgb(63 93 58)',
            '--tw-prose-captions': 'rgb(138 140 127)',
            '--tw-prose-code': 'rgb(31 36 25)',
            '--tw-prose-pre-code': 'rgb(31 36 25)',
            '--tw-prose-pre-bg': 'rgb(243 239 233)',
            '--tw-prose-th-borders': 'rgb(224 217 204)',
            '--tw-prose-td-borders': 'rgb(224 217 204)',
            maxWidth: 'none',
            h1: { fontFamily: 'var(--font-display), Georgia, serif' },
            h2: { fontFamily: 'var(--font-display), Georgia, serif' },
            h3: { fontFamily: 'var(--font-display), Georgia, serif' },
            h4: { fontFamily: 'var(--font-display), Georgia, serif' },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              backgroundColor: 'rgb(243 239 233)',
              borderRadius: '0.25rem',
              paddingLeft: '0.3em',
              paddingRight: '0.3em',
              paddingTop: '0.1em',
              paddingBottom: '0.1em',
              fontWeight: '400',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
