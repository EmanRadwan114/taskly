import { HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
}

const TableRow: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <tr {...props} className={`bg-surface-md/30 text-left ${className}`}>
      {children}
    </tr>
  );
};

export default TableRow;
