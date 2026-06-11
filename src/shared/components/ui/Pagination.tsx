'use client';

import React from 'react';
import ChevronLeftIcon from '@/assets/icons/chevron-left.svg';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import Button from './Button';
import { useAppDispatch, useAppSelector } from '@/shared/libs/store/store';
import { setCurrentPage } from '@/shared/libs/store/slices/project.slice';

const Pagination: React.FC = () => {
  const { currentPage, totalPages } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();

  // handlers
  const handlePagination = (pageNum: number) => {
    dispatch(setCurrentPage(pageNum));
  };

  const baseStyle =
    'text-secondary! rounded-2px! size-32px! border border-slate-light p-0! font-bold! text-[12px]!';

  const isActiveStyle = (pageNum: number) =>
    pageNum === currentPage ? 'bg-primary! text-white!' : '';

  return (
    <div className="flex gap-8px">
      {/* prev */}
      <Button
        variant="ghost"
        className={`${baseStyle}`}
        onClick={() => handlePagination(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon className="w-4px" />
      </Button>
      {/* number list */}
      {Array.from({ length: totalPages! }).map((_, index) => (
        <Button
          key={index}
          variant="ghost"
          className={`${baseStyle} ${isActiveStyle(index + 1)}`}
          onClick={() => handlePagination(index + 1)}
        >
          {index + 1}
        </Button>
      ))}

      {/* next */}
      <Button
        variant="ghost"
        className={`${baseStyle}`}
        onClick={() => handlePagination(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRightIcon className="w-4px" />
      </Button>
    </div>
  );
};

export default Pagination;
