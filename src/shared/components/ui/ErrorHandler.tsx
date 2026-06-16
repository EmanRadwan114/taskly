'use client';
import React from 'react';
import Button from './Button';
import ErrorIcon from '@/assets/icons/error-icon.svg';

interface IProps {
  handleRetry: () => void;
  description: string;
}

const ErrorHandler: React.FC<IProps> = ({ handleRetry, description }) => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center sm:max-w-1/2 xl:max-w-[40%] sm:mx-auto">
      <div className="flex flex-col justify-center items-center gap-11">
        <div className="flex justify-center items-center bg-error-background rounded-3 size-16">
          <ErrorIcon className="6.5 text-error" />
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="font-semibold text-slate-dark text-heading-2 letter-spacing-xs text-center">
            Something went wrong
          </h1>
          <p className="text-center leading-6 letter-spacing-md">
            {description}
          </p>
        </div>
        <Button onClick={handleRetry}>Retry Connection</Button>
      </div>
    </section>
  );
};

export default ErrorHandler;
