'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/data/site';
import { cn } from '@/lib/utils';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-overlay bg-text-primary/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.nav
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Навигация"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 z-modal h-full w-80 max-w-[85vw] bg-bg shadow-xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <Link
                href="/"
                className="font-display text-h3 text-text-primary"
                onClick={onClose}
              >
                Флорки
              </Link>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-11 h-11 rounded-full hover:bg-surface-1 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Закрыть меню"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <ul className="flex flex-col gap-1 px-4 py-6 flex-1">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center px-4 py-3 rounded-lg font-display text-h4 transition-colors duration-150',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                      pathname === item.href ||
                        pathname.startsWith(item.href + '/')
                        ? 'text-accent bg-accent-soft'
                        : 'text-text-primary hover:bg-surface-1'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="px-6 pb-8">
              <a
                href={siteConfig.contacts.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full h-12 rounded-full bg-accent text-white font-medium text-base hover:bg-accent-hover transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <MessageCircle size={18} strokeWidth={1.5} aria-hidden="true" />
                Написать в Telegram
              </a>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
