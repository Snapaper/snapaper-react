'use client';

import { useState } from 'react';
import { Modal } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import YearSelectionModal from './YearSelectionModal';
import { formatSubjectNameURL } from '@/lib/utils';

export default function SubjectsList({ subjects, category }) {
  const [yearModalVisible, setYearModalVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');

  const handleSubjectClick = (subjectName) => {
    setSelectedSubject(formatSubjectNameURL(subjectName));
    setYearModalVisible(true);
  };

  return (
    <>
      <section>
        <div className="next-cate-subject">
          {subjects.map((item, index) => {
            if (item.name && item.name !== 'error_log') {
              return (
                <div key={index} onClick={() => handleSubjectClick(item.name)}>
                  <h2>{item.name.replace('amp;', '')}</h2>
                  <p>
                    Choose an Exam Year <CaretRightOutlined />
                  </p>
                </div>
              );
            }
            return null;
          })}
        </div>
      </section>

      <YearSelectionModal
        category={category}
        subject={selectedSubject}
        visible={yearModalVisible}
        onClose={() => setYearModalVisible(false)}
      />
    </>
  );
}