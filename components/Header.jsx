'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import imagePlaceholder from '@/lib/imagePlaceholder';

export default function Header() {
  const getMenuItems = () => {
    return [
      {
        key: 'logo',
        className: 'header-ant-logo',
        label: (
          <Link href="/">
            <h3 className="nav-title">
              <Image
                src="https://static.ouorz.com/snapaper@next.png"
                className="nav-title-img"
                alt="snapaper"
                width={49}
                height={49}
                placeholder="blur"
                blurDataURL={imagePlaceholder}
              />
              napaper
            </h3>
          </Link>
        ),
      },
      {
        key: 'home',
        label: <Link href="/">Home</Link>,
      },
      {
        key: 'Resources',
        icon: <CaretDownOutlined />,
        label: 'Resources',
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
        icon: <CaretDownOutlined />,
        label: 'Support',
        children: [
          {
            key: 'status',
            label: (
              <a href="https://status.snapaper.com" target="_blank" rel="noreferrer">
                Service Status
              </a>
            ),
          },
        ],
      },
      {
        key: 'contribute',
        icon: <CaretDownOutlined />,
        label: 'Contribute',
        children: [
          {
            key: 'email',
            label: (
              <a href="mailto:tony.hlp@hotmail.com" target="_blank" rel="noreferrer">
                Email
              </a>
            ),
          },
        ],
      },
      {
        key: 'feedback',
        className: 'nav-2',
        label: (
          <a
            className="nav-2-icon1 next-nav-icon-1"
            href="mailto:tony.hlp@hotmail.com"
            target="_blank"
            rel="noreferrer"
          >
            Feedback
          </a>
        ),
      },
    ];
  };

  return (
    <div className="header-div">
      <Menu mode="horizontal" items={getMenuItems()} />
    </div>
  );
}