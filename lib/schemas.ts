import { z } from 'zod';

export const ProductSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  category: z.enum(['florarium', 'composition', 'gift', 'custom']),
  status: z.enum(['in-stock', 'on-order']),
  featured: z.boolean(),
  price: z.number().positive(),
  priceNote: z.string().optional(),
  description: z.string().min(10),
  care: z.string().optional(),
  careArticleSlug: z.string().optional(),
  dimensions: z.object({
    width: z.number().optional(),
    height: z.number().optional(),
    depth: z.number().optional(),
    diameter: z.number().optional(),
  }),
  composition: z.array(z.string()).min(1),
  images: z
    .array(
      z.object({
        src: z.string(),
        alt: z.string().min(5),
        width: z.number(),
        height: z.number(),
      })
    )
    .min(1),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});

export const ReviewSchema = z.object({
  id: z.string(),
  source: z.enum(['avito', 'yandex', '2gis', 'telegram', 'vk']),
  author: z.string().min(2),
  rating: z
    .union([
      z.literal(1),
      z.literal(2),
      z.literal(3),
      z.literal(4),
      z.literal(5),
    ])
    .optional(),
  date: z.string(),
  text: z.string().min(10),
  originalUrl: z.string().url().optional(),
  photos: z
    .array(
      z.object({
        src: z.string(),
        alt: z.string(),
      })
    )
    .optional(),
  productSlug: z.string().optional(),
  featured: z.boolean(),
});

export const ArticleFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(20).max(200),
  cover: z.string(),
  coverAlt: z.string().min(5),
  date: z.string(),
  updatedAt: z.string().optional(),
  tags: z.array(z.enum(['uhod', 'osnovy', 'idei', 'process'])),
  author: z.string().optional(),
  draft: z.boolean().optional(),
});

export const ContactFormSchema = z.object({
  name: z.string().min(2, 'Введите ваше имя'),
  contact: z
    .string()
    .min(5, 'Введите телефон или email')
    .refine(
      (val) =>
        /^[\d\s\+\-\(\)]{7,}$/.test(val) ||
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      'Введите корректный телефон или email'
    ),
  message: z.string().min(10, 'Сообщение слишком короткое'),
  consent: z.boolean().refine((v) => v === true, 'Необходимо согласие'),
  website: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
