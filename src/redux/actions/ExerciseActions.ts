import { createAction } from '@reduxjs/toolkit';
import { ExerciseDataModel } from '../../data/firebase/collections/Exercises';
import { AppDispatch } from '../AppStore';

import Repository from '../../data/Repository';


function withPayloadType<T>() {
  return (t: T) => ({ payload: t });
};

export const updateExercisesAction = createAction(
  'UPDATE_EXERCISES',
  withPayloadType<ExerciseDataModel[]>(),
);

export const getExercisesThunk = () => {
  return async (dispatch: AppDispatch) => {
    const exercises = await Repository.getAllExercises();
    exercises && dispatch(updateExercisesAction(exercises));
  };
};
