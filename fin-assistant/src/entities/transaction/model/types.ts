export type TransactionDistribution = {
    goalId: string;
    goalTitle: string;
    amount: number;
}

export type Transaction = {
    id: string;
    type: "income";
    amount: number;
    distributions: TransactionDistribution[];
    createdAt: number;
};