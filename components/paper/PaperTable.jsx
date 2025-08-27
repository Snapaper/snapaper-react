'use client';

import { useState } from 'react';
import { Table, Tag, Button } from 'antd';
import { downloadFile, liveView } from '@/lib/utils';
import { usePaperStore } from '@/hooks/usePaperStore';

export default function PaperTable({ papers }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { setSelectedPapers } = usePaperStore();

  const columns = [
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
      render: (link) => (
        <a href={link} target="_blank" rel="noreferrer">
          Direct Link
        </a>
      ),
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
          {info.map((item) => {
            const colorMap = {
              'Mark Scheme': 'blue',
              'Question Paper': 'green',
              'Examiner Report': 'orange',
              'Confidential Instruction': 'cyan',
              'Grade thresholds': 'magenta',
              'Specimen Paper': 'purple',
            };
            const color = colorMap[item] || 'red';
            return (
              <Tag color={color} key={item}>
                {item.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
      filters: [
        { text: 'Mark Scheme', value: 'Mark Scheme' },
        { text: 'Question Paper', value: 'Question Paper' },
      ],
      onFilter: (value, record) => record.info.indexOf(value) === 0,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button
            type="default"
            className="next-paper-live-btn"
            onClick={() => liveView(record.url)}
          >
            Live View
          </Button>
          <Button type="primary" onClick={() => downloadFile(record.url)}>
            Download
          </Button>
          <Button
            style={{ marginLeft: '10px' }}
            disabled={!(record.name.includes('ms') || record.name.includes('qp'))}
            onClick={() => {
              const alternateUrl = record.name.includes('ms')
                ? record.url.replace('ms', 'qp')
                : record.url.replace('qp', 'ms');
              liveView(alternateUrl);
            }}
          >
            {record.name.includes('ms') ? 'Question Paper' : 'Mark Scheme'}
          </Button>
        </span>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
      setSelectedPapers(selectedKeys);
    },
  };

  const dataWithKeys = papers.map((paper, index) => ({
    ...paper,
    key: index + 1,
  }));

  return (
    <div className="next-paper-papers">
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataWithKeys}
        size="middle"
        pagination={false}
        bordered
      />
    </div>
  );
}