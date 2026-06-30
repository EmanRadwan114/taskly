import { TaskStatusEnum } from '../types/tasks.types';

export const taskStatusOptions = [
  {
    value: TaskStatusEnum.TODO,
    label: 'To Do',
  },
  {
    value: TaskStatusEnum.IN_PROGRESS,
    label: 'In Progress',
  },
  {
    value: TaskStatusEnum.BLOCKED,
    label: 'Blocked',
  },
  {
    value: TaskStatusEnum.IN_REVIEW,
    label: 'In Review',
  },
  {
    value: TaskStatusEnum.READY_FOR_QA,
    label: 'Ready For QA',
  },
  {
    value: TaskStatusEnum.READY_FOR_PRODUCTION,
    label: 'Ready For Production',
  },
  {
    value: TaskStatusEnum.REOPENED,
    label: 'Reopened',
  },
  {
    value: TaskStatusEnum.DONE,
    label: 'Done',
  },
];
