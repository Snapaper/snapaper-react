import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { ConfigProvider } from 'antd';
import AntdRegistry from '@/components/AntdRegistry';
import Header from '@/components/Header';
import NProgressProvider from '@/components/NProgressProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Snapaper | CAIE Past Papers and Study Resources',
  description:
    'Discover Snapaper, the ultimate tool for CAIE students worldwide to effortlessly access past papers, mock exams, and study resources for IGCSE and A-Level.',
  keywords:
    'CAIE Past Papers, Past papers, Mock exams, Past exam papers, CIE past papers, IGCSE past papers, ALevel past papers, CAIE study resources, CAIE pdf textbooks, Save my exams, Cambridge International, exam preparation, study materials, A-Level, IGCSE, CAIE',
  authors: [{ name: 'Tony (Lipeng) He' }],
  creator: 'Tony (Lipeng) He',
  publisher: 'Snapaper',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://snapaper.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Snapaper | CAIE Past Papers and Study Resources',
    description:
      'Discover Snapaper, the ultimate tool for CAIE students worldwide to effortlessly access past papers, mock exams, and study resources for IGCSE and A-Level.',
    url: 'https://snapaper.com',
    siteName: 'Snapaper',
    images: [
      {
        url: '/snapaper_logo_512.png',
        width: 512,
        height: 512,
        alt: 'Snapaper - CAIE Past Papers Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Snapaper | CAIE Past Papers and Study Resources',
    description:
      'Discover Snapaper, the ultimate tool for CAIE students worldwide to effortlessly access past papers, mock exams, and study resources for IGCSE and A-Level.',
    images: ['/snapaper_logo_512.png'],
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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  shrinkToFit: 'no',
  viewportFit: 'cover',
  themeColor: '#1890ff',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#1890ff',
              borderRadius: 6,
            },
          }}
        >
          <AntdRegistry>
            <NProgressProvider>
              <Header />
              {children}
              <Analytics />
            </NProgressProvider>
          </AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}