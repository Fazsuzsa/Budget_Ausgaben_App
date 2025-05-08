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

function Monthly_incomes() {
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:5005/monthly_incomes/${id}`)
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

  return (
    <>
      <h1>Monthly incomes</h1>

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
              </TableRow>
            </TableHeader>
            <TableBody>
              {income.map((income) => (
                <TableRow key={income.id}>
                  <TableCell className="font-medium">{income.name}</TableCell>
                  <TableCell>{income.amount}</TableCell>
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

export default Monthly_incomes;
