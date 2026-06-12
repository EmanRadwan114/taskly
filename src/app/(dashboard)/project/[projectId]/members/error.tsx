'use client';

import { resetMembers } from '@/shared/libs/store/slices/members.slice';
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
    handlerFn: resetMembers,
    reset,
    error,
  });

  return (
    <ErrorHandler
      handleRetry={handleRetry}
      description={`We're having trouble retrieving project members right now. Please
            try again in a moment.`}
    />
  );
}
