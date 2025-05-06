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
  const updateIncome = (id) => {
    console.log("Update income with ID:", id);
  };
  const deleteIncome = (id) => {
    fetch(`http://localhost:5005/income/${id}`, {
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
              <th>Name</th>
              <th>Amount (€)</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {income.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.user_id}</td>
                <td>{item.name}</td>
                <td>{item["amount (€)"]}</td>
                <td>{item.date || "-"}</td>
                <td>
                  <button onClick={() => deleteIncome(item.id)}>Delete</button>
                  <button onClick={() => updateIncome(item.id)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Income;
