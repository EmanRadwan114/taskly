'use client';

import React, { ReactNode, SelectHTMLAttributes } from 'react';

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  variant?: 'default' | 'error';
  children: ReactNode;
}

const Select: React.FC<IProps> = ({
  variant = 'default',
  children,
  ...props
}) => {
  const selectVariants = {
    default:
      'bg-surface-high placeholder:text-secondary-light text-secondary focus-within:outline-primary focus-visible:outline-primary',
    error:
      'bg-error-background text-error-dark focus-within:outline-error-dark focus-visible:outline-error-dark',
  };
  return (
    <div
      className={`w-full flex justify-between items-center gap-2px rounded-4px focus-within:outline-1 focus-visible:outline-1 ${selectVariants[variant]} ${props.className}`}
    >
      <select
        {...props}
        className={`w-full focus-within:outline-0 focus-visible:outline-0 bg-transparent [:-webkit-autofill]:[-webkit-text-fill-color:var(--color-secondary)] autofill:text-secondary autofill:transition-colors autofill:duration-[5000000s] px-16px py-14px!`}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
