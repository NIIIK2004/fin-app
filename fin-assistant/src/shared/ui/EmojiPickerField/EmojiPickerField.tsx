import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import styles from "./EmojiPickerField.module.css";

type Props = {
    value: string;
    onChange: (emoji: string) => void;
};

export const EmojiPickerField = ({
    value,
    onChange,
}: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.wrapper}>
            <div
                className={styles.trigger}
                onClick={() => setOpen((p) => !p)}
            >
                {value || "😀"}
            </div>

            {open && (
                <div className={styles.picker}>
                    <EmojiPicker
                        onEmojiClick={(e) => {
                            onChange(e.emoji);
                            setOpen(false);
                        }}
                    />
                </div>
            )}
        </div>
    );
};