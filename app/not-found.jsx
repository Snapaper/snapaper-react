import Link from 'next/link';
import { Button } from 'antd';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-6xl font-bold text-gray-300">404</h1>
      <h2 className="mb-4 text-2xl font-bold">Page Not Found</h2>
      <p className="mb-6 text-gray-600">The page you are looking for does not exist.</p>
      <Link href="/">
        <Button type="primary">Go Home</Button>
      </Link>
    </div>
  );
}