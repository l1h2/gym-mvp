import LanguageInterface from '../shared/language/LanguageInterface';
import { UserDataModel } from '../data/firebase/collections/Users';
import { Exercise, WorkoutDay, WorkoutPlanDataModel } from '../data/firebase/collections/Workouts';
import { ExerciseDataModel } from '../data/firebase/collections/Exercises';

interface ModifiedUserProperties {
    language: LanguageInterface;
}

export interface UserState {
    user: UserDataModel & ModifiedUserProperties;
}

export interface ExerciseState {
    exerciseList: ExerciseDataModel[];
    searchedExercises: ExerciseDataModel[];
}

export interface WorkoutState {
    workoutPlans: WorkoutPlanDataModel[];
    editWorkoutPlan: WorkoutPlanDataModel;
    editWorkoutDay: WorkoutDay;
    newExerciseList: Exercise[];    
}
