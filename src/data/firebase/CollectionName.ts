import { auth } from './firebase';

export const CollectionName = {
    users: 'users',
    exercises: 'exercises',
    workout_plans: () => `users/${auth.currentUser?.uid}/workout_plans`,
};
