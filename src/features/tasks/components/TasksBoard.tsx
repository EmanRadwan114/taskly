import TaskBoardColumn from './TaskBoardColumn';
import { TaskStatusEnum } from '../types/tasks.types';
import TaskDetailsModal from './TaskDetailsModal';

interface Props {
  searchParams: { task_id: string };
}

const TasksBoard: React.FC<Props> = ({ searchParams }) => {
  const taskIdParam = searchParams.task_id;

  const statusList = Object.values(TaskStatusEnum);

  return (
    <>
      <section className="hidden lg:flex gap-6 w-full overflow-x-auto modal-container pb-4">
        {statusList.map((status) => (
          <TaskBoardColumn key={status} status={status} />
        ))}
      </section>
      {taskIdParam && <TaskDetailsModal />}
    </>
  );
};

export default TasksBoard;
