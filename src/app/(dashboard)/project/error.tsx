'use client';
import Button from '@/shared/components/ui/Button';
import ErrorIcon from '@/assets/icons/error-icon.svg';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section className="lg:min-h-[80vh] flex items-center justify-center sm:max-w-1/2 xl:max-w-[40%] sm:mx-auto">
      <div className="flex flex-col justify-center items-center gap-11">
        <div className="flex justify-center items-center bg-error-background rounded-12px size-16">
          <ErrorIcon className="6.5 text-error" />
        </div>
        <div className="flex flex-col justify-center items-center gap-16px">
          <h1 className="font-semibold text-slate-dark text-[36px] tracking-[-0.9px]">
            Something went wrong
          </h1>
          <p className="text-center leading-6 tracking-[0.6px]">
            We're having trouble retrieving your projects right now. Please try
            again in a moment.
          </p>
        </div>
        <Button onClick={reset}>Retry Connection</Button>
      </div>
    </section>
  );
}
