import React from 'react';
import Table from '@/shared/components/ui/Table';
import TableHead from '@/shared/components/ui/TableHead';
import TableRow from '@/shared/components/ui/TableRow';
import TableCol from '@/shared/components/ui/TableCol';

const LoadingTasksList: React.FC = () => {
  const thStyle = `text-secondary py-4! px-6! font-bold text-label letter-spacing-md`;
  const tdStyle = `py-4.5! px-6! text-body-sm leading-4`;

  return (
    <div className="flex flex-col flex-1 w-full pb-6 animate-pulse">
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
};

export default LoadingTasksList;
