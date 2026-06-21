import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import authReducer from './slices/auth.slice';
import membersReducer from './slices/members.slice';
import { epicsApi } from './redux-toolkit-query/epics-api';
import { projectsApi } from './redux-toolkit-query/projects-api';
import { tasksApi } from './redux-toolkit-query/tasks-api';
import tasksReducer from './slices/tasks.slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      members: membersReducer,
      tasks: tasksReducer,
      [epicsApi.reducerPath]: epicsApi.reducer,
      [projectsApi.reducerPath]: projectsApi.reducer,
      [tasksApi.reducerPath]: tasksApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        epicsApi.middleware,
        projectsApi.middleware,
        tasksApi.middleware
      ),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <TSelected>(
  selector: (state: RootState) => TSelected
) => useSelector<RootState, TSelected>(selector);
