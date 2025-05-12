import React, { useState } from "react";
import type {
    Transaction,
    TransactionType,
    Category,
    IncomeCategory,
    ExpenseCategory
} from "../types";

const incomeCategories: IncomeCategory[] = ["Salary", "Bonus", "Interest", "Investments"];
const expenseCategories: ExpenseCategory[] = ["Food", "Transportation", "Rent", "Utilities", "Entertainment", "Misc"];

interface Props {
    onAdd: (t: Transaction) => void;
    setShowForm: React.Dispatch<React.SetStateAction<Boolean>>;
}

const TransactionForm: React.FC<Props> = ({ onAdd, setShowForm }) => {

    const [form, setForm] = useState({
        date: "",
        description: "",
        category: "" as Category,
        amount: "",
        type: "Income" as TransactionType,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,
            ...(name === "type" ? { category: "" as Category } : {}),
        }));
    };

    const handleSubmit = () => {
        const { date, description, category, amount } = form;
        if (!date || !description || !category || !amount) {
            alert("Please fill all fields.");
            return;
        }
        if (parseFloat(form.amount)<=0) {
            alert("Please check the amount entered before submitting.");
            return;
        }
        const newTransaction: Transaction = {
            id: Date.now(),
            date: form.date,
            description: form.description,
            category: form.category,
            amount: parseFloat(form.amount),
            type: form.type,
        };
        onAdd(newTransaction);
        setForm({ date: "", description: "", category: "" as Category, amount: "", type: "Income" });
        setShowForm(false);
    };

    const categoryOptions = form.type === "Income" ? incomeCategories : expenseCategories;

    return (
        <div>
            <dialog className="modal modal-open">
                <div className="modal-box bg-teal-950">
                    <div className="mb-4 flex flex-col">
                        <h3 className="font-bold text-lg mb-4 text-white">Add Transaction Details</h3>
                        <input name="date" type="date" max={new Date().toISOString().split("T")[0]} value={form.date} onChange={handleChange} className="p-2 m-2 bg-gray-100 rounded-sm custom-date-input" />
                        
                        <select name="type" value={form.type} onChange={handleChange} className="p-2 m-2 bg-white rounded-sm">
                            <option value="Income">Income</option>
                            <option value="Expense">Expense</option>
                        </select>

                        <select name="category" value={form.category} onChange={handleChange} className="p-2 m-2 bg-white rounded-sm">
                            <option disabled value="">Select Category</option>
                            {categoryOptions.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>

                        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} className="p-2 m-2 bg-white rounded-sm" />

                        <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} className="p-2 m-2 bg-white rounded-sm" />
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-success" onClick={handleSubmit}>
                            Save
                        </button>
                        <button className="btn" onClick={() => setShowForm(false)}>
                            Close
                        </button>
                    </div>
                </div>
            </dialog >
        </div>
    );
};

export default TransactionForm;
