import { TaskStatusEnum } from '@/features/tasks/types/tasks.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    selectedStatus: TaskStatusEnum.TODO,
  },
  reducers: {
    setSelectedStatus: (state, action: PayloadAction<TaskStatusEnum>) => {
      state.selectedStatus = action.payload;
    },
  },
});

export const { setSelectedStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
