import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../app/providers/firebase";
import type { Transaction } from "./types";

const transactionCollection = collection(db, "transactions")

export const createTransaction = async (
    data: Omit<Transaction, "id">
) => {
    const docRef = await addDoc(
        transactionCollection,
        data
    )

    return docRef.id;
}

export const getTransactions = async () => {
    const q = query(
        transactionCollection,
        orderBy("createdAt", "desc")
    )

    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })) as Transaction[];
}
