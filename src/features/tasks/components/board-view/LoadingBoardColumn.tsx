import React from 'react';

const LoadingBoardColumn: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 min-w-64 animate-pulse">
      {/* status header skeleton */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-slate-200" />
          <div className="h-4 w-20 bg-slate-200 rounded" />
          <div className="size-4.75 bg-slate-200 rounded-xs" />
        </div>
        <div className="size-4 bg-slate-200 rounded" />
      </div>

      {/* add task button skeleton */}
      <div className="border-2 border-slate-200 border-dashed p-4 w-full rounded-sm flex items-center justify-center gap-2">
        <div className="size-4.5 bg-slate-200 rounded-full shrink-0" />
        <div className="h-4 bg-slate-200 rounded w-24" />
      </div>

      {/* card skeletons */}
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className="p-4 border border-slate-light/10 rounded-lg shadow-board flex flex-col gap-4 bg-white"
        >
          {/* Title skeleton */}
          <div className="flex flex-col gap-2">
            <div className="h-4 bg-slate-200 rounded w-full" />
            <div className="h-4 bg-slate-200 rounded w-2/3" />
          </div>
          {/* Bottom row skeleton */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="size-4 bg-slate-200 rounded" />
              <div className="h-3 w-12 bg-slate-200 rounded" />
            </div>
            <div className="size-6 bg-slate-200 rounded-full ms-auto" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingBoardColumn;
