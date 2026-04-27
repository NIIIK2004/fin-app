import { useState } from "react";
import styles from "./Input.module.css";
import clsx from 'clsx';
import { Eye, EyeOff, X } from "lucide-react";
import { useRef } from "react";

type InputProps = {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    inputMode?: "text" | "numeric" | "decimal";
    type?: "text" | "number" | "password" | "tel" | "email";
    width?: "auto" | "full";
    padding?: number;
    radius?: number;
    fontSize?: number;
    disabled?: boolean;
    error?: string;
    className?: string;
}

export const Input = ({
    value,
    onChange,
    label,
    placeholder,
    inputMode = "text",
    type = "text",
    width = "full",
    padding = 15,
    radius = 16,
    fontSize = 16,
    disabled = false,
    error,
    className,
}: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const actualType = isPassword && showPassword ? "text" : type;
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div
            className={clsx(
                styles.wrapper,
                styles[width]
            )}
        >
            {label && (
                <label className={styles.label}>
                    {label}
                </label>
            )}

            <div
                onClick={() => inputRef.current?.focus()}
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
                <input
                    ref={inputRef}
                    value={value}
                    onChange={(e) =>
                        onChange(e.target.value)
                    }
                    placeholder={placeholder}
                    inputMode={inputMode}
                    type={actualType}
                    disabled={disabled}
                    className={styles.input}
                    style={{
                        fontSize: `${fontSize}px`,
                    }}
                />

                <div className={styles.buttonAction}>
                    {isPassword && (
                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword((p) => !p)
                            }
                            className={styles.iconButton}
                        >
                            {showPassword ? (
                                <Eye color="var(--black-text)" size={21} />
                            ) : (
                                <EyeOff size={21} />
                            )}
                        </button>
                    )}

                    {value && !disabled && (
                        <button
                            type="button"
                            onClick={() => onChange("")}
                            className={styles.iconButton}
                        >
                            <X size={21} />
                        </button>
                    )}
                </div>
            </div>

            {error && (
                <span className={styles.errorText}>
                    {error}
                </span>
            )}
        </div>
    );
};