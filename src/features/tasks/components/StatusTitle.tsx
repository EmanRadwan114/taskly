'use client';

import { useParams, useRouter } from 'next/navigation';
import PlusIcon from '@/assets/icons/plus.svg';
import { useAppDispatch } from '@/shared/libs/store/store';
import Button from '@/shared/components/ui/Button';
import { setSelectedStatus } from '@/shared/libs/store/slices/tasks.slice';
import { TaskStatusEnum } from '../types/tasks.types';

interface IProps {
  title: string;
  className?: string;
  dotBackgroundColor: string;
  length?: number;
  lengthClassName?: string;
  textColor?: string;
  status: TaskStatusEnum;
}

const StatusTitle: React.FC<IProps> = ({
  title,
  className,
  dotBackgroundColor,
  length = 0,
  lengthClassName,
  textColor,
  status,
}) => {
  const { projectId } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

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
      <Button
        variant="ghost"
        className="gap-2! p-0! border border-slate-lighter/30 border-dashed text-end! w-fit!"
        onClick={() => {
          dispatch(setSelectedStatus(status));
          router.push(`/project/${projectId}/tasks/new`);
        }}
      >
        <PlusIcon className="w-2.75 text-secondary" />
      </Button>
    </div>
  );
};

export default StatusTitle;
