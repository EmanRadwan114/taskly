'use client';

import Table from '@/shared/components/ui/Table';
import TableHead from '@/shared/components/ui/TableHead';
import TableRow from '@/shared/components/ui/TableRow';
import TasksListPagination from './TasksListPagination';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { FETCH_LIMIT } from '@/shared/utils/variables.utils';
import TaskListItem from './TaskListItem';
import LoadingTasksList from './LoadingTasksList';
import FloatingLink from '@/shared/components/ui/FloatingLink';
import TaskMobileCard from './TaskMobileCard';
import {
  useHandlePagination,
  useHandleSearch,
  useInfiniteScroll,
  useMobile,
} from '@/shared/hooks/shared.hooks';
import ProjectTasksHeader from '../ProjectTasksHeader';
import SearchStatus from '@/shared/components/ui/SearchStatus';
import emptyImg from '@/assets/imgs/empty-epics.png';
import errorImg from '@/assets/imgs/alert.png';
import EmptyProjectTasks from './EmptyProjectTasks';
import TasksScrollError from '../TasksScrollError';
import TaskDetailsModal from '../task-details/TaskDetailsModal';
import {
  useFetchMobileTasksList,
  useFetchTasksList,
} from '../../hooks/tasks.hooks';

interface IProps {
  searchParams: { page: string; task_id: string };
}

const TasksList: React.FC<IProps> = ({ searchParams }) => {
  const { projectId } = useParams();
  const { isMobile } = useMobile(1024);

  const page = Number(searchParams.page);
  const taskIdParam = searchParams.task_id;

  const [currentPage, setCurrentPage] = useState<number>(page || 1);

  const limit = FETCH_LIMIT;
  const offset = (currentPage - 1) * limit;

  const { searchTerm, debouncedSearchTerm, setSearchTerm } = useHandleSearch({
    setCurrentPage,
  });

  // desktop: regular paginated query
  const {
    data: tasksData,
    isLoading: isDesktopLoading,
    isFetching: isDesktopFetching,
    error: desktopError,
  } = useFetchTasksList({
    projectId: projectId as string,
    limit,
    offset,
    searchTerm: debouncedSearchTerm,
    enabled: !isMobile,
  });

  const desktopTasksList = tasksData?.response?.data || [];
  const tasksMeta = tasksData?.response?.meta;

  // mobile: infinite scroll query
  const {
    data: mobileTasksData,
    isLoading: isMobileLoading,
    isFetching: isMobileFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error: mobileError,
  } = useFetchMobileTasksList({
    projectId: projectId as string,
    limit,
    searchTerm: debouncedSearchTerm,
    enabled: isMobile,
  });

  const mobileTasksList =
    mobileTasksData?.pages.flatMap((page) => page?.response?.data || []) || [];

  // desktop page-click handler
  const { handleCurrentPage } = useHandlePagination({ setCurrentPage });

  // mobile sentinel observer
  const { observerTarget } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const activeTasksList = isMobile ? mobileTasksList : desktopTasksList;
  const activeError = isMobile ? mobileError : desktopError;
  const showLoadingScreen = isMobile
    ? isMobileLoading && mobileTasksList.length === 0
    : isDesktopFetching || (isDesktopLoading && currentPage === 1);

  if (activeError && !debouncedSearchTerm) throw new Error('Failed to fetch tasks');

  if (activeTasksList.length === 0 && !showLoadingScreen && !debouncedSearchTerm) {
    return <EmptyProjectTasks />;
  }

  const thStyle = `text-secondary py-4! px-6! font-bold text-label letter-spacing-md`;

  const desktopView = (
    <div className="hidden lg:flex lg:flex-col lg:flex-1 w-full pb-6">
      {showLoadingScreen ? (
        <LoadingTasksList />
      ) : debouncedSearchTerm && desktopTasksList.length === 0 ? (
        <SearchStatus
          text="No tasks found matching your search"
          imgSrc={emptyImg.src}
          variant="empty"
        />
      ) : debouncedSearchTerm && desktopError ? (
        <SearchStatus
          text="Failed to fetch tasks"
          imgSrc={errorImg.src}
          variant="error"
        />
      ) : (
        <>
          <div className="overflow-x-auto w-full scroll">
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
                {desktopTasksList.map((task) => (
                  <TaskListItem task={task} key={task?.id} />
                ))}
              </tbody>
            </Table>
          </div>
          {/* desktop pagination */}
          <div className="bg-surface-low/20! py-3! px-6!">
            <div className="flex justify-between items-center">
              <span className="text-secondary text-body-sm font-medium">
                Showing {desktopTasksList.length} of {tasksMeta?.totalCount} tasks
              </span>
              {tasksMeta?.totalPages && tasksMeta.totalPages > 1 && (
                <TasksListPagination
                  currentPage={currentPage}
                  totalPages={tasksMeta.totalPages}
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
      {showLoadingScreen ? (
        <LoadingTasksList />
      ) : debouncedSearchTerm && mobileTasksList.length === 0 ? (
        <SearchStatus
          text="No tasks found matching your search"
          imgSrc={emptyImg.src}
          variant="empty"
        />
      ) : (
        <>
          {mobileTasksList.map((task) => (
            <TaskMobileCard task={task} key={task?.id} />
          ))}

          {/* loadmore sentinel — always rendered so the observer can attach */}
          <div
            ref={observerTarget}
            className="mt-auto w-full flex items-center justify-center py-4"
          >
            {isMobileFetching && 'Loading More...'}
          </div>

          {/* error retry */}
          {mobileError && <TasksScrollError />}
        </>
      )}
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
