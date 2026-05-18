import type { Metadata } from 'next';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/site';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'О студии — Флорки, Ярославль',
  description:
    'Студия флорариумов «Флорки» в Ярославле. Делаем живые экосистемы в стекле вручную с 2022 года.',
};

export default function ONasPage() {
  return (
    <>
      <div className="bg-bg pt-28 pb-16 md:pt-32 md:pb-20">
        <Container size="narrow">
          <Heading as="h1" size="h1" className="mb-6 heading-rule">
            О <em className="display-em text-warm">студии</em>
          </Heading>

          <div className="prose prose-florki max-w-none space-y-6">
            <Text size="lg">
              «Флорки» — небольшая студия в Ярославле. Делаем флорариумы:
              закрытые экосистемы в стекле, открытые суккулентные сады,
              подарочные наборы и композиции на заказ.
            </Text>

            <Text>
              Всё собирается вручную. Каждый флорариум — отдельная маленькая
              история. Одни уезжают как подарки на дни рождения, другие живут в
              офисах и квартирах годами. Мы следим за тем, чтобы растения были
              здоровы ещё до упаковки — и сопровождаем каждую работу инструкцией
              по уходу.
            </Text>

            <Text>
              Работаем с 2022 года. Создали больше 100 флорариумов. Принимаем
              заказы через Telegram — обычно отвечаем в течение 15 минут в
              рабочее время.
            </Text>

            <div className="rounded-2xl bg-surface-1 border border-border p-6 mt-8">
              <Heading as="h2" size="h3" className="mb-4">
                Как мы <em className="display-em text-warm">работаем</em>
              </Heading>
              <ol className="space-y-3">
                {[
                  'Пишете нам в Telegram — рассказываете об идее или выбираете из каталога',
                  'Обсуждаем размер, растения и бюджет — обычно за 1–2 сообщения',
                  'Собираем флорариум в течение 1–3 дней',
                  'Отдаём в студии или доставляем по Ярославлю',
                ].map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent-soft text-accent text-sm font-semibold flex items-center justify-center font-display">
                      {i + 1}
                    </span>
                    <Text size="sm" className="pt-0.5">
                      {step}
                    </Text>
                  </li>
                ))}
              </ol>
            </div>

            <div className="pt-4">
              <a
                href={siteConfig.contacts.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-accent text-white font-medium text-sm hover:bg-accent-hover hover:-translate-y-0.5 transition-all duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <MessageCircle size={18} strokeWidth={1.5} aria-hidden="true" />
                Написать в Telegram
              </a>
            </div>
          </div>
        </Container>
      </div>

      <CTASection />
    </>
  );
}
