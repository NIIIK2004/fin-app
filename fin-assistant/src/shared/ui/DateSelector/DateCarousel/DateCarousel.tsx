import { enUS, ru } from "date-fns/locale";
import styles from "./DateCarousel.module.css";
import { eachDayOfInterval, endOfMonth, format, isSameDay, startOfMonth } from "date-fns";

type Props = {
    currentDate: Date;
    selectedDate: Date;
    onSelect: (date: Date) => void;
};

export const DateCarousel = ({
    currentDate,
    selectedDate,
    onSelect,
}: Props) => {
    const days = eachDayOfInterval({
        start: startOfMonth(currentDate),
        end: endOfMonth(currentDate),
    });

    return (
        <div className={styles.scroll}>
            {days.map((day) => {
                const isActive = isSameDay(day, selectedDate);

                return (
                    <div
                        key={day.toISOString()}
                        className={`${styles.day} ${isActive ? styles.active : ""}`}
                        onClick={() => onSelect(day)}
                    >
                        <span className={styles.week}>
                            {format(day, "EE", { locale: enUS })}
                        </span>

                        <span className={styles.date}>
                            {format(day, "dd")}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};