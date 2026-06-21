'use client';

'use client';

import { TaskStatusEnum } from '../types/tasks.types';
import { useParams } from 'next/navigation';
import BoardTaskCard from './BoardTaskCard';
import { useGetProjectTasksByStatusQuery } from '@/shared/libs/store/redux-toolkit-query/tasks-api';
import LinkButton from '@/shared/components/ui/LinkButton';
import PlusBorderIcon from '@/assets/icons/plus-border.svg';
import PlusIcon from '@/assets/icons/plus.svg';

interface IProps {
  status: TaskStatusEnum;
}
const TaskBoardColumn: React.FC<IProps> = ({ status }) => {
  const { projectId } = useParams();

  const { data, isFetching, isLoading, error } =
    useGetProjectTasksByStatusQuery({ status, projectId: projectId as string });

  const tasks = data?.response?.data || [];

  const statusColor: {
    [key: string]: {
      dotBackgroundColor: string;
      lengthClassName?: string;
    };
  } = {
    [TaskStatusEnum.TODO]: {
      dotBackgroundColor: 'bg-accent-dark',
      dotBackgroundColor: 'bg-accent-dark',
    },
    [TaskStatusEnum.IN_PROGRESS]: {
      dotBackgroundColor: 'bg-primary-container',
    },
    [TaskStatusEnum.BLOCKED]: {
      dotBackgroundColor: 'bg-error',
      lengthClassName: 'bg-error-background! text-error',
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
    <div className="flex flex-col gap-4 min-w-64">
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
        <LinkButton
          href={href}
          className="border border-slate-lighter/30 border-dashed w-full! gap-2! p-4!"
        >
          <PlusIcon className="text-2.75 text-secondary" />
        </LinkButton>
      </div>
      {/* add task link */}
      <LinkButton
        href={href}
        className="border border-slate-lighter/30 border-dashed p-4! w-full! gap-2!"
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
