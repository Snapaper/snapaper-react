'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Skeleton, Empty, notification } from 'antd';
import { ArrowLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import Footer from '@/components/Footer';
import { liveView } from '@/lib/utils';
import { fetcher } from '@/lib/api';

export default function EbooksPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [ebooks, setEbooks] = useState([]);
  const [ebookCount, setEbookCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEbooks();
  }, []);

  const loadEbooks = async () => {
    try {
      setLoading(true);
      const data = await fetcher('https://node.snapaper.com/api/ebooks');
      setEbooks(data.ebooks || []);
      setEbookCount(data.count || 0);
      setError(null);
    } catch (err) {
      setError(err.message);
      notification.error({
        message: 'Error',
        description: 'Failed to load ebooks. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="ant-container">
        <section className="next-cate-header next-topic-header">
          <div className="left">
            <div>
              <h1>PDF eBooks</h1>
              <p>
                Cambridge International General Certificate of Education Advanced Level (not
                up-to-date)
              </p>
            </div>
          </div>
          <div className="next-paper-header-info">
            <div>
              <Button>{loading ? 'Loading...' : `${ebookCount} Books`}</Button>
              <Button type="primary" onClick={() => router.back()}>
                <ArrowLeftOutlined /> Back
              </Button>
            </div>
          </div>
        </section>

        {error ? (
          <div className="next-cate-error">
            <Empty description={false} />
            <p>{error}</p>
          </div>
        ) : loading ? (
          <div>
            <Skeleton active />
            <Skeleton active />
          </div>
        ) : (
          <div className="next-topic-ebooks">
            {ebooks.map((item, index) => {
              if (item.name && item.name !== 'error_log') {
                return (
                  <div key={index}>
                    <h2>{item.name.replace('amp;', '')}</h2>
                    <div className="actions">
                      <Button type="default" onClick={() => liveView(item.url)}>
                        Live View
                      </Button>
                      <a href={item.url} target="_blank" rel="noreferrer">
                        <Button type="primary">
                          Download <CaretRightOutlined />
                        </Button>
                      </a>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}