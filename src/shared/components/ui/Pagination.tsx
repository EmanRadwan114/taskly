'use client';

import React, { useEffect } from 'react';
import ChevronLeftIcon from '@/assets/icons/chevron-left.svg';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import Button from './Button';

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
      {/* number list */}
      {Array.from({ length: totalPages! || 2 }).map((_, index) => (
        <Button
          key={index}
          variant="ghost"
          className={`${baseStyle} ${isActiveStyle(index + 1)}`}
          onClick={() => handleCurrentPage(index + 1)}
        >
          {index + 1}
        </Button>
      ))}

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
