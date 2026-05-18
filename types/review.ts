export type ReviewSource = 'avito' | 'yandex' | '2gis' | 'telegram' | 'vk';

export type Review = {
  id: string;
  source: ReviewSource;
  author: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  date: string;
  text: string;
  originalUrl?: string;
  photos?: { src: string; alt: string }[];
  productSlug?: string;
  featured: boolean;
};
