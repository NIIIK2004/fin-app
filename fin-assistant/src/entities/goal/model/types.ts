export type Goal = {
    id: string;
    title: string;
    description: string;
    emoji: string;

    targetAmount: number;
    currentAmount: number;

    incomePercent: number;

    isCompleted: boolean;
    createdAt: number;
}