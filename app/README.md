# app/

Next.js 15 App Router. Все страницы и API-маршруты.

## Структура

```
app/
├── (marketing)/      ← публичные страницы сайта (с Header/Footer)
├── admin/            ← панель администратора (без Header/Footer, требует авторизации)
├── api/              ← API-маршруты
├── layout.tsx        ← корневой layout: только html/body + шрифты
├── globals.css       ← глобальные стили, CSS-переменные, утилиты
├── fonts.ts          ← конфигурация шрифтов Fraunces и Golos Text
├── sitemap.ts        ← генератор sitemap.xml
├── robots.ts         ← генератор robots.txt
├── not-found.tsx     ← страница 404
└── loading.tsx       ← глобальный Suspense-fallback
```

---

## `(marketing)/` — публичные страницы

Route group — не влияет на URL. Layout добавляет Header, Footer и фоновые блобы.

| Маршрут            | Файл                       | Описание                                           |
| ------------------ | -------------------------- | -------------------------------------------------- |
| `/`                | `page.tsx`                 | Главная: Hero, FeaturedProducts, USP, Reviews, CTA |
| `/katalog`         | `katalog/page.tsx`         | Каталог товаров с фильтром по категориям           |
| `/katalog/[slug]`  | `katalog/[slug]/page.tsx`  | Страница товара: фото, описание, состав, уход      |
| `/gallery`         | `gallery/page.tsx`         | Галерея выполненных работ                          |
| `/poleznoe`        | `poleznoe/page.tsx`        | Список статей                                      |
| `/poleznoe/[slug]` | `poleznoe/[slug]/page.tsx` | Статья с MDX-контентом                             |
| `/reviews`         | `reviews/page.tsx`         | Все отзывы                                         |
| `/o-nas`           | `o-nas/page.tsx`           | О студии                                           |
| `/kontakty`        | `kontakty/page.tsx`        | Контакты, карта, форма обратной связи              |
| `/legal/oferta`    | `legal/oferta/page.tsx`    | Публичная оферта                                   |
| `/legal/privacy`   | `legal/privacy/page.tsx`   | Политика конфиденциальности                        |

Все страницы Server Components. Метаданные через `generateMetadata()`.

---

## `admin/` — панель управления

Защищена middleware (`admin_token` cookie). Доступна по адресу `/admin`.

| Маршрут                  | Описание                                        |
| ------------------------ | ----------------------------------------------- |
| `/admin`                 | Дашборд: статистика (товары / галерея / статьи) |
| `/admin/login`           | Страница входа (пароль из `ADMIN_PASSWORD`)     |
| `/admin/catalog`         | Список товаров                                  |
| `/admin/catalog/new`     | Создание товара                                 |
| `/admin/catalog/[slug]`  | Редактирование товара                           |
| `/admin/gallery`         | Управление галереей                             |
| `/admin/articles`        | Список статей                                   |
| `/admin/articles/new`    | Создание статьи                                 |
| `/admin/articles/[slug]` | Редактирование статьи                           |

Клиентские компоненты форм: `ProductForm.tsx`, `ArticleEditor.tsx`, `GalleryManager.tsx`.

---

## `api/` — API-маршруты

| Маршрут               | Метод                       | Описание                       |
| --------------------- | --------------------------- | ------------------------------ |
| `/api/contact`        | POST                        | Форма обратной связи → Resend  |
| `/api/admin/login`    | POST                        | Установка cookie `admin_token` |
| `/api/admin/logout`   | POST                        | Удаление cookie `admin_token`  |
| `/api/admin/upload`   | POST                        | Загрузка файла в Vercel Blob   |
| `/api/admin/products` | GET / PUT                   | Чтение/запись `products.json`  |
| `/api/admin/gallery`  | GET / PUT                   | Чтение/запись `gallery.json`   |
| `/api/admin/articles` | GET / POST / DELETE / PATCH | CRUD для MDX-статей            |

Все `/api/admin/*` защищены middleware (проверка `admin_token`).

---

## `globals.css`

Содержит:

- CSS-переменные цветов: `--color-accent`, `--color-accent-hover`, и др.
- Glassmorphism-утилиты: `.glass-section`, `.glass-section-dense`
- Анимации фона: `.bg-blob`, `.bg-blob-1/2/3`
- Типографика: `.display-em` (курсивный Fraunces), `.heading-rule`
- Кнопки: `.btn-shimmer`, `.btn-pulse`, `.btn-pulse-sm`
- Scroll-reveal: `[data-reveal]`, `[data-gallery-row]`, `.revealed`
- Prose-стили для MDX: `prose` класс с кастомной типографикой
