import React, { HTMLAttributes } from 'react';

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

const Button: React.FC<IProps> = ({
  children,
  variant = 'primary',
  ...props
}) => {
  const btnVariants = {
    primary:
      'text-white rounded-2px primary-gradient shadow-primary font-semibold',
    secondary: 'text-primary font-semibold',
    ghost: 'text-slate-md/60 font-medium',
  };
  return (
    <button
      className={`px-24px py-10px text-body leading-5 flex items-center justify-center gap-2px capitalize ${btnVariants[variant]} ${props.className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
