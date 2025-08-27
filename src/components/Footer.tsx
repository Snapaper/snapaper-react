'use client';

import React, { useEffect, useState } from 'react';
import { BackTop } from 'antd';
import {
  HeartFilled,
  GithubFilled,
  ArrowUpOutlined,
} from '@ant-design/icons';

const Footer: React.FC = () => {
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-auto bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
      <div className="container-main py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-gray-600 flex items-center justify-center md:justify-start flex-wrap">
              <span>&copy; Copyright 2018-{new Date().getFullYear()} Snapaper</span>
              <span className="mx-2">·</span>
              <span className="flex items-center">
                Made with <HeartFilled className="text-red-500 mx-1" /> for the People of the Internet
              </span>
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/Snapaper"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors duration-200"
            >
              <GithubFilled className="text-xl" />
              <span className="font-medium">Open Source</span>
            </a>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 hover:shadow-xl animate-fade-in"
          aria-label="Back to top"
        >
          <ArrowUpOutlined className="text-lg" />
        </button>
      )}
    </footer>
  );
};

export default Footer;