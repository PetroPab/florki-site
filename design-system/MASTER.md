# Дизайн-система «Флорки» — мастер-файл

Единственный источник правды по всем визуальным
токенам и правилам. Если в коде или Figma расходится
с этим файлом — прав этот файл.

**Связанные документы:**

- `../03-design-concept.md` — философия и mood
- `../06-component-library.md` — каталог компонентов
- `../08-conventions.md` — правила кода

---

## Содержание

1. [Принципы](#принципы)
2. [Цвета](#цвета)
3. [Типографика](#типографика)
4. [Spacing](#spacing)
5. [Border radius](#border-radius)
6. [Тени](#тени)
7. [Сетка и контейнеры](#сетка-и-контейнеры)
8. [Анимация](#анимация)
9. [Эффекты (стекло, градиенты)](#эффекты)
10. [Брейкпоинты](#брейкпоинты)
11. [Z-index слои](#z-index-слои)
12. [Иконки](#иконки)
13. [Картинки](#картинки)
14. [Состояния (hover, focus, disabled)](#состояния)
15. [Тёмная тема](#тёмная-тема)

---

## Принципы

1. **Воздух важнее декора.** Если сомневаешься —
   добавь spacing.
2. **Одна акцентная функция на блок.** Не больше
   одного «громкого» элемента на секцию.
3. **Типографика — главный декор.** Контраст
   размеров делает иерархию, а не цвет.
4. **Стекло — точечно.** Только Header, модалки,
   featured-карточки. Не больше 3 glass-элементов
   на экран.
5. **Цвет работает фоном.** Основная палитра —
   нейтрали. Зелень и тёплые акценты — точками.
6. **Движение — мягкое.** Никаких резких bounce,
   только ease-out.

---

## Цвета

### Палитра (light theme)

| Токен                    | HEX       | RGB         | Назначение                    |
| ------------------------ | --------- | ----------- | ----------------------------- |
| `--color-bg`             | `#FAF8F5` | 250 248 245 | Основной фон страницы         |
| `--color-bg-elevated`    | `#FFFFFF` | 255 255 255 | Карточки на фоне              |
| `--color-surface-1`      | `#F3EFE9` | 243 239 233 | Слой 1 поверх фона            |
| `--color-surface-2`      | `#E9E3D9` | 233 227 217 | Слой 2 (hover карточек)       |
| `--color-border`         | `#E0D9CC` | 224 217 204 | Стандартные границы           |
| `--color-border-strong`  | `#C4BBA8` | 196 187 168 | Усиленные границы             |
| `--color-text-primary`   | `#1F2419` | 31 36 25    | Основной текст                |
| `--color-text-secondary` | `#5C5F52` | 92 95 82    | Вторичный текст               |
| `--color-text-muted`     | `#8A8C7F` | 138 140 127 | Подписи, метаданные           |
| `--color-accent`         | `#3F5D3A` | 63 93 58    | Основной акцент (зелёный мох) |
| `--color-accent-hover`   | `#4F7048` | 79 112 72   | Hover акцента                 |
| `--color-accent-soft`    | `#E8EDE3` | 232 237 227 | Фон с акцентом                |
| `--color-warm`           | `#C68B5F` | 198 139 95  | Тёплый акцент (терракота)     |
| `--color-warm-soft`      | `#F0E1D2` | 240 225 210 | Фон тёплого акцента           |
| `--color-success`        | `#5A8F5C` | 90 143 92   | Успех                         |
| `--color-error`          | `#B85450` | 184 84 80   | Ошибка                        |
| `--color-warning`        | `#D4A04C` | 212 160 76  | Предупреждение                |

### Палитра (dark theme)

| Токен                    | HEX       | Назначение           |
| ------------------------ | --------- | -------------------- |
| `--color-bg`             | `#16181A` | Основной фон         |
| `--color-bg-elevated`    | `#1F2123` | Карточки             |
| `--color-surface-1`      | `#252729` | Слой 1               |
| `--color-surface-2`      | `#2D2F31` | Слой 2               |
| `--color-border`         | `#34363A` | Границы              |
| `--color-border-strong`  | `#4A4D52` | Усиленные границы    |
| `--color-text-primary`   | `#F0EDE6` | Основной текст       |
| `--color-text-secondary` | `#B5B3AB` | Вторичный текст      |
| `--color-text-muted`     | `#7E7C75` | Подписи              |
| `--color-accent`         | `#7FA876` | Акцент (адаптирован) |
| `--color-accent-hover`   | `#92B98A` | Hover                |
| `--color-accent-soft`    | `#2A3528` | Фон акцента          |
| `--color-warm`           | `#D9A07A` | Тёплый акцент        |
| `--color-warm-soft`      | `#3A2E25` | Фон тёплого          |
| `--color-success`        | `#7FA876` | Успех                |
| `--color-error`          | `#D47572` | Ошибка               |
| `--color-warning`        | `#E5B968` | Предупреждение       |

### Контраст (WCAG AA)

Все пары проверены на контраст ≥ 4.5:1 для текста,
≥ 3:1 для UI-элементов.

- `text-primary` на `bg`: **14.2:1** ✅
- `text-secondary` на `bg`: **6.8:1** ✅
- `text-muted` на `bg`: **3.9:1** — только для крупного текста
- `accent` на `bg`: **5.1:1** ✅
- `accent-soft` фон + `accent` текст: **4.7:1** ✅

### Использование

```tsx
// ✅ через Tailwind токены
<div className="bg-surface-1 text-text-primary border-border" />

// ❌ хардкод цветов
<div className="bg-[#F3EFE9] text-[#1F2419]" />
```

### Семантика применения

- **`bg`** — основной фон страницы и крупных секций
- **`bg-elevated`** — карточки, которые выделяются над фоном
- **`surface-1`** — секции с альтернативным фоном
- **`surface-2`** — hover-состояния карточек на `surface-1`
- **`accent`** — кнопки CTA, активные состояния, ссылки
- **`accent-soft`** — фон бейджей со статусом, hover ссылок
- **`warm`** — точечные декоративные акценты (иконки, дивайдеры), цена на карточке товара

---

## Типографика

### Шрифты

**Display (заголовки):** Fraunces

- Подключение: `next/font/google`
- Веса: 400, 500, 600
- `font-display: swap`
- Поддержка кириллицы: да
- Optical Size axis: 14–144

**Body (основной текст):** Inter

- Подключение: `next/font/google`
- Веса: 400, 500, 600
- `font-display: swap`
- Поддержка кириллицы: да

**Mono (редко):** JetBrains Mono или системный

- Для цен, артикулов, метаданных

### Размеры (type scale)

Шкала на базе 1.250 (Major Third), адаптивная
через `clamp()`.

| Токен            | Размер                                               | Использование      |
| ---------------- | ---------------------------------------------------- | ------------------ |
| `text-display-1` | `clamp(3rem, 5vw + 1rem, 5.5rem)` (48–88px)          | Hero заголовок     |
| `text-display-2` | `clamp(2.5rem, 4vw + 1rem, 4rem)` (40–64px)          | H1 страниц         |
| `text-h1`        | `clamp(2rem, 3vw + 0.5rem, 3rem)` (32–48px)          | H1 в контенте      |
| `text-h2`        | `clamp(1.625rem, 2vw + 0.5rem, 2.25rem)` (26–36px)   | H2 секций          |
| `text-h3`        | `clamp(1.375rem, 1.5vw + 0.5rem, 1.75rem)` (22–28px) | H3 подсекций       |
| `text-h4`        | `1.25rem` (20px)                                     | H4                 |
| `text-lg`        | `1.125rem` (18px)                                    | Lead текст         |
| `text-base`      | `1rem` (16px)                                        | Основной текст     |
| `text-sm`        | `0.875rem` (14px)                                    | Вторичный текст    |
| `text-xs`        | `0.75rem` (12px)                                     | Метаданные, лейблы |

### Веса

- `font-normal` (400) — основной текст
- `font-medium` (500) — акценты, кнопки
- `font-semibold` (600) — заголовки

**Не используем 700+** — слишком тяжёлый для нашего mood.

### Line-height

| Назначение                         | Значение |
| ---------------------------------- | -------- |
| Display (`display-1`, `display-2`) | `1.05`   |
| H1, H2                             | `1.15`   |
| H3, H4                             | `1.25`   |
| Body (long-form, статьи)           | `1.7`    |
| Body (UI, карточки)                | `1.5`    |
| Caption (`text-xs`)                | `1.4`    |

### Letter-spacing

- Display: `-0.02em` (тайтовый)
- H1, H2: `-0.015em`
- H3, H4: `-0.005em`
- Body: `0` (натуральный)
- Caption / UPPERCASE labels: `0.05em` (расширенный)

### Иерархия в коде

```tsx
// Display (только hero)
<h1 className="font-display text-display-1 leading-[1.05] tracking-[-0.02em] text-text-primary">

// H1 страницы
<h1 className="font-display text-display-2 leading-[1.05] tracking-[-0.02em] text-text-primary">

// H2 секции
<h2 className="font-display text-h2 leading-[1.15] tracking-[-0.015em] text-text-primary">

// H3 подсекции
<h3 className="font-display text-h3 leading-[1.25] text-text-primary">

// Lead-текст
<p className="text-lg leading-[1.6] text-text-secondary">

// Body
<p className="text-base leading-[1.7] text-text-secondary">

// Caption
<span className="text-xs uppercase tracking-[0.05em] text-text-muted">
```

### Правила

- **Один display на страницу** (только hero на главной)
- **Не пропускаем уровни** заголовков (h1 → h2 → h3)
- **Длина строки** для long-form (статьи): 60–75 символов
  (`max-w-prose` в Tailwind)
- **Длина строки** для UI-контента: до 90 символов
- **Не центруем длинные тексты** (только короткие в hero)

---

## Spacing

База: **4px** (0.25rem). Все отступы кратны базе.

### Шкала

| Токен Tailwind | Значение | Использование                 |
| -------------- | -------- | ----------------------------- |
| `0.5`          | 2px      | Hairline gaps                 |
| `1`            | 4px      | Минимум между связанными      |
| `2`            | 8px      | Между близкими элементами     |
| `3`            | 12px     | Внутри компактных компонентов |
| `4`            | 16px     | Стандарт внутри карточек      |
| `5`            | 20px     | Между связанными блоками      |
| `6`            | 24px     | Между блоками                 |
| `8`            | 32px     | Между независимыми элементами |
| `10`           | 40px     | Между подсекциями             |
| `12`           | 48px     | Между секциями (mobile)       |
| `16`           | 64px     | Между секциями (tablet)       |
| `20`           | 80px     | Между секциями (desktop)      |
| `24`           | 96px     | Между крупными секциями       |
| `32`           | 128px    | Hero-отступы                  |

### Правила

- **Padding карточки:** `p-6` (24px) на mobile, `p-8` (32px) на desktop
- **Gap между карточками в гриде:** `gap-4` (mobile), `gap-6` (desktop)
- **Padding секции (вертикальный):**
  - Mobile: `py-16` (64px)
  - Tablet: `py-20` (80px)
  - Desktop: `py-24` или `py-32`
- **Padding контейнера (горизонтальный):**
  - Mobile: `px-5` (20px)
  - Tablet: `px-8` (32px)
  - Desktop: `px-12` (48px)

### Между элементами текста

- Заголовок → подзаголовок: `mt-3` (12px)
- Заголовок → параграф: `mt-4` (16px)
- Между параграфами: `mt-6` (24px) или `space-y-6`
- Секция → заголовок секции: `mb-10` (mobile), `mb-12` (desktop)

---

## Border radius

| Токен          | Значение | Использование                      |
| -------------- | -------- | ---------------------------------- |
| `rounded-none` | 0        | Никогда (только специальные кейсы) |
| `rounded-sm`   | 4px      | Бейджи, теги                       |
| `rounded`      | 8px      | Инпуты, мелкие кнопки              |
| `rounded-md`   | 12px     | Стандартные кнопки                 |
| `rounded-lg`   | 16px     | Средние карточки                   |
| `rounded-xl`   | 20px     | Крупные карточки                   |
| `rounded-2xl`  | 24px     | Featured-карточки, модалки         |
| `rounded-3xl`  | 32px     | Hero-блоки, фичеред-секции         |
| `rounded-full` | 9999px   | Кнопки-пилюли, аватары, статусы    |

### Правила

- **Карточки товаров:** `rounded-2xl` (24px)
- **Кнопки primary/secondary:** `rounded-full` (пилюли)
- **Кнопки tertiary/ghost:** `rounded-md` (12px)
- **Инпуты:** `rounded-lg` (16px) для крупных, `rounded-md` для компактных
- **Изображения внутри карточек:** наследуют радиус карточки сверху, скруглены снизу или нет — зависит от композиции

---

## Тени

Тени — **мягкие, многослойные**. Никаких резких
теней под 90°.

```css
--shadow-xs: 0 1px 2px rgba(20, 25, 15, 0.04);
--shadow-sm: 0 2px 4px rgba(20, 25, 15, 0.04), 0 1px 2px rgba(20, 25, 15, 0.06);
--shadow-md:
  0 4px 12px rgba(20, 25, 15, 0.06), 0 2px 4px rgba(20, 25, 15, 0.04);
--shadow-lg:
  0 12px 32px rgba(20, 25, 15, 0.08), 0 4px 8px rgba(20, 25, 15, 0.04);
--shadow-xl:
  0 24px 48px rgba(20, 25, 15, 0.12), 0 8px 16px rgba(20, 25, 15, 0.06);
--shadow-glass:
  0 8px 32px rgba(20, 25, 15, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.4);
```

### Использование

| Токен Tailwind | Использование                               |
| -------------- | ------------------------------------------- |
| `shadow-xs`    | Бейджи, статусы                             |
| `shadow-sm`    | Hover на ссылках                            |
| `shadow-md`    | Карточки в обычном состоянии                |
| `shadow-lg`    | Карточки в hover, sticky-header при скролле |
| `shadow-xl`    | Модалки, dropdown-меню                      |
| `shadow-glass` | Glass-компоненты                            |

### Правила

- Hover карточки: `shadow-md → shadow-lg` с
  transition `200ms ease-out`
- На тёмной теме тени слабее (opacity ниже в 2 раза)
- **Не используем `drop-shadow`** для текста или
  иконок (только `shadow` для блоков)

---

## Сетка и контейнеры

### Container

```tsx
// Стандартный контейнер
<div className="mx-auto w-full max-w-[1280px] px-5 md:px-8 lg:px-12">

// Узкий (для статей)
<div className="mx-auto w-full max-w-[720px] px-5 md:px-8">

// Широкий (для hero, full-bleed секций)
<div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-12">
```

### Grid

12-колоночная сетка, gap зависит от брейкпоинта:

```tsx
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
```

### Типовые гриды

- **Каталог товаров:** 1 / 2 / 3 / 4 колонки
  (mobile / sm / lg / xl)
- **Статьи:** 1 / 2 / 3 колонки (mobile / md / lg)
- **Отзывы:** 1 / 2 колонки (mobile / md)
- **USP-блоки:** 1 / 2 / 4 колонки

---

## Анимация

### Easing

```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

**По умолчанию: `ease-out`.** `spring` — точечно
(модалки, появление).

### Длительности

| Токен          | Значение | Использование                              |
| -------------- | -------- | ------------------------------------------ |
| `duration-150` | 150ms    | Микро (hover на ссылках, лёгкий fade)      |
| `duration-200` | 200ms    | Стандарт (hover карточек, кнопки)          |
| `duration-300` | 300ms    | Средняя (открытие dropdown, smooth scroll) |
| `duration-500` | 500ms    | Крупная (открытие модалки, drawer)         |
| `duration-700` | 700ms    | Появление при скролле                      |

### Стандартные паттерны

**Hover карточки:**

```tsx
className =
  'transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg';
```

**Появление при скролле (Framer Motion):**

```tsx
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: '-100px' }}
transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
```

**Stagger детей:**

```tsx
transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
```

**Открытие модалки:**

```tsx
initial={{ opacity: 0, scale: 0.96 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
```

### Reduced motion

```tsx
// В layout.tsx или globals
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Framer Motion уважает `useReducedMotion()` —
используем в компонентах с интенсивным движением.

---

## Эффекты

### Glassmorphism

**Только** для:

- Header при скролле
- Модалки (поверх затемнения)
- Featured product card (1 шт)
- Lightbox toolbar

**Рецепт:**

```css
.glass {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: var(--shadow-glass);
}

.dark .glass {
  background: rgba(31, 33, 35, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

Tailwind:

```tsx
<div className="bg-white/60 backdrop-blur-xl backdrop-saturate-150 border border-white/40 shadow-glass dark:bg-bg-elevated/70 dark:border-white/10" />
```

**Запреты:**

- Не более 3 glass на экран
- Не на основном фоне страницы
- Не для текстовых блоков без фонового изображения
  (теряет смысл)

### Градиенты

**Mesh-градиент для hero** (точечно, 1 раз на сайт):

```css
background:
  radial-gradient(at 20% 30%, rgba(63, 93, 58, 0.08) 0px, transparent 50%),
  radial-gradient(at 80% 20%, rgba(198, 139, 95, 0.06) 0px, transparent 50%),
  radial-gradient(at 60% 80%, rgba(63, 93, 58, 0.04) 0px, transparent 50%);
```

**Линейный градиент для overlay на изображениях:**

```css
background: linear-gradient(
  to top,
  rgba(20, 25, 15, 0.6) 0%,
  rgba(20, 25, 15, 0) 60%
);
```

### Noise texture (опционально)

Лёгкая SVG-текстура шума поверх hero для
органичности. Opacity 0.03–0.05. Может быть
позже, не на этапе фундамента.

---

## Брейкпоинты

Tailwind defaults + один кастомный:

| Токен     | Значение | Целевое устройство               |
| --------- | -------- | -------------------------------- |
| (default) | 0+       | Mobile                           |
| `sm:`     | 640px+   | Большие телефоны, малые планшеты |
| `md:`     | 768px+   | Планшеты                         |
| `lg:`     | 1024px+  | Малые ноутбуки                   |
| `xl:`     | 1280px+  | Десктоп                          |
| `2xl:`    | 1536px+  | Большие экраны                   |

### Mobile-first

Всегда пишем базовые стили под mobile, потом
расширяем через `md:`, `lg:`:

```tsx
// ✅ хорошо
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" />

// ❌ плохо
<div className="grid grid-cols-3 max-md:grid-cols-1" />
```

### Тестовые ширины

- 375px (iPhone SE)
- 768px (iPad portrait)
- 1024px (iPad landscape, малый ноут)
- 1440px (стандартный десктоп)
- 1920px (большой монитор)

---

## Z-index слои

```css
--z-base: 0;
--z-dropdown: 100;
--z-sticky: 200;
--z-fixed: 300;
--z-overlay: 400;
--z-modal: 500;
--z-popover: 600;
--z-toast: 700;
--z-tooltip: 800;
```

### Использование

| Слой         | z-index | Что                           |
| ------------ | ------- | ----------------------------- |
| `z-base`     | 0       | Обычный контент               |
| `z-dropdown` | 100     | Dropdown в шапке              |
| `z-sticky`   | 200     | Sticky header, sticky filters |
| `z-fixed`    | 300     | Floating CTA, scroll-to-top   |
| `z-overlay`  | 400     | Затемнение под модалкой       |
| `z-modal`    | 500     | Модалки, drawer               |
| `z-popover`  | 600     | Popover, lightbox             |
| `z-toast`    | 700     | Тосты, уведомления            |
| `z-tooltip`  | 800     | Tooltip                       |

### Правила

- **Не используем z-index «от балды».** Только
  из этой шкалы.
- Внутри слоя — относительные значения
  (`z-modal + 1`), не абсолютные.
- Если нужен новый слой — добавляем в этот файл,
  потом в код.

---

## Иконки

### Источник

**Lucide React** — единственный разрешённый набор.

### Размеры

| Контекст                       | Размер            |
| ------------------------------ | ----------------- |
| Inline в тексте                | `16px`            |
| Стандарт (кнопки, навигация)   | `20px`            |
| Крупные (фичи, USP)            | `24px`            |
| Очень крупные (иллюстративные) | `32px` или `40px` |

### Толщина обводки

`strokeWidth={1.5}` по умолчанию — тоньше, чем
дефолт Lucide (2), но не такие тонкие как 1.
Соответствует общему mood.

```tsx
<Heart size={20} strokeWidth={1.5} />
```

### Цвет

- Inline в тексте — наследует `currentColor`
- Декоративные — `text-accent` или `text-warm`
- В кнопках — `currentColor` (наследует от кнопки)

### Семантика

- Если иконка несёт смысл (не декоративная) —
  обязательно `aria-label` или `<span class="sr-only">`
- Декоративные — `aria-hidden="true"`

---

## Картинки

### Форматы

- **Контентные фото:** WebP / AVIF (next/image конвертит)
- **Иллюстрации, иконки:** SVG
- **Фавикон:** ICO + PNG + SVG

### Соотношения сторон

| Контекст                  | Aspect ratio                      |
| ------------------------- | --------------------------------- |
| Карточка товара           | `4 / 5` (вертикаль)               |
| Featured product          | `3 / 4`                           |
| Галерея в карточке товара | `1 / 1` (квадрат)                 |
| Hero на главной           | `16 / 9` или `21 / 9` (cinematic) |
| Превью статьи             | `16 / 10`                         |
| OG image                  | `1200 × 630`                      |

### Размеры

`sizes` в `next/image` — обязательно:

```tsx
// Карточка в гриде
<Image
  src="..."
  alt="..."
  fill
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="object-cover"
/>

// Hero на всю ширину
<Image
  src="..."
  alt="..."
  priority
  fill
  sizes="100vw"
  className="object-cover"
/>
```

### Качество

- По умолчанию `quality={85}`
- Для hero и featured — `quality={90}`
- Для thumbnail (карточек) — `quality={80}`

### Placeholder

- Для важных изображений — `placeholder="blur"`
  с `blurDataURL`
- Для остальных — нативный browser lazy +
  скелетон рамки через background-color

### Alt-тексты

- **Контентные:** описывают суть («Флорариум с
  мохом и папоротниками в стеклянной вазе»)
- **Декоративные:** `alt=""` (пустой)
- **Не дублируем** окружающий текст
- **Без слов** «изображение», «фото», «картинка»

---

## Состояния

### Hover

**Кнопки primary:**

```tsx
'bg-accent hover:bg-accent-hover transition-colors duration-200';
```

**Кнопки tertiary / links:**

```tsx
'text-accent hover:text-accent-hover hover:underline underline-offset-4';
```

**Карточки:**

```tsx
'transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg';
```

**Изображения в карточках:**

```tsx
'transition-transform duration-500 ease-out group-hover:scale-105';
```

### Focus

**Обязательно для всех интерактивных элементов:**

```tsx
'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg';
```

В тёмной теме: `dark:focus-visible:ring-offset-bg`

### Active

Лёгкое уменьшение для тактильности:

```tsx
'active:scale-[0.98] transition-transform duration-100';
```

### Disabled

```tsx
'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';
```

### Loading

- Кнопки: спиннер слева от текста, текст не
  меняется (или меняется на «Отправка…»)
- Карточки: skeleton с легким shimmer
- Страницы: `loading.tsx` с центрированным
  спиннером

### Empty state

```tsx
<div className="flex flex-col items-center gap-4 py-16 text-center">
  <Icon size={40} className="text-text-muted" strokeWidth={1.5} />
  <p className="text-text-secondary">Здесь пока пусто</p>
  <Button variant="tertiary">Действие</Button>
</div>
```

---

## Тёмная тема

### Подключение

Через `class` стратегию Tailwind:

```js
// tailwind.config.ts
darkMode: 'class';
```

Toggle через `next-themes`:

```tsx
import { ThemeProvider } from 'next-themes';

<ThemeProvider attribute="class" defaultTheme="system">
  {children}
</ThemeProvider>;
```

### Правила

- **Все цвета** определены и для light, и для dark
- **Тени** на dark — мягче (opacity ниже)
- **Glassmorphism** на dark — другая прозрачность
- **Картинки** — затемняем на 5–10% через overlay
  (опционально)
- **Тестируем каждую страницу** в обеих темах

### CSS-переменные

```css
:root {
  --color-bg: 250 248 245;
  /* ... все остальные в формате RGB через пробел */
}

.dark {
  --color-bg: 22 24 26;
  /* ... */
}
```

В Tailwind:

```js
colors: {
  bg: 'rgb(var(--color-bg) / <alpha-value>)',
}
```

Это позволяет писать `bg-bg/80` для прозрачности.

---

## Чек-лист соответствия

Перед мержем PR с UI-изменениями — проверь:

- [ ] Все цвета из палитры (нет хардкода)
- [ ] Spacing кратен 4px (нет `px-[13px]`)
- [ ] Border-radius из шкалы
- [ ] Тени из шкалы
- [ ] Шрифты — Fraunces (display) и Inter (body)
- [ ] Размеры текста из шкалы
- [ ] Анимации с правильным easing
- [ ] Focus-стили на всех интерактивных
- [ ] Контраст AA проверен
- [ ] Hover/active/disabled состояния есть
- [ ] Работает в светлой и тёмной теме
- [ ] Адаптив: 375 / 768 / 1024 / 1440 проверен
- [ ] Картинки через `next/image` с `sizes`
- [ ] Иконки Lucide со `strokeWidth={1.5}`
- [ ] Reduced-motion уважается

---

## Готовые рецепты

### Premium-карточка товара

```tsx
<article
  className="
  group relative overflow-hidden 
  rounded-2xl bg-bg-elevated 
  border border-border 
  shadow-md hover:shadow-lg 
  transition-all duration-200 ease-out 
  hover:-translate-y-1
"
>
  <div className="aspect-[4/5] overflow-hidden">
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
    />
  </div>
  <div className="p-6 md:p-7">
    <h3 className="font-display text-h4 text-text-primary">{name}</h3>
    <p className="mt-2 text-sm text-text-secondary">{description}</p>
    <p className="mt-4 font-display text-h3 text-warm">{formatPrice(price)}</p>
  </div>
</article>
```

### Glass-header при скролле

```tsx
<header
  className={cn(
    'fixed top-0 inset-x-0 z-sticky transition-all duration-300',
    scrolled
      ? 'bg-white/60 backdrop-blur-xl backdrop-saturate-150 border-b border-white/40 shadow-glass dark:bg-bg-elevated/70 dark:border-white/10'
      : 'bg-transparent'
  )}
>
  {/* ... */}
</header>
```

### Hero с mesh-градиентом

```tsx
<section
  className="
  relative overflow-hidden
  bg-bg
  pt-32 pb-20 md:pt-40 md:pb-32
"
>
  {/* Mesh gradient */}
  <div
    className="absolute inset-0 -z-10 opacity-60"
    style={{
      background: `
        radial-gradient(at 20% 30%, rgba(63, 93, 58, 0.08) 0px, transparent 50%),
        radial-gradient(at 80% 20%, rgba(198, 139, 95, 0.06) 0px, transparent 50%),
        radial-gradient(at 60% 80%, rgba(63, 93, 58, 0.04) 0px, transparent 50%)
      `,
    }}
  />

  <Container>
    <h1 className="font-display text-display-1 leading-[1.05] tracking-[-0.02em] text-text-primary">
      Живые экосистемы под стеклом
    </h1>
    {/* ... */}
  </Container>
</section>
```

### Premium-кнопка

```tsx
<button
  className="
  inline-flex items-center justify-center gap-2
  px-7 py-3.5
  font-medium text-base
  bg-accent text-white
  rounded-full
  shadow-sm hover:shadow-md
  transition-all duration-200 ease-out
  hover:bg-accent-hover hover:-translate-y-0.5
  active:translate-y-0 active:scale-[0.98]
  focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg
  disabled:opacity-50 disabled:cursor-not-allowed
"
>
  Заказать флорариум
  <ArrowRight size={18} strokeWidth={1.5} />
</button>
```

---

## Эволюция системы

Этот файл — **живой**. Меняется по мере роста
проекта.

### Когда меняем

- Появилась повторяющаяся утилита, которую нет в системе
- Цвет/размер/радиус используется в 3+ местах с
  одним значением — выносим в токен
- Что-то не работает на практике — фиксим

### Как меняем

1. Обновляем этот файл
2. Обновляем `tailwind.config.ts` / `globals.css`
3. Если breaking — обновляем существующий код
4. Коммит: `feat(design-system): описание изменения`

### Что НЕ меняем

- Основную палитру (зелёный + терракота + кремовый)
- Семейство шрифтов (Fraunces + Inter)
- Базу spacing (4px)
- Mobile-first подход

Эти решения — фундамент. Их меняем только при
полном ребрендинге.

---

## Финал

Дизайн-система — это не «правила, которые ограничивают»,
а **общий язык**, на котором говорит команда.
Если хочется отклониться — сначала обсуждаем,
потом меняем систему, потом код. Никогда наоборот.

**Если правило мешает делать дело — меняем правило,
не нарушаем его.**
