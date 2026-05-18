import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';
import { siteConfig } from '@/data/site';
import Container from '@/components/ui/Container';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-surface-1 border-t border-border"
      aria-label="Подвал сайта"
    >
      <Container>
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="font-display text-h3 text-text-primary hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm w-fit"
            >
              Флорки
            </Link>
            <p className="text-sm text-text-muted uppercase tracking-[0.06em] font-medium">
              Флорариумы&nbsp;• Ярославль
            </p>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              Живые экосистемы в стекле — готовые работы и&nbsp;композиции
              на&nbsp;заказ.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href={siteConfig.contacts.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-bg-elevated border border-border text-text-secondary hover:text-accent hover:border-accent transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Telegram студии"
              >
                <Send size={16} strokeWidth={1.5} aria-hidden="true" />
              </a>
              <a
                href={siteConfig.contacts.vk}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-bg-elevated border border-border text-text-secondary hover:text-accent hover:border-accent transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="ВКонтакте студии"
              >
                <MessageCircle size={16} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav aria-label="Навигация в подвале">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-muted mb-4">
              Навигация
            </p>
            <ul className="flex flex-col gap-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-secondary hover:text-accent transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 pt-2 border-t border-border">
                <Link
                  href="/legal/privacy"
                  className="text-sm text-text-muted hover:text-text-secondary transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                >
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/oferta"
                  className="text-sm text-text-muted hover:text-text-secondary transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                >
                  Публичная оферта
                </Link>
              </li>
            </ul>
          </nav>

          <address className="not-italic flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-muted mb-1">
              Контакты
            </p>
            <div className="flex items-start gap-2.5 text-sm text-text-secondary">
              <MapPin
                size={16}
                strokeWidth={1.5}
                className="mt-0.5 flex-shrink-0 text-text-muted"
                aria-hidden="true"
              />
              <span>{siteConfig.address.full}</span>
            </div>
            <a
              href={`tel:${siteConfig.contacts.phone}`}
              className="flex items-center gap-2.5 text-sm text-text-secondary hover:text-accent transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm w-fit"
            >
              <Phone
                size={16}
                strokeWidth={1.5}
                className="text-text-muted"
                aria-hidden="true"
              />
              {siteConfig.contacts.phoneDisplay}
            </a>
            <a
              href={`mailto:${siteConfig.contacts.email}`}
              className="flex items-center gap-2.5 text-sm text-text-secondary hover:text-accent transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm w-fit"
            >
              <Mail
                size={16}
                strokeWidth={1.5}
                className="text-text-muted"
                aria-hidden="true"
              />
              {siteConfig.contacts.email}
            </a>
            <div className="flex items-start gap-2.5 text-sm text-text-secondary">
              <Clock
                size={16}
                strokeWidth={1.5}
                className="mt-0.5 flex-shrink-0 text-text-muted"
                aria-hidden="true"
              />
              <div>
                <p>Пн–Пт: {siteConfig.hours.weekdays}</p>
                <p>Сб–Вс: {siteConfig.hours.weekends}</p>
                <p className="text-text-muted text-xs mt-1">
                  {siteConfig.hours.note}
                </p>
              </div>
            </div>
          </address>
        </div>

        <div className="py-5 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-text-muted">
          <p>
            © {year} {siteConfig.fullName}
          </p>
          <p>Сделано с любовью в Ярославле</p>
        </div>
      </Container>
    </footer>
  );
}
