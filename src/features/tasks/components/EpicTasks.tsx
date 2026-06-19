import { ITask } from '../types/tasks.types';
import EmptyTasks from './EmptyTasks';
import EpicTaskItem from './EpicTaskItem';

interface Props {
  tasks: ITask[];
}

const EpicTasks: React.FC<Props> = ({ tasks }) => {
  return (
    <section className="lg:border lg:border-slate-light/30 lg:rounded-lg lg:divide-y lg:divide-slate-light/30 flex flex-col gap-3 lg:gap-0">
      {tasks?.map((task) => (
        <EpicTaskItem key={task.id} task={task} />
      ))}
    </section>
  );
};

export default EpicTasks;
