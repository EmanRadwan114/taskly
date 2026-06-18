'use client';

import React, { TextareaHTMLAttributes } from 'react';

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'error';
  inputClassName?: string;
}

const TextArea: React.FC<IProps> = ({
  variant = 'default',
  inputClassName,
  ...props
}) => {
  const textAreaVariants = {
    default:
      'bg-surface-high placeholder:text-secondary-light text-secondary focus-within:outline-primary focus-visible:outline-primary',
    error:
      'bg-error-background text-error-dark focus-within:outline-error-dark focus-visible:outline-error-dark',
  };
  return (
    <div
      className={`w-full flex justify-between items-center gap-0.5 rounded-sm focus-within:outline-1 focus-visible:outline-1 ${textAreaVariants[variant]} ${props.className}`}
    >
      <textarea
        rows={5}
        {...props}
        className={`w-full focus-within:outline-0 focus-visible:outline-0 bg-transparent [:-webkit-autofill]:[-webkit-text-fill-color:var(--color-secondary)] autofill:text-secondary autofill:transition-colors autofill:duration-[5000000s] ps-4 py-3.5 ${inputClassName}`}
      ></textarea>
    </div>
  );
};

export default TextArea;
