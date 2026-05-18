import type { Metadata } from 'next';
import { getAllReviews } from '@/lib/reviews';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import ReviewsPageClient from '@/components/blocks/ReviewsPageClient';

export const metadata: Metadata = {
  title: 'Отзывы клиентов — студия Флорки, Ярославль',
  description:
    'Настоящие отзывы покупателей флорариумов студии «Флорки» с Авито, Яндекс.Карт, 2ГИС и Telegram. Ничего не придумываем.',
  alternates: { canonical: '/reviews' },
};

export default function ReviewsPage() {
  const reviews = getAllReviews();

  return (
    <div className="bg-bg pt-28 pb-20 md:pt-32 md:pb-24">
      <Container>
        <div className="mb-2">
          <Heading as="h1" size="h1" className="mb-3 heading-rule">
            <em className="display-em text-warm">Отзывы</em> клиентов
          </Heading>
          <Text size="lg" muted className="max-w-xl">
            Публикуем дословно — с площадок где оставили. Ничего не придумываем
            и не редактируем.
          </Text>
        </div>

        <ReviewsPageClient reviews={reviews} />
      </Container>
    </div>
  );
}
