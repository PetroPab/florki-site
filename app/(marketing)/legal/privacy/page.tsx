import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности — Флорки',
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <div className="bg-bg pt-28 pb-20 md:pt-32 md:pb-24">
      <Container size="narrow">
        <Heading as="h1" size="h2" className="mb-8">
          Политика конфиденциальности
        </Heading>

        <div className="prose prose-florki max-w-none text-text-secondary space-y-6 text-sm leading-relaxed">
          <p>
            Настоящая политика конфиденциальности регулирует обработку
            персональных данных пользователей сайта{' '}
            <strong>{siteConfig.url}</strong>.
          </p>

          <h2 className="font-display text-h4 text-text-primary mt-8 mb-3">
            Какие данные мы собираем
          </h2>
          <p>
            При заполнении формы обратной связи мы получаем: имя, контактные
            данные (телефон или Telegram), текст сообщения. Данные используются
            исключительно для связи с вами по вашему запросу.
          </p>

          <h2 className="font-display text-h4 text-text-primary mt-8 mb-3">
            Хранение и защита
          </h2>
          <p>
            Данные не передаются третьим лицам. Электронная переписка хранится
            на защищённых серверах. По запросу данные удаляются в течение 3
            рабочих дней.
          </p>

          <h2 className="font-display text-h4 text-text-primary mt-8 mb-3">
            Контактная информация
          </h2>
          <p>
            Оператор персональных данных: {siteConfig.legal.name}
            <br />
            Email:{' '}
            <a
              href={`mailto:${siteConfig.contacts.email}`}
              className="text-accent hover:underline"
            >
              {siteConfig.contacts.email}
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
