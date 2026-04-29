import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "../KanyeQuote.module.css";

export const KanyeQuoteSkeleton = () => {
    return (
            <div className={styles.wrapper}>
                <Skeleton count={1} height={21} />

                <div className={styles.actions}>
                    <Skeleton width={105} height={28} borderRadius={100} />
                    <Skeleton width={52} height={28} borderRadius={100} />
                </div>
            </div>
    );
};