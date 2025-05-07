import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import AddExpenseForm from "./AddExpense";
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
        <Table>
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.name}</TableCell>
                <TableCell>{parseFloat(expense.amount).toFixed(2)}</TableCell>

                <TableCell>{expense.category_id}</TableCell>
                <TableCell>
                  {new Date(expense.date).toISOString().split("T")[0]}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>Sum </TableCell>
              <TableCell> </TableCell>
              <TableCell> Total of all Expenses </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
      {/* Button zum Einblenden des Formulars */}
      <AddExpenseForm />
    </>
  );
}

export default Expenses;
