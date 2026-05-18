import Container from '@/components/ui/Container';

export default function PoleznoeLoading() {
  return (
    <div className="bg-bg pt-28 pb-20 md:pt-32 md:pb-24">
      <Container>
        <div className="mb-10 md:mb-14">
          <div className="h-10 w-48 rounded-xl bg-surface-2 animate-pulse mb-3" />
          <div className="h-5 w-64 rounded-lg bg-surface-2 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden border border-border bg-surface-1"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="aspect-[16/9] bg-surface-2 animate-pulse" />
              <div className="p-5 flex flex-col gap-3">
                <div className="h-3 w-24 rounded-md bg-surface-2 animate-pulse" />
                <div className="h-5 w-full rounded-lg bg-surface-2 animate-pulse" />
                <div className="h-5 w-3/4 rounded-lg bg-surface-2 animate-pulse" />
                <div className="h-4 w-full rounded-md bg-surface-2 animate-pulse" />
                <div className="h-4 w-2/3 rounded-md bg-surface-2 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
