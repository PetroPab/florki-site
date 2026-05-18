# types/

TypeScript-типы для всех сущностей проекта. Импортируются везде через `@/types/...`.

## Файлы

### `product.ts`

```ts
type ProductCategory = 'florarium' | 'composition' | 'gift' | 'custom';
type ProductStatus = 'in-stock' | 'on-order';

interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  status: ProductStatus;
  featured: boolean;
  price: number;
  priceNote?: string; // "от", "до" и т.п.
  description: string;
  care?: string;
  careArticleSlug?: string; // ссылка на статью об уходе
  dimensions: {
    width?: number;
    height?: number;
    depth?: number;
    diameter?: number; // все в сантиметрах
  };
  composition: string[];
  images: Array<{ src: string; alt: string; width: number; height: number }>;
  createdAt: string; // YYYY-MM-DD
  updatedAt?: string;
}
```

### `review.ts`

```ts
type ReviewSource = 'avito' | 'yandex' | '2gis' | 'telegram' | 'vk';

interface Review {
  id: string; // "rev-001"
  source: ReviewSource;
  author: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  date: string; // YYYY-MM-DD
  text: string;
  originalUrl?: string;
  productSlug?: string;
  workPhoto?: { src: string; alt: string };
  photos?: Array<{ src: string; alt: string }>;
  featured: boolean;
}
```

### `article.ts`

```ts
type ArticleTag = 'uhod' | 'osnovy' | 'idei' | 'process';

interface ArticleFrontmatter {
  title: string;
  description: string; // для <meta description>
  cover: string;
  coverAlt: string;
  date: string; // YYYY-MM-DD
  updatedAt?: string;
  tags: ArticleTag[];
  author?: string;
  draft?: boolean;
}

interface Article extends ArticleFrontmatter {
  slug: string; // имя файла без .mdx
  readingTime: number; // минут на чтение
  content: string; // скомпилированный MDX
}
```

### `gallery.ts`

```ts
interface GalleryItem {
  id: string; // "g-001"
  src: string;
  alt: string;
  caption?: string;
  completedAt: string; // YYYY-MM-DD
  width: number;
  height: number;
}
```

### `index.ts`

Реэкспортирует все типы для удобного импорта: `import type { Product, Review } from '@/types'`
