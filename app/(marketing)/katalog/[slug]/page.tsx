import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from '@/lib/products';
import { formatPrice, formatDimensions } from '@/lib/format';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import Badge from '@/components/ui/Badge';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import ProductCard from '@/components/blocks/ProductCard';
import OrderButton from '@/components/blocks/OrderButton';
import JsonLdProduct from '@/components/seo/JsonLdProduct';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const description = product.description
    ? product.description.slice(0, 160)
    : `Флорариум «${product.name}» — студия Флорки, Ярославль.`;
  const ogImage = product.images[0]
    ? {
        url: product.images[0].src,
        width: product.images[0].width,
        height: product.images[0].height,
        alt: product.images[0].alt,
      }
    : undefined;
  return {
    title: `${product.name} — Флорки, Ярославль`,
    description,
    alternates: { canonical: `/katalog/${slug}` },
    openGraph: {
      title: `${product.name} — студия Флорки`,
      description,
      url: `/katalog/${slug}`,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug, 3);
  const dims = formatDimensions(product.dimensions);

  return (
    <>
      <JsonLdProduct product={product} />
      <div className="bg-bg pt-24 pb-16 md:pt-28 md:pb-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface-1">
              <ImageWithFallback
                src={product.images[0].src}
                alt={product.images[0].alt}
                fill
                className="object-cover"
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute top-4 left-4">
                <Badge
                  variant={
                    product.status === 'in-stock' ? 'in-stock' : 'on-order'
                  }
                >
                  {product.status === 'in-stock' ? 'В наличии' : 'Под заказ'}
                </Badge>
              </div>
            </div>

            <div className="flex flex-col">
              <Heading as="h1" size="h1" className="mb-3">
                {product.name}
              </Heading>

              <p className="font-display text-h2 text-text-primary mb-6">
                {product.priceNote && (
                  <span className="text-text-muted font-body text-base font-normal mr-1.5">
                    {product.priceNote}
                  </span>
                )}
                {formatPrice(product.price)}
              </p>

              {dims && (
                <div className="mb-5">
                  <Text size="sm" muted>
                    Размер: {dims}
                  </Text>
                </div>
              )}

              <div className="mb-6 space-y-2 text-sm text-text-secondary leading-relaxed">
                {product.description.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {product.composition.length > 0 && (
                <div className="mb-6 p-4 rounded-xl bg-surface-1 border border-border">
                  <Text size="sm" className="font-medium mb-2">
                    Состав:
                  </Text>
                  <div className="flex flex-wrap gap-1.5">
                    {product.composition.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded-full bg-bg-elevated border border-border text-xs text-text-secondary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product.care && (
                <div className="mb-8">
                  <Text size="sm" className="font-medium mb-1">
                    Уход:
                  </Text>
                  <Text size="sm" muted>
                    {product.care}
                  </Text>
                </div>
              )}

              <div className="mt-auto">
                <OrderButton
                  productName={product.name}
                  productSlug={product.slug}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {related.length > 0 && (
        <div className="bg-surface-1 py-14 md:py-16">
          <Container>
            <Heading as="h2" size="h3" className="mb-8">
              Другие работы
            </Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard
                  key={p.slug}
                  slug={p.slug}
                  name={p.name}
                  image={p.images[0].src}
                  imageAlt={p.images[0].alt}
                  price={p.price}
                  priceNote={p.priceNote}
                  status={p.status}
                  dimensions={formatDimensions(p.dimensions)}
                />
              ))}
            </div>
          </Container>
        </div>
      )}
    </>
  );
}
