import { cache } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { ArticleFrontmatterSchema } from '@/lib/schemas';
import type { Article, ArticleTag } from '@/types/article';

const ARTICLES_DIR = path.join(process.cwd(), 'content/articles');

function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx$/, '');
}

const parseAllArticles = cache(async (): Promise<Article[]> => {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.mdx'));

  const articles = files.map((filename) => {
    const slug = slugFromFilename(filename);
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), 'utf-8');
    const { data, content } = matter(raw);
    const frontmatter = ArticleFrontmatterSchema.parse(data);
    const stats = readingTime(content);

    return {
      ...frontmatter,
      slug,
      content,
      readTime: Math.ceil(stats.minutes),
    } satisfies Article;
  });

  return articles
    .filter((a) => !a.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
});

export const getAllArticles = cache(
  async (): Promise<Article[]> => parseAllArticles()
);

export const getArticleBySlug = cache(
  async (slug: string): Promise<Article | null> => {
    const articles = await parseAllArticles();
    return articles.find((a) => a.slug === slug) ?? null;
  }
);

export const getArticlesByTag = cache(
  async (tag: ArticleTag): Promise<Article[]> => {
    const articles = await parseAllArticles();
    return articles.filter((a) => a.tags.includes(tag));
  }
);

export const getRelatedArticles = cache(
  async (slug: string, limit = 3): Promise<Article[]> => {
    const articles = await parseAllArticles();
    return articles.filter((a) => a.slug !== slug).slice(0, limit);
  }
);
