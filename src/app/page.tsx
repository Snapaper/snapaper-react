'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Modal, Cascader, Input, Select, notification } from 'antd';
import {
  InfoCircleFilled,
  CalendarOutlined,
  NumberOutlined,
  RocketOutlined,
  BookOutlined,
  FileTextOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import type { CascaderProps } from 'antd';
import axios from 'axios';
import Footer from '@/components/Footer';
import config from '@/lib/config';
import { formatSubjectNameURL } from '@/lib/utils/url-formatter';

const { Option } = Select;

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const HomePage: React.FC = () => {
  const [oneStepVisible, setOneStepVisible] = useState(false);
  const [oneStepLoading, setOneStepLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: [] as string[],
    paper: '',
    month: 'fm',
    year: '',
    type: 'qp',
  });
  const [cascaderOptions, setCascaderOptions] = useState<CascaderProps['options']>([
    {
      value: 'igcse',
      label: 'IGCSE',
      isLeaf: false,
    },
    {
      value: 'alevel',
      label: 'A Levels',
      isLeaf: false,
    },
  ]);

  const openNotification = (type: NotificationType, content: React.ReactNode) => {
    notification[type]({
      message: 'Notification',
      description: content,
    });
  };

  const loadCascaderData: CascaderProps['loadData'] = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    try {
      const response = await axios.get(
        config.apiUrl.cates[targetOption.value as 'alevel' | 'igcse']
      );
      
      targetOption.children = response.data.cates.map((item: any) => ({
        label: item.name,
        value: formatSubjectNameURL(item.name),
      }));
      
      targetOption.loading = false;
      setCascaderOptions([...cascaderOptions!]);
    } catch (error) {
      targetOption.loading = false;
      openNotification('error', 'Failed to load subjects. Please try again.');
    }
  };

  const handleOneStep = async () => {
    const { subject, paper, month, year, type } = formData;

    if (!subject.length || !paper || !year) {
      openNotification('error', 'Please fill in all required fields');
      return;
    }

    setOneStepLoading(true);

    const monthMap: Record<string, string> = {
      fm: 'm',
      mj: 's',
      on: 'w',
    };

    const monthCode = monthMap[month];
    const subjectCode = subject[1]
      .split('(')[1]
      ?.replace(')', '') || '';

    const url = `https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/${subjectCode}_${monthCode}${year}_${type}_${paper}.pdf`;

    try {
      const response = await fetch(
        `https://cors.ouorz.com/?url=${encodeURIComponent(url)}`
      );

      if (response.status === 200) {
        window.open(url, '_blank');
      } else {
        throw new Error('Paper not found');
      }
    } catch (error) {
      openNotification(
        'error',
        <>
          Paper not found, please try again later.
          <br />
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary">
            Open anyway →
          </a>
        </>
      );
    } finally {
      setOneStepLoading(false);
    }
  };

  const features = [
    {
      title: 'IGCSE',
      description: 'Cambridge International General Certificate of Secondary Education',
      icon: 'https://static.ouorz.com/igcse.jpeg',
      href: '/cate/igcse',
      color: 'border-accent',
    },
    {
      title: 'A Levels',
      description: 'Cambridge International General Certificate of Education Advanced Level',
      icon: 'https://static.ouorz.com/alevel.jpeg',
      href: '/cate/alevels',
      color: 'border-secondary',
    },
    {
      title: 'PDF eBooks',
      description: 'Cambridge International Curriculum PDF electronic textbooks',
      icon: 'https://static.ouorz.com/ebooks.jpeg',
      href: '/topic/ebooks',
      color: 'border-primary',
    },
    {
      title: 'Save My Exams',
      description: 'Practice exam mark schemes',
      icon: 'https://static.ouorz.com/sme.jpeg',
      href: '/topic/savemyexams',
      color: 'border-accent',
    },
  ];

  return (
    <>
      <div className="flex-1">
        {/* Hero Section */}
        <section className="container-main section-padding">
          {/* Notice Banner */}
          <div className="notice-banner mb-8 animate-slide-down">
            <p className="text-gray-700 mb-3">
              Discover Snapaper, the ultimate destination for CAIE past papers.
              Consider supporting us through:
            </p>
            <div>
              <a
                href="https://github.com/sponsors/ttttonyhe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary font-medium hover:text-blue-600 transition-colors"
              >
                Github Sponsors →
              </a>
            </div>
          </div>

          {/* One Step Feature */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div
              className="feature-card bg-gradient-to-br from-blue-50 to-cyan-50 cursor-pointer group animate-fade-in"
              onClick={() => setOneStepVisible(true)}
            >
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <Image
                    src="https://static.ouorz.com/onestep.jpeg"
                    width={200}
                    height={130}
                    alt="One Step"
                    className="rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300"
                  />
                  <div className="absolute -top-2 -right-2 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse">
                    Featured
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center md:justify-start">
                    <RocketOutlined className="mr-2 text-primary" />
                    One Step
                  </h2>
                  <p className="text-gray-600">
                    The fastest and easiest way to find a paper
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow-md p-6 text-center animate-fade-in animation-delay-200">
                <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                <div className="text-gray-600">Past Papers</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center animate-fade-in animation-delay-400">
                <div className="text-3xl font-bold text-secondary mb-2">50+</div>
                <div className="text-gray-600">Subjects</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center animate-fade-in animation-delay-600">
                <div className="text-3xl font-bold text-accent mb-2">24/7</div>
                <div className="text-gray-600">Available</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center animate-fade-in animation-delay-600">
                <div className="text-3xl font-bold text-green-500 mb-2">Free</div>
                <div className="text-gray-600">Forever</div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <Link
                key={feature.title}
                href={feature.href}
                className={`subject-card ${feature.color} hover:scale-105 transform transition-all duration-300 animate-slide-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={feature.icon}
                    width={48}
                    height={48}
                    alt={feature.title}
                    className="rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </Link>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/about"
              className="group bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                <InfoCircleFilled className="mr-2 text-primary" />
                About Us
              </h2>
              <p className="text-gray-600">
                Learn more about Snapaper and its mission to help students worldwide
              </p>
            </Link>

            <a
              href="https://www.ouorz.com/sponsor"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 flex justify-between items-center"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Sponsor Us
                </h2>
                <p className="text-gray-600">
                  Support the development of Snapaper
                </p>
              </div>
              <Image
                src="https://static.ouorz.com/sponsor.jpeg"
                width={100}
                height={100}
                alt="Sponsor Us"
                className="rounded-lg group-hover:scale-110 transition-transform duration-300"
              />
            </a>
          </div>
        </section>
      </div>

      {/* One Step Modal */}
      <Modal
        title={
          <div className="flex items-center text-xl">
            <RocketOutlined className="mr-2 text-primary" />
            One Step - Quick Paper Finder
          </div>
        }
        open={oneStepVisible}
        onCancel={() => setOneStepVisible(false)}
        footer={null}
        width={600}
      >
        <div className="space-y-4 mt-6">
          <Cascader
            options={cascaderOptions}
            loadData={loadCascaderData}
            onChange={(value) => setFormData({ ...formData, subject: value as string[] })}
            changeOnSelect
            size="large"
            className="w-full"
            placeholder="Please select a subject"
          />

          <Input
            onChange={(e) => setFormData({ ...formData, paper: e.target.value })}
            placeholder="Enter paper number (e.g., 42)"
            prefix={<NumberOutlined />}
            size="large"
            maxLength={2}
          />

          <Select
            placeholder="Exam Month"
            value={formData.month}
            onChange={(value) => setFormData({ ...formData, month: value })}
            size="large"
            className="w-full"
          >
            <Option value="fm">February / March</Option>
            <Option value="mj">May / June</Option>
            <Option value="on">October / November</Option>
          </Select>

          <Input
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            placeholder="Enter year number (e.g., 23)"
            prefix={<CalendarOutlined />}
            size="large"
            maxLength={2}
          />

          <Select
            placeholder="Type of paper"
            value={formData.type}
            onChange={(value) => setFormData({ ...formData, type: value })}
            size="large"
            className="w-full"
          >
            <Option value="qp">Question Paper</Option>
            <Option value="ms">Mark Scheme</Option>
          </Select>

          <Button
            type="primary"
            size="large"
            onClick={handleOneStep}
            loading={oneStepLoading}
            className="w-full h-12 text-lg font-medium"
          >
            Find Paper
          </Button>
        </div>
      </Modal>

      <Footer />
    </>
  );
};

export default HomePage;