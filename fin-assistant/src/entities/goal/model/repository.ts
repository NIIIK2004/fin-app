import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
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
    const snapshot = await getDocs(goalsCollection);

    return snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
    })) as Goal[];
};

export const updateGoal = async (
    id: string,
    data: Partial<Goal>
) => {
    const goalRef = doc(db, "goals", id)
    await updateDoc(goalRef, data)
}

export const updateGoalsBatch = async (goals: Goal[]) => {
    const promises = goals.map((goal) =>
        updateGoal(goal.id, {
            currentAmount: goal.currentAmount,
            isCompleted:
                goal.currentAmount >= goal.targetAmount,
        })
    );

    await Promise.all(promises);
};