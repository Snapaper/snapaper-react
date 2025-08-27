import { CaretRightOutlined } from '@ant-design/icons';

export default function MobilePaperList({ papers }) {
  return (
    <div className="next-cate-subject mobile-list">
      {papers.map((item, index) => {
        if (item.name && item.name !== 'error_log') {
          return (
            <div key={index}>
              <a href={item.url} target="_blank" rel="noreferrer">
                <h2>{item.name.replace('amp;', '')}</h2>
              </a>
              <p>
                <em>{item.type}</em>
                <a href={item.url} target="_blank" rel="noreferrer">
                  Click to download <CaretRightOutlined />
                </a>
              </p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}