'use client';

import { useEffect } from 'react';

const ScrollLock: React.FC = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return null;
};

export default ScrollLock;
