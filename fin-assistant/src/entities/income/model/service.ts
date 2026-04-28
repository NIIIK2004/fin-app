import { auth } from "../../../app/providers/auth";
import { getGoals, updateGoalsBatch } from "../../goal/model/repository";
import { calculateIncomePreview } from "../../goal/model/service";
import { createTransaction } from "../../transaction/model/repository";

export const addIncomeService = async (
    income: number,
    note?: string
) => {
    const goals = await getGoals();
    const uid = auth.currentUser?.uid;

    if (!uid) {
        throw new Error("No user");
    }

    if (!goals.length) {
        throw new Error("No goals found");
    }

    const preview = calculateIncomePreview(
        income,
        goals
    );

    const updatedGoals = goals.map((goal) => {
        const distribution = preview.distributions.find(
            (item) => item.goalId === goal.id
        );

        if (!distribution) {
            return goal;
        }

        return {
            ...goal,
            currentAmount:
                goal.currentAmount + distribution.amount,
        };
    });

    await updateGoalsBatch(updatedGoals);

    await createTransaction({
        type: "income",
        amount: income,
        note: note ?? "",
        freeBalance: preview.freeBalance,
        distributions: preview.distributions,
        createdAt: Date.now(),
        userId: uid,
    });

    return updatedGoals;
};