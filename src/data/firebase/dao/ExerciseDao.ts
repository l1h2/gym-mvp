import BaseDao from "./BaseDao";
import { CollectionName } from "../CollectionName";
import { ExerciseDataModel } from "../collections/Exercises";

class ExerciseDao {
    async getAllExercises() {
        const exercises = await BaseDao.collectionRead<ExerciseDataModel[]>(CollectionName.exercises) as ExerciseDataModel[];
        return exercises;
    };
}

export default new ExerciseDao();
