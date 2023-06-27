import { createAction } from '@reduxjs/toolkit';

import { UserDataModel } from '../../data/firebase/collections/Users';
import { AppDispatch } from '../AppStore';
import Repository from '../../data/Repository';

function withPayloadType<T>() {
    return (t: T) => ({ payload: t });
}

export const setUserAction = createAction(
    'SET_USER_ACTION',
    withPayloadType<{user: UserDataModel}>(),
);

export const getUserThunk = (userID: string) => {
    return async (dispatch: AppDispatch) => {
        const user = await Repository.getUser(userID);
        dispatch(setUserAction({user}));
    };
};

export const setLanguageAction = createAction(
    'SET_LANGUAGE_ACTION',
    withPayloadType<UserDataModel['persisted_language']>(),
);

export const setActiveWorkoutPlanAction = createAction(
  'SET_WORKOUT_PLAN',
  withPayloadType<UserDataModel['activeWorkoutPlan']>(),
);
