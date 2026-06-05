import { useEffect, useState } from 'react';

export const useMobile = (breakPoint: number = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= breakPoint);
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return { isMobile };
};
