'use client';

import Table from '@/shared/components/ui/Table';
import TableHead from '@/shared/components/ui/TableHead';
import TableRow from '@/shared/components/ui/TableRow';
import TasksListPagination from './TasksListPagination';
import { useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useGetProjectTasksQuery } from '@/shared/libs/store/redux-toolkit-query/tasks-api';
import { FETCH_LIMIT } from '@/shared/utils/variables.utils';
import TaskListItem from './TaskListItem';
import LoadingTasksList from './LoadingTasksList';
import { toast } from 'react-toastify';
import FloatingLink from '@/shared/components/ui/FloatingLink';
import TaskMobileCard from './TaskMobileCard';
import {
  useHandlePagination,
  useHandleSearch,
} from '@/shared/hooks/shared.hooks';
import { ITask } from '../types/tasks.types';
import ProjectTasksHeader from './ProjectTasksHeader';
import SearchStatus from '@/shared/components/ui/SearchStatus';
import emptyImg from '@/assets/imgs/empty-epics.png';
import errorImg from '@/assets/imgs/alert.png';
import EmptyProjectTasks from './EmptyProjectTasks';
import TasksScrollError from './TasksScrollError';
import TaskDetailsModal from './TaskDetailsModal';

interface IProps {
  searchParams: { page: string; task_id: string };
}

const TasksList: React.FC<IProps> = ({ searchParams }) => {
  const { projectId } = useParams();

  const page = Number(searchParams.page);
  const taskIdParam = searchParams.task_id;

  const [currentPage, setCurrentPage] = useState<number>(page || 1);

  const limit = FETCH_LIMIT;
  const offset = ((currentPage || 1) - 1) * limit;

  const { searchTerm, debouncedSearchTerm, setSearchTerm } = useHandleSearch({
    setCurrentPage,
  });

  const {
    data: tasksData,
    isLoading,
    error,
    isFetching,
  } = useGetProjectTasksQuery(
    {
      projectId: projectId as string,
      limit,
      offset,
      searchTerm: debouncedSearchTerm,
    },
    { skip: !projectId }
  );
  const tasks = tasksData?.response?.data || [];
  const tasksMeta = tasksData?.response?.meta;

  const {
    isMobile,
    hasMore,
    observerTarget,
    accumulatedList: accumulatedTasksList,
    handleCurrentPage,
  } = useHandlePagination<ITask>({
    incomingData: tasks,
    meta: tasksMeta,
    isFetching,
    setCurrentPage,
    currentPage,
  });

  if (tasks?.length === 0 && !isLoading && !debouncedSearchTerm) {
    return <EmptyProjectTasks />;
  }

  const thStyle = `text-secondary py-4! px-6! font-bold text-label letter-spacing-md`;

  const desktopView = (
    <div className="hidden lg:flex lg:flex-col lg:flex-1 w-full pb-6">
      {isLoading || (isFetching && !isMobile) ? (
        <LoadingTasksList />
      ) : debouncedSearchTerm && tasks?.length === 0 ? (
        // empty search status
        <SearchStatus
          text="No tasks found matching your search"
          imgSrc={emptyImg.src}
          variant="empty"
        />
      ) : debouncedSearchTerm && error ? (
        <SearchStatus
          text="Failed to fetch tasks"
          imgSrc={errorImg.src}
          variant="error"
        />
      ) : (
        <>
          <div className="overflow-x-auto w-full modal-container">
            {/* tasks list */}
            <Table className="min-w-250 shadow-none">
              <thead>
                <TableRow className="bg-surface-low/30 border-b border-slate-light/10">
                  <TableHead className={`${thStyle} w-2/12`}>Task ID</TableHead>
                  <TableHead className={`${thStyle} w-3/12`}>Title</TableHead>
                  <TableHead className={`${thStyle} w-1/5`}>Status</TableHead>
                  <TableHead className={`${thStyle} w-2/12`}>
                    Due Dats
                  </TableHead>
                  <TableHead className={`${thStyle} w-3/12`}>
                    Assignees
                  </TableHead>
                </TableRow>
              </thead>
              <tbody>
                {tasks?.map((task) => (
                  <TaskListItem task={task} key={task?.id} />
                ))}
              </tbody>
            </Table>
          </div>
          {/* pagination */}
          <div className="bg-surface-low/20! py-3! px-6!">
            <div className="flex justify-between items-center">
              <span className="text-secondary text-body-sm font-medium">
                Showing {tasks?.length} of {tasksMeta?.totalCount} tasks
              </span>
              {tasksMeta?.totalPages && tasksMeta?.totalPages > 1 && (
                <TasksListPagination
                  currentPage={currentPage}
                  totalPages={tasksMeta?.totalPages || 1}
                  handleCurrentPage={handleCurrentPage}
                />
              )}
            </div>
          </div>
        </>
      )}
      {/* add task link */}
      <FloatingLink href={`/project/${projectId}/tasks/new`} />
    </div>
  );

  const mobileView = (
    <div className="lg:hidden flex flex-col gap-3 min-h-screen">
      {accumulatedTasksList?.map((task) => (
        <TaskMobileCard task={task} key={task?.id} />
      ))}

      {/* loadmore on mobile */}
      {hasMore && (
        <div
          ref={observerTarget}
          className="mt-auto lg:hidden w-full flex items-center justify-center"
        >
          {isFetching ? 'Loading More...' : ''}
        </div>
      )}

      {/* error retry */}
      {error && <TasksScrollError />}
    </div>
  );

  return (
    <>
      <section className="flex flex-col gap-6">
        <ProjectTasksHeader
          searchTerm={searchTerm}
          onSetSearchTerm={setSearchTerm}
        />
        {isMobile ? mobileView : desktopView}
      </section>
      {taskIdParam && <TaskDetailsModal />}
    </>
  );
};

export default TasksList;
