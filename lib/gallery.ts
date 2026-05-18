import { cache } from 'react';
import galleryRaw from '@/data/gallery.json';
import type { GalleryItem } from '@/types/gallery';

export const getAllGalleryItems = cache((): GalleryItem[] =>
  (galleryRaw as GalleryItem[]).sort((a, b) =>
    b.completedAt.localeCompare(a.completedAt)
  )
);
