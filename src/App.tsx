import React, { useState, useEffect } from "react";
import type { Transaction } from "./types";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Overview from "./components/Overview";
import ExpensePieChart from "./components/ExpensePieChart";

const App: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        const stored = localStorage.getItem("transactions");
        return stored ? JSON.parse(stored) : [];
    });
    const [showForm, setShowForm] = useState<Boolean>(false);

    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions)); // <-- added
    }, [transactions]);

    const addTransaction = (t: Transaction) => {
        setTransactions(prev => [...prev, t]);
    };

    const deleteTransaction = (id: number) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
    };

    return (
        <div className="min-h-screen w-full flex flex-col overflow-x-hidden">
            {/* Header */}
            <div className="flex justify-between bg-teal-950 text-white p-6">
                <span className="text-3xl font-bold">Expense Tracker</span>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-slate-700 px-4 py-2 rounded-md"
                >
                    Add Transaction
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                <div className="flex flex-col md:flex-row gap-4 p-4 md:overflow-hidden">
                    {/* Transactions List */}
                    <div className="w-full md:w-3/4 flex flex-col overflow-hidden">
                        <h2 className="text-xl font-semibold mb-2">Transactions</h2>
                        <div className="flex-1">
                            <TransactionList
                                transactions={transactions}
                                onDelete={deleteTransaction}
                            />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full md:w-1/4 flex flex-col gap-4">
                        <div className="p-6 bg-black text-white font-bold rounded-lg">
                            <h2 className="text-3xl font-semibold mb-4">Overview</h2>
                            <Overview transactions={transactions} />
                        </div>
                        <ExpensePieChart transactions={transactions} />
                    </div>
                </div>
            </div>

            {/* Modal Form */}
            {showForm && (
                <TransactionForm onAdd={addTransaction} setShowForm={setShowForm} />
            )}
        </div>



    );
};

export default App;