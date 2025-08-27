import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Image from 'next/image';
import { config } from '../../../src/config';
import IGCSEPageClient from './client';

async function getSubjects() {
  const res = await fetch(config.apiUrl.cates.igcse, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error('Failed to fetch subjects');
  }
  return res.json();
}

export default async function IGCSEPage() {
  const subjectsData = await getSubjects();

  return (
    <main className="container mx-auto px-4">
      <section className="flex justify-between items-center py-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold">IGCSE</h1>
          <p>Cambridge International General Certificate of Secondary Education</p>
          <div className="flex space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <span className="font-bold">Board:</span>
              <Image
                src="https://static.ouorz.com/QQ20200114-203749@2x.png"
                width={21}
                height={21}
                alt="CAIE"
              />
              <span>CAIE</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold">Source:</span>
              <Image
                src="https://static.ouorz.com/papacambridge.png"
                width={21}
                height={21}
                alt="PapaCambridge"
              />
              <span>PapaCambridge</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          {/* Back button moved to client component */}
        </div>
      </section>
      <IGCSEPageClient subjects={subjectsData.cates} showBackButton={true} />
    </main>
  );
}
