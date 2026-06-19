import TaskBoardColumn from './TaskBoardColumn';
import { TaskStatusEnum } from '../types/tasks.types';

const TasksBoard: React.FC = ({}) => {
  const statusList = Object.values(TaskStatusEnum);

  return (
    <section className="flex gap-6 overflow-x-auto">
      {statusList.map((status) => (
        <TaskBoardColumn key={status} status={status} />
      ))}
    </section>
  );
};

export default TasksBoard;
