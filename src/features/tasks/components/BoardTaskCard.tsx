import CalenderIcon from '@/assets/icons/calender.svg';
import { ReactNode } from 'react';
import { ITask } from '../types/tasks.types';
import WarningIcon from '@/assets/icons/warning.svg';
import UserAvatar from '@/shared/components/ui/UserAvatar';

interface IProps {
  task: ITask;
}

const BoardTaskCard: React.FC<IProps> = ({ task }) => {
  const isDueToday = new Date(task?.due_date) === new Date();

  const isTaskDelayed = new Date(task?.due_date) < new Date();

  return (
    <div
      className={`p-4 border rounded-lg shadow-board flex flex-col gap-4 ${isDueToday ? 'border-s-2 border-s-primary' : ''} ${isTaskDelayed ? 'bg-error-background/20 border-error/10' : 'bg-white border-slate-light/10'}`}
    >
      <h2 className="text-slate-dark font-medium leading-4.75">title</h2>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {isTaskDelayed ? (
            <WarningIcon className="w-2.25 text-error" />
          ) : (
            <CalenderIcon className="w-2.25 text-secondary-light/80" />
          )}
          <span
            className={`font-bold text-body-xs leading-3.75 ${isTaskDelayed ? 'text-error' : isDueToday ? 'text-primary' : 'text-secondary-light/80'}`}
          >
            {isDueToday ? 'Today' : isTaskDelayed ? 'Delayed' : task?.due_date}
          </span>
        </div>
        <UserAvatar
          className={`border border-white size-6! pt-0.75 pb-1 rounded-lg! ${isDueToday ? 'text-white! bg-primary-container!' : 'bg-surface-md! text-slate-dark'}`}
          content="MT"
        />
      </div>
    </div>
  );
};

export default BoardTaskCard;
