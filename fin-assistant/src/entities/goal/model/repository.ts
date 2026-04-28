import { addDoc, collection, doc, getDocs, query, updateDoc, where, writeBatch } from "firebase/firestore";
import { auth } from "../../../app/providers/auth";
import { db } from "../../../app/providers/firebase";
import type { Goal } from "./types";

const goalsCollection = collection(db, "goals");

export const createGoal = async (
    goal: Omit<Goal, "id">
) => {
    const docRef = await addDoc(goalsCollection, goal);
    return docRef.id
}
export const getGoals = async (): Promise<Goal[]> => {
    const uid = auth.currentUser?.uid;

    if (!uid) throw new Error("No user");

    const q = query(
        goalsCollection,
        where("userId", "==", uid)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
    })) as Goal[];
};

export const updateGoalsBatch = async (goals: Goal[]) => {
    const batch = writeBatch(db);

    goals.forEach((goal) => {
        const ref = doc(db, "goals", goal.id);

        batch.update(ref, {
            currentAmount: goal.currentAmount,
            isCompleted:
                goal.currentAmount >= goal.targetAmount,
        });
    });

    await batch.commit();
};