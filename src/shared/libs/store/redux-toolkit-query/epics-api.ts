import { IEpics } from '@/features/epics/types/epics.types';
import { IMetaFetchedData } from '@/shared/types/shared.types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const epicsApi = createApi({
  reducerPath: 'epicsApi',
  tagTypes: ['Epics'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getEpics: builder.query<
      { response: { data: IEpics[]; meta: IMetaFetchedData }; error: null },
      { limit: number; offset: number; projectId: string }
    >({
      query: ({ limit, offset, projectId }) =>
        `/fetch-epics?limit=${limit}&offset=${offset}&projectId=${projectId}`,
      providesTags: ['Epics'],
    }),
  }),
});

export const { useGetEpicsQuery } = epicsApi;
