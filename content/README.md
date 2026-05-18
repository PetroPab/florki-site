# content/

Текстовый контент сайта в формате MDX. Редактируется через админку (`/admin/articles`) или вручную.

## Структура

```
content/
└── articles/       ← статьи раздела /poleznoe
    └── *.mdx
```

## Формат статьи (MDX)

Каждый файл — это frontmatter (YAML) + тело в Markdown/MDX.

```mdx
---
title: Как ухаживать за закрытым флорариумом
description: Краткое описание для поисковиков (20–200 символов)
cover: https://....public.blob.vercel-storage.com/articles/cover.jpg
coverAlt: Закрытый флорариум на подоконнике
date: '2024-11-01'
tags: ['uhod']
author: Флорки # необязательно
draft: false # true = не показывать на сайте
---

## Введение

Текст статьи в формате Markdown...
```

### Поля frontmatter (тип `ArticleFrontmatter`, см. `types/article.ts`)

| Поле          | Обязательно | Описание                                          |
| ------------- | ----------- | ------------------------------------------------- |
| `title`       | да          | Заголовок статьи                                  |
| `description` | да          | Мета-описание, 20–200 символов                    |
| `cover`       | да          | URL обложки (Vercel Blob)                         |
| `coverAlt`    | да          | Alt-текст обложки                                 |
| `date`        | да          | Дата публикации `YYYY-MM-DD`                      |
| `tags`        | да          | Массив тегов: `uhod`, `osnovy`, `idei`, `process` |
| `author`      | нет         | Автор, по умолчанию «Флорки»                      |
| `draft`       | нет         | `true` скрывает статью с сайта                    |
| `updatedAt`   | нет         | Дата последнего обновления                        |

## Именование файлов

Имя файла = слаг статьи = URL страницы.  
Пример: `kak-uhazhivat-za-florariumom.mdx` → `/poleznoe/kak-uhazhivat-za-florariumom`

Слаг назначается при создании и **не меняется** (влияет на SEO).

## Изображения в тексте

Обложки и фото в тексте статей хранятся в Vercel Blob.  
Загрузить можно через админку: `/admin/articles/{slug}`.

## MDX-компоненты

Доступны все стандартные Markdown-элементы плюс компоненты из `mdx-components.tsx`:

- `Callout` — выделенный блок с иконкой
- `GlassPanel` — стеклянная панель
- Стандартные `img` → автоматически через `next/image`
