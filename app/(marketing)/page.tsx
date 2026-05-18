import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import HeroSection from '@/components/sections/HeroSection';
import USPSection from '@/components/sections/USPSection';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import ReviewsStrip from '@/components/sections/ReviewsStrip';
import CTASection from '@/components/sections/CTASection';
import JsonLdLocalBusiness from '@/components/seo/JsonLdLocalBusiness';

export const metadata: Metadata = {
  title: 'Флорариумы в Ярославле — студия Флорки',
  description:
    'Студия флорариумов «Флорки» в Ярославле. Живые экосистемы в стекле — готовые работы и заказы на индивидуальные композиции. Доставка по Ярославлю.',
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLdLocalBusiness />
      <HeroSection />
      <USPSection />
      <FeaturedProducts />
      <ReviewsStrip />
      <CTASection />
    </>
  );
}
