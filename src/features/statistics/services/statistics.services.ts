import { requestHeaders } from '@/shared/utils/variables.utils';
import {
  ITasksStatsRequest,
  ITaskStatsPerProject,
  ITaskStatsResponse,
} from '../types/statistics.types';

// ^ ----------------------- Fetch Tasks Calendar Stats ----------------------- //
export const fetchTasksCalendarStats = async (
  data: ITasksStatsRequest
): Promise<{ response: { data: ITaskStatsResponse } }> => {
  try {
    const response = await fetch(`/api/fetch-tasks-calendar-stats`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result?.message || 'Failed to fetch tasks stats');
    }

    return result;
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : 'Failed to fetch tasks stats';
    throw new Error(errMsg);
  }
};

// ^ ----------------------- Fetch Tasks stats per project ----------------------- //
export const fetchTasksStatsPerProject = async (
  data: Pick<ITasksStatsRequest, 'p_start_date' | 'p_end_date'>
): Promise<{ response: { data: ITaskStatsPerProject[] } }> => {
  try {
    const response = await fetch(`/api/fetch-tasks-stats-per-project`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(
        result?.message || 'Failed to fetch tasks stats per project'
      );
    }

    return result;
  } catch (error) {
    const errMsg =
      error instanceof Error
        ? error.message
        : 'Failed to fetch tasks stats per project';
    throw new Error(errMsg);
  }
};
