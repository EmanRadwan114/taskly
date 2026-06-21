import CalenderIcon from '@/assets/icons/calender.svg';
import { ITask } from '../types/tasks.types';
import WarningIcon from '@/assets/icons/warning.svg';
import UserAvatar from '@/shared/components/ui/UserAvatar';
import { formateDateString } from '@/shared/utils/functions.client.utils';

interface IProps {
  task: ITask;
}

const BoardTaskCard: React.FC<IProps> = ({ task }) => {
  console.log(task?.due_date);

  const dueDate = new Date(task?.due_date);
  const today = new Date();

  const isDueToday = dueDate.getDate() === today.getDate();
  const isTaskDelayed = dueDate < today;

  const formattedDueDate = formateDateString(task?.due_date, 'en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      className={`p-4 border rounded-lg shadow-board flex flex-col gap-4 ${isDueToday && task?.due_date ? 'border-s-2 border-s-primary' : ''} ${isTaskDelayed && task?.due_date ? 'bg-error-background/20 border-error/10' : 'bg-white border-slate-light/10'}`}
    >
      <h2 className="text-slate-dark font-medium leading-4.75">
        {task?.title}
      </h2>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {isTaskDelayed && task?.due_date ? (
            <WarningIcon className="w-2.25 text-error" />
          ) : (
            <CalenderIcon
              className={`w-2.25 ${isDueToday ? 'text-primary' : 'text-secondary-light/80'}`}
            />
          )}
          <span
            className={`font-bold text-body-xs leading-3.75 ${isTaskDelayed ? 'text-error' : isDueToday ? 'text-primary' : 'text-secondary-light/80'}`}
          >
            {!task?.due_date
              ? '--'
              : isDueToday
                ? 'Today'
                : isTaskDelayed
                  ? 'Delayed'
                  : formattedDueDate}
          </span>
        </div>
        <UserAvatar
          className={`border border-white size-6! rounded-full! ms-auto ${isDueToday ? 'text-white! bg-primary-container!' : 'bg-surface-md! text-slate-dark!'}`}
          content="MT"
        />
      </div>
    </div>
  );
};

export default BoardTaskCard;
