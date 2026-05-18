# 08. Конвенции разработки

Правила кода, именование, коммиты, ветки, review.
Чтобы код был единообразным независимо от того,
кто пишет.

---

## Именование

### Файлы

- **Компоненты:** `PascalCase.tsx` → `ProductCard.tsx`
- **Утилиты, хелперы:** `kebab-case.ts` → `get-products.ts`
- **Хуки:** `use-camelCase.ts` → `use-scroll-position.ts`
- **Типы:** `kebab-case.ts` → `product.ts`
- **Страницы Next.js:** строго по соглашению App Router
  (`page.tsx`, `layout.tsx`, `loading.tsx`)

### Переменные и функции

- **camelCase** для всего, кроме компонентов и типов
- **PascalCase** для компонентов, типов, классов
- **UPPER_SNAKE_CASE** для констант: `MAX_ITEMS_PER_PAGE`
- **Булевы:** префикс `is`, `has`, `should` →
  `isLoading`, `hasError`, `shouldRender`
- **События:** префикс `on` для props, `handle`
  для функций → `onClick={handleSubmit}`

### CSS-классы

- **Tailwind only**, кастомные классы по необходимости
- Кастомные классы: kebab-case → `glass-panel`
- CSS-переменные: kebab-case → `--color-primary`

---

## Структура компонента

```tsx
// 1. 'use client' (если нужен)
'use client';

// 2. Импорты (сортировка авто через ESLint)
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Product } from '@/types/product';

// 3. Типы
type ProductCardProps = {
  product: Product;
  className?: string;
};

// 4. Компонент
export default function ProductCard({ product, className }: ProductCardProps) {
  // хуки сверху
  const [hovered, setHovered] = useState(false);

  // вычисляемые значения
  const isAvailable = product.status === 'in-stock';

  // обработчики
  const handleMouseEnter = () => setHovered(true);

  // ранние возвраты
  if (!product) return null;

  // основной JSX
  return <div className={cn('base-classes', className)}>...</div>;
}
```

**Правила:**

- Один файл — один компонент
- Экспорт по умолчанию для основного компонента
- Именованные экспорты для вспомогательных
- Не больше **200 строк** в файле — иначе декомпозируем

---

## TypeScript

### Типы vs Интерфейсы

**Используем `type`, не `interface`.** Единообразие.
`interface` только если нужно расширение через
`declaration merging` (почти никогда).

```ts
// ✅ хорошо
type Product = { ... };

// ❌ не используем
interface Product { ... }
```

### Строгий режим

`tsconfig.json` — `strict: true`. Никаких `any`,
`@ts-ignore`. Если правда нужно — `unknown` +
type guard.

### Импорт типов

```ts
// ✅ явно помечаем импорт типа
import type { Product } from '@/types/product';

// ❌ смешанный импорт
import { Product, getProduct } from '@/lib/products';
```

### Утилитные типы

Используем встроенные: `Partial`, `Required`,
`Pick`, `Omit`, `Record`. Не пересоздаём.

---

## Стили (Tailwind)

### Порядок классов

Через `prettier-plugin-tailwindcss` — авто.
Грубо: layout → spacing → typography → colors →
effects → states.

```tsx
<div
  className="
  flex items-center gap-4 
  px-6 py-4 
  text-lg font-medium 
  bg-surface-1 text-text-primary 
  rounded-2xl shadow-md 
  hover:shadow-lg transition-shadow
"
/>
```

### Условные классы

Всегда через `cn()`:

```tsx
import { cn } from '@/lib/utils';

<button
  className={cn(
    'base-classes',
    isActive && 'active-classes',
    variant === 'primary' && 'primary-classes',
    className // внешние переопределения
  )}
/>;
```

### Длинные классы

Если строка > 80 символов — переносим на новые
строки (Tailwind работает с переносами).

### Не используем `@apply`

Кроме совсем базовых вещей в `globals.css`
(prose, типографика). Иначе — теряем
преимущества Tailwind.

---

## Ветки

### Стратегия

**Trunk-based с короткими feature-ветками.**

- `main` — продакшн, защищена
- `dev` — основная рабочая (опционально, можно без неё)
- `feat/...` — новые фичи
- `fix/...` — баги
- `chore/...` — служебные изменения

### Именование

```
feat/product-card-redesign
fix/header-mobile-overflow
chore/update-dependencies
docs/add-component-readme
```

### Жизненный цикл

1. От `main` отвели ветку
2. Коммитим небольшими порциями
3. Открываем PR в `main`
4. Code review (минимум 1 approval)
5. Squash merge
6. Удаление ветки

**Ветка живёт не более 3 дней.** Длиннее —
разбиваем задачу.

---

## Коммиты

**Conventional Commits** — обязательный формат:

```
<type>(<scope>): <subject>

<body, опционально>

<footer, опционально>
```

### Типы

- `feat` — новая функциональность
- `fix` — багфикс
- `refactor` — рефакторинг без изменения поведения
- `style` — форматирование, без логики
- `perf` — улучшение производительности
- `docs` — документация
- `chore` — служебные (зависимости, конфиги)
- `test` — тесты

### Примеры

```
feat(catalog): добавить фильтр по категориям
fix(header): исправить overflow на мобильных
refactor(products): вынести логику фильтрации в хук
docs: обновить дорожную карту
chore(deps): обновить next до 15.1.0
```

**Правила:**

- На русском или английском — главное единообразно
  внутри проекта. **Выбираем русский.**
- Subject — до 72 символов, без точки в конце
- Императив: «добавить», «исправить», не
  «добавлено», «исправил»
- Body — если нужно объяснить «почему»

---

## Pull Requests

### Шаблон описания

```markdown
## Что сделано

Короткий список изменений.

## Зачем

Контекст: какая задача решается.

## Как проверить

1. Открыть страницу X
2. Нажать на Y
3. Убедиться, что Z

## Скриншоты / видео

(для UI-изменений — обязательно)

## Чек-лист

- [ ] Код проходит линтер
- [ ] Типы корректны
- [ ] Адаптив проверен
- [ ] A11y проверен
- [ ] Lighthouse не упал
```

### Правила

- PR не больше **400 строк изменений** (не считая
  автогенерируемого)
- Если больше — разбиваем
- Описание обязательно (даже на короткие PR)
- Скриншоты для всех UI-изменений
- Линтер и тайпчек должны проходить (CI блокирует)

---

## Code Review

### Что смотрим

1. **Корректность** — работает ли вообще
2. **Читаемость** — понятно ли через месяц
3. **Соответствие конвенциям** — этот документ
4. **Безопасность** — нет ли утечек, XSS, и т.п.
5. **Производительность** — нет ли лишних ре-рендеров,
   тяжёлых вычислений в рендере
6. **A11y** — есть ли semantic HTML, ARIA, focus

### Как комментируем

- **Nit:** мелочь, можно проигнорировать («nit:
  лишний пробел»)
- **Suggestion:** предложение, обсудимо
- **Question:** уточнение, без давления
- **Blocking:** должно быть исправлено до мержа

Без префикса — обычное замечание.

### Тон

- Критикуем код, не человека
- «Я бы сделал...» вместо «Ты не подумал...»
- Если не уверен — задай вопрос, не утверждай
- Хвалим хорошие решения (это редко, но важно)

### Скорость

- Review в течение **1 рабочего дня**
- Если не успеваем — пишем «возьму завтра утром»
- Не блокируем разработку молчанием

---

## Структура импортов

Сортировка автоматически через ESLint. Группы
(между группами — пустая строка):

```ts
// 1. React и Next
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 2. Внешние библиотеки
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

// 3. Внутренние модули (alias @/)
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

// 4. Типы
import type { Product } from '@/types/product';

// 5. Стили (если есть)
import styles from './styles.module.css';
```

---

## Утилиты и хелперы

### Размещение

- **`/lib/`** — переиспользуемые утилиты для всего
  проекта (`cn`, форматирование дат, fetch-обёртки)
- **`/lib/{domain}.ts`** — доменная логика
  (`/lib/products.ts`, `/lib/reviews.ts`)
- **Локальные хелперы** — рядом с компонентом, если
  используются только им

### Чистые функции

Утилиты — без побочных эффектов, без зависимостей
от React. Чтобы можно было тестировать и
переиспользовать на сервере.

```ts
// ✅ хорошо
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
}

// ❌ плохо — содержит хук
export function useFormatPrice() { ... }
```

---

## Server vs Client

### По умолчанию — Server Component

Все компоненты — серверные, пока явно не указано
обратное.

### Client Component — когда нужен

- Хуки React (`useState`, `useEffect`, ...)
- Event handlers (`onClick`, `onChange`)
- Браузерные API (`window`, `localStorage`)
- Framer Motion компоненты с интерактивом

```tsx
'use client';

import { useState } from 'react';
// ...
```

### Граница

Делаем границу как можно ниже по дереву. Если
интерактив нужен в кнопке — клиентский только
саму кнопку, а не всю страницу.

---

## Доступность (a11y)

### Минимум

- Семантические теги (`<button>`, `<nav>`, `<article>`)
- Все интерактивные элементы достижимы клавиатурой
- Focus visible — обязательно
- Alt у всех картинок (пустой `alt=""` — для
  декоративных)
- Заголовки в иерархии (h1 → h2 → h3, без пропусков)
- Контраст не ниже AA (4.5:1 для текста)
- Form labels связаны с inputs (`htmlFor`)
- ARIA только когда нужно (semantic HTML важнее)

### Проверка

- Lighthouse Accessibility ≥ 95
- axe DevTools — без ошибок
- Tab по странице — всё работает
- Скрин-ридер тест хотя бы базовый

---

## Производительность

### Картинки

- Только `next/image`
- `sizes` всегда указан
- `priority` только для above-the-fold
- WebP/AVIF — next/image делает сам
- Lazy-loading по умолчанию (next/image)

### Динамические импорты

Для тяжёлых компонентов, которые не нужны сразу:

```tsx
const Lightbox = dynamic(() => import('@/components/Lightbox'), {
  ssr: false,
  loading: () => <Spinner />,
});
```

### Bundle size

- Раз в неделю — `@next/bundle-analyzer`
- Подозрительные большие зависимости — заменяем
  или импортируем точечно
- `lucide-react` — импорт по одной иконке,
  не всю библиотеку

---

## Безопасность

- **Не коммитим секреты** (`.env.local` в gitignore)
- Все env-переменные с префиксом `NEXT_PUBLIC_` —
  публичные, остальные — серверные
- Пользовательский ввод в формах валидируем
  через Zod на сервере (не доверяем клиенту)
- Внешние ссылки: `rel="noopener noreferrer"`
- Формы: rate-limiting + honeypot

---

## Git-хуки (Husky)

### Pre-commit

```bash
# через lint-staged
- eslint --fix
- prettier --write
- tsc --noEmit (по затронутым файлам)
```

### Pre-push

```bash
- npm run build (минимально)
```

Если хук тормозит — отключаем `pre-push`, оставляем
проверку в CI.

---

## CI (GitHub Actions)

На каждый PR:

1. Установка зависимостей
2. ESLint
3. TypeScript check
4. Build
5. (опционально) Lighthouse CI на preview-деплой

Без green CI — merge запрещён.

---

## Документация в коде

### JSDoc — для публичных утилит

```ts
/**
 * Форматирует цену в российских рублях.
 * @example formatPrice(4500) // "4 500 ₽"
 */
export function formatPrice(price: number): string {
  ...
}
```

### Комментарии — для сложной логики

- **Почему**, а не **что** (что и так видно по коду)
- Если код объясняет себя — комментарий не нужен
- TODO с указанием автора и контекста:
  `// TODO(name): добавить кэширование после v1.1`

### README в важных папках

- `/components/README.md` — как добавлять компоненты
- `/data/README.md` — как добавлять товары/отзывы
- `/content/README.md` — как писать статьи

---

## Запрещено

- ❌ `any` в типах
- ❌ `console.log` в коммитах (есть линт-правило)
- ❌ Прямой push в `main`
- ❌ Коммиты без префикса (`feat:`, `fix:`, ...)
- ❌ PR без описания
- ❌ Закомментированный код («потом удалю»)
- ❌ Мёртвый код (неиспользуемые импорты, функции)
- ❌ Inline-стили (`style={{ ... }}`) — только Tailwind
- ❌ `!important` в CSS
- ❌ `dangerouslySetInnerHTML` без явной необходимости
  и санитизации

---

## Чек-лист перед PR

- [ ] Код проходит ESLint (`npm run lint`)
- [ ] Типы корректны (`npm run typecheck`)
- [ ] Билд проходит (`npm run build`)
- [ ] Проверил на mobile/tablet/desktop
- [ ] Focus states работают
- [ ] Нет `console.log`, `// TODO без контекста`
- [ ] Коммиты в формате Conventional Commits
- [ ] PR описан по шаблону
- [ ] Скриншоты приложены (для UI)
- [ ] Self-review сделан

---

## Что делать, если правило мешает

Любое правило здесь — **обсуждаемо**. Если
конвенция реально мешает делать дело — поднимаем
вопрос, обсуждаем, меняем документ через PR.

**Но:** не нарушаем правило в коде без обсуждения.
Сначала меняем документ, потом код.

---

## Итог документации проекта

Это последний документ из десяти. Полный комплект:

1. ✅ `00-overview.md` — обзор и оглавление
2. ✅ `01-business-context.md` — бизнес-контекст
3. ✅ `02-tech-architecture.md` — техническая
   архитектура
4. ✅ `03-design-concept.md` — дизайн-концепция
   и токены
5. ✅ `04-content-strategy.md` — контент-стратегия
   и tone of voice
6. ✅ `05-roadmap.md` — дорожная карта
7. ✅ `06-component-library.md` — библиотека
   компонентов
8. ✅ `07-data-models.md` — модели данных
9. ✅ `08-conventions.md` — конвенции разработки
   _(этот документ)_
