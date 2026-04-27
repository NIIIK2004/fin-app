import clsx from 'clsx';
import styles from "./Button.module.css";

type ButtonProps = {
    children: React.ReactNode;
    type?: "submit" | "reset" | "button";
    width?: "auto" | "full";
    disabled?: boolean;
    padding?: number;
    radius?: number;
    fontSize?: number;
    className?: string;
    onClick?: () => void;
}

export const Button = ({
    children,
    type,
    disabled = false,
    width = "full",
    padding = 15,
    radius = 16,
    fontSize = 16,
    className,
    onClick,
}: ButtonProps) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={clsx(
                styles.button,
                styles[width],
                disabled && styles.disabled,
                className
            )}
            style={{
                padding,
                borderRadius: radius,
                fontSize,
            }}
        >
            {children}
        </button>
    );
};