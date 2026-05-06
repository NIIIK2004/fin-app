import type { Transaction } from "../../../entities/transaction/model/types";
import { formatCurrency } from "../../../shared/lib/formatters/formatCurrency";
import styles from "./TransactionsWidget.module.css";

type Props = {
    tx: Transaction;
};

export const TransactionsWidget = ({ tx }: Props) => {
    return (
        <div className={styles.group}>
            <div className={styles.header}>
                <div className={styles.headerRight}>
                    <strong>+ {formatCurrency(tx.amount)}</strong>
                    <span>Remaining: {formatCurrency(tx.freeBalance)}</span>
                </div>
                
                <div className={styles.headerLeft}>
                    {new Date(tx.createdAt).toLocaleDateString()}
                </div>
            </div>
        </div>
    );
};