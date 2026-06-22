import { IEpics } from '@/features/epics/types/epics.types';
import { IMetaFetchedData } from '@/shared/types/shared.types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const epicsApi = createApi({
  reducerPath: 'epicsApi',
  tagTypes: ['PaginatedEpics', 'EpicBYID', 'AllEpics'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  keepUnusedDataFor: 60 * 1, // 1 minute
  endpoints: (builder) => ({
    getPaginatedEpics: builder.query<
      { response: { data: IEpics[]; meta: IMetaFetchedData }; error: null },
      { limit: number; offset: number; projectId: string }
    >({
      query: ({ limit, offset, projectId }) =>
        `/fetch-epics-with-pagination?limit=${limit}&offset=${offset}&projectId=${projectId}`,
      providesTags: ['PaginatedEpics'],
    }),
    getAllEpics: builder.query<
      { response: { data: IEpics[]; meta: IMetaFetchedData }; error: null },
      string
    >({
      query: (projectId) => `/fetch-all-epics?projectId=${projectId}`,
      providesTags: ['AllEpics'],
    }),
    getEpicById: builder.query<
      { response: { data: IEpics[]; meta: IMetaFetchedData }; error: null },
      { projectId: string; epicId: string }
    >({
      query: ({ projectId, epicId }) =>
        `/fetch-epic-by-id?projectId=${projectId}&epicId=${epicId}`,
      providesTags: ['EpicBYID'],
    }),
  }),
});

export const {
  useGetPaginatedEpicsQuery,
  useGetEpicByIdQuery,
  useGetAllEpicsQuery,
} = epicsApi;
