import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import type { Transaction } from "../types";

//const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00bcd4", "#e91e63"];
const COLORS = [
    "#003366", // Dark Blue
    "#006400", // Dark Green
    "#2e0049",  // Darker Purple
    "#8b008b", // Dark Magenta
    "#b8860b", // Dark Yellow (Goldenrod)
    "#8b006d"  // Dark Pink (Deep Pink)
]

interface Props {
    transactions: Transaction[];
}

const ExpensePieChart: React.FC<Props> = ({ transactions }) => {
    const expenseData = transactions
        .filter((t) => t.type === "Expense")
        .reduce<Record<string, number>>((acc, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
            return acc;
        }, {});

    const chartData = Object.entries(expenseData).map(([category, amount]) => ({
        name: category,
        value: amount,
    }));

    return (
        <div className="h-[500px] bg-gray-200 p-8 rounded-lg">
            <div className="text-xl font-bold text-center">Expense Chart</div>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >
                        {chartData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ExpensePieChart;
