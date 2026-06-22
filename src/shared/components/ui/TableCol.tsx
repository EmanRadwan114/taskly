import { ReactNode, TdHTMLAttributes } from 'react';

interface Props extends TdHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

const TableCol: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <td className={`px-9 py-5 ${className}`} {...props}>
      {children}
    </td>
  );
};

export default TableCol;
