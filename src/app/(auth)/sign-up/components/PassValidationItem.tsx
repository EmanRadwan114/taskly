import React from 'react';
import Check from '@/assets/icons/check.svg';
import Circle from '@/assets/icons/circle.svg';

interface IProps {
  isValid?: boolean;
  label: string;
}

const PassValidationItem: React.FC<IProps> = ({ isValid = false, label }) => {
  return (
    <div className="flex items-center gap-x-8px">
      {isValid ? <Check className="size-3" /> : <Circle className="size-3" />}
      <span className="text-label text-secondary">{label}</span>
    </div>
  );
};

export default PassValidationItem;
