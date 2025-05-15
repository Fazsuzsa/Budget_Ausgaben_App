import React, { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { ChartLegend, ChartLegendContent } from "./ui/chart";
import { ChartContainer } from "./ui/chart"; // No type imports in JS
import { Navigate } from "react-router-dom";

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

const ImExBarChart = () => {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString();

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.id; // ohne Token nur der user

  useEffect(() => {
    const fetchChartData = async () => {
      if (!year || !month) return;

      const payload = {
        year: parseFloat(year),
        month: parseFloat(month),
      };

      try {
        const res = await fetch(`http://localhost:5005/piedata/${user_id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const data = await res.json();
          setChartData(data); // Update pie chart data
        } else {
          const err = await res.json();
          console.error("Backend error:", err.error);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchChartData();
  }, [year, month]); // Runs whenever year or month changes

  const isChartEmpty = chartData && chartData.labels.length === 0;

  return (
    <>
      <ChartContainer
        config={chartConfig}
        className="max-h-[400px] max-w-[800px]"
      >
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
};

export default ImExBarChart;
