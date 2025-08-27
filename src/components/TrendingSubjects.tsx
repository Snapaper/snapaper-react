'use client';

import React, { useState, useEffect } from 'react';
import { Modal, List, Skeleton, Empty, Tag, Badge } from 'antd';
import { FireOutlined, TrophyOutlined, RiseOutlined } from '@ant-design/icons';
import axios from 'axios';

interface TrendingSubjectsProps {
  cate: 'alevel' | 'igcse';
  visible: boolean;
  onClose: () => void;
  onSelectSubject: (subject: string) => void;
}

interface TrendingSubject {
  name: string;
  views: number;
  trend: 'up' | 'down' | 'stable';
}

const TrendingSubjects: React.FC<TrendingSubjectsProps> = ({
  cate,
  visible,
  onClose,
  onSelectSubject,
}) => {
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState<TrendingSubject[]>([]);

  useEffect(() => {
    if (visible) {
      fetchTrendingSubjects();
    }
  }, [visible, cate]);

  const fetchTrendingSubjects = async () => {
    setLoading(true);
    // Simulate API call - in production, this would fetch real trending data
    setTimeout(() => {
      const mockData: TrendingSubject[] = [
        { name: 'Mathematics', views: 15234, trend: 'up' },
        { name: 'Physics', views: 12456, trend: 'up' },
        { name: 'Chemistry', views: 10234, trend: 'stable' },
        { name: 'Biology', views: 9876, trend: 'down' },
        { name: 'Computer Science', views: 8765, trend: 'up' },
        { name: 'Economics', views: 7654, trend: 'stable' },
        { name: 'Business Studies', views: 6543, trend: 'up' },
        { name: 'English Literature', views: 5432, trend: 'stable' },
      ];
      setSubjects(mockData);
      setLoading(false);
    }, 1000);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <RiseOutlined className="text-green-500" />;
      case 'down':
        return <RiseOutlined className="text-red-500 rotate-180" />;
      default:
        return <span className="text-gray-400">—</span>;
    }
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return <TrophyOutlined className="text-yellow-500 text-xl" />;
    if (index === 1) return <TrophyOutlined className="text-gray-400 text-xl" />;
    if (index === 2) return <TrophyOutlined className="text-orange-600 text-xl" />;
    return <span className="text-gray-500 font-bold">#{index + 1}</span>;
  };

  return (
    <Modal
      title={
        <div className="flex items-center text-xl">
          <FireOutlined className="mr-2 text-orange-500" />
          Trending Subjects - {cate === 'alevel' ? 'A Levels' : 'IGCSE'}
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      {loading ? (
        <div className="space-y-4 py-4">
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </div>
      ) : subjects.length > 0 ? (
        <List
          className="trending-list"
          dataSource={subjects}
          renderItem={(item, index) => (
            <List.Item
              className="cursor-pointer hover:bg-gray-50 rounded-lg px-4 transition-colors duration-200"
              onClick={() => onSelectSubject(item.name)}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-4">
                  <div className="w-8">{getRankIcon(index)}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500">
                      {item.views.toLocaleString()} views this week
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(item.trend)}
                  {index < 3 && (
                    <Badge
                      count="HOT"
                      style={{
                        backgroundColor: '#ff4d4f',
                        fontSize: '10px',
                        height: '18px',
                        lineHeight: '18px',
                        padding: '0 6px',
                      }}
                    />
                  )}
                </div>
              </div>
            </List.Item>
          )}
        />
      ) : (
        <Empty description="No trending data available" className="py-8" />
      )}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Tip:</strong> Trending subjects are updated weekly based on user activity and search patterns.
        </p>
      </div>
    </Modal>
  );
};

export default TrendingSubjects;