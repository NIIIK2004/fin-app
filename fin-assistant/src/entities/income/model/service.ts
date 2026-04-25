import { getGoals, updateGoalsBatch } from "../../goal/model/repository";
import type { Goal } from "../../goal/model/types";
import { createTransaction } from "../../transaction/model/repository";

export const distributeIncome = (
    income: number,
    goals: Goal[]
) => {
    return goals.map((goal) => {
        const part =
            (income * goal.incomePercent) / 100;

        return {
            ...goal,
            currentAmount: goal.currentAmount + part,
        };
    });
};

export const addIncomeService = async (income: number) => {
    const goals = await getGoals();

    if (!goals.length) {
        throw new Error("No goals found");
    }

    //* 1. Считаем распределение для истории
    const distributions = goals.map((goal) => {
        const amount =
            (income * goal.incomePercent) / 100;

        return {
            goalId: goal.id,
            goalTitle: goal.title,
            amount,
        };
    });

    //* 2. Обновляем цели
    const updatedGoals: Goal[] = goals.map(
        (goal) => {
            const add =
                (income * goal.incomePercent) / 100;

            return {
                ...goal,
                currentAmount:
                    goal.currentAmount + add,
            };
        }
    );

    await updateGoalsBatch(updatedGoals);

    //* 3. Создаём транзакцию
    await createTransaction({
        type: "income",
        amount: income,
        distributions,
        createdAt: Date.now(),
    });

    return updatedGoals;
};