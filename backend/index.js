const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5005;

const pool = new Pool({
  user: process.env.DB_USER, // Dein PostgreSQL-Benutzername
  host: process.env.DB_HOST, // z. B. 'localhost'
  database: process.env.DB_NAME, // Name deiner Datenbank
  password: process.env.DB_PASSWORD, // Dein Passwort
  port: process.env.DB_PORT, // Standardport für PostgreSQL
});

const createTable = async () => {
  const client = await pool.connect();
  try {
    const queryText = `
            CREATE TABLE IF NOT EXISTS Users (id  SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    budget real NOT NULL,
    e_mail VARCHAR(100) NOT NULL
            );
        `;
    await client.query(queryText);
    console.log("✅ Table 'users' exists / created!");
  } catch (err) {
    console.error("❌ Error creating table:", err);
  } finally {
    client.release();
  }
};

createTable();

app.use(cors());
app.use(express.json()); // Ermöglicht Express Json aus einem Body auszulesen
app.use(express.static("public"));

app.get("/expenses/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT expenses.id, expenses.user_id, expenses.amount, expenses.name, expenses.category_id, expenses.date, categories.category FROM public.expenses JOIN public.categories on expenses.category_id = categories.id WHERE expenses.user_id = $1",
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Fehler beim Abrufen der Ausgaben:", err);
    res.status(500).json({ error: "Interner Serverfehler" });
  }
});

app.post("/expenses", async (req, res) => {
  const { user_id, category_id, amount, name, date } = req.body;

  if (!user_id || !category_id || !amount || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO "expenses" (user_id, category_id, "amount", name, date)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [user_id, category_id, amount, name || "", date]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Fehler beim Einfügen der Ausgabe:", err);
    res.status(500).json({ error: "Interner Serverfehler" });
  }
});

app.delete("/expenses/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM expenses WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Eintrag nicht gefunden" });
    }

    res.status(200).json({ message: "Erfolgreich gelöscht" });
  } catch (err) {
    console.error("Fehler beim Löschen:", err);
    res.status(500).json({ error: "Interner Serverfehler" });
  }
});

app.get("/monthly_expenses/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT monthly_expenses.id, monthly_expenses.user_id, monthly_expenses.amount, monthly_expenses.name, monthly_expenses.category_id, categories.category FROM public.monthly_expenses JOIN public.categories on monthly_expenses.category_id = categories.id WHERE monthly_expenses.user_id = $1",
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Fehler beim Abrufen der monatlichen Ausgaben:", err);
    res.status(500).json({ error: "Interner Serverfehler" });
  }
});

app.post("/monthly_expenses", async (req, res) => {
  const { user_id, category_id, amount, name } = req.body;

  if (!user_id || !category_id || !amount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  app.delete("/monthly_expenses/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const result = await pool.query(
        "DELETE FROM monthly_expenses WHERE id = $1 RETURNING *",
        [id]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Eintrag nicht gefunden" });
      }

      res.status(200).json({ message: "Erfolgreich gelöscht" });
    } catch (err) {
      console.error("Fehler beim Löschen:", err);
      res.status(500).json({ error: "Interner Serverfehler" });
    }
  });

  try {
    const result = await pool.query(
      `INSERT INTO monthly_expenses (user_id, category_id, amount, name)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [user_id, category_id, amount, name || ""]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Fehler beim Einfügen in monthly_expenses:", err);
    res.status(500).json({ error: "Interner Serverfehler" });
  }
});

app.get("/incomes/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM "incomes" WHERE user_id = $1',
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Fehler beim Abrufen der Ausgaben:", err);
    res.status(500).json({ error: "Interner Serverfehler" });
  }
});

// app.post("/incomes", ... MUSS GEMACHT WERDEN!

app.get("/monthly_incomes/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM "monthly_incomes" WHERE user_id = $1',
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Fehler beim Abrufen der Ausgaben:", err);
    res.status(500).json({ error: "Interner Serverfehler" });
  }
});

// app.post("/monthly_incomes", ... MUSS GEMACHT WERDEN!

app.post("/login", async (req, res) => {
  const { e_mail, password } = req.body;
  console.log("Request login:", e_mail, password);

  try {
    const result = await pool.query("SELECT * FROM users WHERE e_mail = $1", [
      e_mail,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.json({ error: "e_mail incorrect!" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Passwort incorrect!" });
    }

    const token = jwt.sign(
      { userId: user.id, e_mail: user.e_mail },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "30m" }
    );

    res.json({ message: "Connexion OK", user: { id: user.id, e_mail: user.e_mail }, token });
  } catch (error) {
    console.error("Error login:", error);
    res.status(500).json({ error: "Error server" });
  }
});

app.put("/income/:id_user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { id_user } = req.params;
    const { amount, name, date } = req.body;

    const query = `
      UPDATE "incomes"
      SET amount = $1, name = $2, date = $3    WHERE id = $4 AND user_id = $5
      RETURNING *;
    `;
    const values = [amount, name, date, id, id_user];

    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      return res.status(404).send("Cannot find the income");
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});
app.delete("/income/:id_user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user_id = req.params.id_user;

    const query =
      'DELETE FROM "incomes" WHERE id = $1 AND user_id= $2 RETURNING *;';

    const { rows } = await pool.query(query, [id, user_id]);

    if (rows.length === 0) {
      return res.status(404).send("cannot find the incomes");
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("some error has occured");
  }
});
app.put("/expenses/:id_user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { id_user } = req.params;

    const { category_id, amount, name, date } = req.body;

    const query = `
    UPDATE "expenses"
    SET category_id=$1, amount=$2, name=$3, date=$4
    WHERE id=$5 AND user_id=$6
    RETURNING *;`;
    const values = [category_id, amount, name, date, id, id_user];

    const { rows } = await pool.query(query, values);
    if (rows.lenght == 0) {
      return res.status(404).send("cannot find the expenses");
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("some error has occured");
  }
});
app.get("/expenses/search", async (req, res) => {
  const { year } = req.query; // Get the year from the query string

  if (!year) {
    return res.status(400).json({ error: "Year is required" });
  }

  try {
    // Log the incoming year to verify it's being received correctly
    console.log(`Received request for expenses in year: ${year}`);

    // Query both regular expenses and monthly expenses for the given year
    const result = await pool.query(
      `
      SELECT amount FROM public.expenses WHERE EXTRACT(YEAR FROM date) = $1
      UNION ALL
      SELECT amount FROM public.monthly_expenses WHERE EXTRACT(YEAR FROM date) = $1
      `,
      [year]
    );

    // Log the result of the query to check if it returns expected data
    console.log("Query Result:", result.rows);

    // Check if any expenses were found
    if (result.rows.length === 0) {
      console.log("No expenses found for the given year");
      return res
        .status(404)
        .json({ error: "No expenses found for the given year" });
    }

    // Calculate the total amount
    const totalAmount = result.rows.reduce(
      (sum, row) => sum + parseFloat(row.amount),
      0
    );

    // Calculate the average expense
    const averageAmount = totalAmount / result.rows.length;

    // Log the total and average for verification
    console.log(
      `Total Expenses: €${totalAmount.toFixed(
        2
      )}, Average Expense: €${averageAmount.toFixed(2)}`
    );

    res.json({
      year: year,
      totalExpenses: totalAmount.toFixed(2),
      averageExpense: averageAmount.toFixed(2),
    });
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Error calculating average expenses:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft: http://localhost:${PORT}`);
});
