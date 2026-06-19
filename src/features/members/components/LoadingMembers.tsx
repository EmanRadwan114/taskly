'use client';

import React from 'react';
import { useMobile } from '@/shared/hooks/shared.hooks';
import MemberItemSkeleton from './MemberItemSkeleton';
import Table from '@/shared/components/ui/Table';
import TableRow from '@/shared/components/ui/TableRow';
import TableHead from '@/shared/components/ui/TableHead';

const LoadingMembers: React.FC = () => {
  const { isMobile } = useMobile(768);

  // Array to render multiple skeleton rows/cards (e.g., 4 items)
  const dummyRows = Array.from({ length: 4 });

  // Desktop table view loader
  const desktopSkeletonView = (
    <Table>
      <thead>
        <TableRow>
          <TableHead className="w-1/2">Member</TableHead>
          <TableHead className="w-1/4">Role</TableHead>
          <TableHead className="w-1/4">Actions</TableHead>
        </TableRow>
      </thead>
      <tbody>
        {dummyRows.map((_, index) => (
          <TableRow
            key={index}
            className="w-full bg-white border-b border-b-slate-lighter last:border-0 hidden md:table-row"
          >
            <MemberItemSkeleton />
          </TableRow>
        ))}
      </tbody>
    </Table>
  );

  // Mobile list view loader
  const mobileSkeletonView = (
    <div className="flex md:hidden flex-col gap-3">
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
