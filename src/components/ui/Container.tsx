import React from 'react';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<IProps> = ({ children, className }) => {
  return <div className={`px-6 md:px-10 ${className}`}>{children}</div>;
};

export default Container;
