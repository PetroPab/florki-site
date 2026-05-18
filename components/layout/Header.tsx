'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { cn } from '@/lib/utils';
import MobileMenu from './MobileMenu';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-sticky transition-all duration-300',
          scrolled
            ? 'glass border-b border-white/40 shadow-glass'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto w-full max-w-container px-5 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link
              href="/"
              className="font-display text-h3 text-text-primary transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              aria-label="Флорки — на главную"
            >
              Флорки
            </Link>

            <nav
              aria-label="Основная навигация"
              className="hidden md:flex items-center gap-1"
            >
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                    pathname === item.href ||
                      pathname.startsWith(item.href + '/')
                      ? 'text-accent bg-accent-soft'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-1'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={siteConfig.contacts.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'btn-shimmer btn-pulse-sm',
                  'hidden md:inline-flex items-center gap-2',
                  'h-10 px-5 rounded-full text-sm font-medium',
                  'bg-accent text-white',
                  'hover:bg-accent-hover hover:-translate-y-0.5',
                  'transition-all duration-200',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg'
                )}
                aria-label="Написать в Telegram"
              >
                <MessageCircle size={16} strokeWidth={1.5} aria-hidden="true" />
                Написать
              </a>

              <button
                onClick={() => setMenuOpen(true)}
                className={cn(
                  'flex md:hidden items-center justify-center w-11 h-11 rounded-full',
                  'hover:bg-surface-1 transition-colors duration-150',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'
                )}
                aria-label="Открыть меню"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={closeMenu} />
    </>
  );
}
