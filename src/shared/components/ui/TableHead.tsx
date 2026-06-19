import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}
const TableHead: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <th
      {...props}
      className={`uppercase text-label-sm text-secondary px-12 py-5 font-semibold ${className}`}
    >
      {children}
    </th>
  );
};

export default TableHead;
