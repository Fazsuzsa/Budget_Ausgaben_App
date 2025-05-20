import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import { API_URL } from "../lib/utils";
import { Button } from "./ui/button";

function Monthly_expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [monthlySum, setMonthlySum] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const navigate = useNavigate();

  useEffect(() => {
    fetchMonthlyExpenses();
    fetchMonthlyExpensesSum();
  }, []);

  const fetchMonthlyExpenses = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/monthly_expenses/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch Expenses");
      }
      const data = await response.json();
      setExpenses(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchMonthlyExpensesSum = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${API_URL}/monthly_expenses/sum/${userId}`,
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
      setMonthlySum(data.totalMonthlyExpenses || 0);
    } catch (err) {
      console.error("Error fetching sum:", err.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Diesen monatlichen Eintrag löschen?");
    if (!confirmed) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/monthly_expenses/${userId}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Fehler beim Löschen");
      }

      setExpenses((prev) => prev.filter((e) => e.id !== id));
      fetchMonthlyExpensesSum();
      window.location.reload();
    } catch (err) {
      alert("Löschen fehlgeschlagen: " + err.message);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-6">Monthly expenses</h1>

      {loading && <p className="text-center">Loading expenses...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="max-w-4xl mx-auto">
          <Table>
            <TableCaption></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Price (€)</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.name}</TableCell>
                  <TableCell>{parseFloat(expense.amount).toFixed(2)}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>
                    {expense.date_start
                      ? new Date(expense.date_start).toLocaleDateString()
                      : "No start date"}
                  </TableCell>
                  <TableCell>
                    {expense.date_end
                      ? new Date(expense.date_end).toLocaleDateString()
                      : "Ongoing"}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      onClick={() =>
                        navigate(
                          `/edit-monthlyexpense/${expense.user_id}/${expense.id}`,
                          {
                            state: { expense },
                          }
                        )
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(expense.id)}
                      className="text-red-500 underline"
                    >
                      Delete
                    </Button>
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
                <TableCell className="font-medium">
                  Sum Monthly Expenses
                </TableCell>
                <TableCell>{parseFloat(monthlySum).toFixed(2)} €</TableCell>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}

export default Monthly_expenses;
