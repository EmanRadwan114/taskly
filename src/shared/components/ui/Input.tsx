'use client';

import React, { InputHTMLAttributes, ReactNode, useState } from 'react';
import EyeShow from '@/assets/icons/eye-show.svg';
import EyeHide from '@/assets/icons/eye-hide.svg';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'error';
  icon?: ReactNode;
}

const Input: React.FC<IProps> = ({ variant = 'default', icon, ...props }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const inputVariants = {
    default:
      'bg-surface-high placeholder:text-accent text-secondary focus-within:outline-primary focus-visible:outline-primary',
    error:
      'bg-error-background text-error-dark focus-within:outline-error-dark focus-visible:outline-error-dark',
  };
  return (
    <div
      className={`w-full flex justify-between items-center gap-2px rounded-4px focus-within:outline-1 focus-visible:outline-1 ${inputVariants[variant]} ${props.className}`}
    >
      <input
        {...props}
        className={`w-3/4 focus-within:outline-0 focus-visible:outline-0 ps-16px py-14px`}
        type={
          props.type === 'password'
            ? isPasswordShown
              ? 'text'
              : 'password'
            : props.type
        }
      />

      {/* password show & hide icon */}
      {props.type === 'password' && (
        <div
          className="w-1/4 cursor-pointer flex items-center justify-end px-16px py-14px"
          onClick={() => setIsPasswordShown((s) => !s)}
          title={`${isPasswordShown ? 'Hide Password' : 'Show Password'}`}
        >
          {isPasswordShown ? (
            <EyeShow className="h-full w-5.5 text-secondary-light" />
          ) : (
            <EyeHide className="h-full w-5 text-secondary-light" />
          )}
        </div>
      )}
      {/* icon */}
      {icon && <div className="px-16px py-14px">{icon}</div>}
    </div>
  );
};

export default Input;
