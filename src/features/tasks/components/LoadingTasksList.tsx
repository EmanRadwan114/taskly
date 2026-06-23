import React from 'react';
import Table from '@/shared/components/ui/Table';
import TableHead from '@/shared/components/ui/TableHead';
import TableRow from '@/shared/components/ui/TableRow';
import TableCol from '@/shared/components/ui/TableCol';

const LoadingTasksList: React.FC = () => {
  const thStyle = `text-secondary py-4! px-6! font-bold text-label letter-spacing-md`;
  const tdStyle = `py-4.5! px-6! text-body-sm leading-4`;

  const desktopView = (
    <div className="hidden lg:flex lg:flex-col lg:flex-1 w-full pb-6">
      <div className="overflow-x-auto w-full modal-container">
        <Table className="min-w-200 shadow-none">
          <thead>
            <TableRow className="bg-surface-low/30 border-b border-slate-light/10">
              <TableHead className={`${thStyle} w-2/12`}>Task ID</TableHead>
              <TableHead className={`${thStyle} w-3/12`}>Title</TableHead>
              <TableHead className={`${thStyle} w-2/12`}>Status</TableHead>
              <TableHead className={`${thStyle} w-2/12`}>Due Dats</TableHead>
              <TableHead className={`${thStyle} w-3/12`}>Assignees</TableHead>
            </TableRow>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, idx) => (
              <TableRow key={idx} className="bg-white border-b border-b-surface-low">
                {/* task id */}
                <TableCol className={`${tdStyle} w-1/8`}>
                  <div className="h-4 bg-slate-200 rounded w-16" />
                </TableCol>
                {/* title */}
                <TableCol className={`${tdStyle} w-3/8`}>
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                </TableCol>
                {/* status */}
                <TableCol className={`${tdStyle} w-3/8`}>
                  <div className="h-6 bg-slate-200 rounded-xs w-20" />
                </TableCol>
                {/* due date */}
                <TableCol className={`${tdStyle} w-1/8`}>
                  <div className="h-4 bg-slate-200 rounded w-24" />
                </TableCol>
                {/* assignee */}
                <TableCol className={`${tdStyle} w-1/8`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="size-6.5 rounded-full bg-slate-200 shrink-0" />
                      <div className="h-4 bg-slate-200 rounded w-20" />
                    </div>
                    <div className="size-6 bg-slate-200 rounded" />
                  </div>
                </TableCol>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </div>

      {/* footer skeleton */}
      <div className="bg-surface-low/20! py-3! px-6!">
        <div className="flex justify-between items-center">
          <div className="h-4 bg-slate-200 rounded w-40" />
          <div className="flex gap-2">
            <div className="h-8 bg-slate-200 rounded w-16" />
            <div className="h-8 bg-slate-200 rounded w-8" />
            <div className="h-8 bg-slate-200 rounded w-8" />
            <div className="h-8 bg-slate-200 rounded w-16" />
          </div>
        </div>
      </div>
    </div>
  );

  const mobileView = (
    <div className="lg:hidden flex flex-col gap-3">
      {Array.from({ length: 5 }).map((_, idx) => (
        <div key={idx} className="bg-white flex flex-col gap-3 p-4 rounded-lg">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              {/* task id */}
              <div className="h-4 bg-slate-200 rounded w-16" />
              {/* status */}
              <div className="h-6 bg-slate-200 rounded-xs w-20" />
            </div>
            {/* title */}
            <div className="h-6 bg-slate-200 rounded w-3/4" />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {/* avatar */}
              <div className="size-6.5 rounded-full bg-slate-200 shrink-0" />
              {/* due date */}
              <div className="flex flex-col gap-1">
                <span className="text-secondary/70 font-bold text-label leading-4.25 uppercase">
                  due date
                </span>
                <div className="h-4 bg-slate-200 rounded w-20" />
              </div>
            </div>
            {/* button */}
            <div className="size-6 bg-slate-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col flex-1 w-full pb-6 animate-pulse">
      {desktopView}
      {mobileView}
    </div>
  );
};

export default LoadingTasksList;
