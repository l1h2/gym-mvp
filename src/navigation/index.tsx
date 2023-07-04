import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MCIIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/AppStore';
import { User } from 'firebase/auth';

import Onboarding from '../screens/onboarding';
import Welcome from '../screens/welcome';
import Login from '../screens/login';
import Signup from '../screens/signup';
import Home from '../screens/home';
import Calendar from '../screens/calendar';
import Workouts from '../screens/workout';
import Profile from '../screens/settings';
import LanguageSelectModal from '../modals/LanguageSelectModal';
import UpdateWorkoutPlanModal from '../modals/UpdateWorkoutPlanModal';
import SelectWorkoutPlanModal from '../modals/SelectWorkoutPlanModal';
import UpdateWorkoutDayModal from '../modals/workout_day/UpdateWorkoutDayModal';
import SearchExercise from '../modals/exercises/SearchExercise';
import FilteredExercises from '../modals/exercises/FilteredExercises';
import UpdateExerciseDetails from '../modals/workout_day/UpdateExerciseDetails';
import ExerciseDetails from '../screens/workout/ExerciseDetails';
import WorkoutDayDetails from '../screens/workout/WorkoutDayDetails';

import {
  BottomBarParamList,
  ExerciseStackParamList,
  RootStackParamList,
  UpdateWorkoutDayStackParamList,
  WorkoutsStackParamList
} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomBar = createBottomTabNavigator<BottomBarParamList>();
const WorkoutStack = createNativeStackNavigator<WorkoutsStackParamList>();
const ExerciseStack = createNativeStackNavigator<ExerciseStackParamList>();
const WorkoutDayStack = createNativeStackNavigator<UpdateWorkoutDayStackParamList>();

function BottomBarWorkoutStack() {
  return (
    <WorkoutStack.Navigator initialRouteName="workouts_main" screenOptions={() => ({headerShown: false})}>
      <WorkoutStack.Screen name='workouts_main' component={Workouts} />
      <WorkoutStack.Screen name='workout_day_details' component={WorkoutDayDetails} />
      <WorkoutStack.Screen name='exercise_details' component={ExerciseDetails} />
    </WorkoutStack.Navigator>
  );
}

function BottomBarTab() {
  const language = useSelector((state: RootState) => state.user.language);
  
  return (
    <BottomBar.Navigator
      initialRouteName="bottom_bar_home"
      screenOptions={() => ({headerShown: false})}
    >
      <BottomBar.Screen
        name="bottom_bar_home"
        component={Home}
        options={{
          title: language.home,
          tabBarIcon: ({focused, size, color}) => {
            return (
              <MCIIcon
                size={size}
                name={focused ? 'home-variant' : 'home-variant-outline'}
                color={color}
              />
            );
          },
        }}
      />
      <BottomBar.Screen
        name="bottom_bar_workouts"
        component={BottomBarWorkoutStack}
        options={{
          title: language.workouts,
          tabBarIcon: ({focused, size, color}) => {
            return (
              <MCIIcon
                size={size}
                name={focused ? 'weight-lifter' : 'dumbbell'}
                color={color}
              />
            );
          },
        }}
      />
      <BottomBar.Screen
        name="bottom_bar_calendar"
        component={Calendar}
        options={{
          title: language.calendar,
          tabBarIcon: ({focused, size, color}) => {
            return (
              <MCIIcon
                size={size}
                name={focused ? 'calendar-clock' : 'calendar-clock-outline'}
                color={color}
              />
            );
          },
        }}
      />
      <BottomBar.Screen
        name="bottom_bar_settings"
        component={Profile}
        options={{
          title: language.settings,
          tabBarIcon: ({focused, size, color}) => {
            return (
              <MCIIcon
                size={size}
                name={focused ? 'account-details' : 'account-details-outline'}
                color={color}
              />
            );
          },
        }}
      />
    </BottomBar.Navigator>
  );
}

function ExerciseModalStack() {
  return (
    <ExerciseStack.Navigator initialRouteName="search_exercise" screenOptions={() => ({headerShown: true})}>
      <ExerciseStack.Screen name='search_exercise' component={SearchExercise} />
      <ExerciseStack.Screen name='filtered_exercises' component={FilteredExercises} />
    </ExerciseStack.Navigator>
  );
}

function WorkoutDayModalStack() {
  return (
    <WorkoutDayStack.Navigator initialRouteName="update_workout_day_modal" screenOptions={() => ({headerShown: false})}>
      <WorkoutDayStack.Screen name='update_workout_day_modal' component={UpdateWorkoutDayModal} />
      <WorkoutDayStack.Screen name='update_exercise_details' component={UpdateExerciseDetails} />
    </WorkoutDayStack.Navigator>
  );
}

function AppNavigation(props: {user: User | null}) {
  return (
    <Stack.Navigator initialRouteName="onboarding" screenOptions={() => ({headerShown: false})} >
      {props.user ? (
        <>
          <Stack.Screen name="bottom_bar" component={BottomBarTab} />

          <Stack.Group screenOptions={{presentation: 'modal', animation: 'slide_from_bottom'}}>
            <Stack.Screen name="exercise_modal_stack" component={ExerciseModalStack} />
            <Stack.Screen name="language_selection_modal" component={LanguageSelectModal} />
            <Stack.Screen name="update_workout_plan_modal" component={UpdateWorkoutPlanModal} />
            <Stack.Screen name="select_workout_plan_modal" component={SelectWorkoutPlanModal} />
            <Stack.Screen name="update_workout_day_modal_stack" component={WorkoutDayModalStack} />
          </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Screen name="onboarding" component={Onboarding} options={{animationTypeForReplace: !props.user && 'pop'}} />
          <Stack.Screen name="welcome" component={Welcome} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="signup" component={Signup} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default AppNavigation;
