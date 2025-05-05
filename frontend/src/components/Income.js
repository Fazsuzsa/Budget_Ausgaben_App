import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

function Income() {
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5005/income")
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
      <Navbar />
      <h1>Income</h1>

      {loading && <p>Loading income...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              {/* <th>Name</th> */}
              <th>Amount (€)</th>
              {/* <th>Category ID</th> */}
              <th>Frequency</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {income.map((income) => (
              <tr key={income.id}>
                <td>{income.id}</td>
                <td>{income.user_id}</td>
                <td>{income.name}</td>
                <td>{income["amount(€)"]}</td>
                <td>{income.category_id}</td>
                <td>{income.frequency || "-"}</td>
                <td>{income.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Income;
