import { ITask } from '@/features/tasks/types/tasks.types';
import { IMetaFetchedData } from '@/shared/types/shared.types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  tagTypes: ['EpicsTasks'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getEpicsTasks: builder.query<
      { response: { data: ITask[]; meta: IMetaFetchedData }; error: null },
      { epicId: string }
    >({
      query: ({ epicId }) => `/fetch-epic-tasks?epicId=${epicId}`,
      providesTags: ['EpicsTasks'],
    }),
  }),
});

export const { useGetEpicsTasksQuery } = tasksApi;
