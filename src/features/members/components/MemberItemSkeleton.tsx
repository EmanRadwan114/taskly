'use client';

import React from 'react';
import DotsIcon from '@/assets/icons/dots.svg';
import Button from '@/shared/components/ui/Button';
import { useMobile } from '@/shared/hooks/shared.hooks';

const MemberItemSkeleton: React.FC = () => {
  const { isMobile } = useMobile(768);

  // Common inner layout structural skeleton (Avatar + Text Rows)
  const memberInfoSkeleton = (
    <div className="flex gap-16px items-center animate-pulse">
      {/* Avatar Skeleton */}
      <div className="rounded-lg size-48px bg-slate-200" />

      {/* Name and Email text row skeletons */}
      <div className="flex flex-col gap-6px flex-1">
        <div className="h-16px bg-slate-200 rounded w-24 max-w-full" />
        <div className="h-12px bg-slate-100 rounded w-36 max-w-full" />
      </div>
    </div>
  );

  // Desktop view layout matches <td> styles exactly [1]
  const desktopView = (
    <>
      {/* member details [1] */}
      <td className="w-1/2 px-9 py-5">{memberInfoSkeleton}</td>

      {/* role [1] */}
      <td className="text-center w-1/4 px-9 py-5">
        <div className="inline-block h-24px w-16 bg-slate-200 rounded-full! animate-pulse" />
      </td>

      {/* action [1] */}
      <td className="w-1/4 px-9 py-5">
        <div className="flex justify-end animate-pulse">
          <Button
            variant="ghost"
            className="p-1! justify-end pointer-events-none opacity-40"
          >
            <DotsIcon className="text-secondary w-0.75" />
          </Button>
        </div>
      </td>
    </>
  );

  // Mobile view container matches custom utility design patterns [1]
  const mobileView = (
    <div className="flex justify-between gap-16px bg-white rounded-8px p-16px md:hidden items-center">
      {memberInfoSkeleton}

      {/* actions & role [1] */}
      <div className="flex gap-4px items-center animate-pulse">
        {/* role badge skeleton [1] */}
        <div className="h-24px w-14 bg-slate-200 rounded" />

        {/* action button skeleton [1] */}
        <Button variant="ghost" className="p-1! pointer-events-none opacity-40">
          <DotsIcon className="text-secondary w-0.75" />
        </Button>
      </div>
    </div>
  );

  return <>{isMobile ? mobileView : desktopView}</>;
};

export default MemberItemSkeleton;
