import React, { useEffect, useState } from "react";

function Monthly_incomes() {
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5005/monthly_incomes")
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
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Name</th>
              <th>Amount (€)</th>
            </tr>
          </thead>
          <tbody>
            {income.map((income) => (
              <tr key={income.id}>
                <td>{income.id}</td>
                <td>{income.user_id}</td>
                <td>{income.name}</td>
                <td>{income.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Monthly_incomes;
