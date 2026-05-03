import { TransactionsList } from "../../features/income/get/ui/TransactionsList";

export const TransactionsWidget = () => {
    return (
        <section>
            <h2>Transactions</h2>
            <TransactionsList limit={5} />
        </section>
    );
};