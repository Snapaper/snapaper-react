'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import {
  InfoCircleFilled,
  CalendarOutlined,
  NumberOutlined,
} from '@ant-design/icons';
import { Input, Modal, Select, Button, notification, Cascader } from 'antd';
import { formatSubjectNameURL } from '../src/utilities/url-formatter';
import { config } from '../src/config';

const { Option } = Select;

const openNotificationWithIcon = (type, content) => {
  notification[type]({
    message: 'Notification',
    description: content,
  });
};

const OneStepModal = ({ visible, onCancel }) => {
  const [options, setOptions] = useState([
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
  const [subject, setSubject] = useState([]);
  const [month, setMonth] = useState('fm');
  const [type, setType] = useState('qp');
  const [paper, setPaper] = useState('');
  const [year, setYear] = useState('');
  const [oneStepLoading, setOneStepLoading] = useState(false);

  const loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    try {
      const res = await fetch(config.apiUrl.cates[targetOption.value]);
      const data = await res.json();
      targetOption.children = data.cates.map((item) => ({
        label: item.name,
        value: formatSubjectNameURL(item.name),
      }));
      targetOption.loading = false;
      setOptions([...options]);
    } catch (error) {
      console.error('Failed to load data:', error);
      targetOption.loading = false;
    }
  };

  const oneStep = () => {
    if (month && subject.length && year && type && paper) {
      let server = 'https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload';
      let monthCode;
      switch (month) {
        case 'fm':
          monthCode = 'm';
          break;
        case 'mj':
          monthCode = 's';
          break;
        case 'on':
          monthCode = 'w';
          break;
      }

      const code = subject[1].split('(')[1].slice(0, -1);
      const url = `${server}/${code}_${monthCode}${year}_${type}_${paper}.pdf`;

      setOneStepLoading(true);

      fetch(`https://cors.ouorz.com/?url=${encodeURIComponent(url)}`)
        .then((res) => {
          if (res.status === 200) {
            window.open(url, '_blank');
          } else {
            openNotificationWithIcon(
              'error',
              <>
                Paper not found, please try again later. <br />
                <a href={url} target="_blank" rel="noreferrer">
                  Open anyway →
                </a>
              </>
            );
          }
          setOneStepLoading(false);
        })
        .catch(() => {
          openNotificationWithIcon(
            'error',
            <>
              Paper not found, please try again later. <br />
              <a href={url} target="_blank" rel="noreferrer">
                Open anyway →
              </a>
            </>
          );
          setOneStepLoading(false);
        });
    } else {
      openNotificationWithIcon('error', 'Incomplete information');
    }
  };

  return (
    <Modal
      title="One Step"
      open={visible}
      onCancel={onCancel}
      footer={false}
    >
      <Cascader
        options={options}
        loadData={loadData}
        onChange={(value) => setSubject(value)}
        changeOnSelect
        size="large"
        className="w-full mb-4"
        placeholder="Please select a subject"
      />
      <Input
        onChange={(e) => setPaper(e.target.value)}
        placeholder="Enter paper number eg.42"
        className="mb-4"
        prefix={<NumberOutlined />}
        size="large"
        maxLength={2}
      />
      <Select
        className="w-full mb-4"
        placeholder="Exam Month"
        defaultValue={month}
        onChange={(value) => setMonth(value)}
        size="large"
      >
        <Option key="fm">February / March</Option>
        <Option key="mj">May / June</Option>
        <Option key="on">October / November</Option>
      </Select>
      <Input
        onChange={(e) => setYear(e.target.value)}
        placeholder="Enter year number eg.17"
        className="mb-4"
        prefix={<CalendarOutlined />}
        size="large"
        maxLength={2}
      />
      <Select
        className="w-full mb-4"
        placeholder="Type of paper"
        defaultValue={type}
        onChange={(value) => setType(value)}
        size="large"
      >
        <Option key="qp">Question Paper</Option>
        <Option key="ms">Mark Scheme</Option>
      </Select>
      <Button
        size="large"
        type="primary"
        onClick={oneStep}
        className="w-full"
        loading={oneStepLoading}
      >
        Find
      </Button>
    </Modal>
  );
};

export default function Home() {
  const [osVisible, setOsVisible] = useState(false);

  return (
    <div>
      <main className="container mx-auto px-4">
        <section className="text-center py-8">
          <p>
            Discover Snapaper, the ultimate destination for CAIE past papers.
            Consider supporting us through:
          </p>
          <div className="mt-4">
            <a
              href="https://github.com/sponsors/ttttonyhe"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline"
            >
              Github Sponsors →
            </a>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className="cursor-pointer rounded-lg shadow-lg overflow-hidden"
            onClick={() => setOsVisible(true)}
          >
            <Image
              src="https://static.ouorz.com/onestep.jpeg"
              width={400}
              height={260}
              alt="One Step"
              className="w-full"
            />
            <div className="p-4">
              <h1 className="text-2xl font-bold">One Step</h1>
              <p>The fastest and easiest way to find a paper</p>
            </div>
          </div>
          <OneStepModal visible={osVisible} onCancel={() => setOsVisible(false)} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/cate/igcse">
              <div className="flex items-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Image
                  src="https://static.ouorz.com/igcse.jpeg"
                  width={48}
                  height={48}
                  alt="IGCSE"
                />
                <div className="ml-4">
                  <h2 className="font-bold">IGCSE</h2>
                  <p className="text-sm text-gray-600">
                    Cambridge International General Certificate of Secondary Education
                  </p>
                </div>
              </div>
            </Link>
            <Link href="/cate/alevels">
              <div className="flex items-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Image
                  src="https://static.ouorz.com/alevel.jpeg"
                  width={48}
                  height={48}
                  alt="A Levels"
                />
                <div className="ml-4">
                  <h2 className="font-bold">A Levels</h2>
                  <p className="text-sm text-gray-600">
                    Cambridge International General Certificate of Education Advanced Level
                  </p>
                </div>
              </div>
            </Link>
            <Link href="/topic/ebooks">
              <div className="flex items-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Image
                  src="https://static.ouorz.com/ebooks.jpeg"
                  width={48}
                  height={48}
                  alt="PDF eBooks"
                />
                <div className="ml-4">
                  <h2 className="font-bold">PDF eBooks</h2>
                  <p className="text-sm text-gray-600">
                    Cambridge International Curriculum PDF electronic textbooks
                  </p>
                </div>
              </div>
            </Link>
            <Link href="/topic/savemyexams">
              <div className="flex items-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Image
                  src="https://static.ouorz.com/sme.jpeg"
                  width={48}
                  height={48}
                  alt="Save My Exams"
                />
                <div className="ml-4">
                  <h2 className="font-bold">Save My Exams</h2>
                  <p className="text-sm text-gray-600">Practice exam mark schemes</p>
                </div>
              </div>
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <Link href="/page/about">
            <div className="p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h1 className="text-xl font-bold">
                <InfoCircleFilled /> About Us
              </h1>
              <p>Learn more about Snapaper and its author</p>
            </div>
          </Link>
          <div
            className="p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => {
              window.location.href = 'https://www.ouorz.com/sponsor';
            }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold">Sponsor Us</h1>
                <p>Support the development of Snapaper</p>
              </div>
              <Image
                src="https://static.ouorz.com/sponsor.jpeg"
                width={100}
                height={100}
                alt="Sponsor Us"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
