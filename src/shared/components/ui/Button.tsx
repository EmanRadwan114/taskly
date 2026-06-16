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
      'text-white rounded-sm primary-gradient shadow-primary font-semibold disabled:opacity-70',
    secondary:
      'text-primary [&>*]:text-primary font-semibold disabled:text-secondary-light disabled:[&>*]:text-secondary-light ',
    ghost: 'text-slate-md/60 font-medium disabled:opacity-70',
    tertiay:
      'bg-surface-low text-primary disabled:text-secondary-light rounded-sm font-semibold gap-2',
  };
  return (
    <button
      {...props}
      className={`px-6 py-2.5 text-body leading-5 flex items-center justify-center gap-0.5 capitalize w-full cursor-pointer disabled:cursor-not-allowed ${btnVariants[variant]} ${props.className}`}
    >
      {children}
    </button>
  );
};

export default Button;
