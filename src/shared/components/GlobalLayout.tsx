'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// handle smooth scroll
const GlobalLayout: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [pathname]);

  return <></>;
};

export default GlobalLayout;
