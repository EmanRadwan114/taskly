import { IProject } from '@/features/projects/types/project.types';
import { IMetaFetchedData } from '@/shared/types/shared.types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  keepUnusedDataFor: 60 * 10, // 10 minutes
  endpoints: (builder) => ({
    getProjects: builder.query<
      { response: { data: IProject[]; meta: IMetaFetchedData }; error: null },
      { limit: number; offset: number }
    >({
      query: ({ limit, offset }) =>
        `/fetch-projects?limit=${limit}&offset=${offset}`,
    }),
  }),
});

export const { useGetProjectsQuery } = projectsApi;
