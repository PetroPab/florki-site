# lib/

Утилиты и вспомогательные функции. Все серверные модули — только для Server Components и API Routes.

## Файлы

### `products.ts` — каталог товаров

Читает `data/products.json`, валидирует через Zod, кэширует через `React.cache`.

```ts
getAllProducts()                       // все товары, сортировка: in-stock → on-order
getFeaturedProducts()                  // товары с featured: true
getProductBySlug(slug)                 // один товар или null
getProductsByCategory(category)        // товары по категории
getRelatedProducts(slug, limit?)       // похожие товары (исключает текущий)
```

### `articles.ts` — статьи /poleznoe

Читает MDX-файлы из `content/articles/`, парсит frontmatter через `gray-matter`.

```ts
getAllArticles(); // все опубликованные статьи (draft: false)
getArticleBySlug(slug); // одна статья с компилированным MDX
getArticlesByTag(tag); // статьи по тегу
```

### `reviews.ts` — отзывы

Читает `data/reviews.json`.

```ts
getAllReviews(); // все отзывы
getFeaturedReviews(); // отзывы с featured: true (для главной)
getReviewsByProduct(slug); // отзывы на конкретный товар
```

### `gallery.ts` — галерея

Читает `data/gallery.json`.

```ts
getAllGalleryItems(); // все работы, сортировка: новые сначала
```

### `schemas.ts` — Zod-схемы валидации

Валидирует данные при загрузке в продакшене.

```ts
ProductSchema; // валидирует Product из products.json
ReviewSchema; // валидирует Review из reviews.json
ArticleFrontmatterSchema; // валидирует frontmatter MDX-статей
ContactFormSchema; // валидирует форму обратной связи
```

### `admin-content.ts` — запись контента из админки

Абстракция для чтения/записи. В dev — работает с файловой системой напрямую, в prod — через GitHub API.

```ts
readDataFile<T>(filename); // читает data/{filename}.json
writeDataFile(filename, data); // пишет data/{filename}.json
listArticleSlugs(); // список слагов статей
readArticleFile(slug); // читает content/articles/{slug}.mdx
writeArticleFile(slug, content); // пишет content/articles/{slug}.mdx
deleteArticleFile(slug); // удаляет content/articles/{slug}.mdx
```

После записи в prod автоматически вызывает `VERCEL_DEPLOY_HOOK` для запуска деплоя.

### `github-api.ts` — GitHub REST API

Используется только из `admin-content.ts` в продакшене.

```ts
githubGetFile(path)                    // { content: string, sha: string }
githubListDir(dir)                     // массив файлов директории
githubSaveFile(path, content, msg, sha?)
githubSaveBinary(path, data, msg, sha?)
githubDeleteFile(path, msg, sha)
```

Требует переменных окружения: `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`, `GITHUB_BRANCH`.

### `order-links.ts` — ссылки для заказа

Генерирует предзаполненные ссылки на Telegram/WhatsApp для кнопки «Заказать».

```ts
getTelegramOrderLink(productName); // https://t.me/florki_yar?text=...
getWhatsAppOrderLink(productName); // https://wa.me/7...?text=...
```

### `format.ts` — форматирование

```ts
formatPrice(price, note?)              // "4 500 ₽" или "от 4 500 ₽"
formatDate(dateStr)                    // "5 ноября 2024"
```

### `utils.ts`

```ts
cn(...classes); // clsx + tailwind-merge — объединение CSS-классов
```
