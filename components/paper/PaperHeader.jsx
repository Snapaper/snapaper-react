import Image from 'next/image';
import { Button, Popover } from 'antd';
import { ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import { usePaperStore } from '@/hooks/usePaperStore';

export default function PaperHeader({
  title,
  description,
  level,
  year,
  paperCount,
  loading,
  onBack,
  onDownloadSelected,
  onDownloadAll,
}) {
  const { downloadMode, setDownloadMode } = usePaperStore();

  const handleModeChange = (mode) => {
    Cookies.set('snapaper_download', mode);
    setDownloadMode(mode);
  };

  return (
    <section className="next-cate-header paper-header">
      <div className="left">
        <div>
          <h1 style={{ textTransform: 'capitalize' }}>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="next-cate-header-badge">
          <div>
            <p className="title">Exam</p>
            <p className="source">
              <img src="https://static.ouorz.com/QQ20200114-203749@2x.png" alt="CAIE" /> {level}
            </p>
          </div>
          <div>
            <p className="title">Source</p>
            <p className="source">
              <img src="https://static.ouorz.com/papacambridge.png" alt="PapaCambridge" />{' '}
              PapaCambridge
            </p>
          </div>
          <div>
            <p className="title">Exam Year / Type</p>
            <p className="source">{year}</p>
          </div>
        </div>
      </div>
      <div className="next-paper-header-info">
        <div>
          <Button>{loading ? 'Loading...' : `${paperCount} Papers`}</Button>
          <Button type="primary" onClick={onBack}>
            <ArrowLeftOutlined /> Back
          </Button>
        </div>
        <div className="downloading">
          <Popover
            placement="bottom"
            content={
              <div>
                <p style={{ marginBottom: '5px' }}>
                  <Button
                    type={downloadMode === '1' || !downloadMode ? 'primary' : 'default'}
                    onClick={() => handleModeChange('1')}
                    style={{ width: '100%' }}
                  >
                    {(downloadMode === '1' || !downloadMode) && <CheckCircleOutlined />}
                    One at a time
                  </Button>
                </p>
                <p style={{ marginBottom: '0px' }}>
                  <Button
                    type={downloadMode === '2' ? 'primary' : 'default'}
                    onClick={() => handleModeChange('2')}
                    style={{ width: '100%' }}
                  >
                    {downloadMode === '2' && <CheckCircleOutlined />}
                    MS + QP
                  </Button>
                </p>
              </div>
            }
            title="How to download"
            trigger="hover"
          >
            <div className="left">Download Settings</div>
          </Popover>
          <div className="right">
            <div onClick={onDownloadSelected}>Download Selected</div>
            <div onClick={onDownloadAll}>Download All</div>
          </div>
        </div>
      </div>
    </section>
  );
}