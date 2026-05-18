# 06. Библиотека компонентов

Спецификация всех UI-компонентов. Props, варианты,
примеры. Источник правды для разработки.

---

## Структура

```
/components
  /ui          — базовые примитивы
  /blocks      — композитные блоки
  /layout      — обвязка страницы
  /sections    — крупные секции главной
```

---

## UI: Button

**Файл:** `/components/ui/Button.tsx`

```tsx
type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string; // если есть — рендерим Link
  loading?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: ReactNode;
};
```

**Варианты:**

- `primary` — bg-primary (зелёный), белый текст
- `secondary` — bg-surface-2, тёмный текст, тонкая граница
- `ghost` — прозрачный, hover bg-surface-2

**Размеры:**

- `sm` — h-9, px-3, text-sm
- `md` — h-11, px-5, text-base (по умолчанию)
- `lg` — h-14, px-7, text-lg

**Поведение:** focus ring 2px primary, scale на active,
disabled opacity-50, loading — спиннер вместо иконки.

---

## UI: Badge

**Файл:** `/components/ui/Badge.tsx`

```tsx
type BadgeProps = {
  variant: 'in-stock' | 'on-order' | 'neutral';
  children: ReactNode;
};
```

- `in-stock` — bg-success/10, text-success
- `on-order` — bg-accent/10, text-accent
- `neutral` — bg-surface-2, text-text-muted

Компактный: h-6, px-2.5, rounded-full, text-xs.

---

## UI: Card

**Файл:** `/components/ui/Card.tsx`

```tsx
type CardProps = {
  variant?: 'default' | 'glass' | 'elevated';
  padding?: 'sm' | 'md' | 'lg' | 'none';
  hover?: boolean;
  children: ReactNode;
};
```

- `default` — bg-surface-1, border, rounded-2xl
- `glass` — backdrop-blur, semi-transparent, border
- `elevated` — bg-surface-1, shadow-lg

`hover={true}` — translate-y-[-2px], shadow-xl на hover.

---

## UI: Input / Textarea

**Файл:** `/components/ui/Input.tsx`

```tsx
type InputProps = {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel';
  error?: string;
  hint?: string;
  required?: boolean;
} & InputHTMLAttributes;
```

Структура: `<label>` → `<input>` → `<hint>` или `<error>`.
Лейбл всегда сверху. Error — text-error, под полем.
Focus: border-primary, ring-2 ring-primary/20.

`Textarea` — те же props, по умолчанию rows={4}.

---

## UI: Checkbox

**Файл:** `/components/ui/Checkbox.tsx`

```tsx
type CheckboxProps = {
  label: ReactNode; // может быть JSX (ссылка на оферту)
  name: string;
  error?: string;
};
```

Кастомный чекбокс через `peer`. Checked: bg-primary

- галочка SVG. Focus ring.

---

## UI: Heading

**Файл:** `/components/ui/Heading.tsx`

```tsx
type HeadingProps = {
  as: 'h1' | 'h2' | 'h3' | 'h4';
  size?: 'display' | 'h1' | 'h2' | 'h3' | 'h4';
  children: ReactNode;
};
```

Шрифт **всегда Fraunces**. Размер по `size`, не по `as`
(чтобы H2 мог выглядеть как H1).

Размеры из дизайн-токенов: display 56→80, h1 40→56,
h2 32→40, h3 24→28, h4 20.

---

## UI: Text

**Файл:** `/components/ui/Text.tsx`

```tsx
type TextProps = {
  size?: 'lg' | 'md' | 'sm';
  muted?: boolean;
  as?: 'p' | 'span' | 'div';
  children: ReactNode;
};
```

Шрифт Inter. lg=18, md=16, sm=14.
`muted` — text-text-muted.

---

## UI: Container

**Файл:** `/components/ui/Container.tsx`

```tsx
type ContainerProps = {
  size?: 'narrow' | 'default' | 'wide';
  children: ReactNode;
};
```

- `narrow` — max-w-2xl (для статей)
- `default` — max-w-6xl
- `wide` — max-w-7xl

Всегда mx-auto + px-4 md:px-6 lg:px-8.

---

## UI: Link

**Файл:** `/components/ui/Link.tsx`

Обёртка над `next/link`. Авто-определяет внешние
ссылки (по `http`), добавляет `target="_blank"`
и `rel="noopener"`.

Стили по умолчанию: text-primary, underline-offset-4,
hover:underline.

---

## Blocks: ProductCard

**Файл:** `/components/blocks/ProductCard.tsx`

```tsx
type ProductCardProps = {
  slug: string;
  name: string;
  image: string;
  imageAlt: string;
  price: number;
  status: 'in-stock' | 'on-order';
  dimensions?: string; // "Ø 15 × 12 см"
};
```

Структура:

- Image (aspect-square, object-cover, rounded-2xl)
- Hover: scale-105 на картинке, появление кнопки
- Badge статуса в правом верхнем углу
- Под фото: name (Fraunces, h3), dimensions (small muted),
  price (bold)
- Вся карточка — ссылка на `/katalog/{slug}`

---

## Blocks: ReviewCard

**Файл:** `/components/blocks/ReviewCard.tsx`

```tsx
type ReviewCardProps = {
  source: 'avito' | 'yandex' | '2gis' | 'telegram' | 'vk';
  author: string; // "Мария К."
  rating?: 1 | 2 | 3 | 4 | 5; // не у всех площадок
  date: string; // ISO
  text: string;
  originalUrl?: string;
};
```

- Сверху: лого площадки (16px) + название + звёзды
- Имя + дата
- Текст отзыва (если > 200 символов — «Показать полностью»)
- Ссылка «Открыть оригинал ↗» внизу

Glassmorphism card по умолчанию.

---

## Blocks: ArticleCard

**Файл:** `/components/blocks/ArticleCard.tsx`

```tsx
type ArticleCardProps = {
  slug: string;
  title: string;
  description: string;
  cover: string;
  coverAlt: string;
  date: string;
  readTime: number; // в минутах
  tags: string[];
};
```

Вертикальная карточка:

- Обложка (aspect-[4/3], rounded-t-2xl)
- Заголовок (Fraunces, h3, line-clamp-2)
- Description (Inter, sm, muted, line-clamp-2)
- Низ: дата + «{readTime} мин чтения» + теги (chips)

Ссылка → `/poleznoe/{slug}`.

---

## Blocks: GlassPanel

**Файл:** `/components/blocks/GlassPanel.tsx`

```tsx
type GlassPanelProps = {
  blur?: 'sm' | 'md' | 'lg';
  children: ReactNode;
};
```

Универсальная стеклянная плашка:

- backdrop-blur-{blur}
- bg-white/60 dark:bg-black/40
- border border-white/20
- rounded-2xl
- shadow-lg

Fallback для старых браузеров: bg-white/95 без blur.

---

## Blocks: Callout

**Файл:** `/components/blocks/Callout.tsx`

```tsx
type CalloutProps = {
  type: 'info' | 'tip' | 'warning';
  children: ReactNode;
};
```

- `info` — bg-info/10, border-info, иконка Info
- `tip` — bg-success/10, иконка Lightbulb
- `warning` — bg-accent/10, иконка AlertTriangle

Структура: иконка слева + контент справа, padding 4.

---

## Layout: Header

**Файл:** `/components/layout/Header.tsx`

- Sticky top-0, z-50
- На скролле > 20px → добавляется `glass` эффект
  (через `useScrollPosition` хук)
- Содержимое: логотип слева, меню по центру (desktop) /
  бургер справа (mobile), CTA-кнопка «Написать» справа

**Меню:** Каталог, Полезное, О студии, Контакты.

Активный пункт — text-primary + подчёркивание.

---

## Layout: MobileMenu

**Файл:** `/components/layout/MobileMenu.tsx`

Drawer справа, full-height, ширина 320px.

- Open: slide-in справа + backdrop blur
- Close: по клику на backdrop / X / Escape
- Внутри: вертикальный список ссылок (text-2xl Fraunces)
  - CTA внизу
- Body lock при открытии

Анимация через Framer Motion.

---

## Layout: Footer

**Файл:** `/components/layout/Footer.tsx`

3 колонки на desktop, стек на mobile:

1. Логотип + слоган + контакты (адрес, тел, email)
2. Навигация (повтор меню + правовые)
3. Соцсети (Telegram, ВК, иконки) + время работы

Низ: copyright + «Сделано с любовью в Ярославле».

---

## Layout: Section

**Файл:** `/components/layout/Section.tsx`

```tsx
type SectionProps = {
  spacing?: 'sm' | 'md' | 'lg';
  background?: 'default' | 'muted' | 'accent';
  children: ReactNode;
};
```

Вертикальные отступы:

- `sm` — py-12 md:py-16
- `md` — py-16 md:py-24 (по умолчанию)
- `lg` — py-24 md:py-32

Внутри — `<Container>` обёртка автоматически.

---

## Sections: Hero

**Файл:** `/components/sections/Hero.tsx`

Главный экран:

- Левая колонка (60%): H1 (display), подзаголовок,
  2 кнопки (primary «Смотреть каталог» + ghost «Связаться»)
- Правая колонка (40%): hero-фото в стеклянной
  рамке + плавающие частицы (light pattern)
- На mobile: фото снизу, текст сверху
- Min-height: 90vh на desktop, auto на mobile

---

## Sections: USP

**Файл:** `/components/sections/USP.tsx`

Сетка 4 колонки (desktop) / 2 (tablet) / 1 (mobile).
Каждый пункт: иконка Lucide (48px, primary) +
H4 заголовок + 1 строка описания.

Появление с stagger при скролле в viewport.

---

## Sections: FeaturedProducts

**Файл:** `/components/sections/FeaturedProducts.tsx`

- Заголовок секции + ссылка «Весь каталог →» справа
- Сетка ProductCard: 3 колонки desktop, 2 tablet,
  1 mobile
- Показываем 6 товаров (фильтр `featured: true`)

---

## Sections: ReviewsStrip

**Файл:** `/components/sections/ReviewsStrip.tsx`

Горизонтальная лента отзывов:

- Desktop: 3 карточки в ряд
- Mobile: горизонтальный скролл со snap

Внизу — CTA «Все отзывы →» (если планируется
отдельная страница).

---

## Sections: CTA

**Файл:** `/components/sections/CTA.tsx`

```tsx
type CTAProps = {
  title: string;
  description?: string;
  primaryAction: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
};
```

Большая секция перед футером:

- Фон: gradient или зелёный
- Заголовок (Fraunces, h1) по центру
- Подпись (опционально)
- 1–2 кнопки по центру

---

## Специальные компоненты

### ContactModal

**Файл:** `/components/modals/ContactModal.tsx`

Открывается на CTA «Написать»:

- 3 варианта связи: Telegram, WhatsApp, Email-форма
- Каждый — большая карточка с иконкой и описанием
- Email-форма раскрывается inline при клике
- Закрытие: X, Escape, клик вне

Анимация: fade + scale через Framer Motion.

### Lightbox

**Файл:** `/components/blocks/Lightbox.tsx`

Для галереи карточки товара:

- Открытие через `layoutId` (плавный переход
  миниатюры → fullscreen)
- Стрелки навигации (← →)
- Закрытие: X, Escape, swipe-down на mobile
- Счётчик «3 / 8» внизу

---

## MDX-компоненты

Доступны внутри статей через `mdx-components.tsx`:

- `Callout` (см. выше)
- `Gallery` — 2–4 фото в сетке
- `ProductCard` — встраивание карточки по slug
- `Quote` — цитата с большими кавычками

---

## Конвенции

1. **Все компоненты — функциональные**, без `class`
2. **Props — `type`, не `interface`** (для согласованности)
3. **Имена файлов = имена компонентов** (PascalCase)
4. **Один компонент = один файл**, экспорт по умолчанию
5. **Стили — Tailwind**, кастомный CSS только для
   сложных эффектов (glass, gradients)
6. **`cn()`** для условных классов (clsx + tailwind-merge)
7. **`'use client'`** только там, где нужен
   интерактив (модалки, формы, хуки)

---

## Чек-лист компонента

Перед мержем в `main`:

- [ ] TypeScript типы прописаны
- [ ] Адаптивность: mobile/tablet/desktop
- [ ] Focus state виден
- [ ] Hover state есть (где применимо)
- [ ] Disabled state есть (где применимо)
- [ ] Loading state есть (формы, кнопки)
- [ ] Accessibility: aria-labels, role, keyboard
- [ ] Анимации уважают `prefers-reduced-motion`
- [ ] Работает без JS (где это возможно)
