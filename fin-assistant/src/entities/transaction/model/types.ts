export type Transaction = {
    id: string;
    type: "income" | "expense";
    amount: number;
    note?: string;
    freeBalance: number;
    distributions: {
        goalId: string;
        goalTitle: string;
        goalEmoji: string;
        amount: number;
    }[];

    createdAt: number;
    userId: string;
};