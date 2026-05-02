import { useEffect, useMemo, useState } from "react";

import { BottomSheet } from "../../../../shared/ui/BottomSheet/BottomSheet";
import { Button } from '../../../../shared/ui/Button/Button';
import { Input } from "../../../../shared/ui/Input/Input";
import styles from "./AddIncomeSheet.module.css";

import { getGoals } from "../../../../entities/goal/model/repository";
import { calculateIncomePreview } from "../../../../entities/goal/model/service";
import { addIncomeService } from "../../../../entities/income/model/service";
import { getTransactions } from "../../../../entities/transaction/model/repository";

import type { Goal } from "../../../../entities/goal/model/types";
import clsx from 'clsx';
import { formatCurrency } from "../../../../shared/lib/formatters/formatCurrency";
import toast from "react-hot-toast";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
};

const presets = [5000, 10000, 15000, 20000];

type Selected = "last" | "enter" | number;

export const AddIncomeSheet = ({ isOpen, onClose, onSuccess }: Props) => {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [transactions, setTransactions] = useState<any[]>([]);

    const [selected, setSelected] = useState<Selected>("last");
    const [customValue, setCustomValue] = useState("");
    const [note, setNote] = useState("");
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        getGoals().then(setGoals);
        getTransactions().then(setTransactions);
    }, []);

    const lastIncome = useMemo(() => {
        return transactions[0]?.amount ?? 0;
    }, [transactions]);

    const amountValue = useMemo(() => {
        if (selected === "enter") return Number(customValue);
        if (selected === "last") return lastIncome;
        return Number(selected);
    }, [selected, customValue, lastIncome]);

    const preview = useMemo(() => {
        if (!amountValue || !goals.length) return null;

        return calculateIncomePreview(amountValue, goals);
    }, [amountValue, goals]);

    const handleSubmit = async () => {
        if (!amountValue || amountValue <= 0) return;

        await addIncomeService(amountValue, note);

        toast.success("Доход добавлен 💸");
        setCustomValue("");
        setNote("");
        setSelected("last");

        onSuccess?.();

        onClose();
    };

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose}>

            <section className={styles.header}>
                <h1 className="titleModal">Add money</h1>
                <Button onClick={() => setShowPreview(p => !p)} className="smallButtonGray">{showPreview ? "Hide" : "Show"}</Button>
            </section>
            <section>
                <ul className={styles.wrapper}>

                    <li className={styles.presets}>
                        <ul className={styles.presetsWrapper}>
                            <li>
                                <button
                                    className={clsx(styles.preset, selected === "last" ? styles.active : "")}
                                    onClick={() => setSelected("last")}
                                >
                                    {formatCurrency(lastIncome)}

                                    <span className={styles.lastBlock}>last add</span>
                                </button>

                                {presets.map((p) => (
                                    <button
                                        key={p}
                                        className={clsx(styles.preset, selected === p ? styles.active : "")}
                                        onClick={() => setSelected(p)}
                                    >
                                        {formatCurrency(p)}
                                    </button>
                                ))}

                                <button
                                    className={clsx(styles.preset, selected === "enter" ? styles.active : "")}
                                    onClick={() => setSelected("enter")}
                                >
                                    Enter...
                                </button>
                            </li>
                        </ul>
                    </li>
                    {selected === "enter" && (
                        <li>
                            <Input
                                type="number"
                                label="Enter amount"
                                value={customValue}
                                onChange={setCustomValue}
                                inputMode="decimal"
                                fontSize={15}
                                className={styles.inputNote}
                            />
                        </li>
                    )}
                    <li>
                        <Input
                            label="Note"
                            value={note}
                            onChange={setNote}
                            placeholder="Add note (Optional)"
                            type="text"
                            inputMode="text"
                            fontSize={15}
                            className={styles.inputNote}
                        />
                    </li>

                    {showPreview && preview && (
                        <li className={styles.preview}>

                            <h3 className="titleDescriptionModal">Distribution</h3>
                            <ul className={styles.wrapperRow}>
                                {preview.distributions.map((d) => (
                                    <li key={d.goalId} className={styles.row}>
                                        <div className={styles.rowEmoji}>
                                            <span>{d.emoji}</span>
                                        </div>
                                        <span>{d.goalTitle}</span>
                                        <span>=</span>
                                        <span>{formatCurrency(d.amount)}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className={styles.free}>
                                Free: {formatCurrency(preview.freeBalance)} ₽
                            </div>
                        </li>
                    )}
                </ul>
            </section>

            <section className={styles.bottomAction}>

                <div className={styles.summary}>
                    <p>Total added income:</p>
                    <p>{formatCurrency(amountValue)}</p>
                </div>
                <Button
                    disabled={!amountValue || amountValue <= 0}
                    onClick={handleSubmit}
                >
                    Add Income
                </Button>
            </section>
        </BottomSheet>
    );
};
