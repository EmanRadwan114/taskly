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

const Pagination: React.FC<IProps> = ({currentPage, totalPages, handleCurrentPage}) => {

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [currentPage]);

  const isActiveStyle = (pageNum: number) =>
    pageNum === currentPage ? 'bg-primary! text-white!' : '';

  const baseStyle =
    'text-secondary! rounded-2px! size-32px! border border-slate-light p-0! font-bold! text-[12px]!';

  return (
    <div className="flex gap-8px">
      {/* prev */}
      <Button
        variant="ghost"
        className={`${baseStyle}`}
        onClick={() => handleCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon className="w-4px" />
      </Button>
      {/* number list */}
      {Array.from({ length: totalPages! || 2 }).map((_, index) => (
        <Button
          key={index}
          variant="ghost"
          className={`${baseStyle} ${isActiveStyle(index + 1)}`}
          onClick={() =>  handleCurrentPage(index + 1)}
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
        <ChevronRightIcon className="w-4px" />
      </Button>
    </div>
  );
};

export default Pagination;
