# 05. Дорожная карта

Актуальный статус на **май 2026**.

---

## Текущее состояние

| Этап          | Статус       | Комментарий                                      |
| ------------- | ------------ | ------------------------------------------------ |
| 0. Подготовка | 🟡 В работе  | Структура готова, нужны реальные фото            |
| 1. Фундамент  | ✅ Готово    | Next.js 15, TypeScript, Tailwind, Vercel         |
| 2. UI-kit     | ✅ Готово    | 33 компонента                                    |
| 3. Страницы   | ✅ Готово    | Все 12 маршрутов работают                        |
| 4. Контент    | 🟡 В работе  | Структура готова, нужны реальные фото и контакты |
| 5. Полировка  | 🟡 Частично  | Анимации и glassmorphism готовы, нужны аудиты    |
| 6. Запуск     | ⬜ Не начато | После готовности контента                        |

**Следующий шаг:** загрузить реальные фотографии по `docs/IMAGES.md`

---

## Этапы подробно

### Этап 0. Подготовка контента

**Сделано:**

- Структура данных: `data/products.json`, `data/reviews.json`, `data/gallery.json`
- 6 товаров с описаниями, размерами, составом
- 6 отзывов с фото работ (`workPhoto`)
- 21 позиция в галерее (заглушки)
- 2 статьи в MDX

**Осталось:**

- [ ] Загрузить фото флорариумов — см. `docs/IMAGES.md`
- [ ] Уточнить данные в `data/site.ts`: телефон, адрес, Telegram, WhatsApp
- [ ] Создать OG-картинку `public/images/og/default.png`

---

### Этап 1. Фундамент ✅

- Next.js 15 (App Router, Turbopack) + TypeScript strict
- Tailwind CSS v3 с дизайн-токенами (цвета, шрифты, тени, z-index)
- Шрифты: **Fraunces** (display, italic) + **Golos Text** (body)
- Vercel деплой настроен

---

### Этап 2. UI-kit ✅

**ui/ (11 компонентов):**
Badge, Button, Card, Checkbox, Container, Heading, ImageWithFallback, Input, Link, Text, Textarea

**blocks/ (10 компонентов):**
AnimatedGrid, ArticleCard, Callout, GalleryGrid, GlassPanel, Lightbox, OrderButton, ProductCard, ReviewCard, ReviewsPageClient

**sections/ (5 секций):**
CTASection, FeaturedProducts, HeroSection, ReviewsStrip, USPSection

**layout/ (4 компонента):**
Footer, Header, MobileMenu, Section

**modals/ (1):** OrderModal

**forms/ (1):** ContactForm

**seo/ (2):** JsonLdLocalBusiness, JsonLdProduct

---

### Этап 3. Страницы ✅

| Маршрут            | Файл                                       | Статус |
| ------------------ | ------------------------------------------ | ------ |
| `/`                | `app/(marketing)/page.tsx`                 | ✅     |
| `/katalog`         | `app/(marketing)/katalog/page.tsx`         | ✅     |
| `/katalog/[slug]`  | `app/(marketing)/katalog/[slug]/page.tsx`  | ✅     |
| `/gallery`         | `app/(marketing)/gallery/page.tsx`         | ✅     |
| `/poleznoe`        | `app/(marketing)/poleznoe/page.tsx`        | ✅     |
| `/poleznoe/[slug]` | `app/(marketing)/poleznoe/[slug]/page.tsx` | ✅     |
| `/reviews`         | `app/(marketing)/reviews/page.tsx`         | ✅     |
| `/o-nas`           | `app/(marketing)/o-nas/page.tsx`           | ✅     |
| `/kontakty`        | `app/(marketing)/kontakty/page.tsx`        | ✅     |
| `/legal/privacy`   | `app/(marketing)/legal/privacy/page.tsx`   | ✅     |
| `/legal/oferta`    | `app/(marketing)/legal/oferta/page.tsx`    | ✅     |
| `404`              | `app/not-found.tsx`                        | ✅     |
| `/poleznoe` loader | `app/(marketing)/poleznoe/loading.tsx`     | ✅     |

---

### Этап 4. Контент 🟡

**Сделано (код):**

- Все данные загружаются из `data/*.json` и `content/articles/*.mdx`
- `ImageWithFallback` показывает placeholder до загрузки фото
- Сортировка: «в наличии» всегда выше «под заказ»
- Отзывы с фото работ: `workPhoto` в типе, данных и компоненте
- Галерея: 21 заглушка, justified layout, infinite scroll

**Осталось (контент):**

- [ ] 19 фотографий для товаров и галереи — детали в `docs/IMAGES.md`
- [ ] Проверить тексты описаний товаров с заказчиком
- [ ] Проверить тексты отзывов (реальные vs тестовые)
- [ ] Дополнить статьи до 600+ слов для SEO
- [ ] Заполнить `data/site.ts` реальными контактами

---

### Этап 5. Полировка 🟡

**Сделано:**

- ✅ Scroll-reveal анимации (`[data-reveal]`, IntersectionObserver + CSS)
- ✅ Floating blobs — анимированный фон (CSS keyframes, 3 блоба)
- ✅ Glassmorphism секции (`glass-section`, `glass-section-dense`)
- ✅ Shimmer на кнопках при hover (`btn-shimmer`)
- ✅ Pulse-свечение на CTA и хедер-кнопках (`btn-pulse`, `btn-pulse-sm`)
- ✅ `prefers-reduced-motion` — все анимации отключаются
- ✅ Visible focus rings на всех интерактивных элементах
- ✅ `nextjs-toploader` — прогресс-бар при переходах
- ✅ JSON-LD: LocalBusiness + Product structured data
- ✅ sitemap.ts + robots.ts
- ✅ Галерея: justified layout + infinite scroll + reveal-анимации
- ✅ Гидрация: `formatDate` и `formatPrice` без `Intl` — стабильны на сервере и клиенте
- ✅ `/poleznoe`: `force-static` + loading skeleton — мгновенный переход

**Осталось:**

- [ ] Lighthouse аудит (цель: Perf ≥ 90, A11y ≥ 95, SEO = 100) — после реальных фото
- [ ] Проверка контрастов на стеклянных секциях (WCAG AA)
- [ ] Тестирование форм в Safari
- [ ] Проверка на реальных устройствах (iPhone, Android)
- [ ] Настроить NEXT_PUBLIC_TELEGRAM_URL, NEXT_PUBLIC_WHATSAPP_URL в `.env.local`

---

### Этап 6. Запуск ⬜

- [ ] Домен florki.ru → Vercel (DNS + SSL)
- [ ] Редирект www → без www
- [ ] Яндекс.Метрика + цели (Telegram / WhatsApp / форма)
- [ ] Яндекс.Вебмастер + sitemap
- [ ] Финальный прогон: ссылки, телефоны, форма, OG-превью
- [ ] Тег `v1.0.0` в Git
- [ ] Инструкция для основательницы (как добавить товар / статью)

---

## Известные проблемы

| Проблема                                              | Приоритет  | Примечание                                             |
| ----------------------------------------------------- | ---------- | ------------------------------------------------------ |
| `bg-bg` в page-блоках вне Section — перекрывает блобы | 🟡 Средний | Страницы `katalog`, `o-nas` имеют прямой `bg-bg` класс |
| Нет `.env.local` на деплое                            | 🟠 Высокий | Заполнить реальные контакты и Resend-ключ              |
| Статьи короче 600 слов                                | 🟡 Средний | Нужно дополнить для SEO                                |

---

## После запуска (v1.1+)

- Больше товаров (цель: 12–16 позиций)
- Видео процесса создания флорариума
- Корпоративный раздел
- Онлайн-оплата (когда появится спрос)
- Раздел «Доставка и самовывоз»

**Регулярное обслуживание:**

| Периодичность  | Задача                                    |
| -------------- | ----------------------------------------- |
| Раз в неделю   | Новые отзывы в `data/reviews.json`        |
| Раз в 2 недели | Новый товар в `data/products.json` + фото |
| Раз в месяц    | Новая статья в `content/articles/`        |
| Раз в квартал  | Аудит производительности и SEO            |
| Раз в год      | Обновление зависимостей (`npm update`)    |
