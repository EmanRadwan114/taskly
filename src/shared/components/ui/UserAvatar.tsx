import { ReactNode } from 'react';
import { CSSProperties } from 'react';

interface IProps {
  content: string | ReactNode;
  className?: string;
  style?: CSSProperties;
}
const UserAvatar: React.FC<IProps> = ({ content, className, style }) => {
  return (
    <div
      className={`rounded-full bg-primary size-6 lg:size-7 flex items-center justify-center text-white font-bold text-body-xs uppercase ${className}`}
      style={style}
    >
      {content}
    </div>
  );
};

export default UserAvatar;
