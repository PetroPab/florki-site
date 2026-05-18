import { cache } from 'react';
import productsRaw from '@/data/products.json';
import { ProductSchema } from '@/lib/schemas';
import type { Product, ProductCategory } from '@/types/product';

const parseProducts = cache((): Product[] =>
  (productsRaw as unknown[]).map((p) => ProductSchema.parse(p))
);

export const getAllProducts = cache((): Product[] =>
  parseProducts().sort((a, b) => {
    if (a.status === b.status) return 0;
    return a.status === 'in-stock' ? -1 : 1;
  })
);

export const getFeaturedProducts = cache((): Product[] =>
  getAllProducts().filter((p) => p.featured)
);

export const getProductBySlug = cache(
  (slug: string): Product | null =>
    getAllProducts().find((p) => p.slug === slug) ?? null
);

export const getProductsByCategory = cache(
  (category: ProductCategory): Product[] =>
    getAllProducts().filter((p) => p.category === category)
);

export const getRelatedProducts = cache((slug: string, limit = 3): Product[] =>
  getAllProducts()
    .filter((p) => p.slug !== slug)
    .slice(0, limit)
);
