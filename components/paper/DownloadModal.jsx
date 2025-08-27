'use client';

import { useEffect, useRef } from 'react';
import { Modal, Progress, notification } from 'antd';
import { downloadFile } from '@/lib/utils';
import { usePaperStore } from '@/hooks/usePaperStore';

export default function DownloadModal({ visible, onClose }) {
  const intervalRef = useRef(null);
  const stillNeedDownloadRef = useRef([]);
  const isDownloadingRef = useRef(false);

  const {
    paperData,
    selectedPapers,
    downloadProgress,
    downloadMode,
    setDownloadProgress,
    clearSelection,
  } = usePaperStore();

  useEffect(() => {
    if (visible && selectedPapers.length > 0) {
      startDownload();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [visible, selectedPapers]);

  const startDownload = () => {
    if (selectedPapers.length === 0) {
      notification.error({
        message: 'Error',
        description: 'None of the papers are selected',
      });
      onClose();
      return;
    }

    isDownloadingRef.current = true;
    let downloadIndex = 0;
    const totalDownloads = selectedPapers.length;
    stillNeedDownloadRef.current = [];

    intervalRef.current = setInterval(() => {
      if (downloadIndex >= totalDownloads) {
        // Download completed
        clearInterval(intervalRef.current);
        isDownloadingRef.current = false;
        setDownloadProgress(100);
        
        setTimeout(() => {
          setDownloadProgress(0);
          clearSelection();
          onClose();
          
          // Handle MS + QP mode
          if (downloadMode === '2' && stillNeedDownloadRef.current.length > 0) {
            const additionalDownloads = stillNeedDownloadRef.current;
            let additionalIndex = 0;
            
            const additionalInterval = setInterval(() => {
              if (additionalIndex >= additionalDownloads.length) {
                clearInterval(additionalInterval);
                stillNeedDownloadRef.current = [];
              } else {
                downloadFile(additionalDownloads[additionalIndex]);
                additionalIndex++;
              }
            }, 3000);
          }
        }, 500);
      } else {
        const paperIndex = selectedPapers[downloadIndex] - 1;
        const paper = paperData[paperIndex];
        
        if (paper) {
          downloadFile(paper.url);
          
          // Add corresponding MS/QP to download list if in mode 2
          if (downloadMode === '2') {
            if (paper.name.includes('qp')) {
              stillNeedDownloadRef.current.push(paper.url.replace('qp', 'ms'));
            } else if (paper.name.includes('ms')) {
              stillNeedDownloadRef.current.push(paper.url.replace('ms', 'qp'));
            }
          }
        }
        
        downloadIndex++;
        const progress = Math.floor((downloadIndex / totalDownloads) * 100);
        setDownloadProgress(progress);
      }
    }, 3000);
  };

  const handleCancel = () => {
    if (!isDownloadingRef.current) {
      onClose();
    }
  };

  return (
    <Modal
      title="Downloading Papers"
      open={visible}
      onCancel={handleCancel}
      footer={false}
      closable={!isDownloadingRef.current}
      maskClosable={!isDownloadingRef.current}
    >
      <div className="next-paper-download-info">
        <h2>Download is in progress</h2>
        <p>Please keep this page open until the download process is complete</p>
      </div>
      <Progress
        percent={downloadProgress}
        status={downloadProgress === 100 ? 'success' : 'active'}
      />
    </Modal>
  );
}