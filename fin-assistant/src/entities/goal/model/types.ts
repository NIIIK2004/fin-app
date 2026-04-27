export type Goal = {
    id: string;
    title: string;
    description: string;
    emoji: string;
    type: string;

    targetAmount: number;
    currentAmount: number;

    incomePercent: number;

    isCompleted: boolean;
    createdAt: number;

    userId: string;
}