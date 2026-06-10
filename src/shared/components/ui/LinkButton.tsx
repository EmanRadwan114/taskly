import React from 'react';
import Button from './Button';
import Link from 'next/link';

interface IProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  btnClassName?: string;
}

const LinkButton: React.FC<IProps> = ({
  children,
  href,
  className,
  btnClassName,
}) => {
  return (
    <Button className={`w-fit! p-0! font-medium! flex ${btnClassName}`}>
      <Link
        href={href}
        className={`w-full h-full px-6! py-3! flex gap-1.75 items-center justify-center ${className}`}
      >
        {children}
      </Link>
    </Button>
  );
};

export default LinkButton;
