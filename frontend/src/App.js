import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Input } from "./components/ui/input";
import { Form, FormControl, FormItem, FormLabel } from "./components/ui/form";
import { Select, SelectItem } from "./components/ui/select";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import "./App.css";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the plugin

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        boxWidth: 60,
        padding: 15,
      },
    },
    datalabels: {
      color: "black", // Color of the data labels
      font: {
        // weight: "bold",
        size: 18,
      },
      formatter: (value, context) => {
        if (value === 0) return ""; // Hide zero amounts
        return `€${value.toFixed(2)}`; // Format as currency
      },
      align: "start", // Align the labels in the center
      anchor: "end", // Anchor them in the center of each segment
    },
  },
};

const App = () => {
  const now = new Date();
  const currentYear = now.getFullYear().toString();
  const currentMonth = (now.getMonth() + 1).toString();

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  });

  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      year: currentYear,
      month: currentMonth,
    },
  });

  const year = watch("year");
  const month = watch("month");

  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.id;

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

  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }

  const isChartEmpty = chartData && chartData.labels.length === 0;

  return (
    <>
      <Navbar></Navbar>
      <div style={styles.chartBox}>
        <Form>
          <form className="max-w-sm mx-auto space-y-4">
            <FormItem>
              <FormLabel>Month</FormLabel>
              <FormControl>
                <Select {...register("month")} defaultValue={currentMonth}>
                  <SelectItem value="1">January</SelectItem>
                  <SelectItem value="2">February</SelectItem>
                  <SelectItem value="3">March</SelectItem>
                  <SelectItem value="4">April</SelectItem>
                  <SelectItem value="5">May</SelectItem>
                  <SelectItem value="6">June</SelectItem>
                  <SelectItem value="7">July</SelectItem>
                  <SelectItem value="8">August</SelectItem>
                  <SelectItem value="9">September</SelectItem>
                  <SelectItem value="10">October</SelectItem>
                  <SelectItem value="11">November</SelectItem>
                  <SelectItem value="12">December</SelectItem>
                </Select>
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="1"
                  {...register("year")}
                  defaultValue={currentYear}
                  required
                />
              </FormControl>
            </FormItem>
          </form>
        </Form>

        <div className="w-full h-[500px] p-4 bg-white rounded shadow">
          {isChartEmpty ? (
            <p style={{ color: "red" }}>
              No expenses available for the selected month and year.
            </p>
          ) : (
            <Pie data={chartData} options={options} />
          )}
        </div>
      </div>
    </>
  );
};

const styles = {
  chartBox: {
    textAlign: "center",
    maxWidth: "400px", // optional: control width
  },
};

export default App;
