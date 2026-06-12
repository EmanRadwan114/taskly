'use client';

import { resetProjects } from '@/shared/libs/store/slices/project.slice';
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
    handlerFn: resetProjects,
    reset,
    error,
  });

  return (
    <ErrorHandler
      handleRetry={handleRetry}
      description={`We're having trouble retrieving your projects right now. Please try
            again in a moment.`}
    />
  );
}
