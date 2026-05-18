import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center bg-bg">
      <Container>
        <div className="max-w-md">
          <p
            className="font-display text-[120px] leading-none text-accent/10 select-none mb-0"
            aria-hidden="true"
          >
            404
          </p>
          <Heading as="h1" size="h2" className="mb-3">
            Страница не найдена
          </Heading>
          <Text muted className="mb-8">
            Возможно, ссылка устарела или страница была перемещена.
          </Text>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-accent font-medium hover:underline underline-offset-4 focus:outline-none focus-visible:underline"
          >
            <ArrowLeft size={18} strokeWidth={1.5} aria-hidden="true" />
            На главную
          </Link>
        </div>
      </Container>
    </div>
  );
}
