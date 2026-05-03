import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "../KanyeQuote.module.css";

export const KanyeQuoteSkeleton = () => {
    return (
        // <Skeleton width={105} height={28} borderRadius={100} />
        //     <div className={styles.wrapper}>
        //         <Skeleton count={1} height={21} />

        //         <div className={styles.actions}>
        //             <Skeleton width={105} height={28} borderRadius={100} />
        //             <Skeleton width={52} height={28} borderRadius={100} />
        //         </div>
        //     </div>
        <>
            <Skeleton width="100%" height="100%" borderRadius={100} />
            <Skeleton width="100%" height="100%" borderRadius={100} />

            <div className={styles.actions}>
                <Skeleton width={105} height={25} borderRadius={100} />
                <Skeleton width={52} height={25} borderRadius={100} />
            </div>

        </>
    );
};