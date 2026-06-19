import { HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLTableElement> {
  children: ReactNode;
}

const Table: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <table
      {...props}
      className={`w-full hidden md:table table-fixed border-collapse rounded-lg overflow-hidden lg:max-w-5/6 xl:max-w-3/4 lg:mx-auto ${className}`}
    >
      {children}
    </table>
  );
};

export default Table;
