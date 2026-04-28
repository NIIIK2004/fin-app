import { motion, AnimatePresence } from "framer-motion";
import styles from "./BottomSheet.module.css";
import { useEffect } from "react";

type BottomSheetProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export const BottomSheet = ({
    isOpen,
    onClose,
    children,
}: BottomSheetProps) => {

    const handleDragEnd = (
        _: MouseEvent | TouchEvent | PointerEvent,
        info: any
    ) => {
        if (info.offset.y > 120) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className={styles.overlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.25,
                        }}
                        onClick={onClose}
                    />

                    <motion.div
                        className={styles.sheet}
                        initial={{ y: "100%", opacity: 0.95, scale: 0.82, rotateX: 18, }}
                        animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0, }}
                        exit={{ y: "100%", opacity: 0.98, scale: 0.89, rotateX: 0, }}
                        transition={{
                            duration: 0.43,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        drag="y"
                        dragDirectionLock
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={0.30}
                        onDragEnd={handleDragEnd}
                    >
                        <div className={styles.handle} />

                        {children}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};