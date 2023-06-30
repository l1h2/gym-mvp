import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Exercise, WorkoutDay, WorkoutPlanDataModel } from '../data/firebase/collections/Workouts';
import { ExerciseDataModel } from '../data/firebase/collections/Exercises';

export type WorkoutsStackParamList = {
    workouts_main: undefined;
    workout_day_details: {workoutRef: {workoutDay: WorkoutDay, index: number}};
    exercise_details: {exercise: Exercise};
};

export type BottomBarParamList = {
    bottom_bar_home: undefined;
    bottom_bar_workouts: NavigatorScreenParams<WorkoutsStackParamList>;
    bottom_bar_calendar: undefined;
    bottom_bar_settings: undefined;
};

export type ExerciseStackParamList = {
    search_exercise: undefined;
    filtered_exercises: {exercises: ExerciseDataModel[]};
};

export type UpdateWorkoutDayStackParamList = {
    update_workout_day_modal?: {workoutRef?: {workoutDay: WorkoutDay, index: number}, handlePlanEdit?: boolean};
    update_exercise_details: {exercise: Exercise};
};

export type RootStackParamList = {
    onboarding: undefined;
    welcome: undefined;
    login: undefined;
    signup: undefined;
    bottom_bar: NavigatorScreenParams<BottomBarParamList>;
    exercise_modal_stack: NavigatorScreenParams<ExerciseStackParamList>;
    language_selection_modal: undefined;
    update_workout_plan_modal?: {workoutPlan: WorkoutPlanDataModel};
    select_workout_plan_modal: undefined;
    update_workout_day_modal_stack: NavigatorScreenParams<UpdateWorkoutDayStackParamList>;
};

export type OnboardingScreenProp = NativeStackScreenProps<
    RootStackParamList,
    'onboarding'
>;

export type WelcomeScreenProp = NativeStackScreenProps<
    RootStackParamList,
    'welcome'
>;

export type LoginScreenProp = NativeStackScreenProps<
    RootStackParamList,
    'login'
>;

export type SignupScreenProp = NativeStackScreenProps<
    RootStackParamList,
    'signup'
>;

export type LanguageSelectionModalProp = NativeStackScreenProps<
    RootStackParamList,
    'language_selection_modal'
>;

export type UpdateWorkoutPlanModalProp = NativeStackScreenProps<
    RootStackParamList,
    'update_workout_plan_modal'
>;

export type SelectWorkoutPlanModalProp = NativeStackScreenProps<
    RootStackParamList,
    'select_workout_plan_modal'
>;

export type WorkoutsMainScreenProp = CompositeScreenProps<
    NativeStackScreenProps<WorkoutsStackParamList, 'workouts_main'>,
    NativeStackScreenProps<RootStackParamList>
>;

export type WorkoutDayDetailsScreenProp = CompositeScreenProps<
    NativeStackScreenProps<WorkoutsStackParamList, 'workout_day_details'>,
    NativeStackScreenProps<RootStackParamList>
>;

export type ExercisesDetailsScreenProp = CompositeScreenProps<
    NativeStackScreenProps<WorkoutsStackParamList, 'exercise_details'>,
    NativeStackScreenProps<RootStackParamList>
>;

export type HomeScreenProp = CompositeScreenProps<
    BottomTabScreenProps<BottomBarParamList, 'bottom_bar_home'>,
    NativeStackScreenProps<RootStackParamList>
>;

export type WorkoutsScreenProp = CompositeScreenProps<
    BottomTabScreenProps<BottomBarParamList, 'bottom_bar_workouts'>,
    NativeStackScreenProps<RootStackParamList>
>;

export type CalendarScreenProp = CompositeScreenProps<
    BottomTabScreenProps<BottomBarParamList, 'bottom_bar_calendar'>,
    NativeStackScreenProps<RootStackParamList>
>;

export type SettingsScreenProp = CompositeScreenProps<
    BottomTabScreenProps<BottomBarParamList, 'bottom_bar_settings'>,
    NativeStackScreenProps<RootStackParamList>
>;

export type SearchExerciseModalProp = CompositeScreenProps<
    NativeStackScreenProps<ExerciseStackParamList, 'search_exercise'>,
    NativeStackScreenProps<RootStackParamList>
>;

export type FilteredExercisesModalProp = CompositeScreenProps<
    NativeStackScreenProps<ExerciseStackParamList, 'filtered_exercises'>,
    NativeStackScreenProps<RootStackParamList>
>;

export type UpdateWorkoutDayModalProp = CompositeScreenProps<
    NativeStackScreenProps<UpdateWorkoutDayStackParamList, 'update_workout_day_modal'>,
    NativeStackScreenProps<RootStackParamList>
>;

export type ExerciseDetailsModalProp = CompositeScreenProps<
    NativeStackScreenProps<UpdateWorkoutDayStackParamList, 'update_exercise_details'>,
    NativeStackScreenProps<RootStackParamList>
>;

export type WorkoutsStackChildScreenProp =
    | WorkoutsMainScreenProp['navigation']
    | WorkoutDayDetailsScreenProp['navigation']
    | ExercisesDetailsScreenProp['navigation']

export type BottomBarChildScreenProp =
    | HomeScreenProp['navigation']
    | WorkoutsScreenProp['navigation']
    | CalendarScreenProp['navigation']
    | SettingsScreenProp['navigation'];

export type ExerciseStackChildScreenProp =
    | SearchExerciseModalProp['navigation']
    | FilteredExercisesModalProp['navigation']

export type WorkoutDayStackChildScreenProp =
    | UpdateWorkoutDayModalProp['navigation']
    | ExerciseDetailsModalProp['navigation']

export type RootChildScreenProp =
    | LanguageSelectionModalProp['navigation']
    | UpdateWorkoutPlanModalProp['navigation']
    | SelectWorkoutPlanModalProp['navigation']
