import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import authReducer from './slices/auth.slice';
import membersReducer from './slices/members.slice';
import tasksReducer from './slices/tasks.slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      members: membersReducer,
      tasks: tasksReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <TSelected>(
  selector: (state: RootState) => TSelected
) => useSelector<RootState, TSelected>(selector);
