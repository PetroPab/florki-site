export const siteConfig = {
  name: 'Флорки',
  fullName: 'Студия флорариумов «Флорки»',
  description:
    'Студия флорариумов в Ярославле. Живые экосистемы в стекле — готовые работы и композиции на заказ. Доставка по Ярославлю.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://florki.ru',

  contacts: {
    phone: process.env.NEXT_PUBLIC_PHONE ?? '+7 (999) 123-45-67',
    phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? '+7 (999) 123-45-67',
    email: 'studio@florki.ru',
    telegramUsername: process.env.NEXT_PUBLIC_TELEGRAM_USERNAME ?? 'florki_yar',
    telegram: `https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_USERNAME ?? 'florki_yar'}`,
    whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? '79991234567'}`,
    vk: 'https://vk.com/florki_yar',
  },

  address: {
    city: 'Ярославль',
    district: 'Центр',
    full: 'г. Ярославль, встречи по предварительной записи',
    coords: { lat: 57.6261, lng: 39.8845 },
  },

  hours: {
    weekdays: '10:00–19:00',
    weekends: '11:00–17:00',
    note: 'Встречи в студии — по предварительной записи',
  },

  legal: {
    type: 'self-employed' as const,
    name: 'Иванова Анастасия Сергеевна',
    inn: 'XXXXXXXXXXXX',
  },

  nav: [
    { label: 'Каталог', href: '/katalog' },
    { label: 'Галерея', href: '/gallery' },
    { label: 'Полезное', href: '/poleznoe' },
    { label: 'Отзывы', href: '/reviews' },
    { label: 'О студии', href: '/o-nas' },
    { label: 'Контакты', href: '/kontakty' },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
