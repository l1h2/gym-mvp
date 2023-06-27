import { CollectionName } from "../CollectionName";
import { UserDataModel } from "../collections/Users";
import BaseDao from './BaseDao';
import { auth } from '../firebase';

import { languageStore } from "../../../shared/language";

class UserDao {

    getUserID() {return auth.currentUser?.uid as string}

    async getUser(userID: string) {
        const user = await BaseDao.documentRead<UserDataModel>(CollectionName.users, userID);
        if (!user) {
            const newUser: UserDataModel = {
                username: '',
                displayName: auth.currentUser?.displayName,
                email: auth.currentUser?.email,
                emailVerified: auth.currentUser?.emailVerified,
                isAnonymous: auth.currentUser?.isAnonymous,
                persisted_language: {
                    language: languageStore.defaultLanguage,
                    isDeviceLanguage: true,
                },
                activeWorkoutPlan: {},
            };
            await BaseDao.documentWrite(CollectionName.users, userID, newUser);
            return newUser;
        }
        return user;
    }
    
    async setLanguage(language: UserDataModel['persisted_language']) {
        const userID = this.getUserID();
        const value = {'persisted_language': language};
        await BaseDao.documentWrite(CollectionName.users, userID, value);
    }

    async setActiveWorkoutPlan(newPlan: UserDataModel['activeWorkoutPlan']) {
        const userID = this.getUserID();
        const value = {'activeWorkoutPlan': newPlan};
        await BaseDao.documentWrite(CollectionName.users, userID, value);
    }
}

export default new UserDao();
