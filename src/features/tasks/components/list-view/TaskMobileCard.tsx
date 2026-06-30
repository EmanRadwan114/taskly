'use client';
import Badge from '@/shared/components/ui/Badge';
import {
  formateDateString,
  formateTaskStatus,
  getNameInitials,
} from '@/shared/utils/functions.client.utils';
import UserAvatar from '@/shared/components/ui/UserAvatar';
import UnassignedIcon from '@/assets/icons/unassigned.svg';
import Button from '@/shared/components/ui/Button';
import DotsIcon from '@/assets/icons/dots.svg';
import { ITask } from '../../types/tasks.types';
import { statusBadgeStyle } from '../../utils/tasks.utils';
import { useHandleTaskDetailsRoute } from '@/shared/hooks/shared.hooks';

interface IProps {
  task: ITask;
}

const TaskMobileCard: React.FC<IProps> = ({ task }) => {
  const { handleNavToTaskDetails } = useHandleTaskDetailsRoute(task?.id);

  const taskStatus = task?.status;
  const displayedTaskStatus = formateTaskStatus(taskStatus);
  const assigneeName = task?.assignee?.name;
  const assigneeInitials = getNameInitials(assigneeName);
  const formatedDueDate = formateDateString(task?.due_date);

  const avatarBgColor = Math.round(Math.random() * 255) + 1;

  return (
    <div
      className="bg-white flex flex-col gap-3 p-4 rounded-lg cursor-pointer"
      onClick={handleNavToTaskDetails}
    >
      <div>
        <div className="flex justify-between items-center">
          {/* task id */}
          <span className="text-secondary/50 font-bold leading-4.25 text-label uppercase letter-spacing-sm">
            {task?.task_id}
          </span>
          {/* status */}
          <Badge
            className={`py-1 px-2 font-medium rounded-xs uppercase ${statusBadgeStyle[taskStatus]}`}
          >
            {displayedTaskStatus}
          </Badge>
        </div>
        {/* title */}
        <h2 className="font-medium text-slate-dark text-heading-6 leading-6">
          {task?.title}
        </h2>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* avatar */}
          <UserAvatar
            content={
              assigneeName ? (
                assigneeInitials
              ) : (
                <UnassignedIcon className="w-3" />
              )
            }
            className={`size-6.5! text-label font-bold`}
            style={{ backgroundColor: `#${avatarBgColor}` }}
          />
          {/* due date */}
          <div className="flex flex-col">
            <span className="text-secondary/70 font-bold text-label leading-4.25 uppercase">
              due date
            </span>
            <span className="font-medium text-body-sm leading-4 text-slate-dark">
              {formatedDueDate}
            </span>
          </div>
        </div>
        <Button variant="ghost" className="p-0.5! w-fit!">
          <DotsIcon className="text-secondary/40 w-1" />
        </Button>
      </div>
    </div>
  );
};

export default TaskMobileCard;
