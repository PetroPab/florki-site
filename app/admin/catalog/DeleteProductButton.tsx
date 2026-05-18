'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

export function DeleteProductButton({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`Удалить товар «${name}»? Это действие нельзя отменить.`))
      return;
    setLoading(true);
    try {
      const res = await fetch('/api/admin/products', { method: 'GET' });
      const products = (await res.json()) as Array<{ slug: string }>;
      const updated = products.filter((p) => p.slug !== slug);
      await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: updated }),
      });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition disabled:opacity-50"
      title="Удалить"
    >
      <Trash2 size={15} />
    </button>
  );
}
