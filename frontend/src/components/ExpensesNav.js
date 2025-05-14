import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Expenses from "./Expenses";
import Monthly_expenses from "./Monthly_expenses";
import { useParams } from "react-router-dom";

function ExpensesNav() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [totalExpenses, setTotalExpenses] = useState(null);

  const [balance, setBalance] = useState({ totalExpenses: null, totalIncome: null });

  const fetchBalance = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5005/total_balance/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error fetching data: ${errorText}`);
      }

      const data = await response.json();
      setBalance(data);
    } catch (error) {
      console.error("Error fetching balance", error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [userId]);

  const fetchTotalExpenses = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5005/total_expenses/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response Status:", response.status); // Log status code

      if (!response.ok) {
        const errorText = await response.text(); // Get the error message from the response
        throw new Error(`Error fetching data: ${errorText}`);
      }

      const data = await response.json();
      console.log("Data fetched:", data); // Log the fetched data
      setTotalExpenses(data.totalExpenses);
    } catch (error) {
      console.error("Error fetching expenses", error);
    }
  };


  useEffect(() => {
    fetchTotalExpenses();
  }, [userId]);

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px", backgroundColor: "#f4f4f4", marginBottom: "20px" }}>
        {totalExpenses === null ? (
          <p>Loading total expenses...</p>
        ) : (
          <h2>Total expenses: {totalExpenses}€</h2>
        )}
      </div>
      <div style={{ padding: "20px", backgroundColor: "#f4f4f4", marginBottom: "20px" }}>
        {balance.totalExpenses === null || balance.totalIncome === null ? (
          <p>Loading totals...</p>
        ) : (
          <>
            <h2>Total Income: {balance.totalIncome}€</h2>
            <h2>Total Expenses: {balance.totalExpenses}€</h2>
            <h2>Balance: {balance.totalIncome - balance.totalExpenses}€</h2>
            {balance.totalExpenses > balance.totalIncome && (
              <p style={{ color: "red", fontWeight: "bold" }}>
                Your expenses exceeded your income
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
