import type { ReactNode } from 'react';
import NextTopLoader from 'nextjs-toploader';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

type MarketingLayoutProps = {
  children: ReactNode;
};

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <>
      {/* Блобы — фиксированный фон под контентом */}
      <div
        aria-hidden="true"
        className="fixed inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div className="bg-blob bg-blob-1" />
        <div className="bg-blob bg-blob-2" />
        <div className="bg-blob bg-blob-3" />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        <NextTopLoader
          color="rgb(63, 93, 58)"
          height={2}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow={false}
        />
        <a href="#main-content" className="skip-link">
          Перейти к содержимому
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </div>
    </>
  );
}
