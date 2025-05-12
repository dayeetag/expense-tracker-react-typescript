export type TransactionType = "Income" | "Expense";

export type IncomeCategory = "Salary" | "Bonus" | "Interest" | "Investments";
export type ExpenseCategory = "Food" | "Transportation" | "Rent" | "Utilities" | "Entertainment" | "Misc";

export type Category = IncomeCategory | ExpenseCategory;

export interface Transaction {
    id: number;
    date: string;
    description: string;
    category: Category;
    amount: number;
    type: TransactionType;
}