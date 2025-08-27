'use client';

import { useState, useCallback } from 'react';
import { Modal, Cascader, Input, Select, Button, notification } from 'antd';
import { NumberOutlined, CalendarOutlined } from '@ant-design/icons';
import { formatSubjectNameURL } from '@/lib/utils';
import config from '@/lib/config';

const { Option } = Select;

export default function OneStepModal({ visible, onClose }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    month: 'fm',
    type: 'qp',
    paper: '',
    year: '',
  });

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

  const openNotificationWithIcon = (type, content) => {
    notification[type]({
      message: 'Notification',
      description: content,
    });
  };

  const loadData = useCallback(async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    try {
      const response = await fetch(config.apiUrl.cates[targetOption.value]);
      const data = await response.json();
      
      targetOption.children = data.cates.map((item) => ({
        label: item.name,
        value: formatSubjectNameURL(item.name),
      }));
      
      targetOption.loading = false;
      setOptions([...options]);
    } catch (error) {
      targetOption.loading = false;
      openNotificationWithIcon('error', 'Failed to load subjects');
    }
  }, [options]);

  const handleOneStep = useCallback(async () => {
    const { month, subject, year, type, paper } = formData;
    
    if (!month || !subject.length || !year || !type || !paper) {
      openNotificationWithIcon('error', 'Incomplete information');
      return;
    }

    const server = 'https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload';
    
    const monthMap = {
      fm: 'm',
      mj: 's',
      on: 'w',
    };

    const monthCode = monthMap[month];
    const code = subject[1].split('(')[1].slice(0, -1);
    const url = `${server}/${code}_${monthCode}${year}_${type}_${paper}.pdf`;

    setLoading(true);

    try {
      const response = await fetch(`https://cors.ouorz.com/?url=${encodeURIComponent(url)}`);
      
      if (response.status === 200) {
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
    } catch (error) {
      openNotificationWithIcon(
        'error',
        <>
          Paper not found, please try again later. <br />
          <a href={url} target="_blank" rel="noreferrer">
            Open anyway →
          </a>
        </>
      );
    } finally {
      setLoading(false);
    }
  }, [formData]);

  return (
    <Modal title="One Step" open={visible} onCancel={onClose} footer={false}>
      <Cascader
        options={options}
        loadData={loadData}
        onChange={(value) => setFormData({ ...formData, subject: value })}
        changeOnSelect
        size="large"
        className="next-index-os-cascader"
        placeholder="Please select a subject"
      />
      <Input
        onChange={(e) => setFormData({ ...formData, paper: e.target.value })}
        placeholder="Enter paper number eg.42"
        className="next-index-os-div"
        prefix={<NumberOutlined className="site-form-item-icon" />}
        size="large"
        maxLength={2}
      />
      <Select
        className="next-index-os-div"
        placeholder="Exam Month"
        value={formData.month}
        onChange={(value) => setFormData({ ...formData, month: value })}
        style={{ width: '100%' }}
        size="large"
      >
        <Option value="fm">February / March</Option>
        <Option value="mj">May / June</Option>
        <Option value="on">October / November</Option>
      </Select>
      <Input
        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
        placeholder="Enter year number eg.17"
        className="next-index-os-div"
        prefix={<CalendarOutlined className="site-form-item-icon" />}
        size="large"
        maxLength={2}
      />
      <Select
        className="next-index-os-div"
        placeholder="Type of paper"
        value={formData.type}
        onChange={(value) => setFormData({ ...formData, type: value })}
        style={{ width: '100%' }}
        size="large"
      >
        <Option value="qp">Question Paper</Option>
        <Option value="ms">Mark Scheme</Option>
      </Select>
      <Button
        size="large"
        type="primary"
        onClick={handleOneStep}
        className="next-index-os-btn"
        loading={loading}
      >
        Find
      </Button>
    </Modal>
  );
}