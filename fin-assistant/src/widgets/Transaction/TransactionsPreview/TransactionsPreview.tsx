import { useNavigate } from "react-router-dom";
import { useTransactions } from "../../../features/income/get/hooks/useTransactions";
import { Button } from '../../../shared/ui/Button/Button';
import { TransactionsWidget } from "../TransactionsWidget/TransactionsWidget";
import styles from "./TransactionsPreview.module.css";

export const TransactionsPreview = () => {
    const { transactions, loading } = useTransactions(5);
    const navigate = useNavigate();

    return (
        <section className={styles.wrapper}>
            <div className={styles.wrapperTop}>
                <h2 className="titleBody">Transactions</h2>
                <Button
                    className="smallButtonGray"
                    width="auto"
                    onClick={() => navigate("/history")}
                >
                    View All
                </Button>
            </div>

            <div className={styles.groupWrapper}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    transactions.map((tx) => (
                        <TransactionsWidget key={tx.id} tx={tx} />
                    ))
                )}
            </div>
        </section>
    );
};