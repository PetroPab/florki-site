# app/admin/

Панель администратора. Доступна только авторизованным пользователям.

## Авторизация

Пароль задаётся в переменной `ADMIN_PASSWORD`. Хранится в httpOnly-cookie `admin_token`.  
Middleware проверяет cookie на всех маршрутах `/admin/*` и `/api/admin/*`.

Войти: `/admin/login`  
Выйти: кнопка в сайдбаре → POST `/api/admin/logout`

---

## Компоненты форм

### `catalog/ProductForm.tsx`

Форма создания/редактирования товара. Поля:

- Название → авто-генерирует slug через `slugify` при создании
- Slug — только для чтения при редактировании
- Категория / статус / featured / цена / заметка к цене
- Описание (textarea) / уход (textarea)
- Размеры (ширина, высота, глубина, диаметр)
- Состав — теги с добавлением по Enter
- Фотографии — загрузка через Vercel Blob (`/api/admin/upload`)

Сохраняет через `PUT /api/admin/products`.

### `gallery/GalleryManager.tsx`

Управление галереей. Позволяет:

- Загрузить фото (Vercel Blob) с alt-текстом, подписью и датой
- Удалить запись из галереи (с подтверждением)

Сохраняет через `PUT /api/admin/gallery`.

### `articles/ArticleEditor.tsx`

Редактор статей. Поля:

- Заголовок → авто-генерирует slug через `slugify`
- Slug / мета-описание / дата / автор
- Теги (переключатели)
- Черновик (checkbox)
- Обложка — загрузка через Vercel Blob + ручной URL + alt
- Контент — большой textarea для MDX/Markdown с счётчиком слов

Сохраняет через `POST /api/admin/articles`.

---

## Поток сохранения контента

```
Форма → API Route → admin-content.ts
  dev:  → запись в файловую систему
  prod: → GitHub API (коммит в master) → Vercel Deploy Hook → деплой ~1 мин
```

---

## Переменные окружения для работы

```
ADMIN_PASSWORD=         # пароль для входа
BLOB_READ_WRITE_TOKEN=  # Vercel Blob — токен для загрузки файлов
GITHUB_TOKEN=           # GitHub PAT — для коммитов в прод
GITHUB_OWNER=           # владелец репозитория
GITHUB_REPO=            # название репозитория
GITHUB_BRANCH=          # ветка (master)
VERCEL_DEPLOY_HOOK=     # URL для триггера деплоя после сохранения
```
