import React from 'react';
import { useMobile } from '@/shared/hooks/shared.hooks';

const LoadingTaskDetails: React.FC = () => {
  const { isMobile } = useMobile(1024);

  // Styles matching TaskDetailsDesktop and TaskDetailsMobile
  const labelStyle = `uppercase font-bold text-body-xs leading-3.75 letter-spacing-md text-secondary`;
  const dateLabelStyle = `text-secondary! text-body-sm! leading-4! capitalize! font-normal!`;

  const desktopView = (
    <div className="hidden lg:flex min-h-[80vh] bg-white rounded-lg w-full">
      {/* Left side */}
      <div className="w-2/3 flex flex-col min-h-full">
        <header className="flex flex-col gap-2 py-6 px-8 border-b border-b-slate-lighter">
          <div className="flex gap-3 items-center">
            {/* Task ID skeleton */}
            <div className="h-5.5 bg-slate-200 rounded-xs w-16" />
            {/* Epic skeleton */}
            <div className="flex items-center gap-1.5">
              <div className="size-4 bg-slate-200 rounded" />
              <div className="h-4 bg-slate-200 rounded w-28" />
            </div>
          </div>
          {/* Title skeleton */}
          <div className="py-2">
            <div className="h-9 bg-slate-200 rounded w-3/4" />
          </div>
        </header>

        {/* Description skeleton */}
        <div className="p-8 flex flex-col gap-3 px-8">
          <span className={labelStyle}>Description</span>
          <div className="flex flex-col gap-2 pt-2">
            <div className="h-4 bg-slate-200 rounded w-full" />
            <div className="h-4 bg-slate-200 rounded w-5/6" />
            <div className="h-4 bg-slate-200 rounded w-2/3" />
          </div>
        </div>

        {/* Footer skeleton */}
        <div className="mt-auto flex justify-between items-center bg-surface-low px-8 py-3">
          {/* Copy link skeleton */}
          <div className="flex gap-2 items-center">
            <div className="size-4 bg-slate-200 rounded" />
            <div className="h-4 bg-slate-200 rounded w-20" />
          </div>
          {/* Close button skeleton */}
          <div className="h-9 bg-slate-200 rounded w-16" />
        </div>
      </div>

      {/* Right side */}
      <div className="w-1/3">
        <div className="bg-surface-low border-s border-s-slate-lighter p-8 min-h-full">
          {/* Status skeleton */}
          <div className="mb-10 flex flex-col gap-3">
            <span className={labelStyle}>Status</span>
            <div className="h-9 bg-slate-200 rounded-md w-full" />
          </div>

          {/* Assignee skeleton */}
          <div className="mb-6 flex flex-col gap-3">
            <span className={labelStyle}>Assignee</span>
            <div className="bg-white p-2 rounded-lg border border-slate-light/10 shadow-primary flex items-center gap-3 h-14">
              <div className="size-7 rounded-full bg-slate-200 shrink-0" />
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="h-4 bg-slate-200 rounded w-24" />
                <div className="h-3 bg-slate-200 rounded w-16" />
              </div>
            </div>
          </div>

          {/* Reporter skeleton */}
          <div className="flex flex-col gap-3 border-b border-b-slate-light/60 pb-6">
            <span className={labelStyle}>Reporter</span>
            <div className="flex items-center gap-3">
              <div className="size-7 rounded-full bg-slate-200 shrink-0" />
              <div className="h-4 bg-slate-200 rounded w-20" />
            </div>
          </div>

          {/* Due date skeleton */}
          <div className="flex gap-2 justify-between items-center mb-3 pt-6">
            <span className={dateLabelStyle}>due date</span>
            <div className="h-8 bg-slate-200 rounded w-32" />
          </div>

          {/* Created at skeleton */}
          <div className="flex gap-2 justify-between items-center">
            <span className={`${dateLabelStyle} capitalize`}>created at</span>
            <div className="h-4 bg-slate-200 rounded w-24" />
          </div>
        </div>
      </div>
    </div>
  );

  const mobileView = (
    <div className="rounded-t-3xl pb-8 border-t border-t-white/40 bg-background max-h-[70vh] self-end lg:hidden w-full flex flex-col">
      <div className="mx-auto bg-slate-light/50 w-10 h-1 rounded-xl my-4"></div>
      <div className="flex flex-col gap-8 min-h-full px-6">
        <div className="flex flex-col gap-4">
          <header className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              {/* Task ID skeleton */}
              <div className="h-4 bg-slate-200 rounded w-16" />
              {/* Close button skeleton */}
              <div className="size-6 bg-slate-200 rounded-full" />
            </div>
            {/* Title skeleton */}
            <div className="h-8 bg-slate-200 rounded w-3/4" />
          </header>

          <div className="flex gap-2">
            {/* Status skeleton */}
            <div className="h-7 bg-slate-200 rounded-xl w-24" />
            {/* Epic skeleton */}
            <div className="h-7 bg-slate-200 rounded-xl w-32" />
          </div>
        </div>

        {/* Meta grid skeleton */}
        <div className="grid grid-cols-2 gap-3">
          {/* Assignee skeleton */}
          <div className="flex flex-col gap-1.5 p-4 rounded-lg bg-surface-low">
            <span className="text-label-sm text-secondary uppercase font-bold">
              Assignee
            </span>
            <div className="flex items-center gap-3 mt-1">
              <div className="size-6 rounded-full bg-slate-200 shrink-0" />
              <div className="h-4 bg-slate-200 rounded w-16" />
            </div>
          </div>
          {/* Due date skeleton */}
          <div className="flex flex-col gap-1.5 p-4 rounded-lg bg-surface-low">
            <span className="text-label-sm text-secondary uppercase font-bold">
              due date
            </span>
            <div className="flex items-center gap-2 mt-1">
              <div className="size-4 bg-slate-200 rounded shrink-0" />
              <div className="h-4 bg-slate-200 rounded w-20" />
            </div>
          </div>
          {/* Created by skeleton */}
          <div className="flex flex-col gap-1.5 p-4 rounded-lg bg-surface-low">
            <span className={labelStyle}>Created by</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="size-6 rounded-full bg-slate-200 shrink-0" />
              <div className="h-4 bg-slate-200 rounded w-16" />
            </div>
          </div>
          {/* Created at skeleton */}
          <div className="flex flex-col gap-1.5 p-4 rounded-lg bg-surface-low">
            <span className={labelStyle}>Created at</span>
            <div className="h-4 bg-slate-200 rounded w-20 mt-1" />
          </div>
        </div>

        {/* Description skeleton */}
        <div className="flex flex-col gap-3">
          <span className="text-label-sm text-secondary uppercase font-bold">
            Description
          </span>
          <div className="bg-white p-5 rounded-lg border border-slate-light/10 shadow-primary flex flex-col gap-2 h-24">
            <div className="h-3 bg-slate-200 rounded w-full" />
            <div className="h-3 bg-slate-200 rounded w-5/6" />
            <div className="h-3 bg-slate-200 rounded w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col flex-1 w-full">
      {isMobile ? mobileView : desktopView}
    </div>
  );
};

export default LoadingTaskDetails;
