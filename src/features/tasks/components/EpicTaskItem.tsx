import UserAvatar from '@/shared/components/ui/UserAvatar';
import DotsIcon from '@/assets/icons/dots.svg';
import Button from '@/shared/components/ui/Button';
import CalenderIcon from '@/assets/icons/calender.svg';
import UnassignedIcon from '@/assets/icons/unassigned.svg';
import { ITask } from '../types/tasks.types';
import AlertIcon from '@/assets/icons/alert.svg';
import {
  formateDateString,
  getDueDateStatus,
  getNameInitials,
} from '@/shared/utils/functions.client.utils';

interface Props {
  task: ITask;
}

const EpicTaskItem: React.FC<Props> = ({ task }) => {
  const { isDelayed, isDueToday } = getDueDateStatus(task?.due_date);
  const assigneeInitials = getNameInitials(task?.assignee?.name);
  const formatedDueDate = formateDateString(task?.due_date);

  const desktopView = (
    <div className="hidden lg:flex p-4 justify-between items-center gap-4">
      <div className="flex gap-4 items-center">
        <div className="flex flex-col gap-1">
          <h3 className=" font-medium text-slate-dark text-body-lg leading-6">
            {task?.title}
          </h3>
          <div className="flex items-center gap-1">
            <UserAvatar
              className="size-6! bg-surface-dark text-label-xs text-secondary-light!"
              content={
                task?.assignee?.name ? (
                  assigneeInitials
                ) : (
                  <UnassignedIcon className="w-3" />
                )
              }
            />
            <span className="text-slate-dark/60 text-body-sm leading-4">
              {task?.assignee?.name || 'Unassigned'}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-px">
        <span className="uppercase font-bold text-body-xs leading-3.75 text-slate-dark/40">
          Due date
        </span>
        <span
          className={`${isDelayed ? 'text-error' : isDueToday ? 'text-primary' : 'text-slate-dark/70'} font-medium text-body-sm leading-4 uppercase flex items-center gap-1`}
        >
          {isDelayed ? (
            <AlertIcon className="w-3 text-error" />
          ) : isDueToday ? (
            <CalenderIcon className="w-2.5 text-primary" />
          ) : null}
          {!task?.due_date
            ? '--'
            : isDueToday
              ? 'Today'
              : isDelayed
                ? 'Overdue'
                : formatedDueDate}
        </span>
      </div>
    </div>
  );

  const mobileView = (
    <div className="border border-slate-lighter shadow-primary p-4 rounded-lg flex lg:hidden flex-col gap-2">
      <div className="flex justify-between items-start ">
        <h3 className="text-slate-dark font-semibold text-body leading-5">
          {task?.title}
        </h3>
        <Button variant="ghost" className="p-0.5! w-fit!">
          <DotsIcon className="text-secondary w-0.75" />
        </Button>
      </div>
      <div className="flex justify-between items-center gap-2">
        <div className="flex gap-2 items-center">
          <UserAvatar
            className="size-6 bg-primary-container rounded-xl text-label-xs text-white"
            content={
              task?.assignee?.name ? (
                assigneeInitials
              ) : (
                <UnassignedIcon className="w-3" />
              )
            }
          />
          <span className="text-label font-medium leading-4 text-secondary capitalize">
            {task?.assignee?.name || 'Unassigned'}
          </span>
        </div>
        <div className="flex gap-1.5">
          {isDelayed ? (
            <AlertIcon className="w-3 text-error" />
          ) : isDueToday ? (
            <CalenderIcon className="w-2.5 text-primary" />
          ) : (
            <CalenderIcon className="w-2.5 text-secondary/70" />
          )}

          <span
            className={`${isDelayed ? 'text-error' : isDueToday ? 'text-primary' : 'text-secondary/70'} font-bold text-label leading-4 letter-spacing-sm`}
          >
            {!task?.due_date
              ? '--'
              : isDueToday
                ? 'Today'
                : isDelayed
                  ? 'Overdue'
                  : formatedDueDate}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {mobileView}
      {desktopView}
    </>
  );
};

export default EpicTaskItem;
