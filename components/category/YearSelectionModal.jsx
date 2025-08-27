'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Modal, Skeleton, Empty, notification } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import config from '@/lib/config';
import { fetcher } from '@/lib/api';

export default function YearSelectionModal({ category, subject, visible, onClose }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [years, setYears] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (visible && subject) {
      loadYears();
    }
  }, [visible, subject, category]);

  const loadYears = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = config.apiUrl.years[category] + subject;
      const data = await fetcher(url);
      setYears(data.years || []);
    } catch (err) {
      setError(err.message);
      notification.error({
        message: 'Error',
        description: 'Failed to load exam years. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleYearClick = (year) => {
    const categoryPath = category === 'alevel' ? 'alevels' : 'igcse';
    router.push(`/paper/${categoryPath}/ppca/${year}/${subject}`);
    onClose();
  };

  return (
    <Modal title="Exam Years" open={visible} footer={null} onCancel={onClose}>
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
        <div className="next-cate-years">
          {years.map((item, index) => (
            <div key={index} onClick={() => handleYearClick(item.name)}>
              <h2>{item.name}</h2>
              <CaretRightOutlined />
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}