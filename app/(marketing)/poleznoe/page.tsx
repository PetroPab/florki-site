import type { Metadata } from 'next';
import { getAllArticles } from '@/lib/articles';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import ArticleCard from '@/components/blocks/ArticleCard';
import type { ArticleTag } from '@/types/article';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Полезное — статьи о флорариумах | Флорки, Ярославль',
  description:
    'Уход за флорариумами, как выбрать растения, идеи для подарков. Статьи от студии «Флорки» из Ярославля.',
  alternates: { canonical: '/poleznoe' },
};

export default async function PoleznoeePage() {
  const articles = await getAllArticles();

  return (
    <div className="bg-bg pt-28 pb-20 md:pt-32 md:pb-24">
      <Container>
        <div className="mb-10 md:mb-14">
          <Heading as="h1" size="h1" className="mb-3">
            Полезное
          </Heading>
          <Text size="lg" muted>
            Уход, идеи, советы по выбору
          </Text>
        </div>

        {articles.length === 0 ? (
          <Text muted>Статьи скоро появятся.</Text>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {articles.map((article) => (
              <ArticleCard
                key={article.slug}
                slug={article.slug}
                title={article.title}
                description={article.description}
                cover={article.cover}
                coverAlt={article.coverAlt}
                date={article.date}
                readTime={article.readTime}
                tags={article.tags as ArticleTag[]}
              />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
