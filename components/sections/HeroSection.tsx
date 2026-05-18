'use client';

import Image from 'next/image';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { siteConfig } from '@/data/site';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

  const fadeUp = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease },
      };

  const fadeUpDelayed = (delay: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease, delay },
        };

  return (
    <section
      className="relative overflow-hidden min-h-[90vh] md:min-h-screen flex items-center bg-bg pt-20"
      aria-label="Главный экран"
    >
      {/* Mesh gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(at 15% 25%, rgba(63, 93, 58, 0.10) 0px, transparent 55%),
            radial-gradient(at 85% 15%, rgba(198, 139, 95, 0.07) 0px, transparent 50%),
            radial-gradient(at 55% 85%, rgba(63, 93, 58, 0.05) 0px, transparent 50%)
          `,
        }}
        aria-hidden="true"
      />

      <Container>
        <div className="py-12 md:py-0 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[calc(90vh-5rem)] md:min-h-[calc(100vh-5rem)]">
          {/* Левая колонка: текст */}
          <div>
            <motion.div {...fadeUp} className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-soft border border-accent/20 text-xs font-semibold text-accent uppercase tracking-[0.08em]">
                Флорариумы в Ярославле
              </span>
            </motion.div>

            <motion.div {...fadeUpDelayed(0.1)}>
              <Heading as="h1" size="display" className="mb-5 md:mb-6">
                Живые экосистемы
                <br />
                <em className="display-em text-warm">под стеклом</em>
              </Heading>
            </motion.div>

            <motion.div {...fadeUpDelayed(0.2)} className="mb-8 md:mb-10">
              <Text size="lg" className="max-w-xl">
                Делаем флорариумы в&nbsp;Ярославле. Каждый&nbsp;— маленький мир
                из&nbsp;живых растений в&nbsp;стеклянном сосуде. Готовые работы
                и&nbsp;композиции под&nbsp;ваш&nbsp;интерьер.
              </Text>
            </motion.div>

            <motion.div
              {...fadeUpDelayed(0.3)}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
            >
              <Link
                href="/katalog"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-accent text-white font-medium text-base shadow-sm hover:shadow-md hover:bg-accent-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                Смотреть каталог
                <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
              </Link>

              <a
                href={siteConfig.contacts.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-bg-elevated text-text-primary font-medium text-base border border-border hover:bg-surface-1 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <MessageCircle size={18} strokeWidth={1.5} aria-hidden="true" />
                Создать под&nbsp;заказ
              </a>
            </motion.div>

            <motion.div
              {...fadeUpDelayed(0.45)}
              className="mt-12 md:mt-16 flex items-center gap-6"
            >
              <div className="text-center">
                <p className="font-display text-h2 text-text-primary tabular-nums">
                  2–3
                </p>
                <p className="text-xs text-text-muted uppercase tracking-[0.06em] font-medium mt-1">
                  года живут
                </p>
              </div>
              <div className="w-px h-10 bg-border" aria-hidden="true" />
              <div className="text-center">
                <p className="font-display text-h2 text-text-primary tabular-nums">
                  100+
                </p>
                <p className="text-xs text-text-muted uppercase tracking-[0.06em] font-medium mt-1">
                  работ создано
                </p>
              </div>
              <div className="w-px h-10 bg-border" aria-hidden="true" />
              <div className="text-center">
                <p className="font-display text-h2 text-text-primary tabular-nums">
                  5★
                </p>
                <p className="text-xs text-text-muted uppercase tracking-[0.06em] font-medium mt-1">
                  отзывы
                </p>
              </div>
            </motion.div>
          </div>

          {/* Правая колонка: изображение флорариума (только md+) */}
          <motion.div
            className="hidden md:flex justify-center items-center"
            initial={
              shouldReduceMotion ? undefined : { opacity: 0, scale: 0.92 }
            }
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease, delay: 0.25 }}
          >
            <div className="relative flex items-center justify-center w-full max-w-[480px] aspect-square">
              {/* Свечение — тёплый + зелёный слои */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle at 50% 65%, rgba(198, 139, 95, 0.35) 0%, rgba(63, 93, 58, 0.2) 45%, transparent 70%)',
                  filter: 'blur(48px)',
                }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-[20%] rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(63, 93, 58, 0.2) 0%, transparent 70%)',
                  filter: 'blur(24px)',
                }}
                aria-hidden="true"
              />

              {/* Плавающее изображение */}
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [-10, 10] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatType: 'mirror' as const,
                  ease: 'easeInOut',
                }}
                className="relative w-full h-full"
                style={{
                  filter:
                    'drop-shadow(0 32px 64px rgba(63, 93, 58, 0.28)) drop-shadow(0 8px 24px rgba(198, 139, 95, 0.18))',
                }}
              >
                <Image
                  src="/images/hero/florarium.png"
                  alt="Флорариум — живая экосистема в стекле"
                  fill
                  className="object-contain"
                  priority
                  sizes="480px"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
