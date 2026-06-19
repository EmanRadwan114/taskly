'use client';

import { useParams } from 'next/navigation';
import PlusIcon from '@/assets/icons/plus.svg';
import LinkButton from '@/shared/components/ui/LinkButton';

interface IProps {
  title: string;
  className?: string;
  dotBackgroundColor: string;
  length?: number;
  lengthClassName?: string;
  textColor?: string;
}

const StatusTitle: React.FC<IProps> = ({
  title,
  className,
  dotBackgroundColor,
  length = 0,
  lengthClassName,
  textColor,
}) => {
  const { projectId } = useParams();

  return (
    <div className={`flex items-center justify-between gap-2 ${className}`}>
      <div className="flex items-center gap-2">
        <div className={`size-2 rounded-full ${dotBackgroundColor}`}></div>
        <span className={`text-label-sm text-accent-dark ${textColor}`}>
          {title}
        </span>
        <div
          className={`text-body-xs font-bold leading-4.5 size-4.75 rounded-xs flex items-center justify-center py-0.5 px-1.5 bg-slate-lighter ${lengthClassName}`}
        >
          <span>{length}</span>
        </div>
      </div>
      <LinkButton
        href={`/project/${projectId}/tasks/new`}
        variant="ghost"
        btnClassName="border border-slate-lighter/30 border-dashed"
        className="gap-2! p-4!"
      >
        <PlusIcon className="w-2.75 text-secondary" />
      </LinkButton>
    </div>
  );
};

export default StatusTitle;
