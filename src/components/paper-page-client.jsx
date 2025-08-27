'use client';

import { useState } from 'react';
import { Button, Modal, Progress, Popover, Table, Tag, notification } from 'antd';
import { ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { downloadFile } from '@/utilities/file-download';
import { liveView } from '@/utilities/live-view';
import useDownloader from '@/hooks/useDownloader';
import useDownloadStore from '@/store/downloadStore';

const openNotificationWithIcon = (type, content) => {
  notification[type]({
    message: 'Notification',
    description: content,
  });
};

const columns = (downloadMode) => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 250,
    ellipsis: true,
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Link',
    dataIndex: 'url',
    key: 'url',
    width: 100,
    render: (link) => <a href={link}>Direct Link</a>,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    width: 100,
  },
  {
    title: 'Info',
    dataIndex: 'info',
    width: 250,
    render: (info) => (
      <span>
        {info.map((tag) => {
          let color;
          switch (tag) {
            case 'Mark Scheme':
              color = 'blue';
              break;
            case 'Question Paper':
              color = 'green';
              break;
            default:
              color = 'red';
              break;
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
    filters: [
      { text: 'Mark Scheme', value: 'Mark Scheme' },
      { text: 'Question Paper', value: 'Question Paper' },
    ],
    onFilter: (value, record) => record.info.includes(value),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span className="space-x-2">
        <Button type="default" onClick={() => liveView(record.url)}>
          Live View
        </Button>
        <Button type="primary" onClick={() => downloadFile(record.url)}>
          Download
        </Button>
        <Button
          disabled={!record.name.includes('ms') && !record.name.includes('qp')}
          onClick={() => {
            if (record.name.includes('ms')) {
              liveView(record.url.replace('ms', 'qp'));
            } else {
              liveView(record.url.replace('qp', 'ms'));
            }
          }}
        >
          {record.name.includes('ms') ? 'Question Paper' : 'Mark Scheme'}
        </Button>
      </span>
    ),
  },
];

export default function PaperPageClient({ papers, year, subject, source, level }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { downloadMode, setDownloadMode } = useDownloadStore();
  const { progress, isDownloading, startDownload, downloadVisible, setDownloadVisible } = useDownloader();

  const onSelectChange = (keys) => {
    setSelectedRowKeys(keys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleDownloadSelected = () => {
    if (selectedRowKeys.length === 0) {
      openNotificationWithIcon('error', 'No papers selected');
      return;
    }
    const selectedPapers = papers.filter((paper) => selectedRowKeys.includes(paper.key));
    startDownload(selectedPapers, downloadMode);
  };

  const handleDownloadAll = () => {
    if (papers.length === 0) {
      openNotificationWithIcon('error', 'No papers to download');
      return;
    }
    startDownload(papers, downloadMode);
  };

  return (
    <main className="container mx-auto px-4">
      <section className="flex justify-between items-center py-8">
        <div>
          <h1 className="text-3xl font-bold capitalize">{subject.replace(/-/g, ' ')}</h1>
          <p>
            {level === 'alevel'
              ? 'Cambridge International General Certificate of Education Advanced Level'
              : 'Cambridge International General Certificate of Secondary Education'}
          </p>
        </div>
        <Button type="primary" icon={<ArrowLeftOutlined />} onClick={() => history.back()}>
          Back
        </Button>
      </section>

      <section className="flex justify-between items-center mb-4">
        <div className="space-x-2">
          <Button onClick={handleDownloadSelected}>Download Selected</Button>
          <Button onClick={handleDownloadAll}>Download All</Button>
        </div>
        <Popover
          placement="bottom"
          content={
            <div className="space-y-2">
              <Button
                type={downloadMode === '1' ? 'primary' : 'default'}
                onClick={() => setDownloadMode('1')}
                block
              >
                {downloadMode === '1' && <CheckCircleOutlined />} One at a time
              </Button>
              <Button
                type={downloadMode === '2' ? 'primary' : 'default'}
                onClick={() => setDownloadMode('2')}
                block
              >
                {downloadMode === '2' && <CheckCircleOutlined />} MS + QP
              </Button>
            </div>
          }
          title="Download Mode"
          trigger="hover"
        >
          <Button>Download Settings</Button>
        </Popover>
      </section>

      <Table
        rowSelection={rowSelection}
        columns={columns(downloadMode)}
        dataSource={papers.map((p, i) => ({ ...p, key: i }))}
        pagination={false}
        bordered
      />

      <Modal
        title="Downloading Papers"
        open={downloadVisible}
        onCancel={() => setDownloadVisible(false)}
        footer={null}
        closable={!isDownloading}
      >
        <div className="text-center py-4">
          <h2>Download is in progress</h2>
          <p>Please keep this page open until the download process is complete</p>
        </div>
        <Progress percent={progress} status={isDownloading ? 'active' : 'success'} />
      </Modal>
    </main>
  );
}
