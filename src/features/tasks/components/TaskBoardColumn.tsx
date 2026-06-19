'use client';

import { TaskStatusEnum } from '../types/tasks.types';
import BoardAddTaskBtn from './BoardAddTaskBtn';
import StatusTitle from './StatusTitle';
import { useParams } from 'next/navigation';
import BoardTaskCard from './BoardTaskCard';
import { useGetProjectTasksByStatusQuery } from '@/shared/libs/store/redux-toolkit-query/tasks-api';

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

  return (
    <div className="flex flex-col gap-4 min-w-64">
      <StatusTitle
        dotBackgroundColor={statusColor[status]?.dotBackgroundColor}
        title={displayedStatusTitle}
        lengthClassName={statusColor[status]?.lengthClassName}
        length={tasks?.length}
        status={status}
      />
      <BoardAddTaskBtn status={status} />
      {tasks.map((task) => (
        <BoardTaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskBoardColumn;
