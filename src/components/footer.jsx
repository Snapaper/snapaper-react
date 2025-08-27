'use client';

import { BackTop } from 'antd';
import { HeartFilled, GithubFilled } from '@ant-design/icons';
import React from 'react';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  const isSaveMyExamsPage = pathname === '/topic/savemyexams';

  return (
    <footer
      className={`py-4 text-center text-gray-500 ${
        isSaveMyExamsPage ? 'pb-16' : ''
      }`}
    >
      <BackTop />
      <div className="container mx-auto">
        <div>
          <p>
            &copy; Copyright 2018-{new Date().getFullYear()} Snapaper · Made
            with <HeartFilled className="text-red-500" /> for the People of the
            Internet
          </p>
        </div>
        <div className="mt-2">
          <a
            href="https://github.com/Snapaper"
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-gray-700"
          >
            <GithubFilled /> OSS
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
