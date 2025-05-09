import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // ✅ ajouter ceci
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

function Monthly_expenses() {

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.id;

  useEffect(() => {
    fetchMonthlyExpenses();
  }, []);

  const fetchMonthlyExpenses = async () => {
    try {
      const response = await fetch(`http://localhost:5005/monthly_expenses/${user_id}`)

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


  return (
    <>
      <h1>Monthly expenses</h1>

      {loading && <p>Loading expenses...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div className="max-w-4xl mx-auto">
          <Table>
            <TableCaption></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Price (€)</TableHead>
                <TableHead>Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.name}</TableCell>
                  <TableCell>
                    {parseFloat(expense.amount).toFixed(2)}
                  </TableCell>
                  <TableCell>{expense.category}</TableCell>
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
                <TableCell>
                  {expenses
                    .reduce(
                      (sum, item) => sum + parseFloat(item.amount || 0),
                      0
                    )
                    .toFixed(2)}{" "}
                  €
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}

export default Monthly_expenses;
