'use client';

import React, { useEffect } from 'react';
import ChevronLeftIcon from '@/assets/icons/chevron-left.svg';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import Button from '@/shared/components/ui/Button';

interface IProps {
  currentPage: number;
  totalPages: number;
  handleCurrentPage: (page: number) => void;
}
const TasksListPagination: React.FC<IProps> = ({
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

  return (
    <div className="flex items-center gap-2">
      {/* prev */}
      <Button
        variant="ghost"
        className={`text-secondary!`}
        onClick={() => handleCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon className="w-1" />
      </Button>

      {/*  pages */}
      <span className="text-secondary text-body-sm font-medium leading-4">
        Page {currentPage} of {totalPages}
      </span>

      {/* next */}
      <Button
        variant="ghost"
        className={`text-secondary!`}
        onClick={() => handleCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRightIcon className="w-1" />
      </Button>
    </div>
  );
};

export default TasksListPagination;
