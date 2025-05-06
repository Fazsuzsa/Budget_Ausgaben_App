import React, { useState } from "react";

const AddExpenseForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState("once"); // einmalig oder monatlich

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const payload = {
      user_id: 1,
      category_id: parseInt(form.category_id.value),
      amount: parseFloat(form.amount.value),
      name: form.name.value,
      ...(type === "once" ? { date: form.date.value } : {})
    };    

    const url =
      type === "monthly"
        ? "http://localhost:5005/Monthly_expenses"
        : "http://localhost:5005/Expenses";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Gespeichert!");
        form.reset();
        setShowForm(false);
      } else {
        const data = await res.json();
        alert("Fehler: " + data.error);
      }
    } catch (err) {
      console.error("Fehler:", err);
      alert("Serverfehler!");
    }
  };

  return (
    <div style={{ margin: "40px auto", textAlign: "center" }}>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Formular schließen" : "Neue Ausgabe hinzufügen"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "300px",
            marginInline: "auto",
          }}
        >
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="once">Einmalige Ausgabe</option>
            <option value="monthly">Monatliche Ausgabe</option>
          </select>

          <input name="name" placeholder="Name" required />
          <input name="amount" type="number" step="0.01" placeholder="Betrag" required />

          <select name="category_id" required>
            <option value="">-- Kategorie wählen --</option>
            <option value="1">Shopping</option>
            <option value="2">Entertainment</option>
            <option value="3">Transport</option>
            <option value="4">Rent & Energy</option>
            <option value="5">Other</option>
          </select>

          <input name="date" type="date" required />

          <button type="submit">Speichern</button>
        </form>
      )}
    </div>
  );
};

export default AddExpenseForm;
