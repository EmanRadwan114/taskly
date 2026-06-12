import { IEpics } from '@/features/epics/types/epics.types';
import { LIMIT } from '@/shared/utils/variables.utils';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// ^ -------------- fetch all epics (paginated) ----------------
export const fetchPaginatedEpics = createAsyncThunk(
  'epics/fetchPaginated',
  async (
    {
      limit,
      offset,
      projectId,
      append,
    }: {
      limit: number;
      offset: number;
      projectId: string;
      append?: boolean;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `/api/fetch-epics?limit=${limit}&offset=${offset}&project_id=${projectId}`
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
  totalPages: number | undefined;
  epics: IEpics[];
}

const epicsSlice = createSlice({
  name: 'epics',
  initialState: <IInitialState>{
    currentPage: 1,
    totalCount: 0,
    limit: LIMIT,
    totalPages: undefined,
    loading: 'pending',
    error: null,
    epics: [],
  },
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    resetEpics: (state) => {
      state.currentPage = 1;
      state.totalCount = 0;
      state.totalPages = undefined;
      state.loading = 'pending';
      state.epics = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // fetch epics
    builder
      .addCase(fetchPaginatedEpics.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchPaginatedEpics.fulfilled, (state, action) => {
        state.loading = 'success';
        state.totalCount = action.payload?.response?.meta?.totalCount;
        state.totalPages = action.payload?.response?.meta?.totalPages;
        const newEpics = action.payload?.response?.data || [];

        if (action.meta.arg.append) {
          const existingIds = new Set(state.epics.map((e: IEpics) => e.id));
          const filteredNew = newEpics.filter(
            (e: IEpics) => !existingIds.has(e.id)
          );
          state.epics = [...state.epics, ...filteredNew];
        } else {
          state.epics = newEpics;
        }
      })
      .addCase(fetchPaginatedEpics.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = 'Failed to fetch epics';
      });
  },
});

export const { setCurrentPage, resetEpics } = epicsSlice.actions;
export default epicsSlice.reducer;
