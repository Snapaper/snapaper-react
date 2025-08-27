'use client';

import { useState } from 'react';
import { Modal } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import YearSelectionModal from './YearSelectionModal';

const trendingSubjects = {
  alevel: [
    { name: 'Chemistry', code: 'Chemistry (9701)' },
    { name: 'Physics', code: 'Physics (9702)' },
    { name: 'Economics', code: 'Economics (9708)' },
    { name: 'Mathematics', code: 'Mathematics (9709)' },
    { name: 'Further Mathematics', code: 'Mathematics (9231)' },
  ],
  igcse: [
    { name: 'Chemistry', code: 'Chemistry (0620)' },
    { name: 'Physics', code: 'Physics (0625)' },
    { name: 'Economics', code: 'Economics (0455)' },
    { name: 'Mathematics', code: 'Mathematics (0580)' },
    { name: 'Additional Mathematics', code: 'Mathematics (0606)' },
    { name: 'Global Perspectives', code: 'Global Perspectives (0457)' },
  ],
};

export default function TrendingSubjectsModal({ category, visible, onClose }) {
  const [yearModalVisible, setYearModalVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');

  const handleSubjectClick = (code) => {
    setSelectedSubject(code);
    setYearModalVisible(true);
  };

  const subjects = trendingSubjects[category] || [];

  return (
    <>
      <Modal title="Trending Subjects" open={visible} footer={null} onCancel={onClose}>
        <div>
          {subjects.map((subject, index) => (
            <div
              key={index}
              className="next-cate-subjects-list"
              onClick={() => handleSubjectClick(subject.code)}
            >
              <h2>{subject.name}</h2>
              <p>
                All papers <CaretRightOutlined />
              </p>
            </div>
          ))}
          {category === 'alevel' && (
            <div className="next-cate-subjects-list">
              <a
                href="https://www.examsolutions.net/a-level-maths/ocr/"
                target="_blank"
                rel="noreferrer"
              >
                <h2>Further Mathematics OCR</h2>
              </a>
              <p>
                Click title to visit website <CaretRightOutlined />
              </p>
            </div>
          )}
        </div>
      </Modal>

      <YearSelectionModal
        category={category}
        subject={selectedSubject}
        visible={yearModalVisible}
        onClose={() => setYearModalVisible(false)}
      />
    </>
  );
}