'use client';

import { useEffect } from 'react';
import { Button } from 'antd';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold">Something went wrong!</h2>
      <p className="mb-6 text-gray-600">An error occurred while loading this page.</p>
      <Button type="primary" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}