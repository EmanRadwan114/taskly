'use client';

import TaskBoardColumn from './TaskBoardColumn';
import { TaskStatusEnum } from '../types/tasks.types';
import ProjectTasksHeader from './ProjectTasksHeader';
import { useState } from 'react';
import { useHandleSearch } from '@/shared/hooks/shared.hooks';

const TasksBoard: React.FC = () => {
  const statusList = Object.values(TaskStatusEnum);
  const [currentPage, setCurrentPage] = useState(1);

  const { searchTerm, setSearchTerm, debouncedSearchTerm } = useHandleSearch({
    setCurrentPage,
    isSetPageParam: false,
  });

  return (
    <section className="flex flex-col gap-6">
      <ProjectTasksHeader
        searchTerm={searchTerm}
        onSetSearchTerm={setSearchTerm}
      />
      <div className="hidden lg:flex gap-6 w-full overflow-x-auto modal-container pb-4">
        {statusList.map((status) => (
          <TaskBoardColumn
            key={status}
            status={status}
            searchTerm={debouncedSearchTerm}
          />
        ))}
      </div>
    </section>
  );
};

export default TasksBoard;
