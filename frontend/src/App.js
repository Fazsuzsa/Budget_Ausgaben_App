import React from "react";
import Navbar from "./components/Navbar";
import PieChart from "./components/PieChart";
// import BarChart from "./components/BarChart";

import { Navigate } from "react-router-dom";
import "./App.css";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer } from "./components/ui/chart"; // No type imports in JS
import { ChartTooltip, ChartTooltipContent } from "./components/ui/chart";
import { ChartLegend, ChartLegendContent } from "./components/ui/chart";

const chartData = [
  { month: "January", expenses: 186, income: 80 },
  { month: "February", expenses: 305, income: 200 },
  { month: "March", expenses: 237, income: 120 },
  { month: "April", expenses: 73, income: 190 },
  { month: "May", expenses: 209, income: 130 },
  { month: "June", expenses: 214, income: 140 },
];

const chartConfig = {
  expenses: {
    label: "Expenses",
    color: "#2563eb",
  },
  income: {
    label: "Income",
    color: "#60a5fa",
  },
};

function App() {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar></Navbar>
      <ChartContainer
        config={chartConfig}
        className="max-h-[400px] max-w-[800px]"
      >
        <PieChart></PieChart>
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
          <Bar dataKey="income" fill="var(--color-income)" radius={4} />
        </BarChart>
      </ChartContainer>
    </>
  );
}
export default App;
