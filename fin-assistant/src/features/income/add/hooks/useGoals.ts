import { useEffect, useState } from "react";
import type { Goal } from "../../../../entities/goal/model/types";
import { auth } from "../../../../app/providers/auth";
import { getGoals } from "../../../../entities/goal/model/repository";

export const useGoals = () => {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const uid = auth.currentUser?.uid;

    const fetchGoals = async () => {
        if (!uid) return;

        try {
            setLoading(true);
            const data = await getGoals();
            setGoals(data);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    return {
        goals,
        loading,
        error,
        refetch: fetchGoals,
    };
};