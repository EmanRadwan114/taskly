import { IUser } from '@/features/auth/types/auth.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'user',
  initialState: {
    user: null as IUser | null,
  },
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      console.log(state.user, 'statr');
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
