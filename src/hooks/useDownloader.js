import { useState, useRef } from 'react';
import { downloadFile } from '../utilities/file-download';

export default function useDownloader() {
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadVisible, setDownloadVisible] = useState(false);
  const queue = useRef([]);
  const intervalRef = useRef(null);

  const processQueue = () => {
    if (queue.current.length === 0) {
      setIsDownloading(false);
      setProgress(100);
      clearInterval(intervalRef.current);
      return;
    }

    const { url, total } = queue.current.shift();
    downloadFile(url);
    setProgress(Math.floor(((total - queue.current.length) / total) * 100));
  };

  const startDownload = (papers, mode) => {
    if (isDownloading) return;

    const downloadQueue = [];
    papers.forEach((paper) => {
      downloadQueue.push({ url: paper.url, total: papers.length });
      if (mode === '2') {
        if (paper.name.includes('qp')) {
          downloadQueue.push({ url: paper.url.replace('qp', 'ms'), total: papers.length });
        } else if (paper.name.includes('ms')) {
          downloadQueue.push({ url: paper.url.replace('ms', 'qp'), total: papers.length });
        }
      }
    });

    queue.current = downloadQueue;
    setIsDownloading(true);
    setDownloadVisible(true);
    setProgress(0);

    intervalRef.current = setInterval(processQueue, 3000);
  };

  return {
    progress,
    isDownloading,
    startDownload,
    downloadVisible,
    setDownloadVisible,
  };
}
