'use client';

import { useState } from 'react';
import { Button, Modal, Skeleton, Empty, notification } from 'antd';
import { ArrowLeftOutlined, FireOutlined, CaretRightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { config } from '../../../src/config';
import { formatSubjectNameURL } from '../../../src/utilities/url-formatter';
import MBS from '../../../src/components/mbs';

const openNotificationWithIcon = (type, content) => {
  notification[type]({
    message: 'Notification',
    description: content,
  });
};

const YearChooserModal = ({ visible, onCancel, subject }) => {
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useState(() => {
    if (subject) {
      fetch(`${config.apiUrl.years.alevel}${subject}`)
        .then((res) => res.json())
        .then((data) => {
          setYears(data.years);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
          openNotificationWithIcon('error', 'Failed to load years.');
        });
    }
  }, [subject]);

  return (
    <Modal
      title="Exam Years"
      open={visible}
      onCancel={onCancel}
      footer={null}
      zIndex={2}
    >
      {loading && <Skeleton active />}
      {error && <Empty description="Failed to load years" />}
      {!loading && !error && (
        <div className="space-y-2">
          {years.map((item, index) => (
            <Link
              href={`/paper/alevels/ppca/${item.name}/${subject}`}
              key={index}
            >
              <div className="flex justify-between items-center p-2 rounded-md hover:bg-gray-100">
                <h2>{item.name}</h2>
                <CaretRightOutlined />
              </div>
            </Link>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default function AlevelsPageClient({ subjects, showBackButton }) {
  const [mbsVisible, setMbsVisible] = useState(false);
  const [ycVisible, setYcVisible] = useState(false);
  const [ycSubject, setYcSubject] = useState('');

  const handleSubjectClick = (subjectName) => {
    setYcSubject(formatSubjectNameURL(subjectName));
    setYcVisible(true);
  };

  return (
    <div>
      {showBackButton && (
        <div className="text-right mb-4">
          <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            onClick={() => history.back()}
          >
            Back
          </Button>
        </div>
      )}
      <section className="mb-8">
        <div className="cursor-pointer" onClick={() => setMbsVisible(true)}>
          <h2 className="text-xl font-bold">
            <FireOutlined /> Trending Subjects
          </h2>
          <p>Click to see the list of most browsed subjects</p>
        </div>
        <MBS
          cate="alevel"
          MBSvisible={mbsVisible}
          cancelDisplay={() => setMbsVisible(false)}
          toggleYearChoose={(subject) => {
            handleSubjectClick(subject);
          }}
        />
        <YearChooserModal
          visible={ycVisible}
          onCancel={() => setYcVisible(false)}
          subject={ycSubject}
        />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((item, index) => {
          if (item.name && item.name !== 'error_log') {
            return (
              <div
                key={index}
                className="p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleSubjectClick(item.name)}
              >
                <h2 className="font-bold">{item.name.replace('amp;', '')}</h2>
                <p className="text-sm text-gray-600">
                  Choose an Exam Year <CaretRightOutlined />
                </p>
              </div>
            );
          }
          return null;
        })}
      </section>
    </div>
  );
}
