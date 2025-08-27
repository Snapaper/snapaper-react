import React from 'react';
import Link from 'next/link';
import { Button, Result } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Link href="/">
              <Button type="primary" icon={<HomeOutlined />} size="large">
                Back to Home
              </Button>
            </Link>
          }
        />
      </div>
      <Footer />
    </>
  );
}