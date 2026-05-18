import type { Metadata, Viewport } from 'next';

import { fraunces, golosText } from '@/app/fonts';
import { siteConfig } from '@/data/site';
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
        {children}
      </body>
    </html>
  );
}
