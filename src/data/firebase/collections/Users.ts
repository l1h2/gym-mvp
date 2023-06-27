import { WorkoutPlanDataModel } from "./Workouts";

export interface UserDataModel {
  displayName: string | null | undefined;
  username: string;
  email: string | null | undefined;
  emailVerified: boolean | undefined;
  isAnonymous: boolean | undefined;
  persisted_language: {
    language: string;
    isDeviceLanguage: boolean;
  },
  activeWorkoutPlan: WorkoutPlanDataModel | {};
}
