import { createReducer } from '@reduxjs/toolkit';

import {
  setActiveWorkoutPlanAction,
  setLanguageAction,
  setUserAction
} from '../actions/UserActions';
import defaultLanguage, { languageJson, languageStore} from '../../shared/language';
import { UserState } from '../ReduxTypes';
import Repository from '../../data/Repository';

const initialState: UserState = {
  user: {
    language: defaultLanguage,
    displayName: '',
    username: '',
    email: '',
    emailVerified: false,
    isAnonymous: true,
    persisted_language: {
      language: languageStore.defaultLanguage,
      isDeviceLanguage: true,
    },
    activeWorkoutPlan: {},
  }
};

export const userReducer = createReducer(initialState.user, builder => {
  builder
    .addCase(setUserAction, (state, action) => {
      const {user} = action.payload;
      const language = languageJson[user.persisted_language.language];
      
      state = Object.assign(user, {language});
      return state;
    })

    .addCase(setLanguageAction, (state, action) => {
      const newPersistedLanguage = action.payload;
      Repository.setLanguage(newPersistedLanguage);
      state.language = languageJson[newPersistedLanguage.language];
      state.persisted_language = newPersistedLanguage;
    })

    .addCase(setActiveWorkoutPlanAction, (state, action) => {
      const newActiveWorkoutPlan = action.payload;
      Repository.setActiveWorkoutPlan(newActiveWorkoutPlan);
      state.activeWorkoutPlan = newActiveWorkoutPlan;
    })
});
