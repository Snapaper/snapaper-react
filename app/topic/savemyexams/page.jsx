'use client';

import { useState, useEffect } from 'react';
import { Button, Skeleton, Empty, notification } from 'antd';
import { ArrowLeftOutlined, CaretRightOutlined } from '@ant-design/icons';

const openNotificationWithIcon = (type, content) => {
  notification[type]({
    message: 'Notification',
    description: content,
  });
};

const liveView = (url) => {
  window.open(
    url,
    '_blank',
    'top=0,left=100,width=700,height=750,scrollbars=no,toolbar=no, menubar=no, location=no, status=no'
  ).location;
};

export default function SaveMyExamsPage() {
  const [subject, setSubject] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (subject) {
      setLoading(true);
      setError(null);
      fetch(`https://files.snapaper.com/case/cases?cate=sme&sub=${subject}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
          openNotificationWithIcon('error', 'Failed to load data.');
        });
    }
  }, [subject]);

  return (
    <main className="container mx-auto px-4">
      <section className="flex justify-between items-center py-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Save My Exams</h1>
          <p>Cambridge International General Certificate of Education Advanced Level (not up-to-date)</p>
        </div>
        <div className="text-right">
          <Button type="primary" icon={<ArrowLeftOutlined />} onClick={() => history.back()}>
            Back
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div
          className="p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => setSubject('biology')}
        >
          <h2 className="font-bold">Biology</h2>
          <p className="text-sm text-gray-600">
            Click to load <CaretRightOutlined />
          </p>
        </div>
        <div
          className="p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => setSubject('physics')}
        >
          <h2 className="font-bold">Physics</h2>
          <p className="text-sm text-gray-600">
            Click to load <CaretRightOutlined />
          </p>
        </div>
        <div
          className="p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => setSubject('chemistry')}
        >
          <h2 className="font-bold">Chemistry</h2>
          <p className="text-sm text-gray-600">
            Click to load <CaretRightOutlined />
          </p>
        </div>
      </section>

      <section>
        {loading && <Skeleton active />}
        {error && <Empty description="Failed to load data" />}
        {!loading && !error && data.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item, index) => {
              if (item.name && item.name !== 'error_log') {
                return (
                  <div
                    key={index}
                    className="p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => liveView(item.url)}
                  >
                    <h2 className="font-bold">{item.name.replace('amp;', '')}</h2>
                    <p className="text-sm text-gray-600">
                      <em>{item.type}</em> Click to View <CaretRightOutlined />
                    </p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </section>
    </main>
  );
}
