import styles from "./BottomActions.module.css";
import { Button } from "../../shared/ui/Button/Button";

type Props = {
    onCreateGoal: () => void;
    onAddIncome: () => void;
    onCreateExpense: () => void;
};

export const BottomActions = ({
    onCreateGoal,
    onAddIncome,
    onCreateExpense,
}: Props) => {
    return (
        <div className={styles.wrapper}>
            <Button
                fontSize={14}
                radius={50}
                padding={10}
                className={styles.secondBtn}
                width="full"
                onClick={onCreateGoal}
            >
                Add Goals
            </Button>

            <Button
                fontSize={16}
                radius={50}
                padding={17}
                width="auto"
                className={styles.mainBtn}
                onClick={onAddIncome}
            >
                Add Income
            </Button>

            <Button
                fontSize={14}
                radius={50}
                padding={10}
                className={styles.secondBtn}
                width="full"
                onClick={onCreateExpense}
            >
                Add Expense
            </Button>
        </div>
    );
};