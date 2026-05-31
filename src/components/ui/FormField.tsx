import React, { InputHTMLAttributes } from 'react';
import Input from './Input';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  variant?: 'default' | 'error';
  fieldMsg?: string;
}

const FormField: React.FC<IProps> = ({
  label,
  variant = 'default',
  fieldMsg,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-6px">
      <label
        className={`text-label-sm tracking-[0.55px] uppercase ${variant === 'error' ? 'text-error' : 'text-slate-md'}`}
        htmlFor={label}
      >
        {label}
      </label>
      <Input id={label} variant={variant} {...props} />
      <p className={variant === 'error' ? 'text-error' : 'text-slate-light'}>
        {fieldMsg}
      </p>
    </div>
  );
};

export default FormField;
