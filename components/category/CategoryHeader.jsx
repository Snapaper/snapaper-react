import Image from 'next/image';
import { Button } from 'antd';
import { ArrowLeftOutlined, FireOutlined } from '@ant-design/icons';
import imagePlaceholder from '@/lib/imagePlaceholder';

export default function CategoryHeader({
  title,
  description,
  subjectCount,
  loading,
  onBack,
  onTrendingClick,
}) {
  return (
    <section className="next-cate-header">
      <div className="left">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="next-cate-header-badge">
          <div>
            <p className="title">Board</p>
            <p className="source">
              <Image
                src="https://static.ouorz.com/QQ20200114-203749@2x.png"
                width={21}
                height={21}
                placeholder="blur"
                blurDataURL={imagePlaceholder}
                alt="CAIE"
              />{' '}
              CAIE
            </p>
          </div>
          <div>
            <p className="title">Source</p>
            <p className="source">
              <Image
                src="https://static.ouorz.com/papacambridge.png"
                width={21}
                height={21}
                placeholder="blur"
                blurDataURL={imagePlaceholder}
                alt="PapaCambridge"
              />{' '}
              PapaCambridge
            </p>
          </div>
        </div>
      </div>
      <div className="next-cate-header-info">
        <div>
          <Button>{loading ? 'Loading...' : `${subjectCount} Subjects`}</Button>
          <Button type="primary" onClick={onBack}>
            <ArrowLeftOutlined /> Back
          </Button>
        </div>
        <div onClick={onTrendingClick}>
          <h2>
            <FireOutlined /> Trending Subjects
          </h2>
          <p>Click to see the list of most browsed subjects</p>
        </div>
      </div>
    </section>
  );
}