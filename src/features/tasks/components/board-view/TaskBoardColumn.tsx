'use client';

import { TaskStatusEnum } from '../../types/tasks.types';
import { useParams } from 'next/navigation';
import BoardTaskCard from './BoardTaskCard';
import LinkButton from '@/shared/components/ui/LinkButton';
import PlusBorderIcon from '@/assets/icons/plus-border.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import LoadingBoardColumn from './LoadingBoardColumn';
import { toast } from 'react-toastify';
import {
  useFetchBoardColumn,
  useHandleBoardPagination,
} from '../../hooks/tasks.hooks';
import { formateTaskStatus } from '@/shared/utils/functions.client.utils';
import { useEffect, useState } from 'react';
import TasksScrollError from '../TasksScrollError';

interface IProps {
  status: TaskStatusEnum;
  searchTerm: string;
}
const TaskBoardColumn: React.FC<IProps> = ({
  status,
  searchTerm: debouncedSearchTerm,
}) => {
  const { projectId } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;
  const offset = (currentPage - 1) * limit;

  const {
    tasks,
    tasksMeta,
    isLoading,
    error,
    observerTarget: columnTarget,
    isFetching,
  } = useFetchBoardColumn({
    projectId: projectId as string,
    status,
    limit,
    offset,
    searchTerm: debouncedSearchTerm,
  });

  const {
    accumulatedTasks,
    observerTarget: paginationTarget,
    hasMore,
  } = useHandleBoardPagination({
    currentPage,
    setCurrentPage,
    tasks,
    isFetching,
    meta: tasksMeta,
  });

  // Reset to page 1 whenever the search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

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

  const displayedStatusTitle = formateTaskStatus(status);

  const href = status
    ? `/project/${projectId}/tasks/new?status=${status}`
    : `/project/${projectId}/tasks/new`;

  return (
    <div
      className="flex flex-col gap-4 min-w-64 max-h-full overflow-x-auto scroll"
      ref={columnTarget}
    >
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
            <span>{tasksMeta?.totalCount}</span>
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
      {accumulatedTasks.map((task) => (
        <BoardTaskCard key={task.id} task={task} />
      ))}

      {/* loadmore */}
      {hasMore && (
        <div
          ref={paginationTarget}
          className="mt-auto w-full flex items-center justify-center"
        >
          {isFetching ? 'Loading More...' : ''}
        </div>
      )}

      {/* error retry */}
      {error && <TasksScrollError status={status} />}
    </div>
  );
};

export default TaskBoardColumn;
