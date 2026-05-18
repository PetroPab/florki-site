import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';

export const metadata: Metadata = {
  title: 'Публичная оферта — Флорки',
  robots: { index: false },
};

export default function OfertaPage() {
  return (
    <div className="bg-bg pt-28 pb-20 md:pt-32 md:pb-24">
      <Container size="narrow">
        <Heading as="h1" size="h2" className="mb-8">
          Публичная оферта
        </Heading>

        <div className="prose prose-florki max-w-none text-text-secondary space-y-6 text-sm leading-relaxed">
          <p>
            Настоящий документ является публичной офертой{' '}
            {siteConfig.legal.name} (далее — Исполнитель) на изготовление и
            продажу флорариумов и декоративных композиций.
          </p>

          <h2 className="font-display text-h4 text-text-primary mt-8 mb-3">
            Предмет договора
          </h2>
          <p>
            Исполнитель изготавливает флорариумы и декоративные растительные
            композиции по запросу Заказчика. Условия (состав, размер, цена,
            сроки) согласуются индивидуально в переписке.
          </p>

          <h2 className="font-display text-h4 text-text-primary mt-8 mb-3">
            Оплата
          </h2>
          <p>
            Оплата производится после согласования состава и цены. Предоплата
            50% при изготовлении под заказ. Оставшаяся сумма — при получении.
          </p>

          <h2 className="font-display text-h4 text-text-primary mt-8 mb-3">
            Доставка и получение
          </h2>
          <p>
            Самовывоз из студии в Ярославле или доставка по городу (условия
            обсуждаются). Доставка в другие города — через транспортные компании
            за счёт Заказчика.
          </p>

          <h2 className="font-display text-h4 text-text-primary mt-8 mb-3">
            Возврат
          </h2>
          <p>
            Ввиду биологической природы товара возврат возможен только при
            наличии явных дефектов, допущенных при изготовлении. Претензии
            принимаются в течение 48 часов с момента получения.
          </p>

          <h2 className="font-display text-h4 text-text-primary mt-8 mb-3">
            Контакты Исполнителя
          </h2>
          <p>
            {siteConfig.legal.name}
            <br />
            Email:{' '}
            <a
              href={`mailto:${siteConfig.contacts.email}`}
              className="text-accent hover:underline"
            >
              {siteConfig.contacts.email}
            </a>
            <br />
            Telegram:{' '}
            <a
              href={siteConfig.contacts.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              @florki_yar
            </a>
          </p>

          <p className="text-text-muted text-xs mt-8">
            Последнее обновление: октябрь 2024 г.
          </p>
        </div>
      </Container>
    </div>
  );
}
