import { ITask, TaskStatusEnum } from '@/features/tasks/types/tasks.types';
import { IMetaFetchedData } from '@/shared/types/shared.types';
import { FETCH_LIMIT } from '@/shared/utils/variables.utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  tagTypes: ['EpicTasks', 'ProjectTasksByStatus', 'ProjectTasks'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  keepUnusedDataFor: 60 * 1, // 1 minute
  endpoints: (builder) => ({
    getEpicTasks: builder.query<
      { response: { data: ITask[]; meta: IMetaFetchedData }; error: null },
      { epicId: string }
    >({
      query: ({ epicId }) => `/fetch-epic-tasks?epicId=${epicId}`,
      providesTags: (result, error, args) => [
        { type: 'EpicTasks', id: args.epicId },
      ],
    }),
    getProjectTasksByStatus: builder.query<
      { response: { data: ITask[]; meta: IMetaFetchedData }; error: null },
      { projectId: string; status: TaskStatusEnum }
    >({
      query: ({ projectId, status }) =>
        `/fetch-project-tasks-by-status?projectId=${projectId}&status=${status}`,
      providesTags: (result, error, args) => [
        { type: 'ProjectTasksByStatus', id: args.status },
      ],
    }),
    getProjectTasks: builder.query<
      { response: { data: ITask[]; meta: IMetaFetchedData }; error: null },
      { projectId: string; limit: number; offset: number }
    >({
      query: ({ projectId, limit, offset }) =>
        `/fetch-project-tasks?projectId=${projectId}&limit=${limit}&offset=${offset}`,
      providesTags: (result, error, args) => [
        { type: 'ProjectTasks', id: args.projectId },
      ],
    }),
  }),
});

export const {
  useGetEpicTasksQuery,
  useGetProjectTasksByStatusQuery,
  useGetProjectTasksQuery,
} = tasksApi;
