# 07. Модели данных

Структуры данных, схемы, TypeScript-типы. Источник
правды для контента и кода.

---

## Общий принцип

- **Товары** → JSON в `/data/products.json`
- **Отзывы** → JSON в `/data/reviews.json`
- **Статьи** → MDX в `/content/articles/*.mdx`
  с frontmatter
- **Настройки сайта** → `/data/site.ts` (контакты,
  соцсети, метаданные)
- **Типы** → `/types/*.ts`, единые для всего проекта

Все данные валидируются через **Zod** при чтении.

---

## Product (товар)

**Файл данных:** `/data/products.json`  
**Тип:** `/types/product.ts`

```ts
export type ProductStatus = 'in-stock' | 'on-order';

export type ProductCategory =
  | 'florarium' // флорариумы
  | 'composition' // композиции в дереве/керамике
  | 'gift' // подарочные наборы
  | 'custom'; // индивидуальные работы

export type Product = {
  slug: string; // 'mshistyi-les'
  name: string; // 'Мшистый лес'
  category: ProductCategory;
  status: ProductStatus;
  featured: boolean; // показывать на главной

  price: number; // 4500 (без копеек)
  priceNote?: string; // 'от' / 'примерно'

  description: string; // основной текст, 2-4 абзаца
  care?: string; // короткое про уход, 1-2 предл.
  careArticleSlug?: string; // ссылка на статью об уходе

  dimensions: {
    width?: number; // см
    height?: number;
    depth?: number;
    diameter?: number; // для круглых
  };

  composition: string[]; // ['мох ягель', 'суккуленты']

  images: ProductImage[]; // минимум 1, первое — главное

  createdAt: string; // ISO-дата
  updatedAt?: string;
};

export type ProductImage = {
  src: string; // '/images/products/mshistyi-les/01.webp'
  alt: string; // 'Флорариум "Мшистый лес" в стеклянной сфере'
  width: number;
  height: number;
};
```

**Пример:**

```json
{
  "slug": "mshistyi-les",
  "name": "Мшистый лес",
  "category": "florarium",
  "status": "in-stock",
  "featured": true,
  "price": 4500,
  "description": "Закрытая стеклянная сфера...",
  "care": "Опрыскивать раз в две недели.",
  "careArticleSlug": "uhod-za-zakrytymi-florariumami",
  "dimensions": { "diameter": 15, "height": 18 },
  "composition": ["мох ягель", "папоротник", "камни"],
  "images": [
    {
      "src": "/images/products/mshistyi-les/01.webp",
      "alt": "Флорариум 'Мшистый лес' — стеклянная сфера",
      "width": 1200,
      "height": 1200
    }
  ],
  "createdAt": "2024-09-15"
}
```

**Slug правила:**

- Только латиница, цифры, дефисы
- Lowercase
- Транслит по ГОСТ (через `slugify`)
- Уникальный

---

## Review (отзыв)

**Файл данных:** `/data/reviews.json`  
**Тип:** `/types/review.ts`

```ts
export type ReviewSource = 'avito' | 'yandex' | '2gis' | 'telegram' | 'vk';

export type Review = {
  id: string; // 'rev-001'
  source: ReviewSource;
  author: string; // 'Мария К.' (только имя + инSlug": "mshistyi-les",
  featured: true;
};
```

**Правила:**

- Текст не редактировать (только убрать мат /
  личные данные)
- Не выдумывать отзывы
- Если автор указал полное имя — оставить только
  имя + первую букву фамилии

---

## Article (статья)

**Файлы:** `/content/articles/*.mdx`  
**Тип:** `/types/article.ts`

Каждая статья — отдельный MDX-файл с frontmatter.

```ts
export type ArticleTag =
  | 'uhod' // уход
  | 'osnovy' // основы
  | 'idei' // идеи и вдохновение
  | 'process'; // как мы работаем

export type ArticleFrontmatter = {
  title: string;
  description: string; // 1-2 предложения, для карточки и SEO
  cover: string; // путь к обложке
  coverAlt: string;
  date: string; // ISO
  updatedAt?: string;
  tags: ArticleTag[];
  author?: string; // по умолчанию 'Анастасия'
  draft?: boolean; // если true — не публикуем
};

export type Article = ArticleFrontmatter & {
  slug: string; // из имени файла
  content: string; // тело MDX
  readTime: number; // вычисляется автоматически
};
```

**Пример frontmatter:**

```mdx
---
title: 'Уход за закрытыми флорариумами'
description: 'Как поддерживать экосистему в стеклянной сфере без полива и пересадок.'
cover: '/images/articles/uhod-za-florariumami/cover.webp'
coverAlt: 'Закрытый флорариум с конденсатом на стекле'
date: '2024-10-01'
tags: ['uhod', 'osnovy']
---

# Уход за закрытыми флорариумами

Закрытый флорариум — это маленькая экосистема...
```

**Правила слагов:**

- Имя файла = slug
- `uhod-za-florariumami.mdx` → `/poleznoe/uhod-za-florariumami`

---

## SiteConfig (настройки сайта)

**Файл:** `/data/site.ts`

```ts
export const siteConfig = {
  name: 'Флорки',
  fullName: 'Студия флорариумов «Флорки»',
  description: 'Студия флорариумов в Ярославле...',
  url: 'https://florki.ru',

  contacts: {
    phone: '+7 (XXX) XXX-XX-XX',
    email: 'hello@florki.ru',
    telegram: 'https://t.me/florki_yar',
    whatsapp: 'https://wa.me/7XXXXXXXXXX',
    vk: 'https://vk.com/florki_yar',
  },

  address: {
    city: 'Ярославль',
    district: 'Центр',
    full: 'г. Ярославль, район Центр, по записи',
    coords: { lat: 57.6261, lng: 39.8845 },
  },

  hours: {
    weekdays: '10:00–19:00',
    weekends: '11:00–17:00',
    note: 'Встречи в студии — по предварительной записи',
  },

  legal: {
    type: 'self-employed', // 'self-employed' | 'ip' | 'ooo'
    name: 'Иванова Анастасия Сергеевна',
    inn: 'XXXXXXXXXXXX',
  },

  social: {
    telegram: 'https://t.me/florki_yar',
    vk: 'https://vk.com/florki_yar',
  },
} as const;

export type SiteConfig = typeof siteConfig;
```

---

## Валидация (Zod)

**Файл:** `/lib/schemas.ts`

```ts
import { z } from 'zod';

export const ProductSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  category: z.enum(['florarium', 'composition', 'gift', 'custom']),
  status: z.enum(['in-stock', 'on-order']),
  featured: z.boolean(),
  price: z.number().positive(),
  priceNote: z.string().optional(),
  description: z.string().min(50),
  care: z.string().optional(),
  careArticleSlug: z.string().optional(),
  dimensions: z.object({
    width: z.number().optional(),
    height: z.number().optional(),
    depth: z.number().optional(),
    diameter: z.number().optional(),
  }),
  composition: z.array(z.string()).min(1),
  images: z
    .array(
      z.object({
        src: z.string(),
        alt: z.string().min(5),
        width: z.number(),
        height: z.number(),
      })
    )
    .min(1),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});

export const ReviewSchema = z.object({
  id: z.string(),
  source: z.enum(['avito', 'yandex', '2gis', 'telegram', 'vk']),
  author: z.string().min(2),
  rating: z.number().min(1).max(5).optional(),
  date: z.string(),
  text: z.string().min(10),
  originalUrl: z.string().url().optional(),
  productSlug: z.string().optional(),
  featured: z.boolean(),
});

export const ArticleFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(20).max(200),
  cover: z.string(),
  coverAlt: z.string().min(5),
  date: z.string(),
  updatedAt: z.string().optional(),
  tags: z.array(z.enum(['uhod', 'osnovy', 'idei', 'process'])),
  author: z.string().optional(),
  draft: z.boolean().optional(),
});
```

Использование при чтении:

```ts
// /lib/products.ts
import productsRaw from '@/data/products.json';
import { ProductSchema } from './schemas';

export const products = productsRaw.map((p) => ProductSchema.parse(p));
```

Если данные не валидны — билд падает с ошибкой.
Это правильно: лучше упасть на этапе сборки,
чем показать пользователю битую страницу.

---

## Утилиты для работы с данными

**Файл:** `/lib/products.ts`

```ts
export function getAllProducts(): Product[];
export function getProductBySlug(slug: string): Product | null;
export function getFeaturedProducts(): Product[];
export function getRelatedProducts(slug: string, limit?: number): Product[];
export function getProductsByCategory(category: ProductCategory): Product[];
```

**Файл:** `/lib/articles.ts`

```ts
export function getAllArticles(): Promise<Article[]>;
export function getArticleBySlug(slug: string): Promise<Article | null>;
export function getRelatedArticles(
  slug: string,
  limit?: number
): Promise<Article[]>;
export function getArticlesByTag(tag: ArticleTag): Promise<Article[]>;
```

**Файл:** `/lib/reviews.ts`

```ts
export function getAllReviews(): Review[];
export function getFeaturedReviews(): Review[];
export function getReviewsByProduct(slug: string): Review[];
```

Все функции:

- Кэшируются через React `cache()`
- Сортируются по `date` (новые первыми) или
  `featured` priority
- Возвращают типизированные данные

---

## Изображения

**Структура:**

```
/public/images
  /products
    /{product-slug}
      01.webp, 02.webp, ...
  /articles
    /{article-slug}
      cover.webp, 01.webp, ...
  /about
    studio.webp, founder.webp
  /hero
    main.webp
  /og
    default.png            (1200×630)
```

**Правила:**

- Формат: **WebP** (fallback JPG для совместимости
  делает next/image автоматически)
- Длинная сторона ≤ 2000px
- Качество 80
- Имя файла: латиница, без пробелов
- Размер файла < 200 KB на изображение

**Оптимизация:**

- Через `next/image` всегда
- `sizes` атрибут обязателен
- `priority` только для hero выше первого экрана

---

## Категории и теги — иерархия

### Категории товаров

- `florarium` — флорариумы (закрытые и открытые)
- `composition` — композиции в дереве, керамике
- `gift` — подарочные наборы
- `custom` — индивидуальные работы

### Теги статей

- `uhod` — уход (как поливать, что делать)
- `osnovy` — основы (что такое флорариум, история)
- `idei` — идеи и вдохновение (подборки, кейсы)
- `process` — наш процесс (как работаем, мастер-классы)

Категории — закрытое множество, не расширяем
без обсуждения.

---

## URL-схема

| Сущность           | URL                           |
| ------------------ | ----------------------------- |
| Главная            | `/`                           |
| Каталог            | `/katalog`                    |
| Категория каталога | `/katalog?category=florarium` |
| Карточка товара    | `/katalog/{slug}`             |
| Полезное           | `/poleznoe`                   |
| Категория статей   | `/poleznoe?tag=uhod`          |
| Статья             | `/poleznoe/{slug}`            |
| О студии           | `/o-nas`                      |
| Контакты           | `/kontakty`                   |
| Политика           | `/legal/privacy`              |
| Оферта             | `/legal/oferta`               |

URL — всегда латиница, lowercase, через дефисы.
Никакой кириллицы в адресах.

---

## Миграция данных в будущем

Если каталог вырастет за 50+ товаров — переходим
с JSON-файлов на headless CMS (Sanity или
Directus). Но не раньше: пока редактирование
JSON в репозитории удобнее любого админ-интерфейса.

**Признаки, что пора переезжать:**

- > 50 товаров
- Несколько человек обновляют контент
- Нужна работа с черновиками и публикацией по расписанию
- Нужна история изменений

---

## Чек-лист добавления нового товара

1. [ ] Загрузить фото в `/public/images/products/{slug}/`
2. [ ] Оптимизировать (WebP, < 200KB)
3. [ ] Добавить запись в `/data/products.json`
4. [ ] Заполнить все обязательные поля
5. [ ] Проверить, что slug уникален
6. [ ] Прогнать `npm run build` — Zod провалидирует
7. [ ] Открыть preview-деплой, проверить визуально
8. [ ] Мерж в `main`

## Чек-лист добавления статьи

1. [ ] Создать `/content/articles/{slug}.mdx`
2. [ ] Заполнить frontmatter
3. [ ] Загрузить обложку и иллюстрации
4. [ ] Написать тело
5. [ ] Проверить превью локально (`npm run dev`)
6. [ ] Прогнать build
7. [ ] Мерж в `main`
