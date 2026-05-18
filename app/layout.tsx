import type { Metadata, Viewport } from 'next';
import NextTopLoader from 'nextjs-toploader';

import { fraunces, golosText } from '@/app/fonts';
import { siteConfig } from '@/data/site';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import '@/app/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — флорариумы в Ярославле`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteConfig.url,
    siteName: siteConfig.fullName,
    title: `${siteConfig.name} — флорариумы в Ярославле`,
    description: siteConfig.description,
    images: [
      {
        url: '/images/og/default.png',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — студия флорариумов в Ярославле`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — флорариумы в Ярославле`,
    description: siteConfig.description,
    images: ['/images/og/default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FAF8F5',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru">
      <body className={`${fraunces.variable} ${golosText.variable} font-body`}>
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

        {/* Основной контент */}
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
      </body>
    </html>
  );
}
