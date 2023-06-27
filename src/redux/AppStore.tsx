import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider, useDispatch } from 'react-redux';

import { userReducer } from './reducers/UserReducers';
import { workoutReducer } from './reducers/WorkoutReducers';
import { exerciseReducer } from './reducers/ExerciseReducers';

export const store = configureStore({
  reducer: {
    user: userReducer,
    workout: workoutReducer,
    exercise: exerciseReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export function withAppStore<T>(WrappedComponent: React.FC<any>) {
  const ComponentWithStore = (props: T) => {
    return (
      <Provider store={store}>
        <WrappedComponent {...(props as T)} />
      </Provider>
    );
  };
  return ComponentWithStore;
}
