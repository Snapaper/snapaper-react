import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          fontSize: 120,
        }}
      >
        <img
          src="https://snapaper.com/snapaper_logo_512.png"
          width="256"
          height="256"
          alt="Snapaper logo"
          style={{ marginRight: 30 }}
        />
        <span style={{ fontWeight: 800 }}>napaper</span>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
