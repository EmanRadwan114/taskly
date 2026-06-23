import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IUseHandlePagination } from '../types/shared.types';
import { log } from 'console';
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
    if (!incomingData || incomingData.length === 0 || !isMobile) return;

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
    if (!target || !isMobile || !hasMore || isFetching) return;

    const observer = new IntersectionObserver(
      (entires) => {
        const entry = entires[0];
        if (entry.isIntersecting) {
          if (target) observer.unobserve(target);

          setCurrentPage((prev) => prev + 1);
        }
      },
      { threshold: 0, rootMargin: '10px' }
    );
    observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, [isMobile, hasMore, isFetching]);

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

// ^ ---------------------------- Debounce Search Hook ------------------------
export const useDebounceSearch = (time = 400) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, time);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  return { debouncedSearchTerm, setSearchTerm, searchTerm };
};

// ^ ------------------------ Use Handle Error Hook -------------------------
export const useHandleError = ({ error }: { error: Error }) => {
  useEffect(() => {
    if (error.message) {
      toast.error(error.message);
    }
  }, [error]);
};

// ^ ------------------------ Use Fetch Members Hook -------------------------
export const useFetchMembers = (projectId: string) => {
  const { members, isFetched, loading, error } = useAppSelector(
    (state) => state.members
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isFetched && projectId) {
      dispatch(fetchMembers(projectId));
    }
  }, [projectId]);

  return { members, isFetched, loading, error };
};
