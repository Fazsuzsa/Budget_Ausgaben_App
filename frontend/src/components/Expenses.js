import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import AddExpenseForm from "./AddExpense";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5005/Expenses")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch Expenses");
        }
        return response.json();
      })
      .then((data) => {
        setExpenses(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <h1>Expenses</h1>

      {loading && <p>Loading expenses...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Name</th>
              <th>Amount (€)</th>
              <th>Category ID</th>

              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.id}</td>
                <td>{expense.user_id}</td>
                <td>{expense.name}</td>
                <td>{expense.amount}</td>
                <td>{expense.category_id}</td>

                <td>{expense.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Button zum Einblenden des Formulars */}
      <AddExpenseForm />
    </>
  );
}

export default Expenses;
