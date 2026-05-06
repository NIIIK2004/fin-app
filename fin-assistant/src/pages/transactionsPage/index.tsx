import { useState } from "react";
import { useTransactions } from "../../features/income/get/hooks/useTransactions";
import { DateSelector } from "../../shared/ui/DateSelector/DateSelector";
import { TransactionGroup } from "../../widgets/Transaction/TransactionGroup/TransactionGroup";
import styles from "./TransactionsPage.module.css";

export const TransactionsPage = () => {
    const { transactions, loading } = useTransactions();
    const [selectedDate, setSelectedDate] = useState(new Date());

    if (loading) return <p>Loading...</p>;

    const filtered = transactions.filter((tx) => {
        const txDate = new Date(tx.createdAt);

        return (
            txDate.getFullYear() === selectedDate.getFullYear() &&
            txDate.getMonth() === selectedDate.getMonth() &&
            txDate.getDate() === selectedDate.getDate()
        );
    });

    return (
        <div className="container">
            <div className={styles.page}>
                <DateSelector
                    value={selectedDate}
                    onChange={setSelectedDate}
                />

                {filtered.length === 0 ? (
                    <div className={styles.empty}>
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M56.9898 54.1457C48.8618 64.5873 38.0618 66.7873 29.2722 63.1441C23.5842 59.4937 19.2122 51.8537 18.7874 45.0617C18.7018 43.776 18.6594 42.4878 18.6602 41.1993C18.6602 40.3513 18.6602 39.5865 18.7882 38.7377C18.8722 38.1433 19.0842 37.5489 19.1274 36.9977C19.5514 33.7289 21.5466 35.2993 23.7962 36.0633C23.9658 36.1057 25.409 36.6577 25.5362 36.5305C25.7914 36.2761 25.6218 34.0689 25.6642 33.7289C25.961 31.1401 26.1306 28.4233 26.937 25.9193C27.1498 25.3249 27.4042 23.7545 27.9986 23.4569C29.1442 22.9049 31.1394 24.2209 32.073 24.6033C32.2426 24.6457 33.389 25.3673 33.601 25.1977C33.941 24.8577 34.4498 24.0089 34.7474 23.5841C39.9882 16.0969 40.073 7.90408 41.8778 7.41288C44.4994 6.70008 52.0602 17.7873 55.6298 30.9705C55.9274 31.2665 57.0738 30.2905 57.2434 30.1633C59.0258 28.8481 60.7666 26.9377 61.1906 29.6969C61.7002 32.8809 60.8938 37.1249 58.729 39.5865C56.5642 42.0481 55.0138 44.4681 55.121 44.4681C56.097 45.4441 60.1298 43.5769 60.7242 44.6801C62.0402 47.1841 57.965 52.3201 56.9882 54.1457H56.9898Z" fill="#1E9A64" />
                            <path d="M43.152 33.3895C42.7704 35.6815 42.4304 38.0159 41.8792 40.2655C39.6712 49.1367 34.4936 58.6447 28.2536 65.3079C27.0864 66.5591 24.8616 69.3879 20.8616 72.5879" stroke="#292524" stroke-width="0.32" stroke-miterlimit="2.854" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        No transactions for this day
                    </div>
                ) : (
                    filtered.map((tx) => (
                        <TransactionGroup key={tx.id} tx={tx} />
                    ))
                )}
            </div>
        </div>
    );
};