'use client';

import Table from '@/shared/components/ui/Table';
import TableHead from '@/shared/components/ui/TableHead';
import TableRow from '@/shared/components/ui/TableRow';
import TableCol from '@/shared/components/ui/TableCol';
import Badge from '@/shared/components/ui/Badge';
import { TaskStatusEnum } from '../types/tasks.types';
import UserAvatar from '@/shared/components/ui/UserAvatar';
import Button from '@/shared/components/ui/Button';
import DotsIcon from '@/assets/icons/dots.svg';
import TasksListPagination from './TasksListPagination';
import { useState } from 'react';
import { useParams } from 'next/navigation';

const TasksList: React.FC = ({}) => {
  const { projectId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const avatarBgColor = Math.round(Math.random() * 255) + 1;

  const thStyle = `text-secondary py-4! px-6! font-bold text-label letter-spacing-md`;
  const tdStyle = `py-4.5! px-6! text-body-sm leading-4`;

  const statusStyle =
    status === TaskStatusEnum.IN_PROGRESS
      ? 'bg-surface-dark text-secondary/70'
      : status === TaskStatusEnum.TODO
        ? 'bg-surface-high text-secondary'
        : status === TaskStatusEnum.DONE
          ? 'bg-success text-green-dark'
          : status === TaskStatusEnum.BLOCKED
            ? 'bg-error-background text-error-dark'
            : '';

  return (
    <Table>
      <thead>
        <TableRow className="bg-surface-low/30 border-b border-slate-light/10">
          <TableHead className={`${thStyle} w-1/8`}>Task ID</TableHead>
          <TableHead className={`${thStyle} w-3/8`}>Title</TableHead>
          <TableHead className={`${thStyle} w-1/8`}>Status</TableHead>
          <TableHead className={`${thStyle} w-1/8`}>Due Dats</TableHead>
          <TableHead className={`${thStyle} w-2/8`}>Assignees</TableHead>
        </TableRow>
      </thead>
      <tbody>
        <TableRow className="bg-white border-b border-b-surface-low">
          {/* task id */}
          <TableCol className={`${tdStyle} w-1/8`}>
            <span className="uppercase text-primary">Task-125</span>
          </TableCol>
          {/* titel */}
          <TableCol className={`${tdStyle} w-3/8`}>
            <h2 className="font-medium text-slate-dark">
              Develop responsive bento grid components
            </h2>
          </TableCol>
          {/* status */}
          <TableCol className={`${tdStyle} w-3/8`}>
            <Badge
              className={`py-1 px-2 font-medium text-slate-dark rounded-xs uppercase ${statusStyle}`}
            >
              {status}
            </Badge>
          </TableCol>
          {/* due date */}
          <TableCol className={`${tdStyle} text-secondary text-body w-1/8`}>
            25 Oct 2025
          </TableCol>
          {/* assignee */}
          <TableCol className={`${tdStyle} w-1/8`}>
            {/* assignee info */}
            <div className="flex items-center gap-3">
              <UserAvatar
                content="JD"
                className={`size-6.5! rounded-xl text-label font-bold`}
                style={{ backgroundColor: `#${avatarBgColor}` }}
              />
              <span className="text-slate-dark">John Dane</span>
            </div>
            {/* actions */}
            <Button variant="ghost" className="py-0.5! px-0.5! w-fit!">
              <DotsIcon className="text-slate-dark rotate-90 w-4" />
            </Button>
          </TableCol>
        </TableRow>
      </tbody>
      <tfoot>
        <TableRow className="bg-surface-low/20!">
          <TableCol className="w-full py-3! px-6!">
            <div className="flex justify-between items-center">
              <span>Showing 5 of 25 tasks</span>
              <div>
                <TasksListPagination
                  currentPage={currentPage}
                  totalPages={10}
                  handleCurrentPage={(page) => setCurrentPage(page)}
                />
              </div>
            </div>
          </TableCol>
        </TableRow>
      </tfoot>
    </Table>
  );
};

export default TasksList;
