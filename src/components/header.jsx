'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

const Header = () => {
  const menuItems = [
    {
      key: 'logo',
      label: (
        <Link href="/">
          <div className="flex items-center">
            <Image
              src="https://static.ouorz.com/snapaper@next.png"
              alt="snapaper"
              width={40}
              height={40}
            />
            <span className="ml-2 text-lg font-bold">napaper</span>
          </div>
        </Link>
      ),
    },
    {
      key: 'home',
      label: <Link href="/">Home</Link>,
    },
    {
      key: 'resources',
      label: 'Resources',
      icon: <CaretDownOutlined />,
      children: [
        {
          key: 'pdfebooks',
          label: <Link href="/topic/ebooks">PDF ebooks</Link>,
        },
        {
          key: 'sme',
          label: <Link href="/topic/savemyexams">Save My Exams</Link>,
        },
        {
          key: 'resourceguide',
          label: <Link href="/page/about">Resource Guide</Link>,
        },
      ],
    },
    {
      key: 'support',
      label: 'Support',
      icon: <CaretDownOutlined />,
      children: [
        {
          key: 'status',
          label: <a href="https://status.snapaper.com">Service Status</a>,
        },
      ],
    },
    {
      key: 'contribute',
      label: 'Contribute',
      icon: <CaretDownOutlined />,
      children: [
        {
          key: 'email',
          label: <a href="mailto:tony.hlp@hotmail.com">Email</a>,
        },
      ],
    },
    {
      key: 'feedback',
      label: (
        <a
          href="mailto:tony.hlp@hotmail.com"
          target="_blank"
          rel="noreferrer"
        >
          Feedback
        </a>
      ),
    },
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto">
        <Menu mode="horizontal" items={menuItems} />
      </div>
    </header>
  );
};

export default Header;
