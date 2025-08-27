import { ArrowLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import EbooksClient from './client';

async function getEbooks() {
  const res = await fetch('https://files.snapaper.com/case/cases?cate=ebooks&sub=A%20Levels', { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error('Failed to fetch ebooks');
  }
  return res.json();
}

export default async function EbooksPage() {
  const ebooks = await getEbooks();

  return (
    <main className="container mx-auto px-4">
      <section className="flex justify-between items-center py-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold">PDF eBooks</h1>
          <p>Cambridge International General Certificate of Education Advanced Level (not up-to-date)</p>
        </div>
        <div className="text-right">
          {/* Back button moved to client component */}
        </div>
      </section>
      <EbooksClient ebooks={ebooks} showBackButton={true} />
    </main>
  );
}
