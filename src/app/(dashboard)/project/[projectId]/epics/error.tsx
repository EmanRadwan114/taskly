'use client';
import { useAppDispatch } from '@/shared/libs/store/store';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { resetEpics } from '@/shared/libs/store/slices/epics.slice';
import ErrorHandler from '@/shared/components/ui/ErrorHandler';
import { useHandleError } from '@/shared/hooks/shared.hooks';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const { handleRetry } = useHandleError({
    handlerFn: resetEpics,
    reset,
    error,
  });

  return (
    <ErrorHandler
      handleRetry={handleRetry}
      description={`We're having trouble retrieving project epics right now. Please try
            again in a moment.`}
    />
  );
}
