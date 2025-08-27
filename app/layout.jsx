import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import Header from '@/components/header';
import Footer from '@/components/footer';
import '@/styles/globals.css';

export const metadata = {
  title: 'Snapaper | CAIE Past Papers and Study Resources',
  description: 'Discover Snapaper, the ultimate tool for CAIE students worldwide to effortlessly access past papers, mock exams, and study resources for IGCSE and A-Level.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ConfigProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
