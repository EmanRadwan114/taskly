import { IEpics } from '@/features/epics/types/epics.types';
import { TaskStatusEnum } from '@/features/tasks/types/tasks.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  selectedStatus: TaskStatusEnum;
  selectedEpic: IEpics | null;
}

const initialState: IInitialState = {
  selectedStatus: TaskStatusEnum.TODO,
  selectedEpic: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSelectedStatus: (state, action: PayloadAction<TaskStatusEnum>) => {
      state.selectedStatus = action.payload;
    },
    setSelectedEpic: (state, action: PayloadAction<IEpics | null>) => {
      state.selectedEpic = action.payload;
    },
  },
});

export const { setSelectedStatus, setSelectedEpic } = tasksSlice.actions;
export default tasksSlice.reducer;
