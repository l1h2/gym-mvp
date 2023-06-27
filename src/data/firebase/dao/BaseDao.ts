import { db } from "../firebase";
import {
    doc,
    getDoc,
    getDocs,
    query,
    collection,
    where,
    limit,
    DocumentData,
    deleteDoc,
    deleteField,
    updateDoc,
    setDoc,
    writeBatch,
} from "firebase/firestore";

class BaseDao {
    private batch = writeBatch(db);

    addBatchWrite(
        collection: string,
        id: string,
        values: object,
    ) {
        const ref = doc(db, collection, id);
        this.batch.set(ref, values)
    };

    addBatchUpdate(
        collection: string,
        id: string,
        values: object,
    ) {
        const ref = doc(db, collection, id);
        this.batch.update(ref, values)
    };

    addBatchDelete(
        collection: string,
        id: string,
    ) {
        const ref = doc(db, collection, id);
        this.batch.delete(ref)
    };

    async commitWrites() {
        this.batch.commit()
    }

    async documentWrite(
        collection: string,
        id: string,
        values: object,
    ) {
        const ref = doc(db, collection, id);
        try {
            await setDoc(ref, values, {merge: true});
        } catch(err: any) {
            alert(err.message);
        }
    };

    async documentUpdate(
        collection: string,
        id: string,
        values: object,
    ) {
        const ref = doc(db, collection, id);
        try {
            await updateDoc(ref, values);
        } catch(err: any) {
            alert(err.message);
        }
    };

    async collectionRead<T>(collectionName: string): Promise<T | void> {
        const q = query(collection(db, collectionName));
        const result: (T | DocumentData)[] = [];
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc)=>{result.push(doc.data())});
            return result as T;
        } catch(err: any) {
            alert(err.message);
        }
    };

    async collectionQueryByField<T>(collectionName: string, fieldName: string, fieldValues: string[], maxResults: number): Promise<T | void> {
        const q = query(collection(db, collectionName), where(fieldName, 'in', fieldValues), limit(maxResults));
        const result: (T | DocumentData)[] = [];
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc)=>{result.push(doc.data())});
            return result as T;
        } catch(err: any) {
            alert(err.message);
        }
    };

    async documentRead<T>(
        collection: string,
        id: string,
    ): Promise<T | void> {
        const ref = doc(db, collection, id);
        try {
            const result = await getDoc(ref);
            return result.data() as T;
        } catch(err: any) {
            alert(err.message);
        }
    };

    async documentDelete<T>(
        collection: string,
        id: string,
    ): Promise<T | void> {
        const ref = doc(db, collection, id);
        try {
            await deleteDoc(ref);
        } catch(err: any) {
            alert(err.message);
        }
    };
    
    async fieldDelete<T>(
        collection: string,
        id: string,
        fieldName: string,
    ): Promise<T | void> {
        const ref = doc(db, collection, id);
        try {
            await updateDoc(ref, {[fieldName]: deleteField()});
        } catch(err: any) {
            alert(err.message);
        }
    };
}

export default new BaseDao();
