import {  useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import {  IUseHandleMobilePagination } from '../types/shared.types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// ^--------------------- Timer hook ------------------------
export const useTimer = () => {
  const INITIAL_TIME = 5 * 60; //5mins

  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setTimeLeft(INITIAL_TIME);
    }

    return () => {
      if (interval) clearInterval(interval!);
    };
  }, [timeLeft, isRunning]);

  // handlers
  const startTimer = () => {
    setIsRunning(true);
    setTimeLeft(INITIAL_TIME);
  };

  //   timer formating
  const mins = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formatedTime = `${String(mins).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return { formatedTime, isRunning, startTimer };
};

// ^--------------------- Mobile device hook ------------------------
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

// ^ ------------------------ Use Handle Pagination Hook -------------------------
export const useHandleMobilePagination = ({list, paginationMetaData}: IUseHandleMobilePagination) => {
  const [hasMore, setHasMore] = useState(true);
  const pathname = usePathname()
  const router = useRouter()
  const observerTarget = useRef(null);

    const searchParams = useSearchParams()

  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page') || 1));

  const { isMobile } = useMobile(768);

  // handle hasMore state
  useEffect(() => {
    if (
      list?.length === 0 
      && paginationMetaData?.totalPages && currentPage >= paginationMetaData?.totalPages
    ) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [list, currentPage, paginationMetaData?.totalPages]);

  // observer for infinite scroll on mobile
  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore) {
          setCurrentPage(currentPage + 1);
        }
      },
      { threshold: 0, root: null, rootMargin: '0px' }
    );
    // watching target element
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, currentPage, setCurrentPage]);

// handle current page
  const handleCurrentPage = (page: number) => {
    setCurrentPage(page)

    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', page.toString())

    router.push(`${pathname}?${newSearchParams.toString()}`)
  };


  return {
    isMobile,
    hasMore,
    observerTarget,
    handleCurrentPage,
    currentPage
  };
};

// ^ ------------------------ Use Handle Error Hook -------------------------
export const useHandleError = ({
  error,
}: {
  error: Error;
}) => {

  useEffect(() => {
    if (error.message) {
      toast.error(error.message);
    }
  }, [error]);
};
