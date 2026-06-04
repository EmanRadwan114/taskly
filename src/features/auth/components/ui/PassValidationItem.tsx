import React from 'react';
import Check from '@/assets/icons/check.svg';
import Circle from '@/assets/icons/circle.svg';

interface IProps {
  isValid?: boolean;
  label: string;
  validIcon?: React.ReactNode;
  invalidIcon?: React.ReactNode;
  containerClassName?: string;
  textClassNames?: string;
}

const PassValidationItem: React.FC<IProps> = ({
  isValid = false,
  label,
  validIcon = <Check className="size-3" />,
  invalidIcon = <Circle className="size-3 text-secondary-light" />,
  containerClassName,
  textClassNames,
}) => {
  return (
    <li
      className={`flex items-center gap-x-8px list-none ${containerClassName}`}
    >
      {isValid ? validIcon : invalidIcon}
      <span className={`text-label text-secondary ${textClassNames}`}>
        {label}
      </span>
    </li>
  );
};

export default PassValidationItem;
