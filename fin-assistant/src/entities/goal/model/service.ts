import { createGoal } from "./repository";
import type { Goal } from "./types";

type CreateGoalPayload = {
    title: string;
    description: string;
    emoji: string;

    targetAmount: number;
    currentAmount: number;

    incomePercent: number;
};

export const validateGoalPercent = (
    incomePercent: number
) => {
    if (incomePercent <= 0) {
        throw new Error("Percent must be greater than 0");
    }
    if (incomePercent > 100) {
        throw new Error("Percent cannot be greater than 100");
    }
}

export const checkGoalCompletion = (
    currentAmount: number,
    targetAmount: number
) => {
    return currentAmount >= targetAmount;
};

export const createGoalService = async (
    payload: CreateGoalPayload
) => {
    validateGoalPercent(payload.incomePercent)

    const isCompleted = checkGoalCompletion(
        payload.currentAmount,
        payload.targetAmount,
    );

    const goalData: Omit<Goal, "id"> = {
        ...payload,
        isCompleted,
        createdAt: Date.now(),
    }

    return await createGoal(goalData)
}