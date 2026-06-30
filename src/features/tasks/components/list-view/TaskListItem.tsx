'use client';

import TableRow from '@/shared/components/ui/TableRow';
import TableCol from '@/shared/components/ui/TableCol';
import Badge from '@/shared/components/ui/Badge';
import UserAvatar from '@/shared/components/ui/UserAvatar';
import Button from '@/shared/components/ui/Button';
import DotsIcon from '@/assets/icons/dots.svg';
import {
  formateDateString,
  formateTaskStatus,
  getNameInitials,
} from '@/shared/utils/functions.client.utils';
import UnassignedIcon from '@/assets/icons/unassigned.svg';
import { useHandleTaskDetailsRoute } from '@/shared/hooks/shared.hooks';
import { ITask } from '../../types/tasks.types';
import { statusBadgeStyle } from '../../utils/tasks.utils';

interface IProps {
  task: ITask;
}

const TaskListItem: React.FC<IProps> = ({ task }) => {
  const { handleNavToTaskDetails } = useHandleTaskDetailsRoute(task?.id);

  const taskStatus = task?.status;
  const displayedTaskStatus = formateTaskStatus(taskStatus);
  const assigneeName = task?.assignee?.name;
  const assigneeInitials = getNameInitials(assigneeName);
  const formatedDueDate = formateDateString(task?.due_date);

  const avatarBgColor = Math.round(Math.random() * 255) + 1;
  const tdStyle = `py-4.5! px-6! text-body-sm leading-4`;

  return (
    <TableRow
      key={task?.id}
      className="bg-white border-b border-b-surface-low cursor-pointer"
      onClick={handleNavToTaskDetails}
    >
      {/* task id */}
      <TableCol className={`${tdStyle}`}>
        <span className="uppercase text-primary">{task?.task_id}</span>
      </TableCol>
      {/* titel */}
      <TableCol className={`${tdStyle}`}>
        <h2 className="font-medium text-slate-dark">{task?.title}</h2>
      </TableCol>
      {/* status */}
      <TableCol className={`${tdStyle}`}>
        <Badge
          className={`py-1 px-2 font-medium rounded-xs uppercase ${statusBadgeStyle[taskStatus]}`}
        >
          {displayedTaskStatus}
        </Badge>
      </TableCol>
      {/* due date */}
      <TableCol className={`${tdStyle}`}>
        <span className="text-secondary text-body">{formatedDueDate}</span>
      </TableCol>
      {/* assignee */}
      <TableCol className={`${tdStyle}`}>
        <div className="flex items-center justify-between">
          {/* assignee info */}
          <div className="flex items-center gap-3">
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
            <span className="text-slate-dark">
              {assigneeName ?? 'Unassigned'}
            </span>
          </div>
          {/* actions */}
          <Button variant="ghost" className="w-fit! px-0.5! py-0.5!">
            <DotsIcon className="text-slate-dark rotate-90 w-1" />
          </Button>
        </div>
      </TableCol>
    </TableRow>
  );
};

export default TaskListItem;
