'use client';

import { ArrowRight, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { siteConfig } from '@/data/site';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';

export default function CTASection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden bg-accent py-16 md:py-24"
      aria-label="Призыв к действию"
    >
      {/* Декоративный фон */}
      <div
        className="absolute inset-0 -z-10 opacity-10"
        style={{
          background: `
            radial-gradient(at 20% 50%, rgba(255, 255, 255, 0.3) 0px, transparent 60%),
            radial-gradient(at 80% 50%, rgba(255, 255, 255, 0.15) 0px, transparent 50%)
          `,
        }}
        aria-hidden="true"
      />

      <Container size="narrow">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          className="text-center"
        >
          <Heading as="h2" size="h1" className="text-white mb-4">
            Сделаем <em className="display-em">флорариум</em> под&nbsp;вас
          </Heading>
          <Text size="lg" className="text-white/80 mb-8 md:mb-10">
            Расскажите о своей идее — обсудим размер, растения и&nbsp;бюджет.
            Отвечаем за&nbsp;15&nbsp;минут.
          </Text>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={siteConfig.contacts.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-white text-accent font-medium text-base hover:bg-bg-elevated hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
            >
              <MessageCircle size={18} strokeWidth={1.5} aria-hidden="true" />
              Написать в Telegram
            </a>

            <Link
              href="/kontakty"
              className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-transparent text-white font-medium text-base border border-white/40 hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
            >
              Заполнить форму
              <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
