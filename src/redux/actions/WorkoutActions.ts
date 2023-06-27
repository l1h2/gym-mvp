import { createAction } from '@reduxjs/toolkit';

import { AppDispatch } from '../AppStore';
import Repository from '../../data/Repository';
import { Exercise, WorkoutDay, WorkoutPlanDataModel } from '../../data/firebase/collections/Workouts';

function withPayloadType<T>() {
  return (t: T) => ({ payload: t });
};

export const updateWorkoutPlansAction = createAction(
  'UPDATE_WORKOUT_PLANS',
  withPayloadType<WorkoutPlanDataModel[]>(),
);

export const getWorkoutPlansThunk = () => {
  return async (dispatch: AppDispatch) => {
    const workoutPlans = await Repository.getWorkoutPlans();
    dispatch(updateWorkoutPlansAction(workoutPlans));
  };
};

export const addWorkoutPlanThunk = (newWorkoutPlan: WorkoutPlanDataModel) => {
  return async (dispatch: AppDispatch) => {
    await Repository.addWorkoutPlan(newWorkoutPlan);
    const workoutPlans = await Repository.getWorkoutPlans();
    dispatch(updateWorkoutPlansAction(workoutPlans));
  };
};

export const deleteWorkoutPlanThunk = (WorkoutPlanID: string) => {
  return async (dispatch: AppDispatch) => {
    await Repository.deleteWorkoutPlan(WorkoutPlanID);
    const workoutPlans = await Repository.getWorkoutPlans();
    dispatch(updateWorkoutPlansAction(workoutPlans));
  };
};

export const editWorkoutPlanAction = createAction(
  'EDIT_WORKOUT_PLAN',
  withPayloadType<WorkoutPlanDataModel>(),
);

export const editWorkoutDayAction = createAction(
  'EDIT_WORKOUT_DAY',
  withPayloadType<WorkoutDay>(),
);

export const setExerciseListAction = createAction(
  'SET_EXERCISE_LIST',
  withPayloadType<Exercise[]>(),
);

export const addExerciseListAction = createAction(
  'ADD_EXERCISE_LIST',
  withPayloadType<Exercise[]>(),
);
