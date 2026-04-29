import { ClockFading, Settings2 } from "lucide-react";
import styles from "./Header.module.css";

type HeaderProps = {
    title?: string;
    logo?: React.ReactNode;
    onSettingsClick?: () => void;
    onHistoryClick?: () => void;
};

export const Header = ({
    title,
    logo,
    onSettingsClick,
    onHistoryClick,
}: HeaderProps) => {
    return (
        <header className={styles.header}>
            <ul className={styles.headerWrapper}>
                <li className={styles.left} style={{ width: "fit-content" }}>
                    {logo}LOGO
                </li>

                <li className={styles.center} style={{ width: "fit-content" }}>
                    {title ? (
                        <h1 className={styles.title}>
                            {title}
                        </h1>
                    ) : (
                        <div className="titleBody">
                            Money
                        </div>
                    )}
                </li>

                <li className={styles.right} style={{ width: "fit-content" }}>
                    <button
                        onClick={onHistoryClick}
                        className={styles.iconButton}
                    >
                        <ClockFading size={20} />
                    </button>

                    <button
                        onClick={onSettingsClick}
                        className={styles.iconButton}
                        style={{ width: "fit-content" }}
                    >
                        <Settings2 size={20} />
                    </button>

                </li>
            </ul>
        </header>
    );
};