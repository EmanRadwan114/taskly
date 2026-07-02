import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IUseHandlePagination } from '../types/shared.types';
import { useAppDispatch, useAppSelector } from '../libs/store/store';
import { fetchMembers } from '../libs/store/slices/members.slice';

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
export const useHandlePagination = <T extends { id: string | number }>({
  incomingData,
  meta,
  isFetching,
  setCurrentPage,
  currentPage,
}: IUseHandlePagination<T>) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const observerTarget = useRef<HTMLDivElement | null>(null);

  const hasMore = meta?.totalPages ? currentPage < meta.totalPages : false;

  const { isMobile } = useMobile(1024);

  const [accumulatedList, setAccumulatedList] = useState<T[]>([]);

  useEffect(() => {
    if (!incomingData || !isMobile) {
      setAccumulatedList([]);
      return;
    }

    //reset after search
    if (currentPage === 1) {
      setAccumulatedList(incomingData);
      return;
    }

    setAccumulatedList((prev) => {
      const existingIds = new Set(prev.map((item) => item.id));

      const newItemsOnly = incomingData.filter(
        (item) => !existingIds.has(item.id)
      );

      if (newItemsOnly.length === 0) return prev;
      return [...prev, ...newItemsOnly];
    });
  }, [incomingData, isMobile]);

  // Infinite Scroll Observer Configuration
  useEffect(() => {
    const target = observerTarget.current;
    if (!target || !isMobile || !hasMore) return;

    const observer = new IntersectionObserver(
      (entires) => {
        const entry = entires[0];
        if (entry.isIntersecting && !isFetching) {
          setCurrentPage((prev) => prev + 1);
        }
      },
      { threshold: 0, rootMargin: '100px' }
    );
    observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, [isMobile, hasMore]);

  // Desktop Page Click Link Sync Handler
  const handleCurrentPage = (page: number) => {
    setCurrentPage(page);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', page.toString());
    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  };

  return {
    isMobile,
    hasMore,
    observerTarget,
    accumulatedList,
    handleCurrentPage,
  };
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
    if (isFirstRender.current || !debouncedSearchTerm) {
      isFirstRender.current = false;
      return;
    }
    setCurrentPage?.(1);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('search', debouncedSearchTerm);
    if (!isMobile && isSetPageParam) {
      newParams.set('page', '1');
    }
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  }, [debouncedSearchTerm, isSetPageParam, isMobile]);

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
