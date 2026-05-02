import clsx from "clsx";
import { Eraser } from "lucide-react";
import { useRef } from "react";
import styles from "./Textarea.module.css";

type TextareaProps = {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;

    width?: "auto" | "full";
    padding?: number;
    radius?: number;
    fontSize?: number;

    disabled?: boolean;
    error?: string;
    className?: string;

    rows?: number;
    maxLength?: number;
};

export const Textarea = ({
    value,
    onChange,
    label,
    placeholder,
    width = "full",
    padding = 15,
    radius = 16,
    fontSize = 16,
    disabled = false,
    error,
    className,
    rows = 3,
    maxLength,
}: TextareaProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    return (
        <div className={clsx(styles.wrapper, styles[width])}>
            {label && <label className={styles.label}>{label}</label>}

            <div
                onClick={() => textareaRef.current?.focus()}
                className={clsx(
                    styles.inputWrapper,
                    error && styles.error,
                    className
                )}
                style={{
                    padding: `${padding}px`,
                    borderRadius: `${radius}px`,
                }}
            >
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    rows={rows}
                    maxLength={maxLength}
                    className={styles.textarea}
                    style={{
                        fontSize: `${fontSize}px`,
                    }}
                />

                <div className={styles.buttonAction}>
                    {value && !disabled && (
                        <button
                            type="button"
                            onClick={() => onChange("")}
                            className={styles.iconButton}
                        >
                            <Eraser size={21} />
                        </button>
                    )}
                </div>
            </div>

            {error && (
                <span className={styles.errorText}>{error}</span>
            )}
        </div>
    );
};