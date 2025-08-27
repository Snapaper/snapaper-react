'use client';

import React from 'react';
import Image from 'next/image';
import { Card, Button, Tag, Badge } from 'antd';
import {
  BookOutlined,
  DownloadOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import Footer from '@/components/Footer';

interface EBook {
  title: string;
  subject: string;
  level: 'IGCSE' | 'A-Level' | 'Both';
  description: string;
  size: string;
  pages: number;
  downloadUrl: string;
  coverImage?: string;
}

const EBooksPage: React.FC = () => {
  const ebooks: EBook[] = [
    {
      title: 'Cambridge IGCSE Mathematics Core and Extended',
      subject: 'Mathematics',
      level: 'IGCSE',
      description: 'Complete coverage of the Cambridge IGCSE Mathematics syllabus for both Core and Extended levels.',
      size: '45 MB',
      pages: 580,
      downloadUrl: '#',
    },
    {
      title: 'Cambridge International AS & A Level Physics',
      subject: 'Physics',
      level: 'A-Level',
      description: 'Comprehensive physics textbook covering all topics in the Cambridge International AS & A Level Physics syllabus.',
      size: '62 MB',
      pages: 720,
      downloadUrl: '#',
    },
    {
      title: 'Cambridge IGCSE Chemistry',
      subject: 'Chemistry',
      level: 'IGCSE',
      description: 'Full coverage of the Cambridge IGCSE Chemistry syllabus with practical experiments and examples.',
      size: '38 MB',
      pages: 450,
      downloadUrl: '#',
    },
    {
      title: 'Cambridge International AS & A Level Biology',
      subject: 'Biology',
      level: 'A-Level',
      description: 'Detailed biology textbook covering all aspects of the Cambridge International AS & A Level Biology course.',
      size: '55 MB',
      pages: 680,
      downloadUrl: '#',
    },
    {
      title: 'Cambridge IGCSE Computer Science',
      subject: 'Computer Science',
      level: 'IGCSE',
      description: 'Modern computer science textbook with programming examples and practical exercises.',
      size: '28 MB',
      pages: 380,
      downloadUrl: '#',
    },
    {
      title: 'Cambridge International AS & A Level Economics',
      subject: 'Economics',
      level: 'A-Level',
      description: 'Complete economics textbook with real-world case studies and exam-style questions.',
      size: '42 MB',
      pages: 520,
      downloadUrl: '#',
    },
  ];

  const subjects = Array.from(new Set(ebooks.map(book => book.subject)));
  const levels = ['All', 'IGCSE', 'A-Level'];

  return (
    <>
      <div className="flex-1">
        <main className="container-main">
          {/* Header Section */}
          <section className="section-padding">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                PDF <span className="text-gradient gradient-primary">eBooks</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Cambridge International Curriculum PDF electronic textbooks for comprehensive learning
              </p>
              <div className="flex justify-center space-x-4 mb-8">
                <Badge count={ebooks.length} style={{ backgroundColor: '#52c41a' }}>
                  <Button size="large">Available Books</Button>
                </Badge>
                <Badge count={subjects.length} style={{ backgroundColor: '#1890ff' }}>
                  <Button size="large">Subjects</Button>
                </Badge>
              </div>
            </div>
          </section>

          {/* Notice */}
          <section className="pb-8">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <BookOutlined className="text-2xl text-yellow-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Notice</h3>
                  <p className="text-gray-700">
                    These textbooks are provided for educational purposes only. Please ensure you have the right to access and use these materials in your region. 
                    We recommend purchasing official textbooks to support the publishers and authors.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* eBooks Grid */}
          <section className="pb-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ebooks.map((book, index) => (
                <Card
                  key={index}
                  hoverable
                  className="h-full flex flex-col"
                  cover={
                    <div className="h-48 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                      <FileTextOutlined className="text-6xl text-primary opacity-50" />
                    </div>
                  }
                >
                  <div className="flex-1">
                    <div className="mb-3">
                      <Tag color={book.level === 'IGCSE' ? 'orange' : 'cyan'}>
                        {book.level}
                      </Tag>
                      <Tag color="blue">{book.subject}</Tag>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {book.description}
                    </p>
                    <div className="flex justify-between text-sm text-gray-500 mb-4">
                      <span>{book.pages} pages</span>
                      <span>{book.size}</span>
                    </div>
                  </div>
                  <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    block
                    onClick={() => {
                      // In production, this would trigger actual download
                      window.open(book.downloadUrl, '_blank');
                    }}
                  >
                    Download PDF
                  </Button>
                </Card>
              ))}
            </div>
          </section>

          {/* Features Section */}
          <section className="pb-12">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Why Use Our eBooks?
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <CheckCircleOutlined className="text-4xl text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Official Content</h3>
                  <p className="text-gray-600">
                    Aligned with Cambridge International curriculum
                  </p>
                </div>
                <div className="text-center">
                  <CheckCircleOutlined className="text-4xl text-secondary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">High Quality</h3>
                  <p className="text-gray-600">
                    Clear, searchable PDF format with bookmarks
                  </p>
                </div>
                <div className="text-center">
                  <CheckCircleOutlined className="text-4xl text-accent mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Instant Access</h3>
                  <p className="text-gray-600">
                    Download immediately and study offline
                  </p>
                </div>
                <div className="text-center">
                  <CheckCircleOutlined className="text-4xl text-green-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Free Forever</h3>
                  <p className="text-gray-600">
                    No subscription or hidden fees
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Tips Section */}
          <section className="pb-12">
            <Card className="shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Study Tips</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-primary font-bold mr-3">1.</span>
                  <div>
                    <strong>Create a Study Schedule:</strong> Use these textbooks alongside past papers for comprehensive preparation.
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary font-bold mr-3">2.</span>
                  <div>
                    <strong>Take Notes:</strong> Annotate PDFs or maintain separate notes for better retention.
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary font-bold mr-3">3.</span>
                  <div>
                    <strong>Practice Problems:</strong> Complete all exercises and examples in the textbooks.
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary font-bold mr-3">4.</span>
                  <div>
                    <strong>Review Regularly:</strong> Revisit chapters periodically to reinforce learning.
                  </div>
                </div>
              </div>
            </Card>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default EBooksPage;