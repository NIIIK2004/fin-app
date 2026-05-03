import { useEffect, useState } from "react";
import { getTransactions } from "../../../../entities/transaction/model/repository";
import type { Transaction } from "../../../../entities/transaction/model/types";

export const useTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const data = await getTransactions();
            setTransactions(data);
        } catch (e: any) {
            setError(e.message || "Failed to load transactions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return {
        transactions,
        loading,
        error,
        refetch: fetchTransactions,
    };
};