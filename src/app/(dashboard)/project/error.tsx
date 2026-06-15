'use client';

import ErrorHandler from '@/shared/components/ui/ErrorHandler';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {

  useEffect(() => {
    if (error.message) {
      toast.error(error.message);
    }
  }, []);

  return (
    <ErrorHandler
      handleRetry={reset}
      description={`We're having trouble retrieving your projects right now. Please try
            again in a moment.`}
    />
  );
}
