import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  className?: string;
}

const Badge: React.FC<IProps> = ({ children, className }) => {
  return (
    <div
      className={`px-8px py-2px rounded-2px uppercase w-fit font-bold text-[10px] leading-3.75 ${className}`}
    >
      <span>{children}</span>
    </div>
  );
};

export default Badge;
