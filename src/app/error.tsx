'use client';

import React from 'react';
import { Button, Result } from 'antd';
import { ReloadOutlined, HomeOutlined } from '@ant-design/icons';
import Footer from '@/components/Footer';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <Result
          status="error"
          title="Something went wrong!"
          subTitle={error.message || 'An unexpected error occurred. Please try again.'}
          extra={
            <div className="space-x-4">
              <Button
                type="primary"
                icon={<ReloadOutlined />}
                onClick={reset}
                size="large"
              >
                Try Again
              </Button>
              <Button
                icon={<HomeOutlined />}
                onClick={() => window.location.href = '/'}
                size="large"
              >
                Go Home
              </Button>
            </div>
          }
        />
      </div>
      <Footer />
    </>
  );
}