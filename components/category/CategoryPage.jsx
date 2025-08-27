'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button, Skeleton, Empty, notification } from 'antd';
import { ArrowLeftOutlined, FireOutlined } from '@ant-design/icons';
import CategoryHeader from './CategoryHeader';
import SubjectsList from './SubjectsList';
import TrendingSubjectsModal from './TrendingSubjectsModal';
import Footer from '@/components/Footer';
import config from '@/lib/config';
import { fetcher } from '@/lib/api';

export default function CategoryPage({ category, title }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [subjectCount, setSubjectCount] = useState(0);
  const [trendingVisible, setTrendingVisible] = useState(false);
  const [error, setError] = useState(null);

  const description =
    category === 'alevel'
      ? 'Cambridge International General Certificate of Education Advanced Level'
      : 'Cambridge International General Certificate of Secondary Education';

  useEffect(() => {
    loadSubjects();
  }, [category]);

  const loadSubjects = async () => {
    try {
      setLoading(true);
      const data = await fetcher(config.apiUrl.cates[category]);
      setSubjects(data.cates || []);
      setSubjectCount(data.count || 0);
      setError(null);
    } catch (err) {
      setError(err.message);
      notification.error({
        message: 'Error',
        description:
          'An error has occurred. Please check the service status and contact support if needed.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="ant-container">
        <CategoryHeader
          title={title}
          description={description}
          subjectCount={subjectCount}
          loading={loading}
          onBack={() => router.back()}
          onTrendingClick={() => setTrendingVisible(true)}
        />

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
          <SubjectsList subjects={subjects} category={category} />
        )}

        <TrendingSubjectsModal
          category={category}
          visible={trendingVisible}
          onClose={() => setTrendingVisible(false)}
        />
      </main>
      <Footer />
    </>
  );
}