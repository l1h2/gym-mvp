import { createReducer } from '@reduxjs/toolkit';
import {
    editWorkoutPlanAction,
    updateWorkoutPlansAction,
    editWorkoutDayAction,
    addExerciseListAction,
    setExerciseListAction
} from '../actions/WorkoutActions';
import { WorkoutState } from '../ReduxTypes';

const initialState: WorkoutState = {
    workoutPlans: [],
    editWorkoutPlan: {
        createdBy: '',
        id: '',
        name: '',
        workoutDays: [],
    },
    editWorkoutDay: {
        days: [],
        exercises: [],
        name: '',
    },
    newExerciseList: [],
};

export const workoutReducer = createReducer(initialState, builder => {
    builder
        .addCase(updateWorkoutPlansAction, (state, action) => {
            const workoutPlans = action.payload;
            state.workoutPlans = workoutPlans;
        })

        .addCase(editWorkoutPlanAction, (state, action) => {
            const workoutPlan = action.payload;
            state.editWorkoutPlan = workoutPlan;
        })

        .addCase(editWorkoutDayAction, (state, action) => {
            const workoutDay = action.payload;
            state.editWorkoutDay = workoutDay;
        })

        .addCase(setExerciseListAction, (state, action) => {
            const exercises = action.payload;
            state.newExerciseList = exercises;
        })

        .addCase(addExerciseListAction, (state, action) => {
            const exercises = action.payload;
            state.newExerciseList = exercises;
        })
});
