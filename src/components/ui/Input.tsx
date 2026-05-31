import React, { InputHTMLAttributes } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'error';
}

const Input: React.FC<IProps> = ({ variant = 'default', ...props }) => {
  const inputVariants = {
    default:
      'bg-surface-high placeholder:text-accent text-secondary focus-within:outline-primary focus-visible:outline-primary',
    error:
      'bg-error-background text-error-dark focus-within:outline-error-dark focus-visible:outline-error-dark',
  };
  return (
    <input
      className={`w-full px-16px py-14px rounded-4px focus-within:outline-1 focus-visible:outline-1 ${inputVariants[variant]} ${props.className}`}
      {...props}
    />
  );
};

export default Input;
