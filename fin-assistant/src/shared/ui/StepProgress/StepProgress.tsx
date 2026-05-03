import styles from "./StepProgress.module.css";

type Props = {
    current: number;
    total: number;
};

export const StepProgress = ({ current, total }: Props) => {
    const percent = (current / total) * 100;

    return (
        <div className={styles.wrapper}>
            {/* <div className={styles.bar}>
                <div
                    className={styles.fill}
                    style={{ width: `${percent}%` }}
                />
            </div> */}

            <span className={styles.text}>
                Step {current} of {total}
            </span>
        </div>
    );
};