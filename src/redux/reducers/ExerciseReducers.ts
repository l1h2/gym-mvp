import { createReducer } from '@reduxjs/toolkit';
import { ExerciseState } from '../ReduxTypes';
import { updateExercisesAction } from '../actions/ExerciseActions';

const initialState: ExerciseState = {
    exerciseList: [],
    searchedExercises: [],
};

export const exerciseReducer = createReducer(initialState, builder => {
    builder
        .addCase(updateExercisesAction, (state, action) => {
            const exerciseList = action.payload;
            state.exerciseList = exerciseList;
        })
});
