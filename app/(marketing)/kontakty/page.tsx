import type { Metadata } from 'next';
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { siteConfig } from '@/data/site';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import ContactForm from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Контакты — студия Флорки, Ярославль',
  description:
    'Адрес, телефон, Telegram и форма заявки. Студия флорариумов «Флорки» в Ярославле.',
  alternates: { canonical: '/kontakty' },
};

export default function KontaktyPage() {
  return (
    <div className="bg-bg pt-28 pb-20 md:pt-32 md:pb-24">
      <Container>
        <Heading as="h1" size="h1" className="mb-10 md:mb-14">
          Контакты
        </Heading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="space-y-8">
            <div>
              <Heading as="h2" size="h3" className="mb-5">
                Напишите нам
              </Heading>
              <div className="space-y-4">
                <a
                  href={siteConfig.contacts.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                    <Send size={18} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                      Telegram
                    </div>
                    <div className="text-xs text-text-muted">
                      @florki_yar · ответим за 15 минут
                    </div>
                  </div>
                </a>

                <a
                  href={`tel:${siteConfig.contacts.phone.replace(/\D/g, '')}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                    <Phone size={18} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                      {siteConfig.contacts.phone}
                    </div>
                    <div className="text-xs text-text-muted">
                      Звонки в рабочее время
                    </div>
                  </div>
                </a>

                <a
                  href={`mailto:${siteConfig.contacts.email}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                    <Mail size={18} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                      {siteConfig.contacts.email}
                    </div>
                    <div className="text-xs text-text-muted">
                      Для официальных запросов
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <Heading as="h2" size="h3" className="mb-5">
                Студия
              </Heading>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-1 flex items-center justify-center text-text-muted shrink-0">
                    <MapPin size={18} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <div>
                    <Text size="sm" className="font-medium">
                      {siteConfig.address.full}
                    </Text>
                    <Text size="sm" muted>
                      Встречи по предварительной договорённости
                    </Text>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-1 flex items-center justify-center text-text-muted shrink-0">
                    <Clock size={18} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <div>
                    <Text size="sm" className="font-medium">
                      Пн–Пт: {siteConfig.hours.weekdays}
                    </Text>
                    <Text size="sm" className="font-medium">
                      Сб–Вс: {siteConfig.hours.weekends}
                    </Text>
                    <Text size="sm" muted>
                      {siteConfig.hours.note}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Heading as="h2" size="h3" className="mb-5">
              Заявка на флорариум
            </Heading>
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
