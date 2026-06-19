import { HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

const TableCol: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <td {...props} className={`px-9 py-5 ${className}`}>
      {children}
    </td>
  );
};

export default TableCol;
