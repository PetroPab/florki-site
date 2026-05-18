import { getFeaturedReviews } from '@/lib/reviews';
import Section from '@/components/layout/Section';
import Heading from '@/components/ui/Heading';
import ReviewCard from '@/components/blocks/ReviewCard';
import type { ReviewSource } from '@/types/review';

export default function ReviewsStrip() {
  const reviews = getFeaturedReviews();

  return (
    <Section spacing="md" background="muted">
      <div className="text-center mb-10 md:mb-12">
        <Heading as="h2" size="h2" className="heading-rule-center">
          <em className="display-em text-warm">Отзывы</em> клиентов
        </Heading>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            source={review.source as ReviewSource}
            author={review.author}
            rating={review.rating as 1 | 2 | 3 | 4 | 5 | undefined}
            date={review.date}
            text={review.text}
            originalUrl={review.originalUrl}
          />
        ))}
      </div>
    </Section>
  );
}
