import React from 'react';
import ChevronLeftIcon from '@/assets/icons/chevron-left.svg';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import Button from './Button';

interface IProps {}

const Pagination: React.FC<IProps> = ({}) => {
  const baseStyle =
    'text-secondary! rounded-2px! size-32px! border border-slate-light p-0! font-bold! text-[12px]!';
  return (
    <div className="flex gap-8px">
      {/* prev */}
      <Button variant="ghost" className={`${baseStyle}`}>
        <ChevronLeftIcon className="w-4px" />
      </Button>
      {/* number list */}
      <Button
        variant="ghost"
        className={`${baseStyle} bg-primary! text-white!`}
      >
        1
      </Button>
      <Button variant="ghost" className={`${baseStyle}`}>
        2
      </Button>

      {/* next */}
      <Button variant="ghost" className={`${baseStyle}`}>
        <ChevronRightIcon className="w-4px" />
      </Button>
    </div>
  );
};

export default Pagination;
