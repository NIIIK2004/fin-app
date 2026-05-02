import Skeleton from "react-loading-skeleton";
import { BottomSheet } from "../../../shared/ui/BottomSheet/BottomSheet";
import styles from "./EmojiSheet.module.css";
import { lazy, memo, Suspense } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (emoji: string) => void;
};

export const EmojiSheet = memo(({ isOpen, onClose, onSelect }: Props) => {
    const EmojiPicker = lazy(() => import("emoji-picker-react"));

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
            <div
                style={{
                    display: isOpen ? "block" : "none",
                }}
            >
                <h2 className="titleModal">Select emoji</h2>

                <Suspense fallback={
                    <div className={styles.wrapper}>
                        <Skeleton height={40} borderRadius={12} />

                        <div className={styles.grid}>
                            {Array.from({ length: 64 }).map((_, i) => (
                                <Skeleton key={i} width={32} height={32} borderRadius={8} />
                            ))}
                        </div>
                    </div>
                }>
                    <EmojiPicker
                        onEmojiClick={(e) => {
                            onSelect(e.emoji);
                            onClose();
                        }}
                        width="100%"
                        searchDisabled
                        autoFocusSearch={false}
                        skinTonesDisabled
                        previewConfig={{ showPreview: false }}
                    />
                </Suspense>
            </div>
        </BottomSheet>
    );
});