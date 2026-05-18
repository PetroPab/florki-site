# app/api/

API-маршруты Next.js. Все возвращают JSON.

## Публичные маршруты

### `POST /api/contact`

Форма обратной связи со страницы `/kontakty`.

Тело запроса: `{ name, contact, message, consent }` — валидируется через `ContactFormSchema`.  
Отправляет письмо через Resend на `RESEND_TO`.

Переменные: `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_TO`

---

## Защищённые маршруты `/api/admin/*`

Все защищены middleware — требуют cookie `admin_token`.

### `POST /api/admin/login`

Тело: `{ password: string }`  
Сравнивает с `ADMIN_PASSWORD`, при совпадении устанавливает cookie `admin_token`.

### `POST /api/admin/logout`

Удаляет cookie `admin_token`. Редирект на `/admin/login`.

---

### `POST /api/admin/upload`

Загружает файл в Vercel Blob.

Тело: `FormData` с полями `file` (File) и `folder` (string, например `"gallery"` или `"products"`).  
Ответ: `{ url: string }` — публичный URL загруженного файла.

Переменная: `BLOB_READ_WRITE_TOKEN`

---

### `GET /api/admin/products`

Возвращает `products.json` как массив `Product[]`.

### `PUT /api/admin/products`

Тело: `{ products: Product[] }`  
Перезаписывает весь `products.json` через `writeDataFile`.

---

### `GET /api/admin/gallery`

Возвращает `gallery.json` как массив `GalleryItem[]`.

### `PUT /api/admin/gallery`

Тело: `{ items: GalleryItem[] }`  
Перезаписывает весь `gallery.json` через `writeDataFile`.

---

### `GET /api/admin/articles`

Возвращает список всех статей (slug + frontmatter).

### `POST /api/admin/articles`

Тело: `{ slug, frontmatter, content }`  
Сохраняет MDX-файл через `writeArticleFile`.

### `DELETE /api/admin/articles`

Query: `?slug=kak-uhazhivat`  
Удаляет MDX-файл через `deleteArticleFile`.

### `PATCH /api/admin/articles`

Query: `?slug=kak-uhazhivat`  
Возвращает содержимое одной статьи для редактирования.
