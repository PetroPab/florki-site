'use client';

import { Leaf, Clock, Tag, Shield } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import Section from '@/components/layout/Section';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';

type USPItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const USP_ITEMS: USPItem[] = [
  {
    icon: Leaf,
    title: 'Живут 2–3 года',
    description:
      'Закрытые флорариумы — самодостаточная экосистема. Минимум полива, максимум красоты.',
  },
  {
    icon: Tag,
    title: 'Лучшая цена',
    description:
      'Стоимость при заказе на сайте ниже других площадок и конкурентов.',
  },
  {
    icon: Shield,
    title: 'Авторская работа',
    description:
      'Не конвейер. Каждый флорариум собирается вручную под конкретного клиента или заказ.',
  },
  {
    icon: Clock,
    title: 'Простой заказ',
    description:
      'Без регистрации и корзины. Пишете в Telegram — отвечаем за 15 минут в рабочее время.',
  },
];

export default function USPSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section spacing="md" background="muted">
      <div className="text-center mb-10 md:mb-12">
        <Heading as="h2" size="h2" className="heading-rule-center">
          Почему выбирают <em className="display-em text-accent">«Флорки»?</em>
        </Heading>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {USP_ITEMS.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                delay: index * 0.08,
              }}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-accent-soft text-accent">
                <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <Heading as="h3" size="h4">
                {item.title}
              </Heading>
              <Text size="sm" muted>
                {item.description}
              </Text>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
