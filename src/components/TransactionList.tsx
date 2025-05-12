import React, { useState } from "react";
import type { Transaction } from "../types";

interface Props {
    transactions: Transaction[];
    onDelete: (id: number) => void;
}

const TransactionList: React.FC<Props> = ({ transactions, onDelete }) => {

    const [filter, setFilter] = useState<string>("All");
    const [sorting, setSorting] = useState<string>("OldToNew");

    const filteredTransactions = transactions.filter(t =>
        filter === "All" ? true : t.type === filter
    ).sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sorting === "OldToNew" ? dateA - dateB : dateB - dateA;
    }
    );

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, "0");
        const month = date.toLocaleString("en-US", { month: "short" });
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div>
            <div className="flex">
                <div className="mb-4 mr-16">
                    <span className="mr-8">Filter</span>
                    <select onChange={(e) => setFilter(e.target.value)} className="bg-gray-200 p-2 rounded-md">
                        <option value="All">All</option>
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                </div>
                <div className="mb-4">
                    <span className="mr-8">Sort</span>
                    <select onChange={(e) => setSorting(e.target.value)} className="bg-gray-200 p-2 rounded-md">
                        <option value="OldToNew">Oldest to Newest</option>
                        <option value="NewToOld">Newest to Oldest</option>
                    </select>
                </div>
            </div>
            {
                filteredTransactions.length > 0 ?
                    (
                        <div className="overflow-y-auto overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead className="bg-teal-950 text-white">
                                <tr>
                                    <td className="p-2 rounded-tl-md">Date</td>
                                    <td className="p-2">Transaction Type</td>
                                    <td className="p-2">Category</td>
                                    <td className="p-2">Description</td>
                                    <td className="p-2 rounded-tr-md" colSpan={2}>Amount</td>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTransactions.map(t => (
                                    <tr key={t.id} className="border border-gray-200">
                                        <td className="p-2"> {formatDate(t.date)} </td>
                                        <td className="p-2"> {t.type} </td>
                                        <td className="p-2"> {t.category} </td>
                                        <td className="p-2"> {t.description} </td>
                                        <td className="p-2"> Rs. {t.amount.toFixed(2)} </td>
                                        <td className="p-2"> <button onClick={() => onDelete(t.id)} className="bg-rose-800 text-white p-2 rounded-sm"> Delete </button> </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                    ) :
                    (
                        <div> No transaction data to show </div>
                    )
            }

        </div>
    );
};

export default TransactionList;