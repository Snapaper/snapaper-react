'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Button,
  Modal,
  Skeleton,
  Empty,
  notification,
  Badge,
  Card,
} from 'antd';
import {
  ArrowLeftOutlined,
  FireOutlined,
  CaretRightOutlined,
  BookOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import Footer from '@/components/Footer';
import TrendingSubjects from '@/components/TrendingSubjects';
import config from '@/lib/config';
import { formatSubjectNameURL } from '@/lib/utils/url-formatter';
import imagePlaceholder from '@/lib/utils/image-placeholder';

interface Subject {
  name: string;
  count?: number;
}

interface YearData {
  name: string;
}

const IGCSEPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectCount, setSubjectCount] = useState(0);
  const [trendingVisible, setTrendingVisible] = useState(false);
  const [yearModalVisible, setYearModalVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [years, setYears] = useState<YearData[]>([]);
  const [yearsLoading, setYearsLoading] = useState(false);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get(config.apiUrl.cates.igcse);
      const filteredSubjects = response.data.cates.filter(
        (item: Subject) => item.name && item.name !== 'error_log'
      );
      setSubjects(filteredSubjects);
      setSubjectCount(response.data.count || filteredSubjects.length);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to load subjects. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchYears = async (subject: string) => {
    try {
      setYearsLoading(true);
      const response = await axios.get(config.apiUrl.years.igcse + subject);
      setYears(response.data.years || []);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to load years. Please try again.',
      });
    } finally {
      setYearsLoading(false);
    }
  };

  const handleSubjectClick = async (subject: Subject) => {
    const formattedSubject = formatSubjectNameURL(subject.name);
    setSelectedSubject(formattedSubject);
    setYearModalVisible(true);
    await fetchYears(formattedSubject);
  };

  return (
    <>
      <div className="flex-1">
        <main className="container-main">
          {/* Header Section */}
          <section className="section-padding">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 md:p-12 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    IGCSE
                  </h1>
                  <p className="text-lg text-gray-600 mb-6">
                    Cambridge International General Certificate of Secondary Education
                  </p>
                  <div className="flex flex-wrap gap-4 mb-6">
                    <Badge
                      count={`${subjectCount} Subjects`}
                      style={{ backgroundColor: '#52c41a' }}
                      className="px-4 py-2"
                    />
                    <Button
                      type="primary"
                      icon={<ArrowLeftOutlined />}
                      onClick={() => router.back()}
                    >
                      Back
                    </Button>
                  </div>
                  <Button
                    icon={<FireOutlined />}
                    onClick={() => setTrendingVisible(true)}
                    className="hover:shadow-md transition-shadow"
                  >
                    View Trending Subjects
                  </Button>
                </div>
                <div className="flex justify-center md:justify-end space-x-8">
                  <div className="text-center">
                    <div className="bg-white rounded-lg p-4 shadow-md mb-2">
                      <Image
                        src="https://static.ouorz.com/QQ20200114-203749@2x.png"
                        width={40}
                        height={40}
                        alt="CAIE"
                        className="mx-auto"
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-600">Board</p>
                    <p className="text-lg font-bold text-gray-900">CAIE</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white rounded-lg p-4 shadow-md mb-2">
                      <Image
                        src="https://static.ouorz.com/papacambridge.png"
                        width={40}
                        height={40}
                        alt="PapaCambridge"
                        className="mx-auto"
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-600">Source</p>
                    <p className="text-lg font-bold text-gray-900">PapaCambridge</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Subjects Grid */}
          <section className="pb-12">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <Card key={index} loading={true} />
                ))}
              </div>
            ) : subjects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((subject, index) => (
                  <Card
                    key={index}
                    hoverable
                    className="subject-card subject-card-igcse cursor-pointer transform transition-all duration-300 hover:scale-105"
                    onClick={() => handleSubjectClick(subject)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          <BookOutlined className="mr-2 text-accent" />
                          {subject.name.replace('amp;', '')}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Choose an Exam Year
                        </p>
                      </div>
                      <CaretRightOutlined className="text-xl text-gray-400" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Empty
                description="No subjects available"
                className="py-12"
              />
            )}
          </section>
        </main>
      </div>

      {/* Trending Subjects Modal */}
      <TrendingSubjects
        cate="igcse"
        visible={trendingVisible}
        onClose={() => setTrendingVisible(false)}
        onSelectSubject={(subject) => {
          setTrendingVisible(false);
          handleSubjectClick({ name: subject });
        }}
      />

      {/* Year Selection Modal */}
      <Modal
        title={
          <div className="flex items-center text-xl">
            <CalendarOutlined className="mr-2 text-primary" />
            Select Exam Year
          </div>
        }
        open={yearModalVisible}
        onCancel={() => setYearModalVisible(false)}
        footer={null}
        width={600}
      >
        {yearsLoading ? (
          <div className="space-y-4 py-4">
            <Skeleton active />
            <Skeleton active />
          </div>
        ) : years.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
            {years.map((year, index) => (
              <Link
                key={index}
                href={`/paper/igcse/ppca/${year.name}/${selectedSubject}`}
                className="bg-gray-50 hover:bg-primary hover:text-white rounded-lg p-4 text-center transition-all duration-300 group"
              >
                <div className="text-lg font-semibold">{year.name}</div>
                <CaretRightOutlined className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        ) : (
          <Empty description="No years available" className="py-8" />
        )}
      </Modal>

      <Footer />
    </>
  );
};

export default IGCSEPage;