import { auth } from "../../../app/providers/auth";
import { createGoal, getGoals } from "./repository";
import type { Goal } from "./types";

type Distribution = {
    emoji: string;
    goalId: string;
    goalTitle: string;
    amount: number;
};

type IncomePreviewResult = {
    distributions: Distribution[];
    freeBalance: number;
    totalDistributed: number;
};

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


export const validateTotalPercent = async (newPercent: number) => {
    const goals = await getGoals()

    const activeGoals = goals.filter((goal) => !goal.isCompleted)

    const totalPercent = activeGoals.reduce((sum, goal) => sum + goal.incomePercent, 0)

    if (totalPercent + newPercent > 100) {
        throw new Error(
            `Total percent cannot exceed 100%. Free balance left: ${100 - totalPercent
            }%`
        );
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
    const uid = auth.currentUser?.uid;

    if (!uid) throw new Error("No user");

    validateGoalPercent(payload.incomePercent);
    await validateTotalPercent(payload.incomePercent);

    const isCompleted = checkGoalCompletion(
        payload.currentAmount,
        payload.targetAmount,
    );

    const goalData: Omit<Goal, "id"> = {
        ...payload,
        userId: uid,
        isCompleted,
        createdAt: Date.now(),
        type: "goal",
    }

    return await createGoal(goalData)
}

export const calculateIncomePreview = (
    amount: number,
    goals: Goal[]
): IncomePreviewResult => {
    let freeBalance = amount;

    const distributions: Distribution[] = [];

    const activeGoals = goals.filter(
        (goal) => !goal.isCompleted
    );

    for (const goal of activeGoals) {
        const calculatedAmount =
            (amount * goal.incomePercent) / 100;

        const remainingToTarget =
            goal.targetAmount - goal.currentAmount;

        const actualAmount = Math.floor(Math.min(calculatedAmount, remainingToTarget));

        if (actualAmount > 0) {
            distributions.push({
                goalId: goal.id,
                goalTitle: goal.title,
                emoji: goal.emoji,
                amount: actualAmount,
            });

            freeBalance -= actualAmount;
        }
    }

    return {
        distributions,
        freeBalance,
        totalDistributed: amount,
    };
};