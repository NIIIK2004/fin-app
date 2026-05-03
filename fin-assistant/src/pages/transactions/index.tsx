import { TransactionsList } from "../../features/income/get/ui/TransactionsList";

export const TransactionsPage = () => {
    return (
        <div className="container">
            <h1>All Transactions</h1>
            <TransactionsList />
        </div>
    );
};