import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  className?: string;
}

const Badge: React.FC<IProps> = ({ children, className }) => {
  return (
    <div
      className={`px-2 py-0.5 rounded-sm uppercase w-fit font-bold text-body-xs leading-3.75 ${className}`}
    >
      <span>{children}</span>
    </div>
  );
};

export default Badge;
