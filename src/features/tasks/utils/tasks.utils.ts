import { TaskStatusEnum } from '../types/tasks.types';

export const statusBadgeStyle: {
  [key: string]: string;
} = {
  [TaskStatusEnum.TODO]: 'bg-accent-dark/20!',
  [TaskStatusEnum.IN_PROGRESS]:
    'text-primary-container! bg-primary-container/20!',
  [TaskStatusEnum.BLOCKED]: 'bg-error-background! text-error!',
  [TaskStatusEnum.IN_REVIEW]: 'text-secondary! bg-slate-dark/20!',
  [TaskStatusEnum.READY_FOR_QA]: 'text-slate-md! bg-slate-md/20!',
  [TaskStatusEnum.REOPENED]: 'bg-surface-dark!',
  [TaskStatusEnum.READY_FOR_PRODUCTION]: 'text-secondary! bg-warning/30!',
  [TaskStatusEnum.DONE]: 'text-success-text! bg-success!',
};
