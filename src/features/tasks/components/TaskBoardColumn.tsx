'use client';

import { TaskStatusEnum } from '../types/tasks.types';
import { useParams } from 'next/navigation';
import BoardTaskCard from './BoardTaskCard';
import LinkButton from '@/shared/components/ui/LinkButton';
import PlusBorderIcon from '@/assets/icons/plus-border.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import { useEffect } from 'react';
import LoadingBoardColumn from './LoadingBoardColumn';
import { toast } from 'react-toastify';
import { useFetchBoardColumn } from '../hooks/tasks.hooks';

interface IProps {
  status: TaskStatusEnum;
}
const TaskBoardColumn: React.FC<IProps> = ({ status }) => {
  const { projectId } = useParams();

  const { tasks, isLoading, error, observerTarget } = useFetchBoardColumn({
    projectId: projectId as string,
    status,
  });

  if (isLoading) return <LoadingBoardColumn />;
  if (error) toast.error('Failed to fetch tasks');

  const statusColor: {
    [key: string]: {
      dotBackgroundColor: string;
      lengthClassName?: string;
    };
  } = {
    [TaskStatusEnum.TODO]: {
      dotBackgroundColor: 'bg-accent-dark',
    },
    [TaskStatusEnum.IN_PROGRESS]: {
      dotBackgroundColor: 'bg-primary-container',
    },
    [TaskStatusEnum.BLOCKED]: {
      dotBackgroundColor: 'bg-error',
      lengthClassName: 'bg-error-background! text-error',
    },
    [TaskStatusEnum.IN_REVIEW]: {
      dotBackgroundColor: 'bg-slate-dark',
    },
    [TaskStatusEnum.READY_FOR_QA]: {
      dotBackgroundColor: 'bg-slate-md',
    },
    [TaskStatusEnum.REOPENED]: {
      dotBackgroundColor: 'bg-surface-dark',
    },
    [TaskStatusEnum.READY_FOR_PRODUCTION]: {
      dotBackgroundColor: 'bg-warning',
    },
    [TaskStatusEnum.DONE]: {
      dotBackgroundColor: 'bg-success-text',
    },
  };

  const displayedStatusTitle = status.replace(/_/g, ' ');

  const href = status
    ? `/project/${projectId}/tasks/new?status=${status}`
    : `/project/${projectId}/tasks/new`;

  return (
    <div className="flex flex-col gap-4 min-w-64" ref={observerTarget}>
      {/* status header */}
      <div className={`flex items-center justify-between gap-2`}>
        <div className="flex items-center gap-2">
          <div
            className={`size-2 rounded-full ${statusColor[status]?.dotBackgroundColor}`}
          ></div>
          <span className={`text-label-sm text-accent-dark`}>
            {displayedStatusTitle}
          </span>
          <div
            className={`text-body-xs font-bold leading-4.5 size-4.75 rounded-xs flex items-center justify-center py-0.5 px-1.5 bg-slate-lighter ${statusColor[status]?.lengthClassName}`}
          >
            <span>{tasks?.length}</span>
          </div>
        </div>
        <LinkButton href={href} variant="ghost" className="w-fit! p-0.5!">
          <PlusIcon className="w-2.75 text-secondary" />
        </LinkButton>
      </div>
      {/* add task link */}
      <LinkButton
        href={href}
        variant="ghost"
        className="border-2 border-slate-light/40 border-dashed p-4! w-full! gap-2! rounded-sm"
      >
        <PlusBorderIcon className="text-secondary/60 size-4.5" />
        <span className="uppercase text-secondary/60 font-bold text-body-sm letter-spacing-xl leading-4">
          Add New Task
        </span>
      </LinkButton>
      {/* cards */}
      {tasks.map((task) => (
        <BoardTaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskBoardColumn;
