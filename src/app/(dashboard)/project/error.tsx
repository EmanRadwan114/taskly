'use client';

import ErrorHandler from '@/shared/components/ui/ErrorHandler';
import { useHandleError } from '@/shared/hooks/shared.hooks';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useHandleError({
    error,
  });

  return (
    <ErrorHandler
      handleRetry={reset}
      description={`We're having trouble retrieving your projects right now. Please try
            again in a moment.`}
    />
  );
}
