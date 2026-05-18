# 05. Дорожная карта

Актуальный статус на **май 2026**.

---

## Текущее состояние

| Этап          | Статус       | Комментарий                                   |
| ------------- | ------------ | --------------------------------------------- |
| 0. Подготовка | 🟡 В работе  | Структура готова, нужны реальные фото         |
| 1. Фундамент  | ✅ Готово    | Next.js 15, TypeScript, Tailwind, Vercel      |
| 2. UI-kit     | ✅ Готово    | 35 компонентов                                |
| 3. Страницы   | ✅ Готово    | Все 12 маршрутов работают                     |
| 4. Контент    | 🟡 В работе  | Структура данных готова, нужны реальные фото  |
| 5. Полировка  | 🟡 Частично  | Анимации и glassmorphism готовы, нужны аудиты |
| 6. Запуск     | ⬜ Не начато | После готовности контента                     |

**Следующий шаг:** загрузить реальные фотографии по `docs/IMAGES.md`

---

## Этапы подробно

### Этап 0. Подготовка контента

**Сделано:**

- Структура данных: `data/products.json`, `data/reviews.json`, `data/gallery.json`
- 6 товаров с описаниями, размерами, составом
- 6 отзывов с реальными текстами
- 9 позиций в галерее
- 2 статьи в MDX

**Осталось:**

- [ ] Загрузить фото флорариумов — см. `docs/IMAGES.md`
- [ ] Уточнить данные в `data/site.ts`: телефон, адрес, Telegram, WhatsApp
- [ ] Создать OG-картинку `public/images/og/default.png`

---

### Этап 1. Фундамент ✅

- Next.js 15 (App Router) + TypeScript strict
- Tailwind CSS с дизайн-токенами (цвета, шрифты, тени, z-index)
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

---

### Этап 4. Контент 🟡

**Сделано (код):**

- Все данные загружаются из `data/*.json` и `content/articles/*.mdx`
- `ImageWithFallback` показывает placeholder до загрузки фото
- Сортировка: «в наличии» всегда выше «под заказ»

**Осталось (контент):**

- [ ] 19 фотографий — детали в `docs/IMAGES.md`
- [ ] Проверить тексты описаний товаров с заказчиком
- [ ] Проверить тексты отзывов (реальные vs тестовые)
- [ ] Дополнить статьи до 600+ слов для SEO
- [ ] Заполнить `data/site.ts` реальными контактами

---

### Этап 5. Полировка 🟡

**Сделано:**

- ✅ Scroll-reveal анимации (IntersectionObserver + CSS, без per-element framer-motion)
- ✅ Floating blobs — анимированный фон (CSS keyframes)
- ✅ Glassmorphism секции (`glass-section`, `glass-section-dense`)
- ✅ Shimmer на кнопках при hover
- ✅ Pulse-кольцо на CTA и хедер-кнопках
- ✅ `prefers-reduced-motion` — все анимации отключаются
- ✅ Visible focus rings на всех интерактивных элементах
- ✅ `nextjs-toploader` — прогресс-бар при переходах
- ✅ JSON-LD: LocalBusiness + Product structured data
- ✅ sitemap.ts + robots.ts

**Осталось:**

- [ ] Lighthouse аудит (цель: Perf ≥ 90, A11y ≥ 95, SEO = 100) — нужны реальные фото
- [ ] Проверка контрастов на стеклянных секциях (WCAG AA)
- [ ] Тестирование форм в Safari
- [ ] Проверка на реальных устройствах (iPhone, Android)
- [ ] `.env.example` и настройка Resend для формы контактов
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

| Проблема                                                                        | Приоритет  | Примечание                                         |
| ------------------------------------------------------------------------------- | ---------- | -------------------------------------------------- |
| `bg-bg` в page-блоках вне Section — перекрывает блобы                           | 🟡 Средний | Страницы katalog, o-nas имеют прямой `bg-bg` класс |
| Slug товара «флорариум под заказ» — опечатка `individualnyi-zakazz` (двойное z) | 🟡 Средний | Поправить в `products.json` + папке                |
| Нет `.env.example` в репозитории                                                | 🟠 Высокий | Resend API ключ не задокументирован                |

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
