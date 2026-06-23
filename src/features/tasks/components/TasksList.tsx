'use client';

import Table from '@/shared/components/ui/Table';
import TableHead from '@/shared/components/ui/TableHead';
import TableRow from '@/shared/components/ui/TableRow';
import TasksListPagination from './TasksListPagination';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useGetProjectTasksQuery } from '@/shared/libs/store/redux-toolkit-query/tasks-api';
import { FETCH_LIMIT } from '@/shared/utils/variables.utils';
import TaskListItem from './TaskListItem';
import LoadingTasksList from './LoadingTasksList';
import { toast } from 'react-toastify';
import FloatingLink from '@/shared/components/ui/FloatingLink';

interface IProps {
  searchParams: { page: string };
}

const TasksList: React.FC<IProps> = ({ searchParams }) => {
  const { projectId } = useParams();
  const page = Number(searchParams.page);

  const [currentPage, setCurrentPage] = useState(page || 1);
  const limit = FETCH_LIMIT;
  const offset = (currentPage - 1) * limit;

  const {
    data: tasksData,
    isLoading,
    error,
    isFetching,
  } = useGetProjectTasksQuery(
    { projectId: projectId as string, limit, offset },
    { skip: !projectId }
  );

  if (isLoading || isFetching) return <LoadingTasksList />;
  if (error) toast.error('Failed to fetch tasks');

  const tasks = tasksData?.response?.data || [];
  const tasksMeta = tasksData?.response?.meta;

  const thStyle = `text-secondary py-4! px-6! font-bold text-label letter-spacing-md`;

  return (
    <div className="flex flex-col flex-1 w-full pb-6">
      <div className="overflow-x-auto w-full modal-container">
        {/* tasks list */}
        <Table className="min-w-250 shadow-none">
          <thead>
            <TableRow className="bg-surface-low/30 border-b border-slate-light/10">
              <TableHead className={`${thStyle} w-2/12`}>Task ID</TableHead>
              <TableHead className={`${thStyle} w-3/12`}>Title</TableHead>
              <TableHead className={`${thStyle} w-1/5`}>Status</TableHead>
              <TableHead className={`${thStyle} w-2/12`}>Due Dats</TableHead>
              <TableHead className={`${thStyle} w-3/12`}>Assignees</TableHead>
            </TableRow>
          </thead>
          <tbody>
            {tasks.map((task) => (
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
          <TasksListPagination
            currentPage={currentPage}
            totalPages={tasksMeta?.totalPages || 1}
            handleCurrentPage={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
      {/* add task link */}
      <FloatingLink href={`/project/${projectId}/tasks/new`} />
    </div>
  );
};

export default TasksList;
