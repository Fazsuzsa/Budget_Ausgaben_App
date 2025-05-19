import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Sum, setSum] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    fetchExpenses();
    fetchExpensesSum();
  }, []);
  const fetchExpenses = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:5005/expenses/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch expenses");
      }
      const data = await res.json();
      setExpenses(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Willst du diesen Eintrag wirklich löschen?"
    );
    if (!confirmed) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://localhost:5005/expenses/${userId}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Fehler beim Löschen");
      }

      setExpenses((prev) => prev.filter((e) => e.id !== id));
      window.location.reload();
    } catch (err) {
      alert("Löschen fehlgeschlagen: " + err.message);
    }
  };

  const fetchExpensesSum = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5005/expenses/sum/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch sum");
      }

      const data = await response.json();
      setSum(data.totalExpenses || 0);
    } catch (err) {
      console.error("Error fetching sum:", err.message);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-6">Expenses</h1>

      {loading && <p className="text-center">Loading expenses...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="max-w-4xl mx-auto">
          <div className="table-wrapper">
            <Table className="expenses-table">
              <TableCaption></TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead>Price (€)</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">
                      {expense.name}
                    </TableCell>
                    <TableCell>
                      {parseFloat(
                        parseFloat(expense.amount).toFixed(2)
                      ).toFixed(2)}
                    </TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>
                      {new Date(expense.date).toISOString().split("T")[0]}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Link
                        to={`/edit-expense/${expense.user_id}/${expense.id}`}
                        state={{ expense }}
                        className="text-blue-500 underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="text-red-500 underline"
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow
                  style={{
                    backgroundColor: "#61DAFB",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  <TableCell className="font-medium">Sum Expenses</TableCell>
                  <TableCell>{parseFloat(Sum).toFixed(2)}€</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
}

export default Expenses;
