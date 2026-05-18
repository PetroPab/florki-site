# data/

Статические данные сайта в формате JSON и TS. Редактируются через админку (`/admin`) или вручную.

## Файлы

### `products.json`

Каталог товаров. Массив объектов типа `Product` (см. `types/product.ts`).

Поля каждого товара:

- `slug` — уникальный URL-идентификатор, неизменен после создания (`mshistyi-les`)
- `name` — название для отображения
- `category` — `florarium` | `composition` | `gift` | `custom`
- `status` — `in-stock` | `on-order` (влияет на сортировку в каталоге)
- `featured` — показывать ли на главной странице
- `price` — цена в рублях
- `priceNote` — пометка к цене, например `"от"`
- `description` — подробное описание (поддерживает переносы строк `\n`)
- `care` — инструкция по уходу
- `dimensions` — размеры в см: `width`, `height`, `depth`, `diameter` (все необязательны)
- `composition` — массив строк с составом
- `images` — массив фото: `{ src, alt, width, height }`
- `createdAt` — дата создания `YYYY-MM-DD`
- `updatedAt` — дата последнего изменения (необязательно)

Изображения хранятся в Vercel Blob или в `public/images/products/{slug}/`.

---

### `gallery.json`

Галерея выполненных работ. Массив объектов типа `GalleryItem` (см. `types/gallery.ts`).

Поля:

- `id` — уникальный идентификатор вида `g-001`, `g-002`, ...
- `src` — URL изображения (Vercel Blob или `/images/gallery/`)
- `alt` — alt-текст для доступности и SEO
- `caption` — подпись под фото (необязательно)
- `completedAt` — дата выполнения работы `YYYY-MM-DD`
- `width`, `height` — размеры оригинала в пикселях (нужны для `next/image`)

---

### `reviews.json`

Отзывы клиентов. Массив объектов типа `Review` (см. `types/review.ts`).

Поля:

- `id` — уникальный идентификатор вида `rev-001`
- `source` — площадка: `yandex` | `avito` | `2gis` | `telegram` | `vk`
- `author` — имя автора
- `rating` — оценка 1–5 (необязательно)
- `date` — дата отзыва `YYYY-MM-DD`
- `text` — текст отзыва
- `originalUrl` — ссылка на оригинал (необязательно)
- `productSlug` — привязка к товару (необязательно)
- `workPhoto` — фото работы: `{ src, alt }` (необязательно)
- `photos` — доп. фото: массив `{ src, alt }` (необязательно)
- `featured` — показывать в блоке отзывов на главной

---

### `site.ts`

Глобальная конфигурация сайта. Экспортирует `siteConfig`.

Ключевые поля:

- `siteConfig.name` — краткое название (`"Флорки"`)
- `siteConfig.url` — базовый URL (берётся из `NEXT_PUBLIC_SITE_URL`)
- `siteConfig.contacts` — телефон, email, Telegram, WhatsApp, VK
- `siteConfig.address` — адрес студии и координаты для карты
- `siteConfig.hours` — часы работы
- `siteConfig.legal` — юридические данные (самозанятость, ИНН)
- `siteConfig.nav` — пункты основной навигации

Контактные данные берутся из переменных окружения `NEXT_PUBLIC_*`. Заполни в `.env.local` и в Vercel → Environment Variables.
