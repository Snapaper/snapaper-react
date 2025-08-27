export default function NoticeBar() {
  return (
    <section className="notice">
      <div>
        <p style={{ letterSpacing: '2px' }}>
          Discover Snapaper, the ultimate destination for CAIE past papers. Consider supporting us
          through:
        </p>
        <div className="notice_actions">
          <a href="https://github.com/sponsors/ttttonyhe" target="_blank" rel="noreferrer">
            Github Sponsors →
          </a>
        </div>
      </div>
    </section>
  );
}