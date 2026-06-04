import { useEffect, useState } from 'react';

export const useTimer = () => {
  const INITIAL_TIME = 5 * 1; //5mins

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
