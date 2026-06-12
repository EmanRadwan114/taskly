'use client';

import React from 'react';
import { useMobile } from '@/shared/hooks/shared.hooks';
import MemberItemSkeleton from './MemberItemSkeleton';

const LoadingMembers: React.FC = () => {
  const { isMobile } = useMobile(768);

  // Array to render multiple skeleton rows/cards (e.g., 4 items)
  const dummyRows = Array.from({ length: 4 });

  // Desktop table view loader
  const desktopSkeletonView = (
    <table className="w-full hidden md:table table-fixed border-collapse rounded-lg overflow-hidden lg:max-w-5/6 xl:max-w-3/4 lg:mx-auto">
      <thead>
        <tr className="bg-surface-md/30 text-left">
          <th className="w-1/2 uppercase text-label-sm text-secondary px-12 py-5 font-semibold">
            Member
          </th>
          <th className="w-1/4 uppercase text-label-sm text-secondary px-12 py-5 font-semibold">
            Role
          </th>
          <th className="w-1/4 uppercase text-label-sm text-secondary px-12 py-5 font-semibold">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {dummyRows.map((_, index) => (
          <tr
            key={index}
            className="w-full bg-white border-b border-b-slate-lighter last:border-0 hidden md:table-row"
          >
            <MemberItemSkeleton />
          </tr>
        ))}
      </tbody>
    </table>
  );

  // Mobile list view loader
  const mobileSkeletonView = (
    <div className="flex md:hidden flex-col gap-12px">
      {dummyRows.map((_, index) => (
        <MemberItemSkeleton key={index} />
      ))}
    </div>
  );

  return (
    <section>
      {/* Page header skeleton */}
      <header className="justify-between items-center flex mb-5 lg:mb-10 animate-pulse">
        {/* Title skeleton */}
        <div className="h-10 bg-slate-300 rounded-md w-48 max-w-full mx-auto lg:mx-0" />

        {/* Button skeleton */}
        <div className="w-35 h-10 bg-slate-200 rounded-md hidden lg:flex" />
      </header>

      {/* Members content loader */}
      {isMobile ? mobileSkeletonView : desktopSkeletonView}
    </section>
  );
};

export default LoadingMembers;
