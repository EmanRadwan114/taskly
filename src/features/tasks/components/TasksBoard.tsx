import TaskBoardColumn from './TaskBoardColumn';
import { TaskStatusEnum } from '../types/tasks.types';

interface IProps {
  searchParams: { page: string };
}

const TasksBoard: React.FC<IProps> = ({ searchParams }) => {
  const statusList = Object.values(TaskStatusEnum);

  return (
    <section className="hidden lg:flex gap-6 w-full overflow-x-auto modal-container pb-4">
      {statusList.map((status) => (
        <TaskBoardColumn
          key={status}
          status={status}
          searchParams={searchParams}
        />
      ))}
    </section>
  );
};

export default TasksBoard;
