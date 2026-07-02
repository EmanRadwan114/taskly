'use client';

import TaskBoardColumn from './TaskBoardColumn';
import { TaskStatusEnum } from '../../types/tasks.types';
import ProjectTasksHeader from '../ProjectTasksHeader';
import { useState } from 'react';
import { useHandleSearch } from '@/shared/hooks/shared.hooks';
import TaskDetailsModal from '../task-details/TaskDetailsModal';

interface Props {
  searchParams: { task_id: string };
}

const TasksBoard: React.FC<Props> = ({ searchParams }) => {
  const taskIdParam = searchParams.task_id;

  const statusList = Object.values(TaskStatusEnum);

  const { searchTerm, setSearchTerm, debouncedSearchTerm } = useHandleSearch({
    isSetPageParam: false,
  });

  return (
    <>
      <section className="flex flex-col gap-6">
        <ProjectTasksHeader
          searchTerm={searchTerm}
          onSetSearchTerm={setSearchTerm}
        />
        <div className="hidden lg:flex gap-6 w-full pb-3 h-full flex-1 overflow-x-auto scroll">
          {statusList.map((status) => (
            <TaskBoardColumn
              key={status}
              status={status}
              searchTerm={debouncedSearchTerm}
            />
          ))}
        </div>
      </section>
      {taskIdParam && <TaskDetailsModal />}
    </>
  );
};

export default TasksBoard;
