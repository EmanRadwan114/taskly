'use client';

import React, { InputHTMLAttributes, ReactNode, useState } from 'react';
import EyeShow from '@/assets/icons/eye-show.svg';
import EyeHide from '@/assets/icons/eye-hide.svg';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'error';
  icon?: ReactNode;
  showPassIcon?: boolean;
  inputClassName?: string;
  iconClassName?: string;
}

const Input: React.FC<IProps> = ({
  variant = 'default',
  icon,
  showPassIcon = false,
  inputClassName = '',
  iconClassName = '',
  ...props
}) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const inputVariants = {
    default:
      'bg-surface-high placeholder:text-secondary-light text-secondary focus-within:outline-primary focus-visible:outline-primary',
    error:
      'bg-error-background text-error-dark focus-within:outline-error-dark focus-visible:outline-error-dark',
  };
  return (
    <div
      className={`w-full flex justify-between items-center gap-0.5 rounded-sm focus-within:outline-1 focus-visible:outline-1 ${inputVariants[variant]} ${props.className}`}
    >
      <input
        {...props}
        className={`${icon ? 'w-3/4' : 'w-full! pe-4'} focus-within:outline-0 focus-visible:outline-0 bg-transparent [:-webkit-autofill]:[-webkit-text-fill-color:var(--color-secondary)] autofill:text-secondary autofill:transition-colors autofill:duration-[5000000s] ps-4 py-3.5 disabled:opacity-60 disabled:cursor-default ${inputClassName}`}
        type={
          props.type === 'password'
            ? isPasswordShown
              ? 'text'
              : 'password'
            : props.type
        }
      />

      {/* password show & hide icon */}
      {props.type === 'password' && showPassIcon && (
        <div
          className="w-1/4 cursor-pointer flex items-center justify-end px-4 py-3.5"
          onClick={() => setIsPasswordShown((s) => !s)}
          title={`${isPasswordShown ? 'Hide Password' : 'Show Password'}`}
        >
          {isPasswordShown ? (
            <EyeHide className="h-full w-5 text-secondary-light" />
          ) : (
            <EyeShow className="h-full w-5.5 text-secondary-light" />
          )}
        </div>
      )}
      {/* icon */}
      {icon && <div className={`px-4 py-3.5 ${iconClassName}`}>{icon}</div>}
    </div>
  );
};

export default Input;
