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

function NProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    const handleAnchorClick = (event) => {
      const targetUrl = event.currentTarget.href;
      const currentUrl = location.href;
      if (targetUrl !== currentUrl) {
        handleStart();
      }
    };

    const handleMutation = () => {
      const anchorElements = document.querySelectorAll('a[href]');
      anchorElements.forEach((anchor) => {
        anchor.removeEventListener('click', handleAnchorClick);
        anchor.addEventListener('click', handleAnchorClick);
      });
    };

    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document, { childList: true, subtree: true });

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray) => {
        handleStart();
        return target.apply(thisArg, argArray);
      },
    });

    return () => {
      mutationObserver.disconnect();
      const anchorElements = document.querySelectorAll('a[href]');
      anchorElements.forEach((anchor) => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return null;
}

export default function NProgressProvider({ children }) {
  return (
    <>
      <Suspense fallback={null}>
        <NProgressBar />
      </Suspense>
      {children}
    </>
  );
}