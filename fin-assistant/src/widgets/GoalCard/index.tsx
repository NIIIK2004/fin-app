import { formatCurrency } from "../../shared/lib/formatters/formatCurrency";
import { Card } from "../../shared/ui/Card/Card";
import styles from "./GoalCard.module.css";

type GoalCardProps = {
    emoji: string;
    title: string;
    targetAmount: number;
    currentAmount: number;
    incomePercent: number;
    type: "goal" | "expense";
};

export const GoalCard = ({
    emoji,
    title,
    targetAmount,
    currentAmount,
    incomePercent,
    type,
}: GoalCardProps) => {
    const progress = Math.min(
        (currentAmount / targetAmount) * 100,
        100
    );

    return (
        <Card>
            <div className={styles.header}>
                <div className={styles.title}>
                    <div className={styles.titleEmoji}>{emoji}</div>
                    <h2 className="titleDescriptionModal">{title}</h2>
                </div>

                <div className={styles.amountTarget}>
                    <h2 className="titleBody">{formatCurrency(targetAmount)}</h2>
                </div>
            </div>

            <div className={styles.badgesWrapper}>
                <div className={styles.progressBar}>
                    <div
                        className={styles.progressFill}
                        style={{
                            width: `${progress}%`,
                        }}
                    />
                    <p className={styles.currentAmount}>
                        {formatCurrency(currentAmount)}
                    </p>
                </div>

                <div className={styles.badges}>
                    <span className={styles.badge}>
                        {incomePercent}%
                    </span>
                    <span className={styles.badge}>
                        {type}
                    </span>
                </div>

            </div>
        </Card>
    );
};