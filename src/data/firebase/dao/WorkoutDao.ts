import { CollectionName } from "../CollectionName";
import BaseDao from './BaseDao';
import { WorkoutPlanDataModel } from "../collections/Workouts";

class WorkoutDao {
    async addWorkoutPlan(workoutPlan: WorkoutPlanDataModel) {
        await BaseDao.documentWrite(CollectionName.workout_plans(), workoutPlan.id, workoutPlan);
    }

    async deleteWorkoutPlan(planID: string) {
        await BaseDao.documentDelete(CollectionName.workout_plans(), planID);
    }

    async getWorkoutPlans(): Promise<WorkoutPlanDataModel[]> {
        const workoutPlans = await BaseDao.collectionRead<WorkoutPlanDataModel[]>(CollectionName.workout_plans()) as WorkoutPlanDataModel[];
        return workoutPlans;
    }
}

export default new WorkoutDao();
