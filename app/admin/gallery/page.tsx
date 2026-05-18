import { readDataFile } from '@/lib/admin-content';
import type { GalleryItem } from '@/types/gallery';
import { GalleryManager } from './GalleryManager';

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const items = await readDataFile<GalleryItem[]>('gallery.json');
  return (
    <div className="p-8">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">
        Галерея
        <span className="ml-2 text-sm font-normal text-gray-400">
          {items.length} работ
        </span>
      </h1>
      <GalleryManager initialItems={items} />
    </div>
  );
}
