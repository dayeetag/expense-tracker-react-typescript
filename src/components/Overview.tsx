import React from "react";
import type { Transaction } from "../types";

interface Props {
    transactions: Transaction[];
}

const Overview: React.FC<Props> = ({ transactions }) => {
    const totalIncome = transactions
        .filter(t => t.type === "Income")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter(t => t.type === "Expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const netIncome = totalIncome - totalExpenses;

    return (
        <table className="w-full">
            <tbody>
                <tr>
                    <td>Total Income: </td>
                    <td>Rs. {totalIncome.toFixed(2)} </td>
                </tr>
                <tr>
                    <td>Total Expense: </td>
                    <td>Rs. {totalExpenses.toFixed(2)} </td>
                </tr>
                <tr>
                    <td>Net Income: </td>
                    <td>Rs. {netIncome.toFixed(2)} </td>
                </tr>
            </tbody>
        </table>
    );
};

export default Overview;