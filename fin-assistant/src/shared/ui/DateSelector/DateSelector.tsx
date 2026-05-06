import { useState } from "react";
import styles from "./DateSelector.module.css";
import { DateCarousel } from "./DateCarousel/DateCarousel";
import { addMonths, format } from "date-fns";
import { ru } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
    value: Date;
    onChange: (date: Date) => void;
};

export const DateSelector = ({ value, onChange }: Props) => {
    const [currentMonth, setCurrentMonth] = useState(value);

    const handlePrevMonth = () => {
        setCurrentMonth((prev) => addMonths(prev, -1));
    };

    const handleNextMonth = () => {
        setCurrentMonth((prev) => addMonths(prev, 1));
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h2 className="titleBody">
                    {format(currentMonth, "LLLL", { locale: ru })}
                </h2>

                <div className={styles.controls}>
                    <button onClick={handlePrevMonth}><ChevronLeft size={28} /></button>
                    <button onClick={handleNextMonth}><ChevronRight size={28} /></button>
                </div>
            </div>

            <DateCarousel
                currentDate={currentMonth}
                selectedDate={value}
                onSelect={onChange}
            />
        </div>
    );
};