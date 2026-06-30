import { ITask, TaskStatusEnum } from '@/features/tasks/types/tasks.types';
import { IMetaFetchedData } from '@/shared/types/shared.types';
import { FETCH_LIMIT } from '@/shared/utils/variables.utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  tagTypes: ['EpicTasks', 'ProjectTasksByStatus', 'ProjectTasks', 'TaskById'],
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
      {
        projectId: string;
        status: TaskStatusEnum;
        limit: number;
        offset: number;
        searchTerm?: string;
      }
    >({
      query: ({ projectId, status, limit, offset, searchTerm }) =>
        `/fetch-project-tasks-by-status?projectId=${projectId}&status=${status}&limit=${limit}&offset=${offset}&searchTerm=${searchTerm}`,
      providesTags: (result, error, args) => [
        { type: 'ProjectTasksByStatus', id: args.status },
      ],
    }),
    getProjectTasks: builder.query<
      { response: { data: ITask[]; meta: IMetaFetchedData }; error: null },
      { projectId: string; limit: number; offset: number; searchTerm?: string }
    >({
      query: ({ projectId, limit, offset, searchTerm }) =>
        `/fetch-project-tasks?projectId=${projectId}&limit=${limit}&offset=${offset}&searchTerm=${searchTerm}`,
      providesTags: (result, error, args) => [
        { type: 'ProjectTasks', id: args.projectId },
      ],
    }),
    getTaskById: builder.query<
      { response: { data: ITask[]; meta: IMetaFetchedData }; error: null },
      { projectId: string; taskId: string }
    >({
      query: ({ projectId, taskId }) =>
        `/fetch-task-by-id?projectId=${projectId}&taskId=${taskId}`,
      providesTags: (result, error, args) => [
        { type: 'TaskById', id: args.taskId },
      ],
    }),
  }),
});

export const {
  useGetEpicTasksQuery,
  useGetProjectTasksByStatusQuery,
  useGetProjectTasksQuery,
  useGetTaskByIdQuery,
} = tasksApi;
