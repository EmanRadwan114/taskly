import React from 'react';

interface IProps {
  isOptional: boolean;
  label: string;
  activeVariant: 'error' | 'default';
}

const Label: React.FC<IProps> = ({ isOptional, label, activeVariant }) => {
  return (
    <label
      className={`text-label-sm tracking-[0.55px] uppercase ${activeVariant === 'error' ? 'text-error' : 'text-slate-md'}`}
      htmlFor={label}
    >
      {label}
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
