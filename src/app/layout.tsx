import type { Metadata, Viewport } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/Header';
import ProgressBar from '@/components/ProgressBar';
import '@/styles/globals.css';

const siteUrl = 'https://snapaper.com';
const siteName = 'Snapaper';
const defaultTitle = 'Snapaper | CAIE Past Papers and Study Resources';
const defaultDescription =
  'Discover Snapaper, the ultimate tool for CAIE students worldwide to effortlessly access past papers, mock exams, and study resources for IGCSE and A-Level.';
const defaultImage = 'https://snapaper.com/snapaper_logo_512.png';

export const metadata: Metadata = {
  title: defaultTitle,
  description: defaultDescription,
  keywords: [
    'CAIE Past Papers',
    'Past papers',
    'Mock exams',
    'Past exam papers',
    'CIE past papers',
    'IGCSE past papers',
    'ALevel past papers',
    'CAIE study resources',
    'CAIE pdf textbooks',
    'Save my exams',
    'Cambridge International',
    'exam preparation',
    'study materials',
    'A-Level',
    'IGCSE',
    'CAIE',
  ],
  authors: [{ name: 'Tony (Lipeng) He' }],
  creator: 'Tony (Lipeng) He',
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: defaultImage,
        width: 1200,
        height: 630,
        alt: 'Snapaper - CAIE Past Papers Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: [defaultImage],
  },
  icons: {
    icon: '/snapaper_logo.ico',
    shortcut: '/snapaper_logo.ico',
    apple: '/snapaper_logo_512.png',
  },
  manifest: '/manifest.json',
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
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  viewportFit: 'cover',
  themeColor: '#1890ff',
};

const theme = {
  token: {
    colorPrimary: '#1890ff',
    borderRadius: 6,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://static.ouorz.com" />
        <link rel="dns-prefetch" href="https://static.ouorz.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: siteName,
              url: siteUrl,
              logo: defaultImage,
              description: defaultDescription,
              sameAs: ['https://status.snapaper.com'],
              serviceType: 'Educational Resources',
              areaServed: 'Worldwide',
              audience: {
                '@type': 'EducationalAudience',
                educationalRole: 'student',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-gray-50">
        <AntdRegistry>
          <ConfigProvider theme={theme}>
            <ProgressBar />
            <Header />
            <main className="flex flex-col min-h-screen">{children}</main>
            <Analytics />
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}