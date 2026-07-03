'use client';

import CalenderIcon from '@/assets/icons/calender.svg';
import WarningIcon from '@/assets/icons/warning.svg';
import UserAvatar from '@/shared/components/ui/UserAvatar';
import {
  formateDateString,
  getDueDateStatus,
} from '@/shared/utils/functions.client.utils';
import { useHandleModalRoute } from '@/shared/hooks/shared.hooks';
import { ITask } from '../../types/tasks.types';
import { useDraggable } from '@dnd-kit/react';

interface IProps {
  task: ITask;
}

const BoardTaskCard: React.FC<IProps> = ({ task }) => {
  const { ref, isDragging } = useDraggable({
    id: task.id,
  });
  const { handleNavToModal } = useHandleModalRoute({
    queryKey: 'task_id',
    queryValue: task?.id,
  });

  const { isDelayed, isDueToday } = getDueDateStatus(task?.due_date);

  const formattedDueDate = formateDateString(task?.due_date, 'en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      ref={ref}
      className={`cursor-pointer p-4 border rounded-lg shadow-board flex flex-col gap-4 ${isDueToday && task?.due_date ? 'border-s-2 border-s-primary' : ''} ${isDelayed && task?.due_date ? 'bg-error-background/20 border-error/10' : 'bg-white border-slate-light/10'} ${isDragging ? 'opacity-40' : 'opacity-100'}`}
      onClick={handleNavToModal}
    >
      <h2 className="text-slate-dark font-medium leading-4.75">
        {task?.title}
      </h2>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {isDelayed && task?.due_date ? (
            <WarningIcon className="w-2.25 text-error" />
          ) : (
            <CalenderIcon
              className={`w-2.25 ${isDueToday ? 'text-primary' : 'text-secondary-light/80'}`}
            />
          )}
          <span
            className={`font-bold text-body-xs leading-3.75 ${isDelayed ? 'text-error' : isDueToday ? 'text-primary' : 'text-secondary-light/80'}`}
          >
            {!task?.due_date
              ? '--'
              : isDueToday
                ? 'Today'
                : isDelayed
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
