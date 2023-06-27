import { ExerciseDataModel } from "./Exercises";

export interface WorkoutPlanDataModel {
    createdBy: string;
    name: string;
    id: string;
    workoutDays: WorkoutDay[];
}

export interface WorkoutDay {
    days: string[];
    name: string;
    exercises: Exercise[];
}

export interface Exercise extends ExerciseDataModel{
    comment?: string;
    reps?: number;
    rest?: number;
    sets?: number;
    weight?: number;
}
