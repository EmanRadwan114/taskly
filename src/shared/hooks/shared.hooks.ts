import { useEffect, useState } from 'react';
import { useAppDispatch } from '../libs/store/store';
import { toast } from 'react-toastify';

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

// ^ --- Error Handler Hooks ----
export const useHandleError = ({
  handlerFn,
  reset,
  error,
}: {
  handlerFn: () => void;
  reset: () => void;
  error: Error;
}) => {
  const dispatch = useAppDispatch();

  const handleRetry = () => {
    dispatch(handlerFn);
    reset();
  };

  useEffect(() => {
    if (error.message) {
      toast.error(error.message);
    }
  }, []);

  return { handleRetry };
};
