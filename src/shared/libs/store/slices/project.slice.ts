import { IProject } from '@/features/projects/types/project.types';
import { LIMIT } from '@/shared/utils/variables.utils';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const fetchPaginatedProjects = createAsyncThunk(
  'projects/fetchPaginated',
  async (
    {
      limit,
      offset,
      append,
    }: { limit: number; offset: number; append?: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `api/fetch-data?limit=${limit}&offset=${offset}`
      );

      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);

interface IInitialState {
  currentPage: number;
  totalCount: number | undefined;
  limit: number;
  loading: 'pending' | 'success' | 'rejected';
  error: string | null;
  projects: IProject[];
  totalPages: number | undefined;
}

const projectSlice = createSlice({
  name: 'project',
  initialState: <IInitialState>{
    currentPage: 1,
    totalCount: 0,
    limit: LIMIT,
    totalPages: undefined,
    loading: 'pending',
    error: null,
    projects: [],
  },
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    resetProjects: (state) => {
      state.currentPage = 1;
      state.totalCount = 0;
      state.totalPages = undefined;
      state.loading = 'pending';
      state.projects = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaginatedProjects.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchPaginatedProjects.fulfilled, (state, action) => {
        state.loading = 'success';
        state.totalCount = action.payload?.response?.meta?.totalCount;
        state.totalPages = action.payload?.response?.meta?.totalPages;
        const newProjects = action.payload?.response?.data || [];

        if (action.meta.arg.append) {
          const existingIds = new Set(
            state.projects.map((p: IProject) => p.id)
          );
          const filteredNew = newProjects.filter(
            (p: IProject) => !existingIds.has(p.id)
          );
          state.projects = [...state.projects, ...filteredNew];
        } else {
          state.projects = newProjects;
        }
      })
      .addCase(fetchPaginatedProjects.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error =
          (action.payload as string) ||
          action.error.message ||
          'Failed to fetch projects';
      });
  },
});

export const { setCurrentPage, resetProjects } = projectSlice.actions;
export default projectSlice.reducer;
