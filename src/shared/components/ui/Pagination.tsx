'use client';

import React, { useEffect, useMemo } from 'react';
import ChevronLeftIcon from '@/assets/icons/chevron-left.svg';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import Button from './Button';
import { getPaginationButtons } from '@/shared/utils/functions.client.utils';

interface IProps {
  currentPage: number;
  totalPages: number;
  handleCurrentPage: (page: number) => void;
}
const Pagination: React.FC<IProps> = ({
  currentPage,
  totalPages,
  handleCurrentPage,
}) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [currentPage]);

  if (!totalPages) return null;

  // total page button list for desktop
  const pagesList: number[] = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  );

  const btnsArray = useMemo(
    () => getPaginationButtons(pagesList, currentPage, totalPages),
    [pagesList, currentPage, totalPages]
  );

  // css style
  const isActiveStyle = (pageNum: number) =>
    pageNum === currentPage ? 'bg-primary! text-white!' : '';

  const baseStyle =
    'text-secondary! rounded-xs! size-9! border border-slate-light p-0! font-bold! text-body-sm!';

  return (
    <div className="flex gap-2">
      {/* prev */}
      <Button
        variant="ghost"
        className={`${baseStyle}`}
        onClick={() => handleCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon className="w-1" />
      </Button>

      {/* btn list */}
      {btnsArray?.map((btn, index) => {
        if (typeof btn === 'number')
          return (
            <Button
              key={`${btn}-${index}`}
              variant="ghost"
              className={`${baseStyle} ${isActiveStyle(btn)}`}
              onClick={() => handleCurrentPage(btn)}
            >
              {btn}
            </Button>
          );

        return (
          <span
            key={`${btn}-${index}`}
            className={`${baseStyle} flex items-center justify-center`}
          >
            ...
          </span>
        );
      })}

      {/* next */}
      <Button
        variant="ghost"
        className={`${baseStyle}`}
        onClick={() => handleCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRightIcon className="w-1" />
      </Button>
    </div>
  );
};

export default Pagination;
