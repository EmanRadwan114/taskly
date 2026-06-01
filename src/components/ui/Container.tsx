import React from 'react';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<IProps> = ({ children, className }) => {
  return (
    <div className={`w-full px-6 md:px-10 ${className && className}`}>
      {children}
    </div>
  );
};

export default Container;
