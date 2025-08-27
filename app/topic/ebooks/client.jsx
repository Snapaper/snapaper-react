'use client';

import { CaretRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default function EbooksClient({ ebooks, showBackButton }) {
  const liveView = (url) => {
    window.open(
      url,
      '_blank',
      'top=0,left=100,width=700,height=750,scrollbars=no,toolbar=no, menubar=no, location=no, status=no'
    ).location;
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
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ebooks.map((item, index) => {
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
      </section>
    </div>
  );
}
