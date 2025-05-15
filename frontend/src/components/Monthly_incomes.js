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

function Monthly_incomes() {
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.id;

  useEffect(() => {
    fetchMonthlyIncomes();
  }, []);

  const fetchMonthlyIncomes = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:5005/monthly_incomes/${user_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
    const confirmed = window.confirm(
      "Diesen monatlichen Income-Eintrag löschen?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(
        `http://localhost:5005/monthly_incomes/${user_id}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

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
      <h1 className="text-2xl font-bold text-center my-6">Monthly Incomes</h1>

      {loading && <p className="text-center">Loading incomes...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="max-w-4xl mx-auto">
          <Table>
            <TableCaption></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Price (€)</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {income.map((income) => (
                <TableRow key={income.id}>
                  <TableCell className="font-medium">{income.name}</TableCell>
                  <TableCell>{parseFloat(income.amount).toFixed(2)}</TableCell>
                  <TableCell>
                    {income.date_start
                      ? new Date(income.date_start).toLocaleDateString()
                      : "No start date"}
                  </TableCell>
                  <TableCell>
                    {income.date_end
                      ? new Date(income.date_end).toLocaleDateString()
                      : "Ongoing"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      to={`/edit-monthly-income/${income.user_id}/${income.id}`}
                      state={{ income }}
                      className="text-blue-500 underline"
                    >
                      Edit
                    </Link>
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
                <TableCell className="font-medium">
                  Sum Monthly Incomes
                </TableCell>
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
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}

export default Monthly_incomes;
