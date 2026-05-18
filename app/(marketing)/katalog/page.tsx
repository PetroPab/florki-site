import type { Metadata } from 'next';
import { getAllProducts } from '@/lib/products';
import { formatDimensions } from '@/lib/format';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import ProductCard from '@/components/blocks/ProductCard';
import AnimatedGrid from '@/components/blocks/AnimatedGrid';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Каталог флорариумов — студия Флорки, Ярославль',
  description:
    'Флорариумы и живые композиции в наличии и под заказ. Студия «Флорки», Ярославль. Каждая работа — вручную.',
};

export default function KatalogPage() {
  const all = getAllProducts();
  const inStock = all.filter((p) => p.status === 'in-stock');
  const onOrder = all.filter((p) => p.status === 'on-order');

  return (
    <>
      <div className="bg-bg pt-28 pb-12 md:pt-32 md:pb-16">
        <Container>
          <Heading as="h1" size="h1" className="mb-3">
            Каталог
          </Heading>
          <Text size="lg" muted>
            {all.length} {all.length === 1 ? 'работа' : 'работы'} — готовые и
            под заказ
          </Text>
        </Container>
      </div>

      <div className="bg-bg py-12 md:py-16">
        <Container>
          {inStock.length > 0 && (
            <section className="mb-14">
              <Heading as="h2" size="h3" className="mb-6">
                В наличии
              </Heading>
              <AnimatedGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {inStock.map((product) => (
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
              </AnimatedGrid>
            </section>
          )}

          {onOrder.length > 0 && (
            <section>
              <Heading as="h2" size="h3" className="mb-6">
                Под заказ
              </Heading>
              <AnimatedGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {onOrder.map((product) => (
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
              </AnimatedGrid>
            </section>
          )}
        </Container>
      </div>

      <CTASection />
    </>
  );
}
