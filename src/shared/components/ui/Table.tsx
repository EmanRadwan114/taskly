import { ReactNode, TableHTMLAttributes } from 'react';

interface Props extends TableHTMLAttributes<HTMLTableElement> {
  children: ReactNode;
}

const Table: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <table
      {...props}
      className={`w-full hidden md:table table-fixed border-collapse rounded-lg ${className}`}
    >
      {children}
    </table>
  );
};

export default Table;
