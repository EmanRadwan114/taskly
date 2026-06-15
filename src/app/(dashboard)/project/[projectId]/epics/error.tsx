'use client';

import { useHandleError } from '@/shared/hooks/shared.hooks';
import ErrorHandler from '@/shared/components/ui/ErrorHandler';

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
      description={`We're having trouble retrieving project epics right now. Please try
            again in a moment.`}
    />
  );
}
