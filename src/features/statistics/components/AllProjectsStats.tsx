'use client';

import { useFetchTasksPerProject } from '../hooks/statistics.hooks';

const AllProjectsStats: React.FC = ({}) => {
  const { data, isPending, isError, error } = useFetchTasksPerProject({
    p_start_date: '2026-06-25',
    p_end_date: '2026-07-01',
  });

  const tasks = data?.response?.data;

  return (
    <section className="bg-white rounded-lg p-8 flex flex-col gap-10 shadow-primary">
      <h3 className="capitalize text-slate-dark font-bold text-heading-6 leading-7">
        All Projects
      </h3>
      <div className="flex flex-col gap-4">
        {tasks?.map((task) => (
          <div
            key={task?.project_id}
            className="flex justify-between items-center gap-2"
          >
            <span className="text-body-sm leading-4 font-bold text-slate-dark/30 capitalize">
              {task?.project_name}
            </span>
            <span className="text-slate-dark text-body-sm font-bold leading-4">
              {task?.tasks_count} Tasks
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllProjectsStats;
