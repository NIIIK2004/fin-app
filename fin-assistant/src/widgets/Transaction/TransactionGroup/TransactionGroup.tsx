import type { Transaction } from "../../../entities/transaction/model/types";
import { formatCurrency } from "../../../shared/lib/formatters/formatCurrency";
import { DistributionItem } from "../DistributionItem/DistributionItem";
import styles from "./TransactionGroup.module.css";

type Props = {
    tx: Transaction;
};


export const TransactionGroup = ({ tx }: Props) => {
    return (
        <div className={styles.group}>
            <h1 className="titleBody">Transactions</h1>

            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    {new Date(tx.createdAt).toLocaleDateString()}
                </div>

                <div className={styles.headerRight}>
                    <strong>+ {formatCurrency(tx.amount)}</strong>
                    <span>Remaining: {formatCurrency(tx.freeBalance)}</span>
                </div>

            </div>

            <ul className={styles.list}>
                {tx.distributions.map((d: any) => (
                    <DistributionItem
                        key={`${tx.id}-${d.goalId}`}
                        emoji={d.goalEmoji}
                        title={d.goalTitle}
                        amount={d.amount}
                    />
                ))}
            </ul>
        </div>
    );
};