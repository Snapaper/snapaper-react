'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Drawer, Button } from 'antd';
import {
  MenuOutlined,
  HomeOutlined,
  BookOutlined,
  QuestionCircleOutlined,
  MailOutlined,
  CaretDownOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems: MenuProps['items'] = [
    {
      key: 'logo',
      label: (
        <Link href="/" className="flex items-center space-x-2 -ml-4">
          <Image
            src="https://static.ouorz.com/snapaper@next.png"
            alt="Snapaper"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="text-xl font-bold text-gray-900">Snapaper</span>
        </Link>
      ),
      className: 'mr-auto',
    },
    {
      key: 'home',
      label: <Link href="/">Home</Link>,
      icon: <HomeOutlined />,
    },
    {
      key: 'resources',
      label: 'Resources',
      icon: <BookOutlined />,
      children: [
        {
          key: 'pdfebooks',
          label: <Link href="/topic/ebooks">PDF eBooks</Link>,
        },
        {
          key: 'sme',
          label: <Link href="/topic/savemyexams">Save My Exams</Link>,
        },
        {
          key: 'resourceguide',
          label: <Link href="/about">Resource Guide</Link>,
        },
      ],
    },
    {
      key: 'support',
      label: 'Support',
      icon: <QuestionCircleOutlined />,
      children: [
        {
          key: 'status',
          label: (
            <a
              href="https://status.snapaper.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Service Status
            </a>
          ),
        },
      ],
    },
    {
      key: 'contribute',
      label: 'Contribute',
      icon: <MailOutlined />,
      children: [
        {
          key: 'email',
          label: (
            <a href="mailto:tony.hlp@hotmail.com">Email</a>
          ),
        },
      ],
    },
    {
      key: 'feedback',
      label: (
        <a
          href="mailto:tony.hlp@hotmail.com"
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
        >
          Feedback
        </a>
      ),
      className: 'ml-4',
    },
  ];

  const mobileMenuItems: MenuProps['items'] = menuItems.filter(
    (item) => item?.key !== 'logo'
  );

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-white shadow-sm'
      }`}
    >
      <nav className="container-main">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileMenuOpen(true)}
              className="mr-2"
            />
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="https://static.ouorz.com/snapaper@next.png"
                alt="Snapaper"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span className="text-lg font-bold text-gray-900">Snapaper</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block w-full">
            <Menu
              mode="horizontal"
              items={menuItems}
              selectedKeys={[pathname]}
              className="border-0 bg-transparent"
              style={{ minWidth: 0, flex: 'auto' }}
            />
          </div>

          {/* Mobile Feedback Button */}
          <div className="md:hidden">
            <a
              href="mailto:tony.hlp@hotmail.com"
              className="text-primary font-medium"
            >
              Feedback
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <Drawer
        title={
          <div className="flex items-center space-x-2">
            <Image
              src="https://static.ouorz.com/snapaper@next.png"
              alt="Snapaper"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-lg font-bold">Snapaper</span>
          </div>
        }
        placement="left"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={280}
      >
        <Menu
          mode="inline"
          items={mobileMenuItems}
          selectedKeys={[pathname]}
          onClick={() => setMobileMenuOpen(false)}
        />
      </Drawer>
    </header>
  );
};

export default Header;