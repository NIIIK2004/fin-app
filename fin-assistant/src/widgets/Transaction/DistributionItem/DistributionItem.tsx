import styles from "./DistributionItem.module.css";
import { formatCurrency } from '../../../shared/lib/formatters/formatCurrency';

type Props = {
    emoji: string;
    title: string;
    amount: number;
};

export const DistributionItem = ({ emoji, title, amount }: Props) => {
    return (
        <li className={styles.distribution}>
            <div className={styles.distributionLeft}>
                <span className={styles.distributionEmoji}>{emoji}</span>
                <div className={styles.distributionInfo}>
                    <h2 className={styles.distributionTitle}>{title}</h2>
                    <span className={styles.distributionType}>Goal</span>
                </div>
            </div>

            <span className={styles.amount}>
                {formatCurrency(-amount)}
            </span>
        </li>
    );
};