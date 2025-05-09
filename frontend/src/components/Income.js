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
        throw new Error("Failed to fetch incomes");
      }
      const data = await response.json();
      setIncome(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Diesen Income-Eintrag löschen?");
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:5005/income/${user_id}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Fehler beim Löschen");
      }

      setIncome((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert("Löschen fehlgeschlagen: " + err.message);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-6">Incomes</h1>

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
                    {new Date(item.date).toISOString().split("T")[0]}
                  </TableCell>
                  <TableCell className="text-right">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 underline"
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell>Sum Incomes</TableCell>
                <TableCell>
                  {income
                    .reduce((sum, item) => sum + parseFloat(item.amount || 0), 0)
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
    </>
  );
}

export default Income;
