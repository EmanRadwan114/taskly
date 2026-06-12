import React from 'react';

const LoadingEpics: React.FC = () => {
  return (
    <section className="flex flex-col gap-24px">
      {/* page header skeleton */}
      <header className="lg:justify-between lg:items-center flex gap-16px flex-col lg:flex-row mb-5 lg:mb-10 animate-pulse">
        {/* Title skeleton */}
        <div className="h-10 bg-slate-200 rounded-md w-56 max-w-full" />

        <div className="flex gap-16px lg:gap-32px lg:items-start flex-col lg:flex-row w-full lg:w-auto">
          {/* search skeleton */}
          <div className="h-12 bg-slate-200 rounded-md w-full lg:w-64" />
          {/* new epic button skeleton */}
          <div className="h-12 bg-slate-200 rounded-md w-32 hidden lg:block" />
        </div>
      </header>

      {/* Skeleton Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-24px">
        {Array.from({ length: 6 }).map((_, idx) => (
          <React.Fragment key={idx}>
            {/* Desktop Skeleton Layout */}
            <div className="hidden lg:flex flex-col gap-16px bg-white border-s-4 border-s-slate-200 shadow-primary p-16px rounded-8px lg:justify-between animate-pulse">
              {/* Header */}
              <header className="flex justify-between items-center">
                {/* Badge item */}
                <div className="h-6 w-16 bg-slate-200 rounded" />
                {/* Actions button */}
                <div className="size-6 bg-slate-200 rounded-full" />
              </header>

              {/* Title and Assignee Info */}
              <div className="flex flex-col gap-12px">
                {/* Epic Title */}
                <div className="h-7 w-3/4 bg-slate-200 rounded" />

                {/* Assignee Row */}
                <div className="flex gap-12px items-center">
                  {/* Avatar block */}
                  <div className="size-10 bg-slate-200 rounded-lg" />
                  {/* Metadata rows */}
                  <div className="flex flex-col gap-4px">
                    <div className="h-4 w-12 bg-slate-200 rounded" />
                    <div className="h-5 w-24 bg-slate-200 rounded" />
                  </div>
                </div>
              </div>

              {/* Footer Area */}
              <footer className="border-t border-t-slate-100 flex justify-between items-end mt-auto pt-16px">
                {/* Created By Block */}
                <div className="flex gap-8px items-center">
                  <div className="size-4 bg-slate-200 rounded-full" />
                  <div className="h-4 w-28 bg-slate-200 rounded" />
                </div>
                {/* Due Date Block */}
                <div className="flex gap-8px items-center">
                  <div className="size-4 bg-slate-200 rounded-full" />
                  <div className="h-4 w-20 bg-slate-200 rounded" />
                </div>
              </footer>
            </div>

            {/* Mobile Skeleton Layout */}
            <div className="lg:hidden flex flex-col gap-16px bg-white shadow-primary p-16px rounded-8px min-h-48 animate-pulse">
              {/* Header */}
              <header className="flex justify-between items-center">
                {/* Badge item */}
                <div className="h-6 w-16 bg-slate-200 rounded" />
                {/* Actions button */}
                <div className="size-6 bg-slate-200 rounded-full" />
              </header>

              {/* Info Area */}
              <div className="flex flex-col gap-12px h-full justify-between">
                {/* Epic Title */}
                <div className="h-7 w-full bg-slate-200 rounded" />

                {/* Lower layout chunk */}
                <div className="flex justify-between items-center mt-auto w-full">
                  {/* Assignee Details */}
                  <div className="flex gap-12px items-center">
                    {/* Small avatar */}
                    <div className="size-7 bg-slate-200 rounded-lg" />
                    {/* Text chunks */}
                    <div className="flex flex-col gap-4px">
                      <div className="h-4 w-24 bg-slate-200 rounded" />
                      <div className="h-3 w-12 bg-slate-200 rounded" />
                    </div>
                  </div>

                  {/* Deadline Block */}
                  <div className="flex flex-col items-end gap-4px">
                    <div className="h-3 w-12 bg-slate-200 rounded" />
                    <div className="h-4 w-16 bg-slate-200 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default LoadingEpics;
