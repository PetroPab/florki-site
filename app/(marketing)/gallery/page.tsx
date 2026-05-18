import type { Metadata } from 'next';
import { getAllGalleryItems } from '@/lib/gallery';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import GalleryGrid from '@/components/blocks/GalleryGrid';

export const metadata: Metadata = {
  title: 'Галерея работ — студия Флорки, Ярославль',
  description:
    'Фотографии флорариумов и живых композиций студии «Флорки» в Ярославле. Каждая работа — ручная, под конкретного клиента.',
};

export default function GalleryPage() {
  const items = getAllGalleryItems();

  return (
    <div className="bg-bg pt-28 pb-20 md:pt-32 md:pb-24">
      <Container>
        <div className="mb-10 md:mb-14">
          <Heading as="h1" size="h1" className="mb-3 heading-rule">
            Наши <em className="display-em text-warm">работы</em>
          </Heading>
          <Text size="lg" muted>
            {items.length} композиций — все сделаны вручную
          </Text>
        </div>

        <GalleryGrid items={items} />
      </Container>
    </div>
  );
}
