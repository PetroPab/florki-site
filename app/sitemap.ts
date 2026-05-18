import type { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/products';
import { getAllArticles } from '@/lib/articles';
import { siteConfig } from '@/data/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${base}/katalog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/poleznoe`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${base}/o-nas`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${base}/kontakty`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const products = getAllProducts().map((p) => ({
    url: `${base}/katalog/${p.slug}`,
    lastModified: p.updatedAt ?? p.createdAt,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const articles = (await getAllArticles()).map((a) => ({
    url: `${base}/poleznoe/${a.slug}`,
    lastModified: a.updatedAt ?? a.date,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...products, ...articles];
}
