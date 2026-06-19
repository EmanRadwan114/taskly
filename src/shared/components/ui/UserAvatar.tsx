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
      className={`rounded-xl bg-primary size-6 lg:size-7 flex items-center justify-center lg:pt-1.5 lg:pb-1.75 text-white font-bold text-body-xs leading-3.75 uppercase ${className}`}
      style={style}
    >
      {content}
    </div>
  );
};

export default UserAvatar;
