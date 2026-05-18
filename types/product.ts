export type ProductStatus = 'in-stock' | 'on-order';

export type ProductCategory = 'florarium' | 'composition' | 'gift' | 'custom';

export type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  status: ProductStatus;
  featured: boolean;
  price: number;
  priceNote?: string;
  description: string;
  care?: string;
  careArticleSlug?: string;
  dimensions: {
    width?: number;
    height?: number;
    depth?: number;
    diameter?: number;
  };
  composition: string[];
  images: ProductImage[];
  createdAt: string;
  updatedAt?: string;
};
