'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import isMobile from 'ismobilejs';
import { Button, Skeleton, Empty, notification } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import PaperHeader from './PaperHeader';
import PaperTable from './PaperTable';
import MobilePaperList from './MobilePaperList';
import DownloadModal from './DownloadModal';
import Footer from '@/components/Footer';
import config from '@/lib/config';
import { fetcher } from '@/lib/api';
import { usePaperStore } from '@/hooks/usePaperStore';

export default function PaperPage({ category, level, source = 'ppca', params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [papers, setPapers] = useState([]);
  const [paperCount, setPaperCount] = useState(0);
  const [error, setError] = useState(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [downloadModalVisible, setDownloadModalVisible] = useState(false);
  
  const { setPaperData, setSelectedPapers } = usePaperStore();

  const subject = params.subject?.replace('amp;', '').replaceAll('-', ' ') || '';
  const year = params.year || '';
  const title = category === 'alevel' ? 'A Levels' : 'IGCSE';
  const description =
    category === 'alevel'
      ? 'Cambridge International General Certificate of Education Advanced Level'
      : 'Cambridge International General Certificate of Secondary Education';

  useEffect(() => {
    setIsMobileDevice(isMobile(window.navigator).any);
    if (params.subject) {
      loadPapers();
    }
  }, [params.subject, params.year, category, source]);

  const loadPapers = async () => {
    try {
      setLoading(true);
      const url = `${config.apiUrl.papers[source][category]}${params.subject}/${params.year}`;
      const data = await fetcher(url);
      setPapers(data.papers || []);
      setPaperCount(data.count || 0);
      setPaperData(data.papers || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      notification.error({
        message: 'Error',
        description: 'Failed to load papers. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadSelected = () => {
    setDownloadModalVisible(true);
  };

  const handleDownloadAll = () => {
    setPaperData(papers);
    setSelectedPapers(papers.map((_, index) => index + 1));
    setDownloadModalVisible(true);
  };

  return (
    <>
      <main className="ant-container">
        <PaperHeader
          title={subject || title}
          description={description}
          level={title}
          year={year}
          paperCount={paperCount}
          loading={loading}
          onBack={() => router.back()}
          onDownloadSelected={handleDownloadSelected}
          onDownloadAll={handleDownloadAll}
        />

        {!params.subject ? (
          <div>
            <Skeleton active />
            <Skeleton active />
          </div>
        ) : error ? (
          <div className="next-cate-error">
            <Empty description={false} />
            <p>{error}</p>
          </div>
        ) : loading ? (
          <div>
            <Skeleton active />
            <Skeleton active />
          </div>
        ) : isMobileDevice ? (
          <MobilePaperList papers={papers} />
        ) : (
          <PaperTable papers={papers} />
        )}

        <DownloadModal
          visible={downloadModalVisible}
          onClose={() => setDownloadModalVisible(false)}
        />
      </main>
      <Footer />
    </>
  );
}