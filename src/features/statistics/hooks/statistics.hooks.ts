import { queryKeys } from '@/shared/libs/tanstack-query/query-keys';
import { useQuery } from '@tanstack/react-query';
import {
  fetchTasksCalendarStats,
  fetchTasksStatsPerProject,
} from '../services/statistics.services';
import { ITasksStatsRequest } from '../types/statistics.types';

// ^ ---------------------- Fetch Tasks stats calendar  Hook --------------------------
export const useFetchTasksCalendar = (data: ITasksStatsRequest) => {
  return useQuery({
    queryKey: [queryKeys.statistics.taskStatsCalendar],
    queryFn: () => fetchTasksCalendarStats(data),
    staleTime: 60 * 1000, // 1 minute
  });
};

// ^ ---------------------- Fetch Tasks stats per project  Hook --------------------------
export const useFetchTasksPerProject = (
  data: Pick<ITasksStatsRequest, 'p_end_date' | 'p_start_date'>
) => {
  return useQuery({
    queryKey: [queryKeys.statistics.taskStatsPerProject],
    queryFn: () => fetchTasksStatsPerProject(data),
    staleTime: 60 * 1000, // 1 minute
  });
};
