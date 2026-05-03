import { Link } from "react-router-dom";
import styles from "./TransactionsList.module.css";
import { useTransactions } from "../hooks/useTransactions";

type Props = {
    limit?: number;
};

export const TransactionsList = ({ limit }: Props) => {
    const { transactions, loading, error } = useTransactions();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const data = limit
        ? transactions.slice(0, limit)
        : transactions;

    return (
        <div className={styles.wrapper}>
            {data.map((tx) => (
                <div key={tx.id} className={styles.item}>
                    <div>
                        <strong>{tx.amount} ₽</strong>
                        <p>{tx.note || "No note"}</p>
                    </div>

                    <span>{new Date(tx.createdAt).toLocaleDateString()}</span>
                </div>
            ))}

            {limit && (
                <Link to="/transactions" className={styles.viewAll}>
                    View All
                </Link>
            )}
        </div>
    );
};