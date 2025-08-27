'use client';

import { BackTop } from 'antd';
import { HeartFilled, GithubFilled } from '@ant-design/icons';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isBottomFixed = pathname === '/topic/savemyexams';

  return (
    <footer className={`footer-div ${isBottomFixed ? 'footer-div-bottom' : ''}`}>
      <BackTop />
      <div className="footer-container">
        <div>
          <p>
            &copy; Copyright 2018-{new Date().getFullYear()} Snapaper · Made with{' '}
            <HeartFilled /> for the People of the Internet
          </p>
        </div>
        <div>
          <a href="https://github.com/Snapaper" target="_blank" rel="noreferrer">
            <GithubFilled /> OSS
          </a>
        </div>
      </div>
    </footer>
  );
}