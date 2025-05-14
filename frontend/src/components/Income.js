import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AddIncomeForm from "./AddIncome";
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

  useEffect(() => {
    fetch("http://localhost:5005/incomes")
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
    } catch (err) {
      alert("Löschen fehlgeschlagen: " + err.message);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-6">One-Time Incomes</h1>

      {loading && <p className="text-center">Loading income...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="max-w-4xl mx-auto">
          <Table>
            <TableCaption>Einnahmen des Nutzers</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Price (€)</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {income.map((income) => (
                <TableRow key={income.id}>
                  <TableCell className="font-medium">{income.name}</TableCell>
                  <TableCell>
                    {parseFloat(parseFloat(income.amount).toFixed(2)).toFixed(
                      2
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(income.date).toISOString().split("T")[0]}
                  </TableCell>
                  <TableCell className="text-right">
                    <button
                      onClick={() => handleDelete(income.id)}
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
                <TableCell>Sum One-Time Incomes</TableCell>
                <TableCell>
                  {income
                    .reduce(
                      (sum, item) => sum + parseFloat(item.amount || 0),
                      0
                    )
                    .toFixed(2)}{" "}
                  €
                </TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}

      <AddIncomeForm />
    </>
  );
}

export default Income;
