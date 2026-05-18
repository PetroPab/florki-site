import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
} from '@/lib/articles';
import { formatDate, formatReadTime } from '@/lib/format';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import ArticleCard from '@/components/blocks/ArticleCard';
import Callout from '@/components/blocks/Callout';
import CTASection from '@/components/sections/CTASection';
import type { ArticleTag } from '@/types/article';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} — Флорки`,
    description: article.description,
    alternates: { canonical: `/poleznoe/${slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `/poleznoe/${slug}`,
      type: 'article',
      publishedTime: article.date,
      ...(article.updatedAt ? { modifiedTime: article.updatedAt } : {}),
      ...(article.cover
        ? { images: [{ url: article.cover, alt: article.coverAlt }] }
        : {}),
    },
  };
}

const mdxComponents = { Callout };

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = await getRelatedArticles(slug, 3);

  return (
    <>
      <div className="bg-bg pt-24 pb-4 md:pt-28">
        <Container size="narrow">
          <div className="flex flex-wrap items-center gap-2 mb-6 text-sm text-text-muted">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full bg-accent-soft text-accent text-xs font-medium"
              >
                {tag}
              </span>
            ))}
            <span aria-hidden="true">·</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{formatReadTime(article.readTime)}</span>
          </div>

          <Heading as="h1" size="h1" className="mb-4">
            {article.title}
          </Heading>
          <p className="text-lg text-text-muted leading-relaxed mb-10">
            {article.description}
          </p>
        </Container>
      </div>

      <div className="bg-bg pb-16 md:pb-20">
        <Container size="narrow">
          <article className="prose prose-florki max-w-none">
            <MDXRemote source={article.content} components={mdxComponents} />
          </article>
        </Container>
      </div>

      {related.length > 0 && (
        <div className="bg-surface-1 py-14 md:py-16">
          <Container>
            <Heading as="h2" size="h3" className="mb-8">
              Ещё по теме
            </Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((a) => (
                <ArticleCard
                  key={a.slug}
                  slug={a.slug}
                  title={a.title}
                  description={a.description}
                  cover={a.cover}
                  coverAlt={a.coverAlt}
                  date={a.date}
                  readTime={a.readTime}
                  tags={a.tags as ArticleTag[]}
                />
              ))}
            </div>
          </Container>
        </div>
      )}

      <CTASection />
    </>
  );
}
