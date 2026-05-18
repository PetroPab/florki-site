'use client';

import { useState, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Loader2, Upload } from 'lucide-react';
import slugify from 'slugify';

import type { ArticleFrontmatter, ArticleTag } from '@/types/article';

const TAGS: { value: ArticleTag; label: string }[] = [
  { value: 'uhod', label: 'Уход' },
  { value: 'osnovy', label: 'Основы' },
  { value: 'idei', label: 'Идеи' },
  { value: 'process', label: 'Процесс' },
];

type ArticleEditorProps = {
  initialSlug?: string;
  initialFrontmatter?: Partial<ArticleFrontmatter>;
  initialContent?: string;
  isNew?: boolean;
};

export function ArticleEditor({
  initialSlug = '',
  initialFrontmatter = {},
  initialContent = '',
  isNew = false,
}: ArticleEditorProps) {
  const router = useRouter();

  const [slug, setSlug] = useState(initialSlug);
  const [title, setTitle] = useState(initialFrontmatter.title ?? '');
  const [description, setDescription] = useState(
    initialFrontmatter.description ?? ''
  );
  const [cover, setCover] = useState(initialFrontmatter.cover ?? '');
  const [coverAlt, setCoverAlt] = useState(initialFrontmatter.coverAlt ?? '');
  const [date, setDate] = useState(
    initialFrontmatter.date ?? new Date().toISOString().slice(0, 10)
  );
  const [author, setAuthor] = useState(initialFrontmatter.author ?? '');
  const [tags, setTags] = useState<ArticleTag[]>(initialFrontmatter.tags ?? []);
  const [draft, setDraft] = useState(initialFrontmatter.draft ?? false);
  const [content, setContent] = useState(initialContent);

  const [coverPreview, setCoverPreview] = useState<string | null>(
    initialFrontmatter.cover ?? null
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const coverRef = useRef<HTMLInputElement>(null);

  function handleTitleChange(val: string) {
    setTitle(val);
    if (isNew) {
      setSlug(slugify(val, { lower: true, strict: true, locale: 'ru' }));
    }
  }

  function toggleTag(tag: ArticleTag) {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  async function handleCoverUpload(file: File) {
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('folder', 'articles');
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: form,
      });
      const data = (await res.json()) as { url: string };
      setCover(data.url);
      setCoverPreview(data.url);
    } catch {
      setError('Ошибка загрузки обложки');
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) {
      setError('Заполните заголовок и слаг');
      return;
    }
    setError('');
    setSaving(true);

    try {
      const frontmatter: ArticleFrontmatter = {
        title,
        description,
        cover,
        coverAlt,
        date,
        tags,
        ...(author ? { author } : {}),
        ...(draft ? { draft } : {}),
      };

      await fetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, frontmatter, content }),
      });

      router.push('/admin/articles');
      router.refresh();
    } catch {
      setError('Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {/* Мета */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-medium text-gray-900">Мета</h2>

        <Field label="Заголовок">
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className={inputCls}
            placeholder="Как ухаживать за закрытым флорариумом"
          />
        </Field>

        <Field label="Слаг (URL)">
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            readOnly={!isNew}
            className={`${inputCls} ${!isNew ? 'bg-gray-50 text-gray-500' : ''}`}
            placeholder="kak-uhazhivat-za-florariumom"
          />
          {!isNew && (
            <p className="text-xs text-gray-400 mt-1">
              Слаг нельзя изменить после создания
            </p>
          )}
        </Field>

        <Field label="Описание (meta description)">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className={`${inputCls} resize-none`}
            placeholder="Краткое описание для поисковиков..."
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Дата публикации">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Автор">
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className={inputCls}
              placeholder="Флорки"
            />
          </Field>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Теги</p>
          <div className="flex flex-wrap gap-2">
            {TAGS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => toggleTag(value)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition ${
                  tags.includes(value)
                    ? 'bg-accent text-white border-accent'
                    : 'border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={draft}
            onChange={(e) => setDraft(e.target.checked)}
            className="w-4 h-4 accent-accent rounded"
          />
          <span className="text-sm text-gray-700">
            Черновик (не показывать на сайте)
          </span>
        </label>
      </section>

      {/* Обложка */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-medium text-gray-900">Обложка</h2>

        <div className="flex gap-4 flex-col sm:flex-row">
          <button
            type="button"
            onClick={() => coverRef.current?.click()}
            disabled={uploading}
            className="flex-shrink-0 w-full sm:w-48 h-28 rounded-xl border-2 border-dashed border-gray-200 hover:border-accent hover:bg-accent/5 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-accent transition overflow-hidden disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : coverPreview ? (
              <Image
                src={coverPreview}
                alt="cover"
                width={192}
                height={112}
                className="w-full h-full object-cover"
                unoptimized
              />
            ) : (
              <>
                <Upload size={18} />
                <span className="text-xs">Загрузить обложку</span>
              </>
            )}
          </button>
          <input
            ref={coverRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void handleCoverUpload(f);
              e.target.value = '';
            }}
          />

          <div className="flex-1 space-y-3">
            <p className="text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2 leading-relaxed">
              📐 1200 × 630 px (соотношение 16:9)
              <br />
              📦 Максимум 2 МБ · JPG или PNG
            </p>
            <Field label="URL обложки">
              <input
                type="text"
                value={cover}
                onChange={(e) => {
                  setCover(e.target.value);
                  setCoverPreview(e.target.value || null);
                }}
                className={inputCls}
                placeholder="/images/articles/.../cover.webp"
              />
            </Field>
            <Field label="Alt обложки">
              <input
                type="text"
                value={coverAlt}
                onChange={(e) => setCoverAlt(e.target.value)}
                className={inputCls}
                placeholder="Закрытый флорариум на подоконнике"
              />
            </Field>
          </div>
        </div>
      </section>

      {/* Контент MDX */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-gray-900">
            Контент (MDX / Markdown)
          </h2>
          <span className="text-xs text-gray-400">
            {content.split(/\s+/).filter(Boolean).length} слов
          </span>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={24}
          className={`${inputCls} resize-y font-mono text-xs leading-relaxed`}
          placeholder={
            '## Введение\n\nНапишите текст статьи в формате Markdown...\n\n## Раздел\n\nТекст раздела.'
          }
          spellCheck
        />
        <p className="text-xs text-gray-400">
          Используйте Markdown: **жирный**, *курсив*, ## заголовок, - список
        </p>
      </section>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving || uploading}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition disabled:opacity-60"
        >
          {saving && <Loader2 size={15} className="animate-spin" />}
          {isNew ? 'Создать статью' : 'Сохранить изменения'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition"
        >
          Отмена
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition bg-white';
