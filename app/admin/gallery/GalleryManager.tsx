'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Loader2, Upload, Trash2, X } from 'lucide-react';

import type { GalleryItem } from '@/types/gallery';

type UploadState = 'idle' | 'uploading' | 'saving';

export function GalleryManager({
  initialItems,
}: {
  initialItems: GalleryItem[];
}) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [state, setState] = useState<UploadState>('idle');
  const [error, setError] = useState('');

  // Поля новой записи
  const [newAlt, setNewAlt] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().slice(0, 10));
  const [preview, setPreview] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFileSelect(file: File) {
    setPendingFile(file);
    setPreview(URL.createObjectURL(file));
  }

  function clearNewForm() {
    setNewAlt('');
    setNewCaption('');
    setNewDate(new Date().toISOString().slice(0, 10));
    setPendingFile(null);
    setPreview(null);
  }

  async function handleAdd() {
    if (!pendingFile || !newAlt.trim()) {
      setError('Выберите файл и заполните alt-текст');
      return;
    }
    setError('');
    setState('uploading');

    try {
      // Размеры изображения
      const dims = await getImageDimensions(pendingFile);

      // Загрузка в Vercel Blob
      const form = new FormData();
      form.append('file', pendingFile);
      form.append('folder', 'gallery');
      const uploadRes = await fetch('/api/admin/upload', {
        method: 'POST',
        body: form,
      });
      const uploadData = (await uploadRes.json()) as {
        url?: string;
        error?: string;
      };
      if (!uploadRes.ok || !uploadData.url) {
        throw new Error(uploadData.error ?? 'Ошибка загрузки');
      }
      const { url } = uploadData;

      const nextId = generateId(items);
      const newItem: GalleryItem = {
        id: nextId,
        src: url,
        alt: newAlt.trim(),
        caption: newCaption.trim() || undefined,
        completedAt: newDate,
        width: dims.width,
        height: dims.height,
      };

      const updated = [...items, newItem];
      setState('saving');
      await saveItems(updated);
      setItems(updated);
      clearNewForm();
    } catch (e) {
      setError(String(e));
    } finally {
      setState('idle');
    }
  }

  async function handleDelete(id: string) {
    const item = items.find((i) => i.id === id);
    if (!confirm(`Удалить «${item?.caption ?? item?.alt}»?`)) return;
    const updated = items.filter((i) => i.id !== id);
    setState('saving');
    try {
      await saveItems(updated);
      setItems(updated);
    } catch (e) {
      setError(String(e));
    } finally {
      setState('idle');
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Форма добавления */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="font-medium text-gray-900 mb-4">Добавить работу</h2>

        <div className="flex gap-5 flex-col sm:flex-row">
          {/* Превью / зона загрузки */}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex-shrink-0 w-full sm:w-40 h-40 rounded-xl border-2 border-dashed border-gray-200 hover:border-accent hover:bg-accent/5 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-accent transition overflow-hidden"
          >
            {preview ? (
              <Image
                src={preview}
                alt="preview"
                width={160}
                height={160}
                className="w-full h-full object-cover"
                unoptimized
              />
            ) : (
              <>
                <Upload size={20} />
                <span className="text-xs">Выбрать фото</span>
              </>
            )}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFileSelect(f);
              e.target.value = '';
            }}
          />

          {/* Поля */}
          <div className="flex-1 space-y-3">
            <Field label="Alt-текст (обязательно)">
              <input
                type="text"
                value={newAlt}
                onChange={(e) => setNewAlt(e.target.value)}
                className={inputCls}
                placeholder="Закрытый флорариум со мхом..."
              />
            </Field>
            <Field label="Подпись (необязательно)">
              <input
                type="text"
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
                className={inputCls}
                placeholder="Мшистый лес"
              />
            </Field>
            <Field label="Дата выполнения">
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}

        <div className="flex items-center gap-3 mt-4">
          <button
            type="button"
            onClick={handleAdd}
            disabled={state !== 'idle' || !pendingFile}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition disabled:opacity-60"
          >
            {state !== 'idle' && <Loader2 size={15} className="animate-spin" />}
            {state === 'uploading'
              ? 'Загружаю...'
              : state === 'saving'
                ? 'Сохраняю...'
                : 'Добавить'}
          </button>
          {preview && (
            <button
              type="button"
              onClick={clearNewForm}
              className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-gray-500 hover:text-gray-900 transition"
            >
              <X size={14} />
              Сбросить
            </button>
          )}
        </div>
      </div>

      {/* Сетка существующих */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative group rounded-xl overflow-hidden bg-gray-100 aspect-square"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-end p-2">
              <p className="text-white text-xs opacity-0 group-hover:opacity-100 transition truncate flex-1">
                {item.caption ?? item.alt}
              </p>
              <button
                onClick={() => handleDelete(item.id)}
                disabled={state !== 'idle'}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-white/20 text-white hover:bg-red-500 transition"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <p className="text-center py-10 text-gray-400 text-sm">
          Галерея пуста — добавьте первую работу
        </p>
      )}
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition bg-white';

function generateId(items: GalleryItem[]): string {
  const nums = items
    .map((i) => parseInt(i.id.replace('g-', ''), 10))
    .filter((n) => !isNaN(n));
  const max = nums.length ? Math.max(...nums) : 0;
  return `g-${String(max + 1).padStart(3, '0')}`;
}

async function saveItems(items: GalleryItem[]): Promise<void> {
  const res = await fetch('/api/admin/gallery', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  });
  if (!res.ok) throw new Error('Ошибка сохранения галереи');
}

function getImageDimensions(
  file: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}
