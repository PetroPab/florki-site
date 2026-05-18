'use client';

import { useState, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Loader2, Upload, X, Plus } from 'lucide-react';
import slugify from 'slugify';

import type { Product, ProductCategory, ProductStatus } from '@/types/product';

type ProductFormProps = {
  initial?: Partial<Product>;
  isNew?: boolean;
};

const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'florarium', label: 'Флорариум' },
  { value: 'composition', label: 'Композиция' },
  { value: 'gift', label: 'Подарочный набор' },
  { value: 'custom', label: 'Под заказ' },
];

const STATUSES: { value: ProductStatus; label: string }[] = [
  { value: 'in-stock', label: 'В наличии' },
  { value: 'on-order', label: 'Под заказ' },
];

export function ProductForm({ initial = {}, isNew = false }: ProductFormProps) {
  const router = useRouter();

  const [name, setName] = useState(initial.name ?? '');
  const [slug, setSlug] = useState(initial.slug ?? '');
  const [category, setCategory] = useState<ProductCategory>(
    initial.category ?? 'florarium'
  );
  const [status, setStatus] = useState<ProductStatus>(
    initial.status ?? 'in-stock'
  );
  const [featured, setFeatured] = useState(initial.featured ?? false);
  const [price, setPrice] = useState(String(initial.price ?? ''));
  const [priceNote, setPriceNote] = useState(initial.priceNote ?? '');
  const [description, setDescription] = useState(initial.description ?? '');
  const [care, setCare] = useState(initial.care ?? '');
  const [dimW, setDimW] = useState(String(initial.dimensions?.width ?? ''));
  const [dimH, setDimH] = useState(String(initial.dimensions?.height ?? ''));
  const [dimD, setDimD] = useState(String(initial.dimensions?.depth ?? ''));
  const [dimDiam, setDimDiam] = useState(
    String(initial.dimensions?.diameter ?? '')
  );
  const [composition, setComposition] = useState<string[]>(
    initial.composition ?? []
  );
  const [compInput, setCompInput] = useState('');
  const [images, setImages] = useState<
    Array<{ src: string; alt: string; width: number; height: number }>
  >(initial.images ?? []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  function handleNameChange(val: string) {
    setName(val);
    if (isNew) {
      setSlug(slugify(val, { lower: true, strict: true, locale: 'ru' }));
    }
  }

  function addComp() {
    const val = compInput.trim();
    if (val && !composition.includes(val)) {
      setComposition([...composition, val]);
    }
    setCompInput('');
  }

  async function handleImageUpload(file: File) {
    setUploading(true);
    try {
      // Определяем размеры до загрузки
      const dims = await getImageDimensions(file);

      const form = new FormData();
      form.append('file', file);
      form.append('folder', 'products');
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: form,
      });
      const data = (await res.json()) as { url: string };

      setImages((prev) => [
        ...prev,
        {
          src: data.url,
          alt: name || 'Фото товара',
          width: dims.width,
          height: dims.height,
        },
      ]);
    } catch {
      setError('Ошибка загрузки фото');
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const allRes = await fetch('/api/admin/products');
      const allProducts = (await allRes.json()) as Product[];

      const product: Product = {
        slug,
        name,
        category,
        status,
        featured,
        price: Number(price),
        ...(priceNote ? { priceNote } : {}),
        description,
        care,
        dimensions: {
          ...(dimW ? { width: Number(dimW) } : {}),
          ...(dimH ? { height: Number(dimH) } : {}),
          ...(dimD ? { depth: Number(dimD) } : {}),
          ...(dimDiam ? { diameter: Number(dimDiam) } : {}),
        },
        composition,
        images,
        createdAt: initial.createdAt ?? new Date().toISOString().slice(0, 10),
        updatedAt: new Date().toISOString().slice(0, 10),
      };

      let updated: Product[];
      if (isNew) {
        updated = [...allProducts, product];
      } else {
        updated = allProducts.map((p) => (p.slug === slug ? product : p));
      }

      const saveRes = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: updated }),
      });

      if (!saveRes.ok) {
        const err = (await saveRes.json()) as { error?: string };
        throw new Error(err.error ?? `Ошибка сервера ${saveRes.status}`);
      }

      router.push('/admin/catalog');
      router.refresh();
    } catch {
      setError('Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Основные поля */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-medium text-gray-900">Основное</h2>

        <Field label="Название">
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            required
            className={inputCls}
            placeholder="Мшистый лес"
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
            placeholder="mshistyi-les"
          />
          {!isNew && (
            <p className="text-xs text-gray-400 mt-1">
              Слаг нельзя изменить после создания
            </p>
          )}
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Категория">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ProductCategory)}
              className={inputCls}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Статус">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ProductStatus)}
              className={inputCls}
            >
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Цена, ₽">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min={0}
              className={inputCls}
              placeholder="4500"
            />
          </Field>

          <Field label='Пометка к цене (напр. "от")'>
            <input
              type="text"
              value={priceNote}
              onChange={(e) => setPriceNote(e.target.value)}
              className={inputCls}
              placeholder="от"
            />
          </Field>
        </div>

        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-4 h-4 accent-accent rounded"
          />
          <span className="text-sm text-gray-700">
            Показывать на главной (featured)
          </span>
        </label>
      </section>

      {/* Описание */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-medium text-gray-900">Тексты</h2>

        <Field label="Описание">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className={`${inputCls} resize-y`}
            placeholder="Подробное описание товара..."
          />
        </Field>

        <Field label="Уход">
          <textarea
            value={care}
            onChange={(e) => setCare(e.target.value)}
            rows={3}
            className={`${inputCls} resize-y`}
            placeholder="Как ухаживать за флорариумом..."
          />
        </Field>
      </section>

      {/* Размеры */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-medium text-gray-900">Размеры (см)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Ширина', val: dimW, set: setDimW },
            { label: 'Высота', val: dimH, set: setDimH },
            { label: 'Глубина', val: dimD, set: setDimD },
            { label: 'Диаметр', val: dimDiam, set: setDimDiam },
          ].map(({ label, val, set }) => (
            <Field key={label} label={label}>
              <input
                type="number"
                value={val}
                onChange={(e) => set(e.target.value)}
                min={0}
                className={inputCls}
                placeholder="—"
              />
            </Field>
          ))}
        </div>
      </section>

      {/* Состав */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
        <h2 className="font-medium text-gray-900">Состав</h2>
        <div className="flex flex-wrap gap-2">
          {composition.map((item) => (
            <span
              key={item}
              className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
            >
              {item}
              <button
                type="button"
                onClick={() =>
                  setComposition(composition.filter((c) => c !== item))
                }
                className="text-gray-400 hover:text-gray-700"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={compInput}
            onChange={(e) => setCompInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addComp();
              }
            }}
            className={`${inputCls} flex-1`}
            placeholder="мох ягель, папоротник... (Enter)"
          />
          <button
            type="button"
            onClick={addComp}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50 transition"
          >
            <Plus size={16} />
          </button>
        </div>
      </section>

      {/* Фото */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
        <h2 className="font-medium text-gray-900">Фотографии</h2>

        <div className="flex flex-wrap gap-3">
          {images.map((img, i) => (
            <div key={i} className="relative group">
              <div className="w-24 h-24 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  unoptimized={img.src.startsWith('blob:')}
                />
              </div>
              <button
                type="button"
                onClick={() => setImages(images.filter((_, j) => j !== i))}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
              >
                <X size={10} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-200 hover:border-accent hover:bg-accent/5 flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-accent transition disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                <Upload size={18} />
                <span className="text-xs">Загрузить</span>
              </>
            )}
          </button>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleImageUpload(file);
            e.target.value = '';
          }}
        />
      </section>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition disabled:opacity-60"
        >
          {saving && <Loader2 size={15} className="animate-spin" />}
          {isNew ? 'Создать товар' : 'Сохранить изменения'}
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
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition bg-white';

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
