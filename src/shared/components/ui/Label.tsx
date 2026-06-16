import React, { LabelHTMLAttributes } from 'react';

interface IProps extends LabelHTMLAttributes<HTMLLabelElement> {
  isOptional?: boolean;
  activeVariant?: 'error' | 'default';
  children: React.ReactNode;
}

const Label: React.FC<IProps> = ({
  isOptional = false,
  children,
  activeVariant = 'default',
  className,
  ...props
}) => {
  return (
    <label
      className={`text-label-sm letter-spacing-md uppercase ${activeVariant === 'error' ? 'text-error' : 'text-slate-md'} ${className}`}
      {...props}
    >
      {children}
      {isOptional && (
        <span className="text-secondary-light tracking-normal">
          {' '}
          (optional)
        </span>
      )}
    </label>
  );
};

export default Label;
