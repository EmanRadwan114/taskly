import { IMember } from '@/features/members/types/members.types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// ^ -------------- fetch all projects (paginated) ----------------
export const fetchMembers = createAsyncThunk(
  'members/fetch',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/fetch-members?project_id=${projectId}`
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
  loading: 'pending' | 'success' | 'rejected';
  error: string | null;
  members: IMember[];
}

const membersSlice = createSlice({
  name: 'project',
  initialState: <IInitialState>{
    loading: 'pending',
    error: null,
    members: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // fetch projects
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.loading = 'success';
        state.members = action.payload?.response?.data;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error =
          (action.payload as string) ||
          action.error.message ||
          'Failed to fetch members';
      });
  },
});

export default membersSlice.reducer;
