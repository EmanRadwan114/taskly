import React from 'react';

const LoadingEpicTasks: React.FC = () => {
  return (
    <>
      {/* header */}
      <div className="flex justify-between items-center px-6 lg:px-8">
        <div className="w-20 h-4 animate-pulse bg-slate-200 rounded"></div>
        {/* mobile badge */}
        <div className="w-10 h-5 animate-pulse bg-slate-200 rounded lg:hidden"></div>

        {/* desktop link */}
        <div className="w-15 h-5 animate-pulse bg-slate-200 rounded hidden lg:block"></div>
      </div>
      <section className="lg:border lg:border-slate-light/30 lg:rounded-lg lg:divide-y lg:divide-slate-light/30 flex flex-col gap-3 lg:gap-0">
        {Array.from({ length: 3 }).map((_, idx) => (
          <React.Fragment key={idx}>
            {/* Desktop Skeleton Layout */}
            <div className="hidden lg:flex p-4 justify-between items-center gap-4 animate-pulse">
              <div className="flex gap-4 items-center w-full">
                {/* Check icon skeleton */}
                <div className="size-5 bg-slate-200 rounded-full shrink-0" />

                {/* Title & Assignee skeleton */}
                <div className="flex flex-col gap-2 w-1/2">
                  {/* Title */}
                  <div className="h-5 bg-slate-200 rounded w-3/4" />
                  {/* Assignee */}
                  <div className="flex items-center gap-2">
                    <div className="size-6 bg-slate-200 rounded-full" />
                    <div className="h-4 bg-slate-200 rounded w-24" />
                  </div>
                </div>
              </div>

              {/* Due date skeleton */}
              <div className="flex flex-col gap-1.5 shrink-0 items-start">
                <div className="h-3 bg-slate-200 rounded w-12" />
                <div className="h-4 bg-slate-200 rounded w-20" />
              </div>
            </div>

            {/* Mobile Skeleton Layout */}
            <div className="border border-slate-lighter shadow-primary p-4 rounded-lg flex lg:hidden flex-col gap-3 animate-pulse">
              {/* Title & Actions Row */}
              <div className="flex justify-between items-start">
                <div className="h-5 bg-slate-200 rounded w-2/3" />
                <div className="size-5 bg-slate-200 rounded-full" />
              </div>

              {/* Bottom Row: Assignee & Date */}
              <div className="flex justify-between items-center gap-2">
                <div className="flex gap-2 items-center">
                  <div className="size-6 bg-slate-200 rounded-full" />
                  <div className="h-4 bg-slate-200 rounded w-20" />
                </div>
                <div className="flex gap-1.5 items-center">
                  <div className="size-4 bg-slate-200 rounded" />
                  <div className="h-4 bg-slate-200 rounded w-16" />
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </section>
    </>
  );
};

export default LoadingEpicTasks;
