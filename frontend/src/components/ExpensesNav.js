import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Monthly_expenses from "./Monthly_expenses";
import Expenses from "./Expenses";

function ExpensesNav() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [totalExpenses, setTotalExpenses] = useState(null);
  const [totalIncome, setTotalIncome] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [balance, setBalance] = useState(null);
  // const [debitPerMonth, setDebitPerMonth] = useState(null);

  const fetchBalance = async () => {
    try {
      const response = await fetch(
        `http://localhost:5005/total_balance/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Could not load balance data.");
        return;
      }

      setTotalExpenses(data.totalExpenses);
      setTotalIncome(data.totalIncome);
      setBalance(data.balance);
      //setDebitPerMonth(data.debitPerMonth);
      setMessage(data.message);
      setError("");
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Could not load balance data.");
    }
  };

  useEffect(() => {
    if (userId) fetchBalance();
  }, [userId]);
  const debitPerMonth = balance < 0 ? Math.abs(balance) / 4 : 0;

  return (
    <>
      <Navbar />

      <div
        className="expenses-nav"
        style={{
          padding: "20px",
          backgroundColor: "#ffffff",
          marginBottom: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ color: "#1e88e5", marginBottom: "16px" }}>
          Monthly Overview
        </h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {totalExpenses !== null && totalIncome !== null && (
          <>
            <p>
              <strong>Total Expenses:</strong>{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>
                {totalExpenses} €
              </span>
            </p>
            <p>
              <strong>Total Income:</strong>{" "}
              <span style={{ color: "green", fontWeight: "bold" }}>
                {" "}
                {totalIncome} €
              </span>
            </p>
            <p>
              <strong>Balance:</strong>{" "}
              <span
                style={{
                  color: balance < 0 ? "red" : "green",
                  fontWeight: "bold",
                }}
              >
                {balance} €
              </span>
            </p>
            {balance < 0 && debitPerMonth !== null && (
              <p style={{ color: "red", fontWeight: "bold" }}>
                Your expenses exceed your income.{" "}
                <span>
                  To cover the debit, divide the amount over 4 months: Save{" "}
                </span>
                <strong style={{ color: "green" }}>
                  {" "}
                  {Math.abs(debitPerMonth).toFixed(2)} €
                </strong>{" "}
                per month.
              </p>
            )}
          </>
        )}
      </div>
      <Monthly_expenses user_id={userId} />
      <Expenses user_id={userId} />
    </>
  );
}

export default ExpensesNav;
