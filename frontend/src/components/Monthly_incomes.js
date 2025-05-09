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

function Monthly_incomes() {
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
      const response = await fetch("http://localhost:5005/monthly_incomes");
      if (!response.ok) {
        throw new Error("Failed to fetch income");
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
    const confirmed = window.confirm("Diesen monatlichen Income-Eintrag löschen?");
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:5005/monthly_incomes/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Fehler beim Löschen");
      }

      setIncome((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      alert("Löschen fehlgeschlagen: " + err.message);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-6">Monthly Incomes</h1>

      {loading && <p className="text-center">Loading incomes...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="max-w-4xl mx-auto">
          <Table>
            <TableCaption>Regelmäßige Einnahmen</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Amount (€)</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {income.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{parseFloat(item.amount).toFixed(2)}</TableCell>
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
              <TableRow className="font-bold text-gray-700">
                <TableCell>Sum Monthly Incomes</TableCell>
                <TableCell>
                  {income
                    .reduce((sum, i) => sum + parseFloat(i.amount || 0), 0)
                    .toFixed(2)} €  
                </TableCell>
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}

export default Monthly_incomes;
