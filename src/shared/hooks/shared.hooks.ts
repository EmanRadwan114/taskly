import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IUseHandlePagination } from '../types/shared.types';

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

// ^ ------------------------ useHandlePagination (desktop page-click) -------------------------
// Syncs the clicked page number into state and the URL ?page= param.
export const useHandlePagination = ({
  setCurrentPage,
}: {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCurrentPage = (page: number) => {
    setCurrentPage(page);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', page.toString());
    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  };

  return { handleCurrentPage };
};

// ^ ------------------------ useInfiniteScroll (mobile IntersectionObserver) -------------------------
// Attaches an IntersectionObserver to a sentinel <div> ref and calls
// fetchNextPage() whenever that sentinel enters the viewport.
// Re-runs whenever hasNextPage / isFetchingNextPage changes so the observer
// is always live when more pages are available.
export const useInfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: {
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}) => {
  const observerTarget = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = observerTarget.current;
    if (!target || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { threshold: 0, rootMargin: '100px' }
    );
    observer.observe(target);
    return () => {
      observer.unobserve(target);
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return { observerTarget };
};

// ^ ------------------------ Use Handle Search Hook -------------------------
export const useHandleSearch = ({
  setCurrentPage,
  time = 400,
  isSetPageParam = true,
}: {
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
  time?: number;
  isSetPageParam?: boolean;
}) => {
  const isFirstRender = useRef(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { isMobile } = useMobile(1024);

  const searchTermParam = searchParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(searchTermParam);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, time);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    // to prevent page change to 1 on mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setCurrentPage?.(1);
    const newParams = new URLSearchParams(searchParams);
    if (debouncedSearchTerm) {
      newParams.set('search', debouncedSearchTerm);
    } else {
      newParams.delete('search');
    }
    if (!isMobile && isSetPageParam) {
      newParams.set('page', '1');
    }
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  }, [debouncedSearchTerm, isMobile, isSetPageParam]);

  return { searchTerm, setSearchTerm, debouncedSearchTerm };
};

// ^ ------------------------ Use Nav To Task Details Hook ------------------------
export const useHandleModalRoute = ({
  queryKey,
  queryValue,
}: {
  queryValue?: string | boolean | number;
  queryKey: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleNavToModal = () => {
    if (!queryValue) return;

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(queryKey, queryValue.toString());
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const handleCloseModal = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(queryKey);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return { handleNavToModal, handleCloseModal };
};

// ^ ------------------------ Use Handle Error Hook -------------------------
export const useHandleError = ({ error }: { error: Error }) => {
  useEffect(() => {
    if (error.message) {
      toast.error(error.message);
    }
  }, [error]);
};
