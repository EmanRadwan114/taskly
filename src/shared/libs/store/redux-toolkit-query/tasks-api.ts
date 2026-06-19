import { ITask, TaskStatusEnum } from '@/features/tasks/types/tasks.types';
import { IMetaFetchedData } from '@/shared/types/shared.types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  tagTypes: ['EpicsTasks', 'ProjectTasksByStatus'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getEpicsTasks: builder.query<
      { response: { data: ITask[]; meta: IMetaFetchedData }; error: null },
      { epicId: string }
    >({
      query: ({ epicId }) => `/fetch-epic-tasks?epicId=${epicId}`,
      providesTags: ['EpicsTasks'],
    }),
    getProjectTasksByStatus: builder.query<
      { response: { data: ITask[]; meta: IMetaFetchedData }; error: null },
      { projectId: string; status: TaskStatusEnum }
    >({
      query: ({ projectId, status }) =>
        `/fetch-project-tasks-by-status?projectId=${projectId}&status=${status}`,
      providesTags: ['ProjectTasksByStatus'],
    }),
  }),
});

export const { useGetEpicsTasksQuery, useGetProjectTasksByStatusQuery } =
  tasksApi;
