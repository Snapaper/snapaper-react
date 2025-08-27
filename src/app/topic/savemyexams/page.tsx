'use client';

import React, { useState } from 'react';
import { Card, Button, Tag, Input, Select, Empty, Skeleton } from 'antd';
import {
  FileTextOutlined,
  DownloadOutlined,
  SearchOutlined,
  FilterOutlined,
  BookOutlined,
} from '@ant-design/icons';
import Footer from '@/components/Footer';

const { Option } = Select;

interface ExamPaper {
  id: string;
  title: string;
  subject: string;
  level: 'IGCSE' | 'A-Level';
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: number;
  marks: number;
  time: string;
  downloadUrl: string;
}

const SaveMyExamsPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  const examPapers: ExamPaper[] = [
    {
      id: '1',
      title: 'Algebra and Functions Practice Paper',
      subject: 'Mathematics',
      level: 'A-Level',
      topic: 'Pure Mathematics',
      difficulty: 'Medium',
      questions: 12,
      marks: 75,
      time: '1h 30min',
      downloadUrl: '#',
    },
    {
      id: '2',
      title: 'Mechanics Practice Paper',
      subject: 'Physics',
      level: 'A-Level',
      topic: 'Mechanics',
      difficulty: 'Hard',
      questions: 8,
      marks: 60,
      time: '1h 15min',
      downloadUrl: '#',
    },
    {
      id: '3',
      title: 'Organic Chemistry Practice Paper',
      subject: 'Chemistry',
      level: 'IGCSE',
      topic: 'Organic Chemistry',
      difficulty: 'Medium',
      questions: 15,
      marks: 80,
      time: '1h 45min',
      downloadUrl: '#',
    },
    {
      id: '4',
      title: 'Cell Biology Practice Paper',
      subject: 'Biology',
      level: 'IGCSE',
      topic: 'Cells and Organization',
      difficulty: 'Easy',
      questions: 20,
      marks: 50,
      time: '1h',
      downloadUrl: '#',
    },
    {
      id: '5',
      title: 'Algorithms Practice Paper',
      subject: 'Computer Science',
      level: 'A-Level',
      topic: 'Algorithms and Problem Solving',
      difficulty: 'Hard',
      questions: 10,
      marks: 70,
      time: '1h 30min',
      downloadUrl: '#',
    },
    {
      id: '6',
      title: 'Microeconomics Practice Paper',
      subject: 'Economics',
      level: 'A-Level',
      topic: 'Microeconomics',
      difficulty: 'Medium',
      questions: 12,
      marks: 65,
      time: '1h 20min',
      downloadUrl: '#',
    },
  ];

  const subjects = Array.from(new Set(examPapers.map(paper => paper.subject)));

  const filteredPapers = examPapers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchText.toLowerCase()) ||
                          paper.subject.toLowerCase().includes(searchText.toLowerCase()) ||
                          paper.topic.toLowerCase().includes(searchText.toLowerCase());
    const matchesLevel = levelFilter === 'all' || paper.level === levelFilter;
    const matchesSubject = subjectFilter === 'all' || paper.subject === subjectFilter;
    const matchesDifficulty = difficultyFilter === 'all' || paper.difficulty === difficultyFilter;
    
    return matchesSearch && matchesLevel && matchesSubject && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'green';
      case 'Medium': return 'orange';
      case 'Hard': return 'red';
      default: return 'default';
    }
  };

  return (
    <>
      <div className="flex-1">
        <main className="container-main">
          {/* Header Section */}
          <section className="section-padding">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Save My <span className="text-gradient gradient-secondary">Exams</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Practice exam papers with detailed mark schemes for effective revision
              </p>
            </div>
          </section>

          {/* Filters Section */}
          <section className="pb-8">
            <Card className="shadow-md">
              <div className="grid md:grid-cols-4 gap-4">
                <Input
                  placeholder="Search papers..."
                  prefix={<SearchOutlined />}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  allowClear
                />
                <Select
                  placeholder="Filter by level"
                  value={levelFilter}
                  onChange={setLevelFilter}
                  className="w-full"
                >
                  <Option value="all">All Levels</Option>
                  <Option value="IGCSE">IGCSE</Option>
                  <Option value="A-Level">A-Level</Option>
                </Select>
                <Select
                  placeholder="Filter by subject"
                  value={subjectFilter}
                  onChange={setSubjectFilter}
                  className="w-full"
                >
                  <Option value="all">All Subjects</Option>
                  {subjects.map(subject => (
                    <Option key={subject} value={subject}>{subject}</Option>
                  ))}
                </Select>
                <Select
                  placeholder="Filter by difficulty"
                  value={difficultyFilter}
                  onChange={setDifficultyFilter}
                  className="w-full"
                >
                  <Option value="all">All Difficulties</Option>
                  <Option value="Easy">Easy</Option>
                  <Option value="Medium">Medium</Option>
                  <Option value="Hard">Hard</Option>
                </Select>
              </div>
            </Card>
          </section>

          {/* Papers Grid */}
          <section className="pb-12">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <Card key={index}>
                    <Skeleton active />
                  </Card>
                ))}
              </div>
            ) : filteredPapers.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPapers.map((paper) => (
                  <Card
                    key={paper.id}
                    hoverable
                    className="h-full flex flex-col"
                  >
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div className="space-x-2">
                          <Tag color={paper.level === 'IGCSE' ? 'orange' : 'cyan'}>
                            {paper.level}
                          </Tag>
                          <Tag color={getDifficultyColor(paper.difficulty)}>
                            {paper.difficulty}
                          </Tag>
                        </div>
                        <FileTextOutlined className="text-2xl text-gray-400" />
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {paper.title}
                      </h3>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <BookOutlined className="mr-2" />
                          <span>{paper.subject} - {paper.topic}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{paper.questions} questions</span>
                          <span>{paper.marks} marks</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-primary font-medium">
                            Time: {paper.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        icon={<FileTextOutlined />}
                        onClick={() => window.open(paper.downloadUrl, '_blank')}
                      >
                        View Paper
                      </Button>
                      <Button
                        type="primary"
                        icon={<DownloadOutlined />}
                        onClick={() => {
                          // In production, this would trigger download
                          window.open(paper.downloadUrl, '_blank');
                        }}
                      >
                        Download
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Empty
                description="No papers found matching your criteria"
                className="py-12"
              />
            )}
          </section>

          {/* Info Section */}
          <section className="pb-12">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About Save My Exams Papers
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    What's Included
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Topic-specific practice papers
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Detailed mark schemes with explanations
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Examiner-style questions
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Grade boundaries and assessment criteria
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    How to Use Effectively
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">1.</span>
                      Complete papers under timed conditions
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">2.</span>
                      Mark your work using the mark scheme
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">3.</span>
                      Review incorrect answers and understand mistakes
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">4.</span>
                      Focus on weak areas with targeted practice
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default SaveMyExamsPage;