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

function Income() {
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.id;

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    try {
      const response = await fetch(`http://localhost:5005/incomes/${user_id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch Expenses");
      }
      const data = await response.json();
      setIncome(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  const updateIncome = (user_id, id) => {
    console.log("Update income with ID:", id);
    fetch(`http://localhost:5005/income/${user_id}/${id}`, {
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
  const deleteIncome = (user_id, id) => {
    fetch(`http://localhost:5005/income/${user_id}/${id}`, {
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
      <h1 className="text-2xl font-bold text-center my-6">Incomes</h1>

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
              <TableRow
                style={{
                  backgroundColor: "#61DAFB",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                <TableCell>Sum Incomes</TableCell>
                <TableCell>
                  {income
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

export default Income;
