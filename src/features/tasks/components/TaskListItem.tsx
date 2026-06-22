import TableRow from '@/shared/components/ui/TableRow';
import { ITask, TaskStatusEnum } from '../types/tasks.types';
import TableCol from '@/shared/components/ui/TableCol';
import Badge from '@/shared/components/ui/Badge';
import UserAvatar from '@/shared/components/ui/UserAvatar';
import Button from '@/shared/components/ui/Button';
import DotsIcon from '@/assets/icons/dots.svg';
import { getNameInitials } from '@/shared/utils/functions.client.utils';
import UnassignedIcon from '@/assets/icons/unassigned.svg';

interface IProps {
  task: ITask;
}

const TaskListItem: React.FC<IProps> = ({ task }) => {
  const taskStatus = task?.status;
  const assigneeName = task?.assignee?.name;
  const assigneeInitials = getNameInitials(assigneeName);

  const avatarBgColor = Math.round(Math.random() * 255) + 1;
  const tdStyle = `py-4.5! px-6! text-body-sm leading-4`;

  const statusStyle =
    taskStatus === TaskStatusEnum.IN_PROGRESS
      ? 'bg-surface-dark text-secondary/70'
      : taskStatus === TaskStatusEnum.TODO
        ? 'bg-surface-high text-secondary'
        : taskStatus === TaskStatusEnum.DONE
          ? 'bg-success text-green-dark'
          : taskStatus === TaskStatusEnum.BLOCKED
            ? 'bg-error-background text-error-dark'
            : '';

  return (
    <TableRow key={task?.id} className="bg-white border-b border-b-surface-low">
      {/* task id */}
      <TableCol className={`${tdStyle} w-1/8`}>
        <span className="uppercase text-primary">{task?.task_id}</span>
      </TableCol>
      {/* titel */}
      <TableCol className={`${tdStyle} w-3/8`}>
        <h2 className="font-medium text-slate-dark">{task?.title}</h2>
      </TableCol>
      {/* status */}
      <TableCol className={`${tdStyle} w-3/8`}>
        <Badge
          className={`py-1 px-2 font-medium text-slate-dark rounded-xs uppercase ${statusStyle}`}
        >
          {task?.status}
        </Badge>
      </TableCol>
      {/* due date */}
      <TableCol className={`${tdStyle} w-1/8`}>
        <span className="text-secondary text-body">{task?.due_date}</span>
      </TableCol>
      {/* assignee */}
      <TableCol className={`${tdStyle} w-1/8`}>
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
