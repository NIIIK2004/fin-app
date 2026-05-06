import { useEffect, useState } from "react";
import { getTransactions } from "../../../../entities/transaction/model/repository";
import type { Transaction } from "../../../../entities/transaction/model/types";

export const useTransactions = (limit?: number) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    const fetch = async () => {
        try {
            const data = await getTransactions();
            setTransactions(limit ? data.slice(0, limit) : data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    return { transactions, loading, refetch: fetch };
};