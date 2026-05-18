import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAllProducts } from '@/lib/products';
import { formatDimensions } from '@/lib/format';
import Section from '@/components/layout/Section';
import Heading from '@/components/ui/Heading';
import ProductCard from '@/components/blocks/ProductCard';

export default function FeaturedProducts() {
  const products = getAllProducts().slice(0, 6);

  return (
    <Section spacing="md">
      <Heading as="h2" size="h2" className="mb-10 md:mb-12">
        Наши <em className="display-em text-warm">работы</em>
      </Heading>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.slug}
            slug={product.slug}
            name={product.name}
            image={product.images[0].src}
            imageAlt={product.images[0].alt}
            price={product.price}
            priceNote={product.priceNote}
            status={product.status}
            dimensions={formatDimensions(product.dimensions)}
          />
        ))}
      </div>

      <div className="flex justify-center mt-12 md:mt-14">
        <Link
          href="/katalog"
          className="btn-shimmer inline-flex items-center gap-3 h-14 px-10 rounded-full bg-accent text-white font-semibold text-base hover:bg-accent-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Смотреть все работы
          <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
        </Link>
      </div>
    </Section>
  );
}
