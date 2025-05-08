import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useParams } from "react-router-dom";
function Income() {
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:5005/incomes/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch income");
        }
        return response.json();
      })
      .then((data) => {
        setIncome(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  const updateIncome = (id) => {
    console.log("Update income with ID:", id);
    fetch(`http://localhost:5005/income/${id}/${id}`, {
      method: "UPDATE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update income");
        }

        setIncome((prev) => prev.filter((item) => item.id !== id));
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  const deleteIncome = (id) => {
    fetch(`http://localhost:5005/income/${id}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete income");
        }
        // Remove deleted item from state
        setIncome((prev) => prev.filter((item) => item.id !== id));
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <>
      <h1>Incomes</h1>

      {loading && <p>Loading income...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div className="max-w-4xl mx-auto">
          <Table>
            <TableCaption></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {income.map((income) => (
                <TableRow key={income.id}>
                  <TableCell className="font-medium">{income.name}</TableCell>
                  <TableCell>{income.amount}</TableCell>
                  <TableCell>
                    {new Date(income.date).toISOString().split("T")[0]}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>Sum </TableCell>
                <TableCell> </TableCell>
                <TableCell> Total of all Incomes </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}

export default Income;
