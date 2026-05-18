import Link from 'next/link';
import { cn } from '@/lib/utils';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { formatPrice } from '@/lib/format';
import Badge from '@/components/ui/Badge';

type ProductCardProps = {
  slug: string;
  name: string;
  image: string;
  imageAlt: string;
  price: number;
  priceNote?: string;
  status: 'in-stock' | 'on-order';
  dimensions?: string;
};

export default function ProductCard({
  slug,
  name,
  image,
  imageAlt,
  price,
  priceNote,
  status,
  dimensions,
}: ProductCardProps) {
  return (
    <Link
      href={`/katalog/${slug}`}
      className="group block rounded-2xl bg-bg-elevated border border-border overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
    >
      <div className="relative aspect-square overflow-hidden bg-surface-1">
        <ImageWithFallback
          src={image}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        {status === 'in-stock' && (
          <div className="absolute top-3 right-3">
            <Badge variant="in-stock">В наличии</Badge>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3
          className={cn(
            'font-display text-h4 text-text-primary leading-snug mb-1'
          )}
        >
          {name}
        </h3>
        {dimensions && (
          <p className="text-sm text-text-muted mb-3">{dimensions}</p>
        )}
        <p className="font-medium text-text-primary">
          {priceNote && (
            <span className="text-text-muted font-normal text-sm mr-1">
              {priceNote}
            </span>
          )}
          {formatPrice(price)}
        </p>
      </div>
    </Link>
  );
}
