import UserDao from './firebase/dao/UserDao';
import ExerciseDao from './firebase/dao/ExerciseDao';
import WorkoutDao from './firebase/dao/WorkoutDao';

import { UserDataModel } from './firebase/collections/Users';
import { ExerciseDataModel } from './firebase/collections/Exercises';
import { WorkoutPlanDataModel } from './firebase/collections/Workouts';

class Repository {
    async getUser(userID: string) {
        return await UserDao.getUser(userID);
    };

    async setLanguage(language: UserDataModel['persisted_language']) {
        await UserDao.setLanguage(language);
    };

    async setActiveWorkoutPlan(workoutPlan: UserDataModel['activeWorkoutPlan']) {
        await UserDao.setActiveWorkoutPlan(workoutPlan);
    };

    async addWorkoutPlan(workoutPlan: WorkoutPlanDataModel) {
        await WorkoutDao.addWorkoutPlan(workoutPlan);
    };

    async deleteWorkoutPlan(planID: string) {
        await WorkoutDao.deleteWorkoutPlan(planID);
    };

    async getWorkoutPlans(): Promise<WorkoutPlanDataModel[]> {
        return await WorkoutDao.getWorkoutPlans();
    };

    async getAllExercises(): Promise<ExerciseDataModel[]> {
        return await ExerciseDao.getAllExercises();
    };

}

export default new Repository();
