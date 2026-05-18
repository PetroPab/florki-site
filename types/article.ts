export type ArticleTag = 'uhod' | 'osnovy' | 'idei' | 'process';

export type ArticleFrontmatter = {
  title: string;
  description: string;
  cover: string;
  coverAlt: string;
  date: string;
  updatedAt?: string;
  tags: ArticleTag[];
  author?: string;
  draft?: boolean;
};

export type Article = ArticleFrontmatter & {
  slug: string;
  content: string;
  readTime: number;
};
