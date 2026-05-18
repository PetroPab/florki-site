import { cache } from 'react';
import reviewsRaw from '@/data/reviews.json';
import { ReviewSchema } from '@/lib/schemas';
import type { Review } from '@/types/review';

const parseReviews = cache((): Review[] =>
  (reviewsRaw as unknown[]).map((r) => ReviewSchema.parse(r))
);

export const getAllReviews = cache((): Review[] =>
  parseReviews().sort((a, b) => b.date.localeCompare(a.date))
);

export const getFeaturedReviews = cache((): Review[] =>
  getAllReviews().filter((r) => r.featured)
);

export const getReviewsByProduct = cache((slug: string): Review[] =>
  getAllReviews().filter((r) => r.productSlug === slug)
);
