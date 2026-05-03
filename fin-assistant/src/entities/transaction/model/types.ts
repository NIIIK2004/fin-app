export type Transaction = {
    id: string;
    type: "income" | "expense";
    amount: number;
    note?: string;
    freeBalance: number;
    distributions: {
        goalId: string;
        goalTitle: string;
        amount: number;
    }[];

    createdAt: number;
    userId: string;
};