import { IUser } from '@/features/auth/types/auth.types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const fetchUserData = createAsyncThunk(
  'user/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/fetch-user-data`);
      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'user',
  initialState: {
    user: null as IUser | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.user = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload?.response?.data?.user_metadata;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
