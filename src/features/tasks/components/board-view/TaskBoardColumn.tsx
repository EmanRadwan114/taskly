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
} from '../../hooks/tasks.hooks';
import { formateTaskStatus } from '@/shared/utils/functions.client.utils';
import { useEffect, useRef } from 'react';
import TasksScrollError from '../TasksScrollError';
import { useDroppable } from '@dnd-kit/react';

interface IProps {
  status: TaskStatusEnum;
  searchTerm: string;
}
const TaskBoardColumn: React.FC<IProps> = ({
  status,
  searchTerm: debouncedSearchTerm,
}) => {
  const { projectId } = useParams();
  const { ref, isDropTarget } = useDroppable({ id: status });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const paginationTarget = useRef<HTMLDivElement>(null);

  const {
    tasks,
    tasksMeta,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
    observerTarget: columnTarget,
  } = useFetchBoardColumn({
    projectId: projectId as string,
    status,
    limit: 6,
    searchTerm: debouncedSearchTerm,
  });

  // Infinite Scroll Observer Configuration
  useEffect(() => {
    const target = paginationTarget.current;
    if (!target || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isFetching && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0,
        rootMargin: '100px',
        root: scrollContainerRef.current,
      }
    );
    observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, [hasNextPage, isFetching, isFetchingNextPage, fetchNextPage]);

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
    <div className="min-w-64" ref={columnTarget}>
      <div className={`w-full flex flex-col gap-4`} ref={ref}>
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
        <div
          className={`${isDropTarget ? 'bg-slate-lighter/30' : ''} w-full flex flex-col gap-4 max-h-[45vh] overflow-y-auto scroll`}
          ref={scrollContainerRef}
        >
          {tasks.map((task, indx) => {
            if (indx === tasks.length - 1 && hasNextPage) {
              return (
                <div ref={paginationTarget} key={task.id}>
                  <BoardTaskCard task={task} />
                </div>
              );
            }
            return <BoardTaskCard key={task.id} task={task} />;
          })}
          {/* loadmore */}
          {hasNextPage && (
            <div className="mt-auto w-full flex items-center justify-center">
              {isFetchingNextPage ? 'Loading More...' : ''}
            </div>
          )}

          {/* error retry */}
          {error && <TasksScrollError status={status} />}
        </div>
      </div>
    </div>
  );
};

export default TaskBoardColumn;
