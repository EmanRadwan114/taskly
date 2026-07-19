import React from 'react';
import { useMobile } from '@/shared/hooks/shared.hooks';

const LoadingStatsCard: React.FC = () => {
  return (
    <div className="p-4 lg:p-6 bg-white rounded-lg shadow-primary flex justify-between items-center gap-4 lg:flex-1">
      {/* Desktop view */}
      <div className="hidden lg:flex flex-1 justify-between items-center">
        <div className="flex-col gap-2 flex">
          <div className="h-3 w-28 bg-slate-200 rounded" />
          <div className="h-9 w-12 bg-slate-200 rounded" />
        </div>
        <div className="size-12 rounded-md bg-slate-200 shrink-0" />
      </div>
      {/* Mobile view */}
      <div className="lg:hidden min-w-28 flex flex-col gap-2">
        <div className="size-5 rounded bg-slate-200 shrink-0" />
        <div className="h-3 w-20 bg-slate-200 rounded" />
        <div className="h-6 w-8 bg-slate-200 rounded" />
      </div>
    </div>
  );
};

const LoadingStatsCalendarDay: React.FC = () => {
  return (
    <>
      {/* Desktop View */}
      <div className="hidden lg:flex bg-white rounded-lg min-h-[50vh] flex-col gap-3 w-48 flex-1 p-3 shadow-primary overflow-x-auto scrollbar-none">
        <div className="flex flex-col gap-1.5 w-full">
          <div className="h-3 w-10 bg-slate-200 rounded" />
          <div className="h-6 w-16 bg-slate-200 rounded" />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded-md bg-slate-100/50"
            >
              <div className="h-3 w-16 bg-slate-200 rounded" />
              <div className="h-3 w-4 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      </div>
      {/* Mobile View */}
      <div className="flex items-center lg:hidden rounded-lg gap-4 p-3 shadow-primary bg-surface-low w-full">
        <div className="flex flex-col gap-1.5 min-w-16">
          <div className="h-3 w-10 bg-slate-200 rounded" />
          <div className="h-5 w-14 bg-slate-200 rounded" />
        </div>
        <div className="h-10 bg-slate-200/50 w-px shrink-0" />
        <div className="flex flex-col gap-1.5 items-center">
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="h-6 w-6 rounded-xs bg-slate-200" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const LoadingStatistics: React.FC = () => {
  const { isMobile } = useMobile(1024);

  return (
    <div className="flex flex-col gap-6 animate-pulse">
      {/* Filters Skeleton */}
      {/* Desktop filters */}
      <div className="justify-between items-center gap-2 w-full lg:px-4 py-3 lg:bg-surface-low rounded-lg hidden lg:flex">
        <div className="flex items-center gap-2">
          <div className="size-8 bg-slate-200 rounded-md" />
          <div className="h-4 w-48 bg-slate-200 rounded" />
          <div className="size-8 bg-slate-200 rounded-md" />
        </div>
        <div className="flex items-center gap-4">
          <div className="h-9 w-40 bg-slate-200 rounded-md" />
          <div className="h-9 w-40 bg-slate-200 rounded-md" />
        </div>
      </div>
      {/* Mobile filters */}
      <div className="gap-2 w-full lg:px-4 py-3 lg:bg-surface-low rounded-lg flex flex-col lg:hidden">
        <div className="h-9 w-full bg-slate-200 rounded-md" />
        <div className="flex items-center gap-3">
          <div className="h-9 w-1/2 bg-slate-200 rounded-md" />
          <div className="h-9 w-1/2 bg-slate-200 rounded-md" />
        </div>
      </div>

      {/* Cards Skeleton */}
      <div className="flex flex-col gap-3">
        {isMobile && (
          <h2 className="capitalize text-secondary/40 font-bold text-body-xs leading-3.75">
            quick overview
          </h2>
        )}
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-none">
          <LoadingStatsCard />
          <LoadingStatsCard />
          <LoadingStatsCard />
        </div>
      </div>

      {/* Calendar Skeleton */}
      <div className="flex flex-col lg:flex-row gap-6 scrollbar-none">
        {isMobile && (
          <h2 className="capitalize text-slate-dark/40 font-bold text-heading-6 leading-7">
            Calendar
          </h2>
        )}
        {Array.from({ length: 7 }).map((_, index) => (
          <LoadingStatsCalendarDay key={index} />
        ))}
      </div>

      {/* Bottom Charts & Stats Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isMobile && (
          <h2 className="capitalize text-slate-dark/40 font-bold text-heading-6 leading-7">
            Task Statistics
          </h2>
        )}

        {/* TasksStatsChart Skeleton */}
        <div className="bg-white shadow-form p-8 rounded-lg flex flex-col gap-5 lg:gap-10">
          <div className="h-5 w-40 bg-slate-200 rounded" />
          <div className="flex gap-4 items-center">
            {/* Doughnut skeleton */}
            <div className="size-37.5 lg:size-62.5 rounded-full border-20 lg:border-30 border-slate-100 shrink-0" />

            {/* Progress bars skeleton */}
            <div className="flex flex-col gap-4 flex-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="size-3 rounded-full bg-slate-200" />
                      <div className="h-3 w-16 bg-slate-200 rounded" />
                    </div>
                    <div className="h-3 w-4 bg-slate-200 rounded" />
                  </div>
                  {!isMobile && (
                    <div className="rounded-xl h-1 w-full bg-slate-100" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AllProjectsStats Skeleton */}
        <div className="bg-white rounded-lg p-8 flex flex-col gap-10 shadow-primary">
          <div className="h-5 w-32 bg-slate-200 rounded" />
          <div className="flex flex-col gap-4">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center gap-2"
              >
                <div className="h-3 w-28 bg-slate-200 rounded" />
                <div className="h-3 w-16 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingStatistics;
