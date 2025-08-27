'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({
  easing: 'ease-in-out',
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.2,
});

const ProgressBarComponent = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
    return () => {
      NProgress.done();
    };
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    const originalPush = window.history.pushState;
    const originalReplace = window.history.replaceState;

    window.history.pushState = function (...args) {
      handleStart();
      originalPush.apply(window.history, args);
      setTimeout(handleStop, 500);
    };

    window.history.replaceState = function (...args) {
      handleStart();
      originalReplace.apply(window.history, args);
      setTimeout(handleStop, 500);
    };

    return () => {
      window.history.pushState = originalPush;
      window.history.replaceState = originalReplace;
    };
  }, []);

  return null;
};

const ProgressBar = () => {
  return (
    <Suspense fallback={null}>
      <ProgressBarComponent />
    </Suspense>
  );
};

export default ProgressBar;