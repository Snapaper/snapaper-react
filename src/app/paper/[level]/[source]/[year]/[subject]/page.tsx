'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Table,
  Button,
  Modal,
  Progress,
  notification,
  Empty,
  Skeleton,
  Tag,
  Checkbox,
  Select,
  Input,
  Space,
  Tooltip,
  Card,
} from 'antd';
import {
  DownloadOutlined,
  EyeOutlined,
  ArrowLeftOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  SearchOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import Footer from '@/components/Footer';
import config from '@/lib/config';
import { downloadFile } from '@/lib/utils/file-download';
import { liveView } from '@/lib/utils/live-view';

const { Option } = Select;

interface PaperData {
  key: string;
  name: string;
  url: string;
  type: 'qp' | 'ms' | 'er' | 'gt' | 'in';
  year: string;
  session: string;
  variant: string;
}

interface PageParams {
  level: string;
  source: string;
  year: string;
  subject: string;
}

const PaperViewPage: React.FC = () => {
  const params = useParams() as unknown as PageParams;
  const router = useRouter();
  
  const [papers, setPapers] = useState<PaperData[]>([]);
  const [filteredPapers, setFilteredPapers] = useState<PaperData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [downloadModalVisible, setDownloadModalVisible] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sessionFilter, setSessionFilter] = useState<string>('all');

  useEffect(() => {
    fetchPapers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    filterPapers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [papers, searchText, typeFilter, sessionFilter]);

  const fetchPapers = async () => {
    try {
      setLoading(true);
      const level = params.level === 'alevels' ? 'alevel' : params.level;
      const apiUrl = (config.apiUrl.papers as any)[params.source][level];
      const response = await axios.get(
        `${apiUrl}${params.year}/${decodeURIComponent(params.subject)}`
      );
      
      const formattedPapers: PaperData[] = response.data.papers.map((paper: any, index: number) => ({
        key: index.toString(),
        name: paper.name,
        url: paper.url,
        type: detectPaperType(paper.name),
        year: extractYear(paper.name),
        session: extractSession(paper.name),
        variant: extractVariant(paper.name),
      }));
      
      setPapers(formattedPapers);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to load papers. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const detectPaperType = (name: string): PaperData['type'] => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('_ms_') || lowerName.includes('ms.pdf')) return 'ms';
    if (lowerName.includes('_er_') || lowerName.includes('er.pdf')) return 'er';
    if (lowerName.includes('_gt_') || lowerName.includes('gt.pdf')) return 'gt';
    if (lowerName.includes('_in_') || lowerName.includes('in.pdf')) return 'in';
    return 'qp';
  };

  const extractYear = (name: string): string => {
    const match = name.match(/[_\s]([0-9]{2})[_\s]/);
    return match ? `20${match[1]}` : '';
  };

  const extractSession = (name: string): string => {
    const match = name.match(/[_\s]([msfwj])([0-9]{2})[_\s]/i);
    if (match) {
      const sessionCode = match[1].toLowerCase();
      switch (sessionCode) {
        case 'm': return 'Feb/Mar';
        case 's': return 'May/Jun';
        case 'w': return 'Oct/Nov';
        case 'f': return 'Feb/Mar';
        case 'j': return 'May/Jun';
        default: return '';
      }
    }
    return '';
  };

  const extractVariant = (name: string): string => {
    const match = name.match(/[_\s]([0-9]{1,2})\.(pdf|PDF)$/);
    return match ? match[1] : '';
  };

  const filterPapers = () => {
    let filtered = [...papers];
    
    if (searchText) {
      filtered = filtered.filter(paper =>
        paper.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    if (typeFilter !== 'all') {
      filtered = filtered.filter(paper => paper.type === typeFilter);
    }
    
    if (sessionFilter !== 'all') {
      filtered = filtered.filter(paper => paper.session === sessionFilter);
    }
    
    setFilteredPapers(filtered);
  };

  const handleDownloadSelected = async () => {
    if (selectedRowKeys.length === 0) {
      notification.warning({
        message: 'No Selection',
        description: 'Please select papers to download.',
      });
      return;
    }

    setDownloadModalVisible(true);
    setDownloading(true);
    setDownloadProgress(0);

    const selectedPapers = papers.filter(paper => selectedRowKeys.includes(paper.key));
    let completed = 0;

    for (const paper of selectedPapers) {
      downloadFile(paper.url);
      completed++;
      setDownloadProgress(Math.floor((completed / selectedPapers.length) * 100));
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setDownloading(false);
    setTimeout(() => {
      setDownloadModalVisible(false);
      setDownloadProgress(0);
      notification.success({
        message: 'Download Complete',
        description: `Successfully downloaded ${selectedPapers.length} paper(s).`,
      });
    }, 1000);
  };

  const handleDownloadAll = async () => {
    const allKeys = papers.map(p => p.key);
    setSelectedRowKeys(allKeys);
    await handleDownloadSelected();
  };

  const columns: ColumnsType<PaperData> = [
    {
      title: 'Paper Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <div className="flex items-center space-x-2">
          <FileTextOutlined className="text-gray-500" />
          <span className="font-medium">{text}</span>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      filters: [
        { text: 'Question Paper', value: 'qp' },
        { text: 'Mark Scheme', value: 'ms' },
        { text: 'Examiner Report', value: 'er' },
        { text: 'Grade Threshold', value: 'gt' },
        { text: 'Insert', value: 'in' },
      ],
      onFilter: (value, record) => record.type === value,
      render: (type: string) => {
        const typeConfig = {
          qp: { color: 'blue', text: 'QP' },
          ms: { color: 'green', text: 'MS' },
          er: { color: 'orange', text: 'ER' },
          gt: { color: 'purple', text: 'GT' },
          in: { color: 'cyan', text: 'IN' },
        };
        const config = typeConfig[type as keyof typeof typeConfig] || { color: 'default', text: type.toUpperCase() };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: 'Session',
      dataIndex: 'session',
      key: 'session',
      width: 120,
      filters: [
        { text: 'Feb/Mar', value: 'Feb/Mar' },
        { text: 'May/Jun', value: 'May/Jun' },
        { text: 'Oct/Nov', value: 'Oct/Nov' },
      ],
      onFilter: (value, record) => record.session === value,
    },
    {
      title: 'Variant',
      dataIndex: 'variant',
      key: 'variant',
      width: 80,
      sorter: (a, b) => parseInt(a.variant) - parseInt(b.variant),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          <Tooltip title="View Online">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => window.open(record.url, '_blank')}
            />
          </Tooltip>
          <Tooltip title="Download">
            <Button
              type="text"
              icon={<DownloadOutlined />}
              onClick={() => downloadFile(record.url)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const getPageTitle = () => {
    const level = params.level === 'alevels' ? 'A Levels' : 'IGCSE';
    const subject = decodeURIComponent(params.subject).replace(/-/g, ' ');
    return `${level} - ${subject} (${params.year})`;
  };

  return (
    <>
      <div className="flex-1">
        <main className="container-main section-padding">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{getPageTitle()}</h1>
                <p className="text-gray-600">
                  {loading ? 'Loading...' : `${filteredPapers.length} papers available`}
                </p>
              </div>
              <Button
                type="primary"
                icon={<ArrowLeftOutlined />}
                onClick={() => router.back()}
                className="mt-4 md:mt-0"
              >
                Back
              </Button>
            </div>

            {/* Filters */}
            <div className="grid md:grid-cols-4 gap-4">
              <Input
                placeholder="Search papers..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
              />
              <Select
                placeholder="Filter by type"
                value={typeFilter}
                onChange={setTypeFilter}
                className="w-full"
              >
                <Option value="all">All Types</Option>
                <Option value="qp">Question Papers</Option>
                <Option value="ms">Mark Schemes</Option>
                <Option value="er">Examiner Reports</Option>
                <Option value="gt">Grade Thresholds</Option>
                <Option value="in">Inserts</Option>
              </Select>
              <Select
                placeholder="Filter by session"
                value={sessionFilter}
                onChange={setSessionFilter}
                className="w-full"
              >
                <Option value="all">All Sessions</Option>
                <Option value="Feb/Mar">Feb/Mar</Option>
                <Option value="May/Jun">May/Jun</Option>
                <Option value="Oct/Nov">Oct/Nov</Option>
              </Select>
              <div className="flex space-x-2">
                <Button
                  onClick={handleDownloadSelected}
                  disabled={selectedRowKeys.length === 0}
                  icon={<DownloadOutlined />}
                >
                  Download Selected ({selectedRowKeys.length})
                </Button>
              </div>
            </div>
          </div>

          {/* Table */}
          <Card className="shadow-md">
            {loading ? (
              <Skeleton active paragraph={{ rows: 10 }} />
            ) : filteredPapers.length > 0 ? (
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={filteredPapers}
                pagination={{
                  pageSize: 20,
                  showSizeChanger: true,
                  showTotal: (total) => `Total ${total} papers`,
                }}
                scroll={{ x: 800 }}
              />
            ) : (
              <Empty
                description="No papers found"
                className="py-12"
              />
            )}
          </Card>

          {/* Quick Actions */}
          {!loading && papers.length > 0 && (
            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-3">
                <strong>Quick Actions:</strong>
              </p>
              <div className="flex flex-wrap gap-2">
                <Button size="small" onClick={() => {
                  const qpKeys = papers.filter(p => p.type === 'qp').map(p => p.key);
                  setSelectedRowKeys(qpKeys);
                }}>
                  Select All Question Papers
                </Button>
                <Button size="small" onClick={() => {
                  const msKeys = papers.filter(p => p.type === 'ms').map(p => p.key);
                  setSelectedRowKeys(msKeys);
                }}>
                  Select All Mark Schemes
                </Button>
                <Button size="small" onClick={() => setSelectedRowKeys([])}>
                  Clear Selection
                </Button>
                <Button size="small" type="primary" onClick={handleDownloadAll}>
                  Download All Papers
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Download Progress Modal */}
      <Modal
        title="Downloading Papers"
        open={downloadModalVisible}
        footer={null}
        closable={!downloading}
        onCancel={() => !downloading && setDownloadModalVisible(false)}
      >
        <div className="py-4">
          <Progress percent={downloadProgress} status={downloading ? 'active' : 'success'} />
          <p className="text-center mt-4 text-gray-600">
            {downloading ? 'Please wait while papers are being downloaded...' : 'Download complete!'}
          </p>
        </div>
      </Modal>

      <Footer />
    </>
  );
};

export default PaperViewPage;