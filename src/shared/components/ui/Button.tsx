import React, { ButtonHTMLAttributes } from 'react';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'tertiay';
  children: React.ReactNode;
}

const Button: React.FC<IProps> = ({
  children,
  variant = 'primary',
  ...props
}) => {
  const btnVariants = {
    primary:
      'text-white rounded-4px primary-gradient shadow-primary font-semibold',
    secondary: 'text-primary font-semibold',
    ghost: 'text-slate-md/60 font-medium',
    tertiay:
      'bg-surface-low text-secondary-light rounded-4px font-semibold gap-8px',
  };
  return (
    <button
      {...props}
      className={`px-24px py-10px text-body leading-5 flex items-center justify-center gap-2px capitalize w-full cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed ${btnVariants[variant]} ${props.className}`}
    >
      {children}
    </button>
  );
};

export default Button;
