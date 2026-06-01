import React, { InputHTMLAttributes } from 'react';
import EyeShow from '@/assets/icons/eye-show.svg';

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
    <div
      className={`w-full flex justify-between items-center gap-2px px-16px py-14px rounded-4px focus-within:outline-1 focus-visible:outline-1 ${inputVariants[variant]} ${props.className}`}
    >
      <input
        className={`w-full focus-within:outline-0 focus-visible:outline-0`}
        {...props}
      />
      <EyeShow />
    </div>
  );
};

export default Input;
