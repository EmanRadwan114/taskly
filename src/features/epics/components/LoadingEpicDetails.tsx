import React from 'react';

const LoadingEpicDetails: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 lg:gap-8 animate-pulse">
      <div className="flex flex-col gap-1 light-gradient pt-6 lg:pt-8 px-6 lg:px-8 lg:border-b lg:border-b-slate-light/15">
        {/* epic id skeleton */}
        <div className="flex gap-2 items-center cursor-default h-6">
          <div className="w-5 h-5 bg-slate-200 rounded hidden lg:block" />
          <div className="h-4 bg-slate-200 rounded w-16" />
        </div>
        {/* epic title skeleton */}
        <div className="flex justify-between items-start mt-1">
          <div className="h-8 bg-slate-200 rounded w-2/3 mb-6" />

          {/* close btn skeleton */}
          <div className="-mt-4 size-5 bg-slate-200 rounded-full" />
        </div>
      </div>

      {/* epic info skeleton */}
      <div className="flex flex-col gap-5 lg:gap-8 px-6 lg:px-8 pb-6 lg:pb-8">
        {/* description skeleton */}
        <div className="flex flex-col gap-2">
          <div className="h-4 bg-slate-200 rounded w-full" />
          <div className="h-4 bg-slate-200 rounded w-4/5" />
        </div>

        {/* meta grid skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-3 items-start gap-6">
          {/* 1. created by */}
          <div className="flex flex-col gap-2">
            <span className="text-label-sm text-slate-200 uppercase lg:text-body-xs">
              created by
            </span>
            <div className="flex items-center gap-2">
              <div className="size-8 bg-slate-200 rounded-full" />
              <div className="h-4 bg-slate-200 rounded w-24" />
            </div>
          </div>

          {/* 2. assignee */}
          <div className="flex flex-col gap-2">
            <span className="text-label-sm text-slate-200 uppercase lg:text-body-xs">
              assignee
            </span>
            <div className="flex items-center gap-2">
              <div className="size-8 bg-slate-200 rounded-full" />
              <div className="h-4 bg-slate-200 rounded w-24" />
            </div>
          </div>

          <div className="lg:hidden border-t border-t-slate-dark/30 col-span-2"></div>

          {/* 3. deadline */}
          <div className="flex flex-col gap-2">
            <span className="text-label-sm text-slate-200 uppercase lg:text-body-xs">
              deadline
            </span>
            <div className="flex items-center gap-2">
              <div className="size-4 bg-slate-200 rounded" />
              <div className="h-4 bg-slate-200 rounded w-20" />
            </div>
          </div>

          {/* 4. created at */}
          <div className="flex flex-col gap-2">
            <span className="text-label-sm text-slate-200 uppercase lg:text-body-xs">
              created at
            </span>
            <div className="flex items-center gap-2">
              <div className="size-4 bg-slate-200 rounded" />
              <div className="h-4 bg-slate-200 rounded w-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingEpicDetails;
