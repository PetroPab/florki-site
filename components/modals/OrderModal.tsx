'use client';

import { useEffect, useRef } from 'react';
import { X, Send, MessageCircle, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTelegramOrderLink, getWhatsAppOrderLink } from '@/lib/order-links';
import { siteConfig } from '@/data/site';

type OrderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  productSlug?: string;
};

export default function OrderModal({
  isOpen,
  onClose,
  productName,
  productSlug,
}: OrderModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const ctx = productName ? { productName, productSlug } : undefined;

  const channels = [
    {
      id: 'telegram',
      label: 'Telegram',
      description: 'Ответим за 15 минут в рабочее время',
      icon: Send,
      href: getTelegramOrderLink(ctx),
      primary: true,
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      description: 'Переписка или голосовой звонок',
      icon: MessageCircle,
      href: getWhatsAppOrderLink(ctx),
      primary: false,
    },
    {
      id: 'phone',
      label: 'Позвонить',
      description: siteConfig.contacts.phone,
      icon: Phone,
      href: `tel:${siteConfig.contacts.phone.replace(/\D/g, '')}`,
      primary: false,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Выбор способа связи"
          className="fixed inset-0 z-modal flex items-end sm:items-center justify-center p-4"
        >
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{
              duration: 0.25,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            className="relative w-full max-w-sm bg-bg-elevated rounded-2xl shadow-xl p-6"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full text-text-muted hover:bg-surface-1 hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Закрыть"
            >
              <X size={18} strokeWidth={1.5} />
            </button>

            <h2 className="font-display text-h3 text-text-primary mb-1">
              Как связаться?
            </h2>
            {productName && (
              <p className="text-sm text-text-muted mb-5">
                Заказать:{' '}
                <span className="text-text-secondary font-medium">
                  «{productName}»
                </span>
              </p>
            )}
            {!productName && (
              <p className="text-sm text-text-muted mb-5">
                Выберите удобный способ
              </p>
            )}

            <div className="flex flex-col gap-2">
              {channels.map(
                ({ id, label, description, icon: Icon, href, primary }) => (
                  <a
                    key={id}
                    href={href}
                    target={id !== 'phone' ? '_blank' : undefined}
                    rel={id !== 'phone' ? 'noopener noreferrer' : undefined}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      primary
                        ? 'bg-accent text-white border-accent hover:bg-accent-hover'
                        : 'bg-bg border-border text-text-primary hover:bg-surface-1'
                    }`}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="shrink-0"
                    />
                    <div>
                      <div className="font-medium text-sm">{label}</div>
                      <div
                        className={`text-xs mt-0.5 ${primary ? 'text-white/70' : 'text-text-muted'}`}
                      >
                        {description}
                      </div>
                    </div>
                  </a>
                )
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
