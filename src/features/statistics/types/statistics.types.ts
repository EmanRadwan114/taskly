import { TaskStatusEnum } from '@/features/tasks/types/tasks.types';

export interface ITasksStatsRequest {
  p_start_date: string;
  p_end_date: string;
  p_project_id: string | null;
  p_status: TaskStatusEnum | null;
}

export const taskStatusValues = Object.values(TaskStatusEnum);

export interface ITaskStatsResponse {
  daily: Array<{
    day: string;
    statuses: Record<TaskStatusEnum, number>;
  }>;
  totals: Record<TaskStatusEnum, number>;
  total_tasks: number;
  done_tasks: number;
  overdue_tasks: number;
}

export interface ITaskStatsPerProject {
  project_id: string;
  project_name: string;
  tasks_count: number;
}
