import { siteConfig } from '@/data/site';
import type { Product } from '@/types/product';

type Props = { product: Product };

export default function JsonLdProduct({ product }: Props) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description.slice(0, 300),
    image: product.images.map((img) => `${siteConfig.url}${img.src}`),
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'RUB',
      availability:
        product.status === 'in-stock'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/MadeToOrder',
      seller: {
        '@type': 'LocalBusiness',
        name: siteConfig.fullName,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
