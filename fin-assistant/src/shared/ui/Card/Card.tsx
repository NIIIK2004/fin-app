import styles from "./Card.module.css";
import clsx from "clsx";

type CardProps = {
    children: React.ReactNode;
    padding?: number;
    radius?: number;
    className?: string;
    onClick?: () => void;
};

export const Card = ({
    children,
    padding = 13,
    radius = 24,
    className,
    onClick,
}: CardProps) => {
    return (
        <div
            onClick={onClick}
            className={clsx(
                styles.card,
                className
            )}
            style={{
                padding: `${padding}px`,
                borderRadius: `${radius}px`,
            }}
        >
            {children}
        </div>
    );
};